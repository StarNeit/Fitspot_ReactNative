/* @flow */
// import 'babel-polyfill'
import React from 'react'
import { Router } from 'react-native-router-flux'
import { Provider } from 'react-redux'
import createStore from '@store/create'
import FitSpotRouter from './router'

const store = createStore()

const Kernel = (): React$Element<any> => {
  return (
    <Provider store={store}>
      <FitSpotRouter />
    </Provider>
  )
}

export default Kernel
