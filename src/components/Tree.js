import React, { useContext, useEffect } from 'react'
import * as d3 from 'd3'
import { parseNewick } from './Utils'

import AppContext from '../container/Store'

export function CountLeafNodes(tree) {
  if (tree.branchset) {
    return tree.branchset
      .map(child => {
        return CountLeafNodes(child)
      })
      .reduce((a, b) => a + b)
  } else return 1
}

export default function Tree(props) {
  const context = useContext(AppContext)
  const { treeData, setOpen, setNode } = context

  useEffect(() => {
    console.log('parsing data')
    var data = parseNewick(treeData)
    var leafNodes = CountLeafNodes(data)

    const cluster = d3.cluster().size([leafNodes * 20, 500])

    const root = d3.hierarchy(data, d => d.branchset)

    cluster(root)
    setRadius(root, (root.data.length = 0), (1800 / leafNodes) * 20)

    d3.selectAll('#tree > *').remove()
    d3.select('#show-length input').on('change', changed)

    const svg = d3
      .select('#tree')
      .attr('viewBox', [-10, -10, 1000, leafNodes * 20 + 10])
      .attr('font-family', 'sans-serif')
      .attr('font-size', 10)

    svg.append('style').text(`
            .link--active {
                stroke: #000 !important;
                stroke-width: 1.5px;
            }
            .label--active {
                font-weight: bold;
            }
            `)

    var link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', linkConstant)

    var linkExtension = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', '0.2')
      .selectAll('path')
      .data(
        root.links().filter(function (d) {
          return !d.target.children
        }),
      )
      .enter()
      .append('path')
      .each(function (d) {
        d.target.linkExtensionNode = this
      })
      .attr('d', linkExtensionConstant)

    var circle = svg
      .append('g')
      .selectAll('circle')
      .data(root.descendants())
      .join('circle')
      .attr('cx', d => d.y)
      .attr('cy', d => d.x)
      .attr('fill', d => (d.children ? '#555' : '#999'))
      .attr('r', 3)

    svg
      .append('g')
      .selectAll('text')
      .data(root.leaves())
      .join('text')
      .attr('x', d => d.y + 5)
      .attr('y', d => d.x + 4)
      .text(d => d.data.name.replace(/_/g, ' '))
      .on('mouseover', mouseovered(true))
      .on('mouseout', mouseovered(false))
      .on('click', d => {
        setOpen(true)
        setNode(d)
      })

    function linkVariable(d) {
      // console.log(d)
      return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius)
    }

    function linkConstant(d) {
      return linkStep(d.source.x, d.source.y, d.target.x, d.target.y)
    }
    function linkExtensionVariable(d) {
      return linkStep(d.target.x, d.target.radius, d.target.x, d.target.y)
    }

    function linkExtensionConstant(d) {
      return linkStep(d.target.x, d.target.y, d.target.x, d.target.y)
    }

    function linkStep(sx, sy, tx, ty) {
      return 'M' + sy + ' ' + sx + 'V' + tx + 'H' + ty
    }

    function setRadius(d, y0, k) {
      d.radius = (y0 += d.data.length) * k
      if (d.children)
        d.children.forEach(function (d) {
          setRadius(d, y0, k)
        })
    }

    function mouseovered(active) {
      return function (d) {
        d3.select(this).classed('label--active', active)
      }
    }

    function changed() {
      var t = d3.transition().duration(750)
      linkExtension
        .transition(t)
        .attr('d', this.checked ? linkExtensionVariable : linkExtensionConstant)
      circle.transition(t).style('opacity', this.checked ? 0 : 1)
      link.transition(t).attr('d', this.checked ? linkVariable : linkConstant)
    }
  }, [setNode, setOpen, treeData])

  return (
    <div>
      <label id="show-length">
        <input type="checkbox" /> Show branch length
      </label>
      <svg id="tree"> </svg>
    </div>
  )
}
