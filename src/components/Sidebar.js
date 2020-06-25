import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import AppContext from '../container/Store'

const useStyles = makeStyles(theme => ({
  side_div: {
    width: 350,
  },
}))

function Sidebar(props) {
  const context = useContext(AppContext)
  const { node, isOpen, setOpen } = context
  const classes = useStyles()

  return (
    <React.Fragment key={'right'}>
      <Drawer anchor={'right'} open={isOpen} onClose={() => setOpen(false)}>
        <div className={classes.side_div}>
          {node !== null ? <h4>{node.data.name.replace(/_/g, ' ')}</h4> : null}
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default Sidebar
