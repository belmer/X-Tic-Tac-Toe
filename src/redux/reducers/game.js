import { START_GAME } from '../actionTypes'
const INITIAL_STATE = {
  match: null,
  headerText: 'You can still play without having to enter your name. It will use default values'
}

export default function (state = INITIAL_STATE, action) {
  switch (action.types) {
  case START_GAME:
    let match = Object.assign({}, state.match)
    match = action.payload
    return { ...state, match }
  default:
    return state
  }
}

