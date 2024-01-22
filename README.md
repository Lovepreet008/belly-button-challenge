# Interactive Belly Button Biodiversity Dashboard
## javascript

This repository presents an interactive dashboard designed to explore the Belly Button Biodiversity dataset. The dataset catalogs the diverse microbes that colonize human navels, shedding light on the prevalence and distribution of microbial species (operational taxonomic units or OTUs) among individuals.


### Assignment Background

In this assignment, the goal is to create an engaging and informative dashboard that allows users to interactively navigate the Belly Button Biodiversity dataset. The dataset unveils fascinating insights, revealing that a small handful of microbial species were present in more than 70% of individuals, while the remaining species were relatively rare.

### Project Overview

The interactive dashboard consists of three key visualizations:

1. Horizontal Bar Chart:
- Displays the top 10 operational taxonomic units (OTUs) found in an individual's navel.
- Incorporates a dropdown menu for easy sample selection.
- Bar chart values represent sample_values.
- Bar chart labels utilize otu_ids.
- Hovertext is derived from otu_labels.

2. Bubble Chart:
- Represents each sample with a bubble, illustrating the distribution of microbial species.
- X values are based on otu_ids.
- Y values correspond to sample_values.
- Marker size is determined by sample_values.
- Marker colors are assigned based on otu_ids.
- Text values use otu_labels.

3. Gauge Chart:
- Visualizes the weekly washing frequency of an individual.
- Adapted from the Gauge Chart example.
- Modified to accommodate values ranging from 0 through 9.
- The chart dynamically updates with each new sample selection.

Additionally, the dashboard displays sample metadata, providing demographic information about each individual. Key-value pairs from the metadata JSON object are presented on the page.

### Usage

To explore the interactive dashboard:

1. Clone this repository to your local machine.
2. Open the HTML file in a modern web browser.

The dropdown menu enables users to select different samples, triggering updates to the visualizations. Dive into the fascinating world of Belly Button Biodiversity and microbial colonization patterns!

### Dependencies

Ensure your web browser supports the D3 library. No additional installations are required, as D3 is loaded through a CDN (Content Delivery Network).

### Acknowledgments

This assignment is part of a data visualization project, and it utilizes the Belly Button Biodiversity dataset provided by the curriculum team. The implementation of visualizations adheres to the assignment guidelines, providing an interactive and insightful exploration of microbial diversity in human navels. The optional adaptation of the Gauge Chart enhances the dashboard's functionality.