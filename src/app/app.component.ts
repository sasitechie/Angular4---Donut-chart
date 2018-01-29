import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  dataset =[];
  text ='';
  //private d3: D3;
constructor(){
this. dataset = [
	{ name: 'IE', percent: 39.10 },
	{ name: 'Chrome', percent: 32.51 },
	{ name: 'Safari', percent: 13.68 },
	{ name: 'Firefox', percent: 8.71 },
	{ name: 'Others', percent: 6.01 }
];
}
  ngOnInit(){

let  width = 500,
 height = 360,
 radius = Math.min(width, height) / 2,
 donutWidth = 75,       
color =  d3.scaleOrdinal(d3.schemeCategory20c);

let svg = d3.select('#chart')
.append('svg')
.attr('width', width)
.attr('height', height);

let g = svg.append('g')
.attr('transform', 'translate(' + (width / 2) +
  ',' + (height / 2) + ')');

  let arc = d3.arc()
  .innerRadius(radius - donutWidth)             // UPDATED
  .outerRadius(radius);
  
  let pie = d3.pie()
  .value(function(d) { return d.percent; })
  .sort(null);

  
 let  polyline = g.selectAll('polyline')
                .data(pie(this.dataset))
              .enter().append('polyline')
                .attr('points',  function(d) {
                  let pos = arc.centroid(d);
                  let xAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
    pos[0] = radius * 0.95 * (xAngle < Math.PI ? 1 : -1);
    return [arc.centroid(d), arc.centroid(d), pos]

    

                });

               
  
  var path = g.selectAll('path')
.data(pie(this.dataset))
.enter()
.append("g")
.attr('fill', function(d, i) {
  return color(i)
})
.on("mouseover", function(d) {
      let g = d3.select(this)
        .style("cursor", "pointer")
        .style("fill",color(this._current))
        .append("g")
        .attr("class", "text-group");
 
      g.append("text")
        .attr("class", "name-text")
        .text(`${d.data.name}`)
        .attr('text-anchor', 'end')
        .attr('dx', '250')
        .attr('dy', '15')
        .attr("fill", "red");
  
      g.append("text")
       .attr("class", "value-text")
        .text(`${d.data.percent}`+'%')
        .attr('text-anchor', 'end')
        .attr('dx', '250')
        .attr('dy', '45')
        .attr("fill", "red");
    })
  .on("mouseout", function(d) {
      d3.select(this)
        .style("cursor", "none")  
        .style("fill", color(this._current))
        .select(".text-group").remove();
    })

  .append('path')
  .attr('d', arc)
  
  .on("mouseover", function(d) {
    d3.select(this)     
      .style("cursor", "pointer")
     .style("fill", color(this._current));
  })
.on("mouseout", function(d) {
    d3.select(this)
      .style("cursor", "none")  
      .style("fill", color(this._current));
  })
.each(function(d, i) { this._current = i; });




  }
}
