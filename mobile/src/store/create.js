/* @flow */

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import reduxThunkMiddleware from 'redux-thunk';
import promiseMiddleware from '@store/middlewares/promiseMiddleware';
import * as reducers from './reducers';
import Reactotron from '@platform/reactotron';


const enhancer = compose(
  applyMiddleware(
    reduxThunkMiddleware,
    promiseMiddleware,
  ),
);


export default function configureStore(initialState) {
  const store = Reactotron.createStore(
    combineReducers({ ...reducers }),
    initialState,
    enhancer
  );
  return store;
}
