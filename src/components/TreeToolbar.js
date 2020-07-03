import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import StorageIcon from '@material-ui/icons/Storage'

import AppContext from '../container/Store'

export default function TreeToolbar() {
  const { setOpenData } = useContext(AppContext)

  return (
    <AppBar position="static">
      <Toolbar variant="dense" color="inherit">
        <Button onClick={() => setOpenData(true)}>
          <StorageIcon />
        </Button>
        <label id="show-length">
          <input type="checkbox" /> Show branch length
        </label>
      </Toolbar>
    </AppBar>
  )
}
