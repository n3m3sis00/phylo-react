import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Tree from '../components/Tree'
import Sidebar from '../components/Sidebar'
import Data from '../components/Data'
import MetaData from '../components/MetaData'
import TreeToolbar from '../components/TreeToolbar'
import { AppProvider } from './Store'
const Stockholm = require('stockholm-js')

const useStyles = makeStyles(therme => ({
  tree_div: {
    display: 'flex',
    flexDirection: 'row',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    width: 'calc(100vw - 32px)',
  },
}))

function ViewerScreen(props) {
  const classes = useStyles()
  useEffect(() => {
    ;(async () => {
      const result = await fetch('Lysine.stock')
      const text = await result.text()

      if (Stockholm.sniff(text)) {
        let align = Stockholm.parse(text)
        const rows = align.rows(),
          columns = align.columns(),
          names = align.seqname // the order of alignment rows is well-defined

        if (rows) {
          const newRow = align.seqdata[names[0]].replace(/./g, 'N')
          align.addRow('NewRow', newRow)
          align.deleteRow('AE017267.1/95018-94836')
        }

        console.warn('Tree is ' + align.gf.NH.join(''))
        console.warn('Consensus structure is ' + align.gc.SS_cons)

        const seq = 'M93419.1/332-511'
        console.warn('Structure of ' + seq + ' is ' + align.gr.SS[seq])
        console.warn('First column of ' + seq + ' is ' + align.seqdata[seq][0])

        console.log(align.toString())
        console.log(align.toFasta())
      } else {
        console.error("Doesn't look like Stockholm format")
      }

      const align2 = Stockholm.fromSeqIndex({
        row1: 'AAAA',
        row2: 'GGGG',
        row3: 'AGAG',
      })
      console.log(align2.toString())

      const align3 = Stockholm.fromRowList([
        ['ancestor', 'AAAA'],
        ['descendant', 'AAGA'],
      ])
      console.log(align3.toFasta())
    })()
  }, [])
  return (
    <AppProvider>
      <Grid container spacing={2}>
        <TreeToolbar />
        <Grid key={1} item>
          <div className={classes.tree_div}>
            <Box width="50%">
              <Tree />
            </Box>
            <Box width="50%" style={{ 'overflow-x': 'scroll' }}>
              <MetaData />
            </Box>
          </div>
        </Grid>
      </Grid>
      <Sidebar />
      <Data />
    </AppProvider>
  )
}

export default ViewerScreen
