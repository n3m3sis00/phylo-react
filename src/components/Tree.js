import React, { useContext, useEffect } from "react";
import * as d3 from "d3";
import { parseNewick } from "./Utils";

import AppContext from "../container/Store";

export function CountLeafNodes(tree) {
  if (tree.branchset) {
    return tree.branchset
      .map((child) => {
        return CountLeafNodes(child);
      })
      .reduce((a, b) => a + b);
  } else return 1;
}

export default function Tree(props) {
  const context = useContext(AppContext);
  const { treeData, setOpen, setNode } = context;

  useEffect(() => {
    console.log("parsing data");
    var data = parseNewick(treeData);
    var leafNodes = CountLeafNodes(data);

    const cluster = d3.cluster().size([leafNodes * 20, 500]);

    const root = d3.hierarchy(data, (d) => d.branchset);

    cluster(root);

    d3.selectAll("#tree > *").remove();

    const svg = d3
      .select("#tree")
      .attr("viewBox", [-10, -10, 1000, leafNodes * 20 + 10])
      .attr("font-family", "sans-serif")
      .attr("font-size", 10);

    svg.append("style").text(`
            .link--active {
                stroke: #000 !important;
                stroke-width: 1.5px;
            }
            .label--active {
                font-weight: bold;
            }
            `);

    svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke", "#000")
      .selectAll("path")
      .data(root.links())
      .join("path")
      .attr(
        "d",
        (d) =>
          "M" +
          d.source.y +
          " " +
          d.source.x +
          "V" +
          d.target.x +
          "H" +
          d.target.y
      );

    svg
      .append("g")
      .selectAll("circle")
      .data(root.descendants())
      .join("circle")
      .attr("cx", (d) => d.y)
      .attr("cy", (d) => d.x)
      .attr("fill", (d) => (d.children ? "#555" : "#999"))
      .attr("r", 3);

    svg
      .append("g")
      .selectAll("text")
      .data(root.leaves())
      .join("text")
      .attr("x", (d) => d.y + 5)
      .attr("y", (d) => d.x + 4)
      .text((d) => d.data.name.replace(/_/g, " "))
      .on("mouseover", mouseovered(true))
      .on("mouseout", mouseovered(false))
      .on("click", (d) => {
        setOpen(true);
        setNode(d);
      });

    function mouseovered(active) {
      return function (d) {
        d3.select(this).classed("label--active", active);
      };
    }
  }, [setNode, setOpen, treeData]);

  return (
    <div>
      <svg id="tree"> </svg>
    </div>
  );
}
