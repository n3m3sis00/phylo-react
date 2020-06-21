import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

async function* makeTextFileLineIterator(fileURL) {
  const utf8Decoder = new TextDecoder('utf-8');
  const response = await fetch(fileURL);
  const reader = response.body.getReader();
  let { value: chunk, done: readerDone } = await reader.read();
  chunk = chunk ? utf8Decoder.decode(chunk) : '';

  const re = /\n|\r|\r\n/gm;
  let startIndex = 0;
  let result;

  for (;;) {
    let result = re.exec(chunk);
    if (!result) {
      if (readerDone) {
        break;
      }
      let remainder = chunk.substr(startIndex);
      ({ value: chunk, done: readerDone } = await reader.read());
      chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '');
      startIndex = re.lastIndex = 0;
      continue;
    }
    yield chunk.substring(startIndex, result.index);
    startIndex = re.lastIndex;
  }
  if (startIndex < chunk.length) {
    // last line didn't end in a newline char
    yield chunk.substr(startIndex);
  }
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
  const [api, setapi] = React.useState();
  const [files, setFiles] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getFiles = async () => {
    console.log(api)
    var files = await run("https://cors-anywhere.herokuapp.com/" + api + "/files.txt")
    console.log(files)
    setFiles(files)
  };

  const getTree = async (file) => {
    var data = await run("https://cors-anywhere.herokuapp.com/" + api + "/" + file)
    setTreeData(data[0])
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


        </div>
      </Drawer>
    </React.Fragment>
  );
}

export default Data;

