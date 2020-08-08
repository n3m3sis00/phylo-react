import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import parseNewick from './newick'

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
  d.radius = (y0 += Math.max(d.data.length, 0)) * k
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
    leafdata.push({ name: d.data.name, x: d.x, y: d.y })
  })
  data['leafloc'] = leafdata
  data['treeheight'] = treeheight

  storechFn(data)
}

export default function Tree(props) {
  const {
    data,
    clickName = () => {},
    getConfig = () => {},
    showBranchLength,
  } = props
  const ref = useRef()

  const tree = parseNewick(data)
  const width = window.innerWidth / 2 - 240
  const leafNodes = CountLeafNodes(tree)
  useEffect(() => {
    const cluster = d3
      .cluster()
      .size([leafNodes * 20, width])
      .separation((a, b) => 1)

    const root = d3
      .hierarchy(tree, d => d.branchset)
      .sum(d => (d.branchset ? 0 : 1))
      .sort(
        (a, b) =>
          a.value - b.value || d3.ascending(a.data.length, b.data.length),
      )

    cluster(root)
    setBrLength(root, (root.data.length = 0), width / maxLength(root))
    ref.current.innerHTML = ''
    const svg = d3.select(ref.current)
    svg
      .append('g')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .selectAll('path')
      .data(root.links())
      .join('path')
      .attr('d', showBranchLength ? linkVariable : linkConstant)

    svg
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
      .attr(
        'd',
        showBranchLength ? linkExtensionVariable : linkExtensionConstant,
      )
    svg
      .append('g')
      .selectAll('text')
      .data(root.leaves())
      .join('text')
      .attr('x', d => d.y + 5)
      .attr('y', d => d.x + 4)
      .text(d => (d.data.name || '').replace(/_/g, ' '))
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
      console.log({ sx, sy, tx, ty })
      return `M${sy} ${sx}V${tx}H${ty}`
    }

    function mouseovered(active) {
      return function (d) {
        d3.select(this).classed('label--active', active)
      }
    }
    prepareConfig(root, leafNodes * 20, getConfig)
  }, [data, clickName, getConfig, showBranchLength, width, leafNodes, tree])

  return (
    <svg width={width + 210} height={leafNodes * 20}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .link--active {
                stroke: #000 !important;
                stroke-width: 1.5px;
            }
            .label--active {
                font-weight: bold;
            }`,
        }}
      />
      <g ref={ref}></g>
    </svg>
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
