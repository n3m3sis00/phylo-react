import React from 'react'
import { withStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';

import AppContext from '../container/Store'


const styles = therme => ({
  side_div: {
    width:350
  },
});

class Sidebar extends React.Component {
    static contextType = AppContext

    constructor(props){
        super(props);
        this.state = {
            data:null
        }
    }
    componentDidMount(){

    }

    render(){
        const { node, isOpen, setOpen } = this.context
        const { classes } = this.props

        return (
            <React.Fragment key={'right'}>
                    <Drawer anchor={'right'} open={isOpen} onClose={() => setOpen(false)}>
                        <div className = {classes.side_div} >
                            {node !== null ? <h4>{node.data.name.replace(/_/g, " ")}</h4> : null}
                        </div>
                    </Drawer>
            </React.Fragment>
        );
    }

}

export default withStyles(styles, { withTheme: true })(Sidebar)