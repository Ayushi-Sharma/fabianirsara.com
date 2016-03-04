
import config from '../config'
import reqwest from 'reqwest'

class API {
  pullData() {
    return this.request('data')
  }

  request(path, method = 'get', data = null) {
    return new Promise((resolve, reject) => {
      reqwest({
        method: method,
        url: config.api + path,
        crossOrigin: true,
        data: data
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

  cachePage(page) {
    return this.request('cachePage', 'post', {
      page: page,
      html: document.getElementsByTagName('html')[0].innerHTML
    })
  }
}

const api = new API()
export default api
