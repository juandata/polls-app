import React from 'react';
import * as d3 from "d3";

let prop;
import '../assets/css/d3.css'
export class Barchart extends React.Component {
  constructor(props){
    super(props);
    prop = this;
  }


  componentDidUpdate(prevProps, prevState, snapshot){
    console.log("updated", prevProps, prevState, snapshot);
        let ot = prop.props.data;
        let len = Object.keys(ot).length;
        let data = Object.entries(ot);
        Object.entries(ot).map(function(el, ind){
        })
        let data0 = [];
        data.map(function(el, ind){
          data0.push(el[1]);
        })
        let perc = 100 / data0.reduce(function(acc, val) { return acc + val; });
        if(perc === Infinity){
          /*data0= [];
          perc = 100 / len;
          data.map(function(el, ind){

            data0.push(1);
          })*/
          let circ = 150;
          let svg = d3.select("#pie-chart"),
              width = svg.attr("width"),
              height = svg.attr("height"),
              radius = Math.min(width, height) / 2;
          var circle = svg.append('g').attr('class', 'circle');
                          circle.append("circle")
                                .attr("cx", (circ + 100))
                                .attr("cy", circ)
                                .attr("r", circ)
                                .attr('fill','gray')
                                .attr('stroke','#008080')
                                .attr('class','ourmission')
                          circle.append('text')
                                .attr('x', (circ + 100))
                                .attr('y', circ)
                                .attr('text-anchor', 'middle')
                                .text('There are no votes yet');
        }
        else {
          var t = d3.transition()
          .duration(2000);
         let svg = d3.select("#pie-chart"),
             width = svg.attr("width"),
             height = svg.attr("height"),
             radius = Math.min(width, height) / 2,
             g = svg.append("g").attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
         let color = d3.scaleOrdinal(['red','green','blue','black','purple']);
         // Generate the pie
         let pie = d3.pie();
         // Generate the arcs
         let arc = d3.arc()
                     .innerRadius(0)
                     .outerRadius(radius);
                      //Generate groups
         let arcs = g.selectAll("arc")
                         .data(pie(data0))
                         .enter()
                         .append("g")
                         .attr("class", "arc");


             //Draw arc paths
             arcs.append("path")
            .attr("fill", function(d, i) {
                 return color(i);
               })
             .attr("d", arc)
             arcs.append("text")
             .attr("transform", function(d) {
                     return "translate(" + arc.centroid(d) + ")";
             })
             .text(function(d,i) {
                if(d.value == 0){ return ""} else {
               return  data[i][0] ;
             }
             });
             arcs.append("text")
             .attr("transform", function(d) {
                     return "translate(" + arc.centroid(d)[0] + "," + (arc.centroid(d)[1] + 10)   + ")";
             })
             .text(function(d,i) {
               if(d.value == 0){ return ""} else {
                 if(d.value > 1){return  d.value + " votes"; } else {return  d.value + " vote";}
             }
             });
             arcs.append("text")
             .attr("transform", function(d) {
                     return "translate(" + arc.centroid(d)[0] + "," + (arc.centroid(d)[1] + 20)   + ")";
             })
             .text(function(d,i) {
               if(d.value == 0){ return ""} else {
               return  (d.value * perc).toFixed(1) + " %" ;
                }
              });


      }
    }


  render(){
    return(
      <div>
      <svg width="500" height="300" id="pie-chart"> </svg>
      <div className='test'></div>
      <ul id = "list">
      </ul>
      <div className='chart'></div>
      <h1>datos aqui</h1>
      </div>
    )
  }
}
/*

//tutoriales
let data = [4, 8, 15, 16, 23, 42];
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
   let width = 420,
   barHeight = 20;

   let x = d3.scaleLinear()
       .domain([0, d3.max(data)])
       .range([0, width]);

   let chart = d3.select(".chart2")
       .attr("width", width)
       .attr("height", barHeight * data.length);

   let bar = chart.selectAll("g")
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
let dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

let svgWidth = 500, svgHeight = 300, barPadding = 5;
let barWidth = (svgWidth / dataset.length);


let svg = d3.select('svg')
.attr("width", svgWidth)
.attr("height", svgHeight);

let barChart = svg.selectAll("rect")
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
   let translate = [barWidth * i, 0];
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

/*
//console.log(data2);
let svgWidth = 500, svgHeight = 300, radius =  Math.min(svgWidth, svgHeight) / 2;
let svg = d3.select('.pie')
    .attr("width", svgWidth)
    .attr("height", svgHeight);

//Create group element to hold pie chart
let g = svg.append("g")
    .attr("transform", "translate(" + radius + "," + radius + ")") ;
let color = d3.scaleOrdinal(d3.schemeCategory10);
let pie = d3.pie().value(function(d) {
     return d.percentage;
});
let path = d3.arc()
    .outerRadius(radius)
    .innerRadius(0);
let arc = g.selectAll("arc")
    .data(pie(data))
    .enter()
    .append("g");
arc.append("path")
    .attr("d", path)
    .attr("fill", function(d) { return color(d.data.percentage); });
let label = d3.arc()
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
*/
