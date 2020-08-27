import React, { useContext, useState, useEffect } from 'react'
import {Tree} from 'phylo-react'

import AppContext from '../container/Store'

export default function TreeView(props) {
  const context = useContext(AppContext)
  const { treeData, setTreeConfig, showbranchlength } = context
  const [treeResponse, setTreeResponse] = useState(null)
  useEffect(() => {
    setTreeConfig(treeResponse)
  }, [treeResponse, setTreeConfig])
  return (
      <Tree data={treeData} getConfig = {treeResponse === null ? setTreeResponse : d => { }} showBranchLength={showbranchlength} /> //
  )
}
