
import { handleActions } from 'redux-actions'

const initialState = {}

export default handleActions({
  'pull data' (state, action) {
    return action.payload
  }
}, initialState)
