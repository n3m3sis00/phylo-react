import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import AppContext from '../container/Store'

// const lilac = "#C8A2C8"  // nonstandard
// const colorScheme = {
//   clustal: { G: "orange", P: "orange", S: "orange", T: "orange", H: "red", K: "red", R: "red", F: "blue", W: "blue", Y: "blue", I: "green", L: "green", M: "green", V: "green" },
//   lesk: { G: "orange", A: "orange", S: "orange", T: "orange", C: "green", V: "green", I: "green", L: "green", P: "green", F: "green", Y: "green", M: "green", W: "green", N: "magenta", Q: "magenta", H: "magenta", D: "red", E: "red", K: "blue", R: "blue" },
//   maeditor: { A: "lightgreen", G: "lightgreen", C: "green", D: "darkgreen", E: "darkgreen", N: "darkgreen", Q: "darkgreen", I: "blue", L: "blue", M: "blue", V: "blue", F: lilac, W: lilac, Y: lilac, H: "darkblue", K: "orange", R: "orange", P: "pink", S: "red", T: "red" },
//   cinema: { H: "blue", K: "blue", R: "blue", D: "red", E: "red", S: "green", T: "green", N: "green", Q: "green", A: "white", V: "white", L: "white", I: "white", M: "white", F: "magenta", W: "magenta", Y: "magenta", P: "brown", G: "brown", C: "yellow", B: "gray", Z: "gray", X: "gray", "-": "gray", ".": "gray" }
// }
// const defaultColorScheme = "maeditor"

export default function MetaData(props) {
  const context = useContext(AppContext)
  const { childLoc, seq, heigtoftree } = context

  useEffect(() => {
    d3.selectAll('#metadata > *').remove()
    var width = 10000 //100 is the width of meta data
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
