import React, { useState } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs'

import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CodeIcon from '@material-ui/icons/Code'
import Grid from '@material-ui/core/Grid'
import Timeline from '@material-ui/lab/Timeline'
import TimelineItem from '@material-ui/lab/TimelineItem'
import TimelineSeparator from '@material-ui/lab/TimelineSeparator'
import TimelineConnector from '@material-ui/lab/TimelineConnector'
import TimelineContent from '@material-ui/lab/TimelineContent'
import TimelineDot from '@material-ui/lab/TimelineDot'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'

const useStyles = makeStyles({
  cardV: {
    minWidth: 275,
    paddingTop: 20,
    paddingBottom: 20,
  },
  card: {
    minWidth: 275,
    backgroundColor: '#f8f8ff',
  },
  codedisplay: {
    display: 'none',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  table: {
    minWidth: 650,
  },
  appbar: {
    // backgroundColor: "#fff"
  },
  desc: {
    marginTop: 50,
    marginBottom: 50,
  },
  viewer: {
    overflowX: 'scroll',
    overflowY: 'scroll',
    maxHeight: '600px',
    scrollbarWidth: 'none',
  },
})

function Viewer(props) {
  const { data } = props
  const classes = useStyles()
  return (
    <Card className={[classes.cardV, classes.viewer]} variant="outlined">
      <Container>{data}</Container>
    </Card>
  )
}

function Utils(props) {
  const { code } = props
  const classes = useStyles()
  const [togcode, settogcode] = useState(false)
  return (
    <React.Fragment>
      <AppBar position="static" className={classes.appbar} color="transparent">
        <Toolbar variant="dense">
          <IconButton edge="start" color="inherit" aria-label="code">
            <CodeIcon onClick={() => settogcode(!togcode)} color="primary" />
          </IconButton>
        </Toolbar>
      </AppBar>
      {togcode ? (
        <Card className={classes.card} variant="outlined">
          <SyntaxHighlighter language="javascript" style={docco}>
            {code}
          </SyntaxHighlighter>
        </Card>
      ) : null}
    </React.Fragment>
  )
}

function Description(props) {
  const { data } = props
  const classes = useStyles()

  return (
    <div className={classes.desc}>
      <Typography variant="body1" gutterBottom>
        {data}
      </Typography>
    </div>
  )
}

function PropTable(props) {
  const { data } = props
  const classes = useStyles()

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Description</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row[0]}
              </TableCell>
              <TableCell>{row[1]}</TableCell>
              <TableCell>{row[2]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

function RightNav() {
  return (
    <Timeline align="left">
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ width: '200px' }}>Demo</div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ width: '200px' }}>Code</div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ width: '200px' }}>Description</div>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <TimelineSeparator>
          <TimelineDot />
        </TimelineSeparator>
        <TimelineContent>
          <div style={{ width: '200px' }}>Props Table</div>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  )
}

export default function Docify(props) {
  const { name, View, description, proptable, code } = props
  return (
    <Grid container spacing={2}>
      <Grid item xs={9}>
        <Container maxWidth="md">
          <Typography variant="h2" component="h3" gutterBottom>
            {name}
          </Typography>
          <Viewer data={View} />
          <Utils code={code} />
          <Description data={description} />
          <PropTable data={proptable} />
        </Container>
      </Grid>
      <Grid item xs={3}>
        <div style={{ position: 'fixed' }}>
          <RightNav />
        </div>
      </Grid>
    </Grid>
  )
}
