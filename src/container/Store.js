import React, { Component } from 'react'
import { treeData } from '../resources/life.js'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node: null,
    treeData: treeData,
    isOpenData: false,
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

  render() {
    const { children } = this.props
    const { isOpen, node, treeData, isOpenData } = this.state
    const { setOpen, setNode, setTreeData, setOpenData } = this

    return (
      <AppContext.Provider
        value={{
          isOpen,
          node,
          treeData,
          isOpenData,
          setOpen,
          setNode,
          setTreeData,
          setOpenData,
        }}
      >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }
