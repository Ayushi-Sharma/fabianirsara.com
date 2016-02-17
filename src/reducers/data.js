
import { handleActions } from 'redux-actions'
import api from '../utils/api'
import reqwest from 'reqwest'
import imagepath from '../utils/imagepath'

const initialState = {}

export default handleActions({
  'pull data' (state, action) {
    setTimeout(function() {
      api.request('sync')

      if (action.payload.files) {
        for (let k in action.payload.files) {
          if (k.indexOf('poster.jpg') >= 0 || k.indexOf('poster.png') >= 0) {
            reqwest({
              method: 'get',
              url: imagepath(action.payload.files[k].localFile, 'large'),
              crossOrigin: true
            })
          }
        }
      }
    }, 2000)

    return action.payload
  }
}, initialState)
