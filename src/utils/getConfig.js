
import reqwest from 'reqwest'
import jsyaml from 'js-yaml'
import store from '../store'
import * as variables from '../variables'

let loaded = false
let restyled = false
export let config = {}

export default function getConfig() {
  if (loaded) return config

  const { data } = store.getState()

  if (data['config.yaml']) {
    loaded = true
    let loadedConfig = jsyaml.load(data['config.yaml'].content)

    config = {
      ...variables,
      ...loadedConfig
    }
  }

  return config
}

export function restyle() {
  if (restyled) return
  restyled = true

  let ss = document.getElementById('stylesheet')
  let href = ss.getAttribute('href')

  reqwest({
    method: 'get',
    url: href,
    crossOrigin: true
  }).then(function(data){
    let style = data

    for (let k in config) {
      let prop = '$' + k

      while (style.indexOf(prop) !== -1) {
        style = style.replace(prop, config[k])
      }
    }

    let tag = document.createElement('style')
    tag.innerHTML = style
    document.getElementsByTagName('head')[0].appendChild(tag)
  })
}
