import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import AppContext from '../container/Store'

export default function MetaData(props) {
  const context = useContext(AppContext)
  const { childLoc, seq, heigtoftree } = context

  useEffect(() => {
    d3.selectAll('#metadata > *').remove()
    var width = 1000 //100 is the width of meta data
    const svg = d3
      .select('#metadata')
      .attr('width', width)
      .attr('height', heigtoftree) //leafNode from tree.js
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    svg
      .append('g')
      .selectAll('text')
      .data(childLoc)
      .join('text')
      .style('font-family', 'monospace')
      .attr('x', d => 10)
      .attr('y', d => d.x + 4)
      .text(d => (seq !== '' ? seq.get(d.name) : ''))
  }, [childLoc, heigtoftree, seq])

  return <svg id="metadata"></svg>
}
