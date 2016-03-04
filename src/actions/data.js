
import { createAction } from 'redux-actions'
import api from '../utils/api'

export const pullData = createAction('pull data', ::api.pullData)
export const cachePage = createAction('cache page', ::api.cachePage)
