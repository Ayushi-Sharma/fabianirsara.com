
import reqwest from 'reqwest'
import jsyaml from 'js-yaml'
import store from '../store'
import variables from '../style.yaml'

let loaded = false
let restyled = false
export let style = {
  ...variables
}

export default function getStyle() {
  if (loaded) return style

  const { data } = store.getState()

  if (data['style.yaml']) {
    loaded = true
    let loadedConfig = jsyaml.load(data['style.yaml'].content)

    style = {
      ...variables,
      ...loadedConfig
    }
  }

  return style
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
  }).then(function(data) {
    let css = data

    for (let k in style) {
      let prop = '$' + k

      while (css.indexOf(prop) !== -1) {
        css = css.replace(prop, style[k])
      }
    }

    let tag = document.createElement('style')
    tag.innerHTML = css
    document.getElementsByTagName('head')[0].appendChild(tag)
  })
}