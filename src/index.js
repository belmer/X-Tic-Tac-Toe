import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, compose, applyMiddleware } from 'redux'
import createHistory from 'history/createBrowserHistory'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { reduxFirebase } from 'react-redux-firebase'
import App from './container/App'
import reducers from './redux/reducers'
import registerServiceWorker from './registerServiceWorker'

const history = createHistory()
const middleware = routerMiddleware(history)

const FBConfig = {
  apiKey: 'AIzaSyDH1m3QsEOdOFrSIcjzYhfGG9V8BwY4Gxg',
  authDomain: 'tictactoe-d1365.firebaseapp.com',
  databaseURL: 'https://tictactoe-d1365.firebaseio.com'
}
const createStoreWithMiddleware = compose(
                                          applyMiddleware(middleware),
                                          reduxFirebase(
  FBConfig,
  { userProfile: 'users' }),
  typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
   ? window.devToolsExtension() : f=> f)(createStore)

ReactDOM.render(<Provider store={createStoreWithMiddleware(reducers)}>
                  <ConnectedRouter history={history}>
                    <App/>
                  </ConnectedRouter>
                </Provider>, document.getElementById('root'))
registerServiceWorker()
