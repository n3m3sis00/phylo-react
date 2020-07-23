import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'

import Tree from '../components/Tree'
import Sidebar from '../components/Sidebar'
import Data from '../components/Data'
// import MetaData from '../components/MetaData'
import TreeToolbar from '../components/TreeToolbar'
import { AppProvider } from './Store'
import ColoredMSA from '../components/ColoredMSA'

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

  return (
    <AppProvider>
      <Grid container spacing={2}>
        <TreeToolbar />
        <Grid key={1} item>
          <div className={classes.tree_div}>
            <Box width="50%">
              <Tree />
            </Box>
            <Box width="50%" style={{ overflowX: 'scroll' }}>
              <ColoredMSA />
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
