import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

const tempColor = ['red', 'green', 'yellow', 'blue', 'black']

export function MicroSynteny(props) {
  const { data, heigtoftree } = props
  const ref = useRef()

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', 1000)
      .attr('height', heigtoftree)
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    data.forEach(d => {
      var x = d.x
      d.child.forEach(ch => {
        if (ch.dir === 1) {
          svg
            .append('path')
            .attr('fill', tempColor[ch.code])
            .attr(
              'd',
              'M' +
                ch.start +
                ' ' +
                d.x +
                ' L' +
                (ch.start + 10) +
                ' ' +
                (d.x - 10) +
                ' H' +
                ch.end +
                ' V' +
                (d.x + 10) +
                ' H' +
                (ch.start + 10) +
                ' Z',
            )
        } else {
          svg
            .append('path')
            .attr('fill', tempColor[ch.code])
            .attr(
              'd',
              'M' +
                ch.end +
                ' ' +
                d.x +
                ' L' +
                (ch.end - 10) +
                ' ' +
                (d.x - 10) +
                ' H' +
                ch.start +
                ' V' +
                (d.x + 10) +
                ' H' +
                (ch.end - 10) +
                ' Z',
            )
        }
      })
    })
  }, [])

  return <svg ref={ref}> </svg>
}

MicroSynteny.propTypes = {
  data: PropTypes.string,
  heigtoftree: PropTypes.number,
}

MicroSynteny.defaultProps = {
  data: '',
  heigtoftree: 0,
}
