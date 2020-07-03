import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import AppContext from '../container/Store'

export default function MetaData(props) {
  const context = useContext(AppContext)
  const { childLoc, heigtoftree } = context

  useEffect(() => {
    d3.selectAll('#metadata > *').remove()
    var width = 10000 //10000 is the width of meta data
    const svg = d3
      .select('#metadata')
      .attr('width', width)
      .attr('height', heigtoftree) //leafNode from tree.js
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    svg
      .append('g')
      .selectAll('circle')
      .data(childLoc)
      .join('circle')
      .attr('cx', d => 10)
      .attr('cy', d => d.x)
      .attr('fill', d => '#ff0000')
      .attr('r', 3)

    svg
      .append('g')
      .selectAll('circle')
      .data(childLoc)
      .join('circle')
      .attr('cx', d => 100)
      .attr('cy', d => d.x)
      .attr('fill', d => '#0000ff')
      .attr('r', 3)

    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#00ff00')
      .selectAll('path')
      .data(childLoc)
      .join('path')
      .attr('d', d => 'M' + 10 + ' ' + d.x + 'H' + 10000)
  }, [childLoc, heigtoftree])

  return <svg id="metadata"></svg>
}
