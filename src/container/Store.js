import React, { Component } from 'react'
import { temptree, temptreeSeq } from '../resources/life.js'
import { parseFasteSeq } from '../components/Utils'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node: null,
    treeData: temptree,
    isOpenData: false,
    childLoc: [],
    heigtoftree: 0,
    seq: parseFasteSeq(temptreeSeq),
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
    } = this.state
    const {
      setOpen,
      setNode,
      setTreeData,
      setOpenData,
      setChildLoc,
      setTreeHeight,
      setSeq,
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
          heigtoftree,
          setOpen,
          setNode,
          setTreeData,
          setOpenData,
          setChildLoc,
          setTreeHeight,
          setSeq,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }
