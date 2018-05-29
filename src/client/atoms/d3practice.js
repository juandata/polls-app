import React from 'react';
import * as d3 from "d3";

export class Barchart extends React.Component {
  constructor(props){
    super(props);
  }
  componentDidMount(){
    var data = [30, 86, 168, 281, 303, 365];
    d3.select(".chart")
      .selectAll("div")
      .data(data)
        .enter()
        .append("div")
        .style("width", function(d) { return d + "px"; })
        .style("background-color", function(d){ return "green"})
        .text(function(d) { return d; });
  }
  render(){

    return(
      <div className="chart"></div>
    )
  }
}
