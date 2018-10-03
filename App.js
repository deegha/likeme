import React from 'react'
// import { StatusBar } from 'react-native'

import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { rootReducer } from './src/reducers/rootReducer'
import { RootStack } from './routerStack'
import HandleAuthRedirect from './src/components/handleAuthRedirect/HandleAuthRedirect'

const store = createStore(rootReducer,  applyMiddleware(thunkMiddleware))

export default class App extends React.Component {
  // componentDidMount() {
  //   StatusBar.setHidden(true);
  // }
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>  
    )
  }
}


