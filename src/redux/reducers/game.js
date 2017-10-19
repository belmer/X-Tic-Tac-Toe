import { START_GAME } from '../actionTypes'
const INITIAL_STATE = {
  match: null
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

