import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import parseNewick from '../newick'

export function CountLeafNodes(tree) {
  if (tree.branchset) {
    return tree.branchset
      .map(child => {
        return CountLeafNodes(child)
      })
      .reduce((a, b) => a + b)
  } else {
    return 1
  }
}

function maxLength(d) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0)
}

function setBrLength(d, y0, k) {
  d.radius = (y0 += d.data.length) * k
  if (d.children) {
    d.children.forEach(function (d) {
      setBrLength(d, y0, k)
    })
  }
}

function prepareConfig(root, treeheight, storechFn) {
  const data = {}

  const leafdata = []
  root.leaves().forEach(d => {
    const child_data = {}
    child_data.name = d.data.name
    child_data.x = d.x
    child_data.y = d.y
    leafdata.push(child_data)
  })
  data['leafloc'] = leafdata
  data['treeheight'] = treeheight

  storechFn(data)
}

export default function Tree(props) {
  const { data, clickName, getConfig, ChangebranchLengthID } = props
  console.log(ChangebranchLengthID)

  useEffect(() => {
    const data_ = parseNewick(data)
    const leafNodes = CountLeafNodes(data_)
    const width = window.innerWidth / 2 - 240
    const cluster = d3
      .cluster()
      .size([leafNodes * 20, width])
      .separation((a, b) => 1)

    const root = d3
      .hierarchy(data_, d => d.branchset)
      .sum(d => (d.branchset ? 0 : 1))
      .sort(
        (a, b) =>
          a.value - b.value || d3.ascending(a.data.length, b.data.length),
      )

    cluster(root)
    setBrLength(root, (root.data.length = 0), width / maxLength(root))

    d3.selectAll('#tree > *').remove()
    d3.select(`#${ChangebranchLengthID}`).on('change', changed)

    const svg = d3
      .select('#tree')
      .attr('width', width + 210) //210 is the legth of biggest name --> needs to be genrallized
      .attr('height', leafNodes * 20)
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

    const link = svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', linkConstant)

    const linkExtension = svg
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

    const circle = svg
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
        clickName(d)
      })

    function linkVariable(d) {
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
      return `M${sy} ${sx}V${tx}H${ty}`
    }

    function mouseovered(active) {
      return function (d) {
        d3.select(this).classed('label--active', active)
      }
    }

    function changed() {
      const t = d3.transition().duration(750)
      linkExtension
        .transition(t)
        .attr('d', this.checked ? linkExtensionVariable : linkExtensionConstant)
      circle.transition(t).style('opacity', this.checked ? 0 : 1)
      link.transition(t).attr('d', this.checked ? linkVariable : linkConstant)
    }

    prepareConfig(root, leafNodes * 20, getConfig)
  }, [data, clickName, getConfig, ChangebranchLengthID])

  return (
    <div style={{ marginLeft: 20 }}>
      <svg id="tree"> </svg>
    </div>
  )
}

Tree.propTypes = {
  data: PropTypes.string,
  clickName: PropTypes.func,
  getChildLoc: PropTypes.func,
  ChangebranchLengthID: PropTypes.string,
}

Tree.defaultProps = {
  data: '',
  clickName: null,
  getChildLoc: null,
  ChangebranchLengthID: 'notpossible',
}
