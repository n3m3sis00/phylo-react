import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";

import AppContext from "../container/Store";

const useStyles = makeStyles((theme) => ({
  side_div: {
    width: 'auto',
    height: 300,
  },
}));

function Data(props) {
  const context = useContext(AppContext);
  const { treeData, isOpenData, setOpenData, setTreeData } = context;
  const classes = useStyles();

  return (
    <React.Fragment key={"bottom"}>
      <Drawer anchor={"bottom"} open={isOpenData} onClose={() => setOpenData(false)}>
        <div className={classes.side_div}>
            <p>Paste a newick format tree below</p>
            <textarea
                cols={120}
                rows={10}
                onChange={(event) => {
                    setTreeData(event.target.value);
                }}
                value={treeData}
            />
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Data;

