function init(){

// create a variable for the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
let dropdown = d3.select("#selDataset");
// Fetch the JSON data and console log it
d3.json(url).then((data1) => {
  let sampleNames = data1.names;
  for (let i = 0; i<sampleNames.length; i++){
  dropdown.append("option").text(sampleNames[i]).property("value",sampleNames[i])
  
  }

let firstSample = sampleNames[0]
metaData(firstSample);
chart(firstSample);
})}

init();

function metaData(s){
  let metaDataInfo = data1.metadata.find(id => metadata.id ===  );
  
  
}

function chart(s){
  let selected = data.samples.find(id => id.otu_ids);

}
function optionChanged(s){
  metaData(s); 
  chart(s);

}
// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// create empty arrays to hold the values
let sample_valuess = []
let otu_idss = []
let otu_labelss = []
// for loop to populate arrays
for (let i = 0; i < data1.length; i++){
    row = data1[i];
    sample_valuess.push(row.samples.sample_values);
    otu_idss.push(row.samples.otu_ids);
    otu_labelss.push(row.samples.otu_labels);
};
console.log("sample",sample_valuess)
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
