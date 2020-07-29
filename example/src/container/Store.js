import React, { Component } from 'react'
import { temptree, temptreeSeq } from '../resources/life.js'
import { parseFastaSeq } from '../components/Utils'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node: null,
    treeData: temptree,
    isOpenData: false,
    childLoc: [],
    heigtoftree: 0,
    drawBB: false,
    seq: parseFastaSeq(temptreeSeq),
  }
  setOpen = todo => {
    this.setState({
      isOpen: todo,
    })
  }

  setOpenData = todo => {
    this.setState({
      isOpenData: todo,
    })
  }

  setNode = d => {
    this.setState({
      node: d,
    })
  }

  setTreeData = data => {
    this.setState({
      treeData: data,
    })
  }

  setChildLoc = data => {
    this.setState({
      childLoc: data,
    })
  }
  setTreeHeight = data => {
    this.setState({
      heigtoftree: data,
    })
  }

  setSeq = data => {
    this.setState({
      seq: data,
    })
  }

  setdrawBB = data => {
    this.setState({
      drawBB: data,
    })
  }

  render() {
    const { children } = this.props
    const {
      isOpen,
      node,
      treeData,
      isOpenData,
      childLoc,
      heigtoftree,
      seq,
      drawBB,
    } = this.state
    const {
      setOpen,
      setNode,
      setTreeData,
      setOpenData,
      setChildLoc,
      setTreeHeight,
      setSeq,
      setdrawBB,
    } = this

    return (
      <AppContext.Provider
        value={{
          isOpen,
          node,
          treeData,
          isOpenData,
          childLoc,
          seq,
          drawBB,
          heigtoftree,
          setOpen,
          setNode,
          setTreeData,
          setOpenData,
          setChildLoc,
          setTreeHeight,
          setSeq,
          setdrawBB,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }
