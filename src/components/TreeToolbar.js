import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import { blue } from '@material-ui/core/colors';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import StorageIcon from '@material-ui/icons/Storage';
import SettingsIcon from '@material-ui/icons/Settings';

import AppContext from '../container/Store'


export default function TreeToolbar() {

    const { setOpen, setOpenData } = useContext(AppContext)

    return <AppBar position="static">
        <Toolbar variant="dense" color="inherit">
            <Button onClick={() => setOpenData(true)} >
                <StorageIcon style={{ color: blue[50] }}/>
            </Button>
            <Button onClick={() => setOpen(true)} >
                <SettingsIcon style={{ color: blue[50] }}/>
            </Button>
        </Toolbar>
    </AppBar>
}
