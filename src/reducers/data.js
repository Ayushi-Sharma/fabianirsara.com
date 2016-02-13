
import { handleActions } from 'redux-actions'
import api from '../utils/api'

const initialState = {}

export default handleActions({
  'pull data' (state, action) {
    setTimeout(function(){
      api.request('sync')
    }, 2000)

    return action.payload
  }
}, initialState)
