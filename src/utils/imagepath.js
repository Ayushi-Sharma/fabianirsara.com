
import config from '../config'

export default function imagepath(path, size) {
  if (config.env === 'development') {
    return config.api + 'images/' + (size || 'large') + '?file=' + path
  }

  return config.api + 'images/' + (size || 'large') + '/' + path.replace(/\//g, '___')
}
