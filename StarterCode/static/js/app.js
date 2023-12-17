// initialize variables
let data1;
let sample_valuess = [];
let otu_idss = [];
let otu_labelss = [];
let dropdown = d3.select("#selDataset");
let sampleNames;
// let selectedSample = dropdown.property("value");


// create a variable for the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then((data) => {
  data1 = data; 
  sampleNames = data1.names;
   
// create a for loop to add the sample data names to the dropdown list options
  for (let i = 0; i<sampleNames.length; i++){
  dropdown.append("option").text(sampleNames[i]).property("value",sampleNames[i])
  }
  init();
});
   
// select the value that the page will land on when intialized.
function init(){
  console.log(sampleNames)
  let firstSample = sampleNames[0];
  metaData(firstSample);
  chart(firstSample);
    };
    
// on change, get the data to display using optionChanged function
d3.selectAll("#selDataset").on("change", optionChanged);

// create a function to pull the metadata of the sample when the sample is selected from the dropdown option
function metaData(selectedSample){
  console.log(data1.metadata)
  let metaDataInfo = data1.metadata.filter(object => object.id == selectedSample)[0]; 
  console.log(metaDataInfo)
  //select the table div
  printedPairs = d3.select("#sample-metadata");
  // remove previous entries
  printedPairs.selectAll("p").remove()
  // add the data to the table when selected
  
  Object.entries(metaDataInfo).forEach(([key,value])=> {
  upperKey = capitalizeFirstLetter(key)
  printedPairs.append("p").text(`${upperKey}:${value}`)});
};

function capitalizeFirstLetter(k){
  return k.charAt(0).toUpperCase() + k.slice(1);
};

function chart(selectedSample){
  let selected = data1.samples.filter(object => object.id == selectedSample);
  for (let i = 0; i<data1.samples.length; i++){
    let row = data1.samples[i];
    sample_valuess.push(row.sample_values);
    otu_idss.push(row.otu_ids);
    otu_labelss.push(row.otu_labels)};
  let trace = {
    x: sample_valuess,
    y: otu_idss.map(id => `OTU ${id}`),
    type: 'bar',
    orientation: 'h',
    text:otu_labelss
  }};

  d3.select("#container").append("div").id("plotlyBarChart");

  let data3 = [trace];
  Plotly.newPlot("plotlyBarChart", data3);


// On change to the DOM, call optionChanged() 
function optionChanged(){
  let s = dropdown.property("value")
  metaData(s); 
  chart(s)
};




// 2. Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// for loop to populate arrays
// for (let i = 0; i < data1.length; i++){
//     row = data1[i];
//     sample_valuess.push(row.samples.sample_values);
//     otu_idss.push(row.samples.otu_ids);
//     otu_labelss.push(row.samples.otu_labels);
// };
// console.log("sample",sample_valuess)
// //     * Use `sample_values` as the values for the bar chart.
// let trace = {
//     x: sample_valuess,
//     y: otu_idss.map(id => `OTU ${id.otu_ids}`),
//     type: 'bar',
//     orientation: 'h',
//     text:otu_labelss

// };

// let data = [trace];
// Plotly.newPlot("sample-metadata", data);
