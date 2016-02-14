
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Home from './containers/Home'
import Page from './containers/Page'
import NoMatch from './containers/NoMatch'
import Collection from './containers/Collection'
import store from './store'
import config from './config'

import * as DataActions from './actions/data'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path={config.base} component={App} onEnter={()=>store.dispatch(DataActions.pullData())}>
        <IndexRoute component={Home} />
        <Route path="collections/:id" component={Collection} />
        <Route path=":id" component={Page} />
        <Route path="*" component={NoMatch}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
