import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import { colorScheme, parseFastaSeq } from './Utils'

export function calcWidth(stri) {
  return stri.length * 16 + 10
}

export default function MSA(props) {
  const { dataToShow, data, heightoftree, bgColor } = props

  useEffect(() => {
    const seqMap = parseFastaSeq(data)
    d3.selectAll('#metadata > *').remove()
    const svg = d3
      .select('#metadata')
      .attr('width', 1000) //childLoc.length > 0 ? calcWidth(seq.get(childLoc[0].name)) : 0
      .attr('height', heightoftree) //leafNode from tree.js
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    dataToShow.forEach(d => {
      const x = d.x
      const stri = seqMap.get(d.name) ? seqMap.get(d.name) : ''
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
  }, [dataToShow, heightoftree, data, bgColor])

  return <svg id="metadata"></svg>
}

MSA.propTypes = {
  data: PropTypes.string,
  dataToShow: PropTypes.array,
  heightoftree: PropTypes.number,
  bgColor: PropTypes.bool,
}

MSA.defaultProps = {
  data: '',
  dataToShow: null,
  heightoftree: null,
  bgColor: false,
}
