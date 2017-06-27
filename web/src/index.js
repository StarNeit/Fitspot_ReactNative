import React from 'react';
import { render } from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '@store/create';
import router from './router';
import platform from '@platform/reactotron';

import moment from 'moment';
import momentLocalizer from 'react-widgets/lib/localizers/moment';

// Styles
// TODO: Switch to a per-module CSS
import 'react-widgets/lib/less/react-widgets.less';
import './frontend/index.scss';
import 'font-awesome-webpack';

// Global init
const init = () => {
  momentLocalizer(moment);
};

init();

// Store
const store = createStore();

// Router
const history = syncHistoryWithStore(browserHistory, store)

// App
const App = () => {
  return router(store, history);
};

render(<App />, document.getElementById('root'))
