
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
      title: document.getElementsByTagName('title')[0].innerHTML,
      keywords: document.querySelector('meta[name="keywords"]').getAttribute('content'),
      description: document.querySelector('meta[name="description"]').getAttribute('content'),
      html: document.getElementById('root').innerHTML
    })
  }
}

const api = new API()
export default api
