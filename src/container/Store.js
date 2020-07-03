import React, { Component } from 'react'
import { treeData } from '../resources/life.js'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node: null,
    treeData: treeData,
    isOpenData: false,
    childLoc: [],
    heigtoftree: 0,
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

  render() {
    const { children } = this.props
    const {
      isOpen,
      node,
      treeData,
      isOpenData,
      childLoc,
      heigtoftree,
    } = this.state
    const {
      setOpen,
      setNode,
      setTreeData,
      setOpenData,
      setChildLoc,
      setTreeHeight,
    } = this

    return (
      <AppContext.Provider
        value={{
          isOpen,
          node,
          treeData,
          isOpenData,
          childLoc,
          heigtoftree,
          setOpen,
          setNode,
          setTreeData,
          setOpenData,
          setChildLoc,
          setTreeHeight,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }
