//Use the D3 library to read in samples.json from the URL
const url="https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";


  
//Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
d3.json(url).then(function(data) {
    let subId=data.samples.map(a => a.id);
    // console.log(subId.length);


    function populateDropdown() {
        var dropdown = document.getElementById("selDataset");
           
    
        for ( let i=0; i<subId.length; i++){
            
            
            var newOption = document.createElement("option");
            newOption.value=parseInt(subId[i]);
            newOption.text=`ID${subId[i]}`; 
            dropdown.appendChild(newOption);
                  
            
        }
    
    
    }
    populateDropdown();

    

    function optionChanged(selectedValue){
          
        
            let sample=data.samples.find(sample => sample.id === selectedValue);
            if (sample){
                // values for the selected sample
                let values=sample.sample_values.map(item=> item);
                let slicedValues = values.slice(0, 10);
                let sortValues=slicedValues.reverse();
                // id for the selected sample
                let otuId= sample.otu_ids.map(item => `OTU ${item}`);
                let slicedOtuId = otuId.slice(0, 10);
                let sortOtu=slicedOtuId.reverse();
                // labels for the selected sample
                let otuLabel= sample.otu_labels;
                let slicedLabels=otuLabel.slice(0,10);
                let sortLabel=slicedLabels.reverse();
                // update the bar chart values
                let x= sortValues;
                let y=sortOtu;
                let text= sortLabel
                // update bar plotly
                Plotly.restyle("bar", "x", [x]);
                Plotly.restyle("bar", "y", [y]);
                Plotly.restyle("bar", "text", [text]);


                // update bubbleChart 
                let v= values;
                let o=sample.otu_ids.map(item => item);
                let l=otuLabel;


                Plotly.restyle("bubbleChart", "x", [o]);
                Plotly.restyle("bubbleChart", "y", [v]);
                Plotly.restyle("bubbleChart", "text", [l]);
                Plotly.restyle("bubbleChart", "size", [v]);
                Plotly.restyle("bubbleChart", "color", [o]);

            }

            //update list
            updateList(selectedValue);

            //create a guage chart
        gaugeChart(selectedValue);
            


    }
    

    // Set up the onchange event for the dropdown to trigger the optionChanged function
    document.getElementById("selDataset").onchange = function() {
        optionChanged(this.value);
    };
    function init(){
        let dropdownMenu = d3.select("#selDataset");
        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.property("value");
        let sample=data.samples.find(sample => sample.id === dataset);
        if (sample){
            // set values
            let values=sample.sample_values.map(item=> item);
            let slicedValues = values.slice(0, 10);
            let sortValues=slicedValues.reverse();
            
            // set otu id 
            let otuId= sample.otu_ids.map(item => `OTU ${item}`);
            let slicedOtuId = otuId.slice(0, 10);
            let sortOtu=slicedOtuId.reverse();
            // set otu labels
            let otuLabel= sample.otu_labels;
            let slicedLabels=otuLabel.slice(0,10);
            let sortLabel=slicedLabels.reverse();

            // define trace1
            let trace1 = {
                x: sortValues,
                y: sortOtu,
                text: sortLabel,
                type: "bar",
                orientation: "h"
                };
                
                // Data array
            let data1 = [trace1];
                
                // Apply a title to the layout
            let layout = {
                
                title: "Top 10 OTU for each Individual"
                
                            };
                
            // Render the plot to the div tag with id "plot"
            Plotly.newPlot("bar", data1, layout);

            

            }

        // create a bubble chart
        let otu_id= data.samples.map(item => item.otu_ids);
        let s_value= data.samples.map(item=> item.sample_values);
        let ot_label=data.samples.map(item=> item.otu_labels);
        
        let trace2 = {
            x: otu_id[0], // x-values (otu_ids)
            y: s_value[0], // y-values (sample_values)
            text: ot_label[0], // Text (otu_labels)
            mode: 'markers',
            marker: {
              size: s_value[0], // Marker sizes based on sample_values
              color: otu_id[0],// Marker colors based on otu_ids
              colorscale: 'Viridis'
              
            }
          };
        
          // Define the data array
        let data2 = [trace2];
        
          // Define layout options
        let layout2 = {
            title: 'Bubble Chart for Each Sample',
            xaxis: { title: 'OTU IDs' }, // x-axis label
            yaxis: { title: 'Sample Values' }, // y-axis label
            // Additional layout properties can be added here
          };
        
          // Plot the chart
        Plotly.newPlot("bubbleChart", data2, layout2);

        //update list
        updateList(dataset);
        
        //create a guage chart
        gaugeChart(dataset);
        



    }
    init();

    // update list function
    function updateList(Value){
        intValue= parseInt(Value);
        
        let m_data=data.metadata.find(a => a.id === intValue);
        let list = document.getElementById('myList');
        
        
            if (m_data){
                
                
                // Get the <ul> element
                list.innerHTML = '';
                // Create a new <ul> element
                let ul = document.createElement('ul');
                ul.style.listStyleType = 'none'; // Remove bullet pointsul.style.listStyleType = 'none'; // Remove bullet points// 
                

                // Create an array of text to be added to list items
                let itemsText = [`id: ${Value}`, `ethnicity: ${m_data.ethnicity}`,
                 `gender: ${m_data.gender}`, `age: ${m_data.age}`, `location: ${m_data.location}`, 
                 `bbtype: ${m_data.bbtype}`, `wfreq: ${parseInt(m_data.wfreq)}`];

                // Loop through the array and create <li> elements with text, then append to the <ul>
                itemsText.forEach(text => {
                let listItem = document.createElement('li'); // Create a new <li> element
                listItem.textContent = text; // Set the text content of the <li>
                ul.appendChild(listItem); // Append the <li> to the <ul>
                });
                list.appendChild(ul);



            }

    }

    function gaugeChart(value){
        let intValue= parseInt(value);
        
        let g_data=data.metadata.find(a => a.id === intValue);
        let wash= parseInt(g_data.wfreq);


        var data3 = [
            {
              type: "indicator",
              mode: "gauge",
              value: wash,
              title: { text: "Scrubs per week", font: { size: 14 }},
              
              
              gauge: {
                axis: { range: [null, 9] },
                
                
                
              }
            }
          ];
          
          var layout3 = {
            title: "Belly Button Washing Frequency",
            width: 500,
            height: 300,
            margin: { t: 100, r: 25, l: 25, b: 25 },
            
            };
          
          Plotly.newPlot('gauge', data3, layout3);
    }

});








