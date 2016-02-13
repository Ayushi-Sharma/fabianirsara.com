
import { routeReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import data from './data'

export default combineReducers({
  routing,
  data
})
