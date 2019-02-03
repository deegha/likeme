import React from 'react'
// import { StatusBar } from 'react-native'

import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { rootReducer } from './src/reducers/rootReducer'

import Index from './index'

const store = createStore(rootReducer,  applyMiddleware(thunkMiddleware))

export default class App extends React.Component {
  
  render() {
 
    return (
      <Provider store={store}>
        <Index />
      </Provider>  
    )
  }
}




