
import jsyaml from 'js-yaml'
import store from '../store'
import variables from '../config.yaml'

let loaded = false
export let config = {
  ...variables
}

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
