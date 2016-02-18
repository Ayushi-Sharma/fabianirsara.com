
import { handleActions } from 'redux-actions'
import api from '../utils/api'
import reqwest from 'reqwest'
import imagepath from '../utils/imagepath'
import jsyaml from 'js-yaml'

const initialState = {}

let parseYaml = function(data) {
  for (let k in data) {
    if (k === 'files') continue

    if (k.indexOf('.yaml') !== -1) {
      data[k].content = jsyaml.load(data[k].content)
    }

    if (typeof data[k] === 'object') {
      parseYaml(data[k])
    }

    if (k.indexOf('.') !== -1) {
      let realKey = k.substring(0, k.lastIndexOf('.'))
      data[realKey] = data[k]
      delete data[k]
    }
  }
}

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

    let data = { ...action.payload }
    parseYaml(data)

    return data
  }
}, initialState)
