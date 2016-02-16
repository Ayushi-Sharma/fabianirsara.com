
import config from '../config'
import reqwest from 'reqwest'

class API {
  pullData() {
    return this.request('data')
  }

  request(path) {
    return new Promise((resolve, reject) => {
      reqwest({
        method: 'get',
        url: config.api + path,
        crossOrigin: true
      }).then(function(data) {
        if (typeof data !== 'object') {
          data = JSON.parse(data)
        }

        resolve(data)
      }).fail(function(data) {
        reject(data)
      })
    })
  }
}

const api = new API()
export default api
