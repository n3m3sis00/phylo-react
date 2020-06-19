import React, { useContext } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

import AppContext from '../container/Store'


export default function TreeToolbar() {

    const { setOpen, setOpenData } = useContext(AppContext)

    return <AppBar position="static">
        <Toolbar variant="dense" color="inherit">
            <Button onClick={() => setOpenData(true)} > Data </Button>
            <Button onClick={() => setOpen(true)} > Toolbar </Button>
        </Toolbar>
    </AppBar> 
}