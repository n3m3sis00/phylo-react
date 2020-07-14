import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'

import AppContext from '../container/Store'

const lilac = '#C8A2C8' // nonstandard
const colorScheme = {
  clustal: {
    G: 'orange',
    P: 'orange',
    S: 'orange',
    T: 'orange',
    H: 'red',
    K: 'red',
    R: 'red',
    F: 'blue',
    W: 'blue',
    Y: 'blue',
    I: 'green',
    L: 'green',
    M: 'green',
    V: 'green',
  },
  lesk: {
    G: 'orange',
    A: 'orange',
    S: 'orange',
    T: 'orange',
    C: 'green',
    V: 'green',
    I: 'green',
    L: 'green',
    P: 'green',
    F: 'green',
    Y: 'green',
    M: 'green',
    W: 'green',
    N: 'magenta',
    Q: 'magenta',
    H: 'magenta',
    D: 'red',
    E: 'red',
    K: 'blue',
    R: 'blue',
  },
  maeditor: {
    A: 'lightgreen',
    G: 'lightgreen',
    C: 'green',
    D: 'darkgreen',
    E: 'darkgreen',
    N: 'darkgreen',
    Q: 'darkgreen',
    I: 'blue',
    L: 'blue',
    M: 'blue',
    V: 'blue',
    F: lilac,
    W: lilac,
    Y: lilac,
    H: 'darkblue',
    K: 'orange',
    R: 'orange',
    P: 'pink',
    S: 'red',
    T: 'red',
  },
  cinema: {
    H: 'blue',
    K: 'blue',
    R: 'blue',
    D: 'red',
    E: 'red',
    S: 'green',
    T: 'green',
    N: 'green',
    Q: 'green',
    A: 'white',
    V: 'white',
    L: 'white',
    I: 'white',
    M: 'white',
    F: 'magenta',
    W: 'magenta',
    Y: 'magenta',
    P: 'brown',
    G: 'brown',
    C: 'yellow',
    B: 'gray',
    Z: 'gray',
    X: 'gray',
    '-': 'white',
    '.': 'white',
  },
}

export function calcWidth(stri) {
  return stri.length * 16 + 10
}

export default function ColoredMSA(props) {
  const context = useContext(AppContext)
  const { childLoc, seq, heigtoftree, drawBB } = context

  useEffect(() => {
    d3.selectAll('#metadata > *').remove()
    const svg = d3
      .select('#metadata')
      .attr('width', 10000) //childLoc.length > 0 ? calcWidth(seq.get(childLoc[0].name)) : 0
      .attr('height', heigtoftree) //leafNode from tree.js
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    childLoc.forEach(d => {
      var x = d.x
      let stri = seq.get(d.name) ? seq.get(d.name) : ''
      for (var i = 0; i < stri.length; i++) {
        if (drawBB) {
          svg
            .append('rect')
            .attr('x', 10 + i * 16)
            .attr('y', x - 10)
            .attr('width', 16)
            .attr('height', 20)
            .style('fill', colorScheme.maeditor[stri[i]])

          svg
            .append('text')
            .style('font-family', 'monospace')
            .attr('x', 10 + i * 16 + 8 - 3)
            .attr('y', x + 4)
            .style('fill', 'white')
            .text(stri[i])
        } else {
          svg
            .append('text')
            .style('font-family', 'monospace')
            .attr('x', 10 + i * 16 + 8 - 3)
            .attr('y', x + 4)
            .style('fill', colorScheme.maeditor[stri[i]])
            .text(stri[i])
        }
      }
    })
  }, [childLoc, heigtoftree, seq, drawBB])

  return <svg id="metadata"></svg>
}
