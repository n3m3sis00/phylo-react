import React, { useRef, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import Tree from "../components/Tree";
import Sidebar from "../components/Sidebar";
import TreeToolbar from "../components/TreeToolbar";
import { AppProvider } from "./Store";
import { treeData } from "../components/life";

const useStyles = makeStyles((therme) => ({
    tree_div: {
        border: 0,
        borderRadius: 3,
        boxShadow: "0 3px 5px 2px rgba(0, 0, 0, .3)",
        width: "calc(100vw - 32px)",
    },
}));

function ViewerScreen(props) {
    const ref = useRef();
    const classes = useStyles();
    const [value, setValue] = useState(treeData);

    return (
        <AppProvider>
            <Grid container spacing={2}>
                <TreeToolbar />
                <Grid key={1} item>
                    <p>Paste a newick format tree below</p>
                    <textarea
                        cols={120}
                        rows={10}
                        ref={ref}
                        onChange={(event) => {
                            setValue(event.target.value);
                        }}
                        value={value}
                    />
                    <div className={classes.tree_div}>
                        <Tree treeData={value} />
                        <Sidebar isopen={false} />
                    </div>
                </Grid>
            </Grid>
        </AppProvider>
    );
}

export default ViewerScreen;
