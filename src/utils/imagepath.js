
import config from '../config'
import store from '../store'
import path from 'path'

export default function imagepath(url, size) {
  if (config.env === 'development') {
    return config.api + 'images/' + (size || 'large') + '?file=' + url
  }

  return config.api + 'images/' + (size || 'large') + '/' + url.replace(/\//g, '___')
}

export function fetch(url, fromCurrentPath) {
  let state = store.getState()

  if (fromCurrentPath === null || typeof fromCurrentPath === 'undefined') {
    fromCurrentPath = state.data.path
  }

  url = path.normalize(fromCurrentPath + '/' + url).toLowerCase()

  return (state.data.files[url] && state.data.files[url].localFile)
    ? state.data.files[url].localFile
    : ''
}
