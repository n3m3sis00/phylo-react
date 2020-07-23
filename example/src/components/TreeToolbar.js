import React, { useContext } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import StorageIcon from '@material-ui/icons/Storage'
import Switch from '@material-ui/core/Switch'

import AppContext from '../container/Store'

export default function TreeToolbar() {
  const { setOpenData, setdrawBB, drawBB } = useContext(AppContext)

  return (
    <AppBar position="static">
      <Toolbar variant="dense" color="inherit">
        <Button onClick={() => setOpenData(true)}>
          <StorageIcon />
        </Button>
        <label id="show-length">
          <input type="checkbox" /> Show branch length
        </label>
        <Switch
          checked={drawBB}
          onChange={() => setdrawBB(!drawBB)}
          name="checkedA"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
        />
      </Toolbar>
    </AppBar>
  )
}
