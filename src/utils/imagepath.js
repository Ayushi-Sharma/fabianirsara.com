
import config from '../config'
import store from '../store'
import path from 'path'

export default function imagepath(url, size) {
  if (config.env === 'development') {
    return config.api + 'images/' + (size || 'large') + '?file=' + url
  }

  return config.api + 'images/' + (size || 'large') + '/' + url.replace(/\//g, '___')
}

export function fetch(url) {
  let state = store.getState()
  url = path.normalize(state.path + '/' + url).toLowerCase()

  return (state.data.files[url] && state.data.files[url].localFile)
    ? state.data.files[url].localFile
    : ''
}
