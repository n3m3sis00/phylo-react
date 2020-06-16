import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';

import Tree from '../components/Tree'
import Sidebar from '../components/Sidebar'
import TreeToolbar from '../components/TreeToolbar'
import { AppProvider } from './Store'



const styles = therme => ({
  tree_div: {
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(0, 0, 0, .3)',
    color: 'gray',
  },
});


class ViewerScreen extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            isopen: false,
        }
    }

    toggleDrawer = (open) => {
        this.setState({ isopen : open });
        console.log(open)
    };

    render(){
        const { classes } = this.props;
        return (
            <AppProvider> 
                <Grid container spacing={2}>
                    <TreeToolbar />
                    <Grid key={1} item>
                        <div className={classes.tree_div}>
                            <Tree />
                            <Sidebar isopen={this.state.isopen}/>
                        </div>
                    </Grid>
                </Grid>
            </AppProvider>
        );
    }

}

export default withStyles(styles, { withTheme: true })(ViewerScreen)