import React from 'react'
import * as d3 from "d3";
import {parseNewick} from './Utils'
import {treeData} from './life.js'

import AppContext from '../container/Store'


export default class Tree extends React.Component {
    static contextType = AppContext

    constructor(props){
        super(props);
        this.state = {

        }
    }

    async componentDidMount(){
        
        const {setOpen, setNode} = this.context

        var data = await parseNewick(treeData)
        
        const cluster = d3.cluster()
            .size([1800, 500])
            .separation((a, b) => 1)
        
        const color = d3.scaleOrdinal()
            .domain(["Bacteria", "Eukaryota", "Archaea"])
            .range(d3.schemeCategory10)

        function setColor(d) {
            var name = d.data.name;
            d.color = color.domain().indexOf(name) >= 0 ? color(name) : d.parent ? d.parent.color : null;
            if (d.children) d.children.forEach(setColor);
        }

    var makeChart = () => {
        const root = d3.hierarchy(data, d => d.branchset)
            .sum(d => d.branchset ? 0 : 1)
            .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length));
    
        cluster(root);
        setColor(root);
    
        const svg = d3.select("svg")
            .attr("viewBox", [0, 0, 954, 1800])
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .call(d3.zoom().on("zoom", function () {
                    svg.attr("transform", d3.event.transform)
            }));
                
    
        svg.append("style").text(`
            .link--active {
                stroke: #000 !important;
                stroke-width: 1.5px;
            }
            .link-extension--active {
                stroke-opacity: .6;
            }
            .label--active {
                font-weight: bold;
            }
            `);
    
    
        svg.append("g")
            .attr("fill", "none")
            .attr("stroke", "#000")
            .selectAll("path")
            .data(root.links())
            .join("path")
            .each(function(d) { d.target.linkNode = this; })
            .attr("d", d3.linkHorizontal()
                    .x(d => d.y)
                    .y(d => d.x))
            .attr("stroke", d => d.target.color);
    
        svg.append("g")
          .selectAll("text")
          .data(root.leaves())
          .join("text")
            .attr("x", d => d.y + 5)
            .attr("y", d => d.x + 4)
            .text(d => d.data.name.replace(/_/g, " "))
            .on("mouseover", mouseovered(true))
            .on("mouseout", mouseovered(false))
            .on("click", d=>{setOpen(true); setNode(d)});
    
        function mouseovered(active) {
          return function(d) {
            d3.select(this).classed("label--active", active);
            d3.select(d.linkExtensionNode).classed("link-extension--active", active).raise();
            do d3.select(d.linkNode).classed("link--active", active).raise();
            while (d = d.parent);
          };
        }
      }
      makeChart();
    }



    render(){   

        return <div>
                    <svg> </svg>
               </div>
    }
}