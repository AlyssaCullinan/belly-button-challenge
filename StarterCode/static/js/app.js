// create a variable for the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
// create the data promise
const dataPromise = d3.json(url);

console.log("Data Promise: ", dataPromise);

// Fetch the JSON data and console log it
let data1 = d3.json(url).then(function(data1) {
  console.log(data1);

// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// create empty arrays to hold the values
let sample_valuess = []
let otu_idss = []
let otu_labelss = []
// for loop to populate arrays
for (let i = 0; i < data1.length; i++){
    row = data1[i];
    sample_valuess.push(row.sample_values);
    otu_idss.push(row.otu_ids);
    otu_labelss.push(row.otu_labels);
};
//     * Use `sample_values` as the values for the bar chart.
let trace = {
    x: sample_valuess,
    y: otu_idss.map(id => `OTU ${id.otu_ids}`),
    type: 'bar',
    orientation: 'h',
    text:otu_labelss

};

let data = [trace];
Plotly.newPlot("sample-metadata", data);
});