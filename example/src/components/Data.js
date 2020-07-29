import React, { useContext } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloudDoneIcon from '@material-ui/icons/CloudDone'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import Divider from '@material-ui/core/Divider'
import AppContext from '../container/Store'
import TabularView from './TabularView'
import { makeTextFileLineIterator, parseFastaSeq } from './Utils'

const useStyles = makeStyles(theme => ({
  side_div: {
    width: 'auto',
    height: 350,
    padding: 10,
  },
  paste_data_div: {
    padding: 50,
  },
  inputup: {
    display: 'none',
  },
  connectbar: {
    display: 'flex',
    alignItems: 'center',
    width: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  textbox: {
    marginBottom: 10,
  },
}))

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

async function run(fileURL) {
  var files = []
  for await (let line of makeTextFileLineIterator(fileURL)) {
    files.push(line)
  }
  return files
}

function Data(props) {
  const context = useContext(AppContext)
  const { treeData, isOpenData, setOpenData, setTreeData, setSeq } = context
  const classes = useStyles()
  const [value, setValue] = React.useState(0)
  const [api, setapi] = React.useState('http://localhost:8000')
  const [files, setFiles] = React.useState(null)
  const [ufiles, setuFiles] = React.useState(null)
  const [ufilesNames, setuFilesNames] = React.useState(null)

  const [tempfasta, settempfasta] = React.useState('')
  const [temptreeData, settemptreeData] = React.useState(treeData)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const getFiles = async () => {
    var files_ = await run(api + '/files.txt')
    var files = []
    var i = 0
    for (i; i < files_.length; i++) {
      if (files_[i] !== '') {
        files.push(files_[i])
      }
    }
    setFiles(files)
  }

  const getTree = async idx => {
    var data = await run(api + '/' + files[idx])
    setTreeData(data[0])
  }

  const handleUpload = async e => {
    if (e.target.files) {
      var filenames = []
      var i = 0
      for (i; i < e.target.files.length; i++) {
        filenames.push(e.target.files[i].name)
      }
      setuFilesNames(filenames)
      setuFiles(e.target.files)
    }
  }

  const readUploaded = async idx => {
    var reader = new FileReader()
    reader.onload = function () {
      var text = reader.result
      setTreeData(text)
    }
    reader.readAsText(ufiles[idx])
  }

  const tempFastaFn = async () => {
    setSeq(parseFastaSeq(tempfasta))
    setTreeData(temptreeData)
  }

  return (
    <React.Fragment key={'bottom'}>
      <Drawer
        anchor={'bottom'}
        open={isOpenData}
        onClose={() => setOpenData(false)}
      >
        <div className={classes.side_div}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Paste Data" {...a11yProps(0)} />
            <Tab label="Upload file" {...a11yProps(1)} />
            <Tab label="Connect Folder" {...a11yProps(2)} />
          </Tabs>
          <div
            role="tabpanel"
            hidden={value !== 0}
            id={`simple-tabpanel-0`}
            aria-labelledby={`simple-tab-0`}
            className={classes.paste_data_div}
          >
            <TextField
              id="outlined-multiline-static"
              label="Paste a newick format tree below"
              multiline
              cols={20}
              rows={8}
              fullWidth
              variant="outlined"
              value={temptreeData}
              onChange={event => {
                settemptreeData(event.target.value)
              }}
              className={classes.textbox}
            />

            <TextField
              id="outlined-multiline-static"
              label="Paste a Sequence"
              multiline
              cols={20}
              rows={8}
              fullWidth
              variant="outlined"
              value={tempfasta}
              onChange={event => {
                settempfasta(event.target.value)
              }}
              className={classes.textbox}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              component="span"
              onClick={tempFastaFn}
            >
              Render
            </Button>
          </div>

          <div
            role="tabpanel"
            hidden={value !== 2}
            id={`simple-tabpanel-2`}
            aria-labelledby={`simple-tab-2`}
            className={classes.paste_data_div}
          >
            <Paper component="form" className={classes.connectbar}>
              <InputBase
                className={classes.input}
                id="outlined-basic"
                label="API Addr"
                variant="outlined"
                value={api}
                onChange={event => {
                  setapi(event.target.value)
                }}
              />
              <Divider className={classes.divider} orientation="vertical" />
              <IconButton
                color="primary"
                className={classes.iconButton}
                aria-label="directions"
                onClick={getFiles}
              >
                <CloudDoneIcon />
              </IconButton>
            </Paper>

            <div>
              {files ? <TabularView data={files} func={getTree} /> : null}
            </div>
          </div>

          <div
            role="tabpanel"
            hidden={value !== 1}
            id={`simple-tabpanel-1`}
            aria-labelledby={`simple-tab-1`}
            className={classes.paste_data_div}
          >
            <input
              accept="txt/*"
              className={classes.inputup}
              id="contained-button-file"
              multiple
              type="file"
              onChange={handleUpload}
            />
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                fullWidth
                color="primary"
                component="span"
              >
                Upload
              </Button>
            </label>
            <div className={classes.showcase}>
              {ufilesNames ? (
                <TabularView data={ufilesNames} func={readUploaded} />
              ) : null}
            </div>
          </div>
        </div>
      </Drawer>
    </React.Fragment>
  )
}

export default Data
