import React, { Component } from 'react'

const AppContext = React.createContext()

class AppProvider extends Component {
  state = {
    isOpen: false,
    node:null
  }
  setOpen = todo => {
    this.setState({
        isOpen : todo
    })
  }

  setNode = d => {
    this.setState({
        node : d
    })
  }

  render() {
    const { children } = this.props
    const { isOpen, node } = this.state
    const { setOpen, setNode } = this

    return (
      <AppContext.Provider
            value={{
                isOpen,
                node,
                setOpen,
                setNode,
            }}
        >
        {children}
      </AppContext.Provider>
    )
  }
}

export default AppContext

export { AppProvider }