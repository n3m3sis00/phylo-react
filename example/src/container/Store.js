import React, { Component } from 'react'
import { temptree, temptreeSeq } from '../resources/life.js'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node: null,
    treeData: temptree,
    isOpenData: false,
    treeConfig: null, //{treeheight : 240, leafloc : [{x : 10, y : 10, name: "dummy"}]}
    heigtoftree: 0,
    drawBB: false,
    seq: temptreeSeq,
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

  setTreeConfig = data => {
    this.setState({
      treeConfig: data,
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
      treeConfig,
      seq,
      drawBB,
    } = this.state
    const {
      setOpen,
      setNode,
      setTreeData,
      setOpenData,
      setTreeConfig,
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
          treeConfig,
          seq,
          drawBB,
          setOpen,
          setNode,
          setTreeData,
          setOpenData,
          setTreeConfig,
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
