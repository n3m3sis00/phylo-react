import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';

import AppContext from "../container/Store";

const useStyles = makeStyles((theme) => ({
  side_div: {
    width: 'auto',
    height: 300,
    padding:10
  },
  paste_data_div: {
      paddingTop:30
  }
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function Data(props) {
  const context = useContext(AppContext);
  const { treeData, isOpenData, setOpenData, setTreeData } = context;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment key={"bottom"}>
      <Drawer anchor={"bottom"} open={isOpenData} onClose={() => setOpenData(false)}>
        <div className={classes.side_div}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor="primary"
                centered
            >
                <Tab label="Paste Data" {...a11yProps(0)}/>
                <Tab label="Upload file" {...a11yProps(1)}/>
                <Tab label="Connect Folder" {...a11yProps(2)}/>
            </Tabs>
            <div
                role="tabpanel"
                hidden={value !== 0}
                id={`simple-tabpanel-0`}
                aria-labelledby={`simple-tab-0`}
                className = {classes.paste_data_div}
            >
                <TextField
                    id="outlined-multiline-static"
                    label="Paste a newick format tree below"
                    multiline
                    cols={20}
                    rows={8}
                    fullWidth
                    variant="outlined"
                    value={treeData}
                    onChange={(event) => {
                        setTreeData(event.target.value);
                    }}
                />
            </div>
        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Data;

