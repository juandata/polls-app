import React from 'react';
import * as d3 from "d3";


import '../assets/css/d3.css'
export class Barchart extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    function drawShapes(){
      var svgWidth = 600, svgHeight = 500;
      var svg = d3.select(".canvas")
        .attr("width", svgWidth)
        .attr("height", svgHeight)
        .attr("class", "svg-container")
      var line = svg.append("line")
        .attr("x1", 100)
        .attr("x2", 500)
        .attr("y1", 50)
        .attr("y2", 50)
        .attr("stroke", "red");
      var rect = svg.append("rect")
        .attr("x", 100)
        .attr("y", 100)
        .attr("width", 200)
        .attr("height", 100)
        .attr("fill", "#9B95FF");
      var circle = svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 300)
        .attr("r", 80)
        .attr("fill", "#7CE8D5");
      }
    //drawShapes();
    function drawPie(){
      // javascript
      var data = [
          {"platform": "Android", "percentage": 40.11},
          {"platform": "Windows", "percentage": 36.69},
          {"platform": "iOS", "percentage": 13.06}
      ];

      var svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;
      var svg = d3.select('.pie')
          .attr("width", svgWidth)
          .attr("height", svgHeight);

      //Create group element to hold pie chart
      var g = svg.append("g")
          .attr("transform", "translate(" + radius + "," + radius + ")") ;
      var color = d3.scaleOrdinal(d3.schemeCategory10);
      var pie = d3.pie().value(function(d) {
           return d.percentage;
      });
      var path = d3.arc()
          .outerRadius(radius)
          .innerRadius(0);
      var arc = g.selectAll("arc")
          .data(pie(data))
          .enter()
          .append("g");
      arc.append("path")
          .attr("d", path)
          .attr("fill", function(d) { return color(d.data.percentage); });
      var label = d3.arc()
          .outerRadius(radius)
          .innerRadius(0);
      arc.append("text")
          .attr("transform", function(d) {
              return "translate(" + label.centroid(d) + ")";
          })
          .attr("text-anchor", "middle")
          .text(function(d) { return d.data.platform+":"+d.data.percentage+"%"; });
    }
    drawPie();
  }

  render(){

    return(
      <div>
      <svg className="pie"></svg>
      <svg className="canvas"></svg>
      <h1>{this.props.data}</h1>
      </div>
    )
  }
}
/*

//tutoriales
var data = [4, 8, 15, 16, 23, 42];
d3.select(".chart")
  .selectAll("div")
  .data(data)
    .enter()
    .append("div")
    .style("width", function(d) { return d + "%"; })
    .style("background-color", function(d){ return "green"})
    .style("border", function(d){ return "solid 1px"})
    .text(function(d) { return d; });

    //second implementation with svg
   var width = 420,
   barHeight = 20;

   var x = d3.scaleLinear()
       .domain([0, d3.max(data)])
       .range([0, width]);

   var chart = d3.select(".chart2")
       .attr("width", width)
       .attr("height", barHeight * data.length);

   var bar = chart.selectAll("g")
       .data(data)
     .enter().append("g")
       .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });

   bar.append("rect")
       .attr("width", x)
       .attr("height", barHeight - 1);

   bar.append("text")
       .attr("x", function(d) { return x(d) - 3; })
       .attr("y", barHeight / 2)
       .attr("dy", ".35em")
       .text(function(d) { return d; });
function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

//tutorial video
// javascript
var dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

var svgWidth = 500, svgHeight = 300, barPadding = 5;
var barWidth = (svgWidth / dataset.length);


var svg = d3.select('svg')
.attr("width", svgWidth)
.attr("height", svgHeight);

var barChart = svg.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("y", function(d) {
    return svgHeight - d
})
.attr("height", function(d) {
   return d;
})
.attr("width", barWidth - barPadding)
.attr("transform", function (d, i) {
   var translate = [barWidth * i, 0];
   return "translate("+ translate +")";
});
<svg></svg>
<div className="chart"></div>
<svg className="chart" width="420" height="120">
  <g transform="translate(0,0)">
    <rect width="40" height="19"></rect>
    <text x="37" y="9.5" dy=".35em">4</text>
  </g>
  <g transform="translate(0,20)">
    <rect width="80" height="19"></rect>
    <text x="77" y="9.5" dy=".35em">8</text>
  </g>
  <g transform="translate(0,40)">
    <rect width="150" height="19"></rect>
    <text x="147" y="9.5" dy=".35em">15</text>
  </g>
  <g transform="translate(0,60)">
    <rect width="160" height="19"></rect>
    <text x="157" y="9.5" dy=".35em">16</text>
  </g>
  <g transform="translate(0,80)">
    <rect width="230" height="19"></rect>
    <text x="227" y="9.5" dy=".35em">23</text>
  </g>
  <g transform="translate(0,100)">
    <rect width="420" height="19"></rect>
    <text x="417" y="9.5" dy=".35em">42</text>
  </g>
</svg>
<svg className="chart2"></svg>
*/
