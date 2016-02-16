
import jsyaml from 'js-yaml'
import store from '../store'

let loaded = false
export let config = {}

export default function getConfig() {
  if (loaded) return config

  const { data } = store.getState()

  if (data['config.yaml']) {
    loaded = true
    config = jsyaml.load(data['config.yaml'].content)
    console.log(config)
  }

  return config
}
