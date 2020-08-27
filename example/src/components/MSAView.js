import React, { useContext } from 'react'
import { MSAsvg } from 'phylo-react'
import AppContext from '../container/Store'

export default function MSAView(props) {
  const context = useContext(AppContext)
  const { treeConfig, seq } = context
  return treeConfig !== null ? <MSAsvg data={seq} heightoftree={treeConfig.treeheight} dataToShow={treeConfig.leafloc} /> : <div>Loading...</div>
}
