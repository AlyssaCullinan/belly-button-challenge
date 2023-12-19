// initialize variables
let data1;
let dropdown = d3.select("#selDataset");
let sampleNames;
let metaDataInfo;

// create a variable for the URL
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Fetch the JSON data and console log it
d3.json(url).then((data) => {
  data1 = data; 
  sampleNames = data1.names;
   
// create a for loop to add the sample data names to the dropdown list options
  for (let i = 0; i<sampleNames.length; i++){
  dropdown.append("option").text(sampleNames[i]).property("value",sampleNames[i])
  };

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

// create a function to capitalize the first letter of the keys
function capitalizeFirstLetter(k){
  return k.charAt(0).toUpperCase() + k.slice(1);
};

function chart(selectedSample){
  let selected = data1.samples.filter(object => object.id == selectedSample);
  let sample_values = selected[0].sample_values;
  let otu_ids = selected[0].otu_ids;
  let otu_labels = selected[0].otu_labels;
  let sortedOTUs = otu_ids.sort(function sortFunction(a,b){return b-a});
  let toptenOTUs = sortedOTUs.slice(0,10);
  let trace = {
    x: sample_values,
    y: toptenOTUs.map(id => `OTU ${id}`),
    type: 'bar',
    orientation: 'h',
    text:otu_labels
  };
  let trace2 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids
      }
      
    };
    
    let layout = {
      showlegend: false,
      height: 800,
      width: 800
    };
  let data3 = [trace];
  let data4 = [trace2];

  Plotly.newPlot("bar", data3);
  Plotly.newPlot("bubble", data4, layout);
  };

// On change to the DOM, call optionChanged() 
function optionChanged(){
  let s = dropdown.property("value")
  metaData(s); 
  chart(s)
};

