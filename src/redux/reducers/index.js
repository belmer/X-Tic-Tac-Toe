import { combineReducers } from 'redux'
import { firebaseStateReducer as firebase } from 'react-redux-firebase'
import { routerReducer } from 'react-router-redux'
import game from './game'
const rootReducer = combineReducers({
  game,
  firebase,
  routing: routerReducer
})

export default rootReducer
