import React from 'react'
import ReactDOM from 'react-dom'
import MainScreen from './container/Viewer'
import * as serviceWorker from './serviceWorker'

ReactDOM.render(<MainScreen />, document.getElementById('root'))

serviceWorker.unregister()
