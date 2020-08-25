import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { parseMSASeq, colorScheme } from './Utils'

export function calcWidth(stri) {
  return stri.length * 16 + 10
}

export default function MSAsvg(props) {
  const { dataToShow, data, heightoftree, bgColor } = props

  useEffect(() => {
    const seqMap = parseMSASeq(data)
    d3.selectAll('#metadata > *').remove()
    const svg = d3
      .select('#metadata')
      .attr('width', 1000) //childLoc.length > 0 ? calcWidth(seq.get(childLoc[0].name)) : 0
      .attr('height', heightoftree) //leafNode from tree.js
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    let strix = seqMap.get(dataToShow[0].name) ? seqMap.get(dataToShow[0].name) : ''
    if (strix < 10000) {
      dataToShow.forEach(d => {
        const stri = seqMap.get(d.name) ? seqMap.get(d.name) : ''
        const x = d.x
        svg
          .append('text')
          .style('font-family', 'monospace')
          .attr('x', 10)
          .attr('y', x + 4)
          .text(stri)
      })
    } else {
      dataToShow.forEach(d => {
        const stri = seqMap.get(d.name) ? seqMap.get(d.name) : ''
        const x = d.x
        for (let i = 0; i < stri.length; i++) {
          if (bgColor) {
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
    }
  }, [dataToShow, heightoftree, bgColor, data])

  return <svg id="metadata"></svg>
}

MSAsvg.propTypes = {
  data: PropTypes.string,
  dataToShow: PropTypes.array,
  heightoftree: PropTypes.number,
  bgColor: PropTypes.bool,
}

MSAsvg.defaultProps = {
  data: '',
  dataToShow: null,
  heightoftree: null,
  bgColor: false,
}
