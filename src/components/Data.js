import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import AppContext from "../container/Store";
import {makeTextFileLineIterator} from './Utils'

const useStyles = makeStyles((theme) => ({
  side_div: {
    width: 'auto',
    height: 300,
    padding:10
  },
  paste_data_div: {
      paddingTop:30
  },
  input: {
    display: 'none',
  },
}));

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

async function run(fileURL) {
    var files = [];
    for await (let line of makeTextFileLineIterator(fileURL)) {
        files.push(line)
    }
    return files
}


function Data(props) {
  const context = useContext(AppContext);
  const { treeData, isOpenData, setOpenData, setTreeData } = context;
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [api, setapi] = React.useState('http://localhost:8000');
  const [files, setFiles] = React.useState();
  const [ufiles, setuFiles] = React.useState(null);
  const [ufilesNames, setuFilesNames] = React.useState(null);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFiles = async () => {
    console.log(api)
    var files = await run(api + "/files.txt")
    console.log(files)
    setFiles(files)
  };

  const getTree = async (file) => {
    var data = await run(api + "/" + file)
    setTreeData(data[0])
  };

  const handleUpload = async (e) => {
    if(e.target.files){
        // console.log(e.target.files);
        // console.log(e.target.files.length)
        var filenames = []
        for(var i =  0 ; i < e.target.files.length; i++){
            filenames.push({
                0 : e.target.files[i].name
            })
        }
        setuFilesNames(filenames)
        setuFiles(e.target.files)
    }
  };

  const readUploaded = async (idx) => {
    var reader = new FileReader();
    reader.onload = function(){
          var text = reader.result
          setTreeData(text)
        };
    reader.readAsText(ufiles[idx])
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

            <div
                role="tabpanel"
                hidden={value !== 2}
                id={`simple-tabpanel-2`}
                aria-labelledby={`simple-tab-2`}
                className = {classes.paste_data_div}
            >
                <TextField
                    id="outlined-basic"
                    label="API Addr"
                    variant="outlined"
                    value={api}
                    onChange={(event) => {
                        setapi(event.target.value);
                    }}
                />
                <Button variant="contained" color="primary"
                    onClick={getFiles}
                >
                    Connect
                </Button>
                <div>
                { files ? files.map(a => <div key={uuidv4()}>
                                            <Button variant="contained" color="primary"
                                                onClick={() => getTree(a)}
                                            >
                                                {a}
                                            </Button>
                                        </div>) : null}
                </div>
            </div>

            <div role="tabpanel"
                hidden={value !== 1}
                id={`simple-tabpanel-1`}
                aria-labelledby={`simple-tab-1`}
                className = {classes.paste_data_div}
            >
                <input
                    accept="txt/*"
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={handleUpload}
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" component="span">
                        Upload
                    </Button>
                </label>
                <div>
                { ufilesNames ? ufilesNames.map((x, idx) => <div key={uuidv4()}>
                                            <Button variant="contained" color="primary"
                                                onClick={() => readUploaded(idx)}
                                            >
                                                {x[0] + idx}
                                            </Button>
                                        </div>) : null}
                </div>
            </div>

        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Data;

