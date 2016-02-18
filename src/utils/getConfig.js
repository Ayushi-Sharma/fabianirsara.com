
import store from '../store'
import variables from '../config.yaml'

let loaded = false
export let config = {
  ...variables
}

export default function getConfig() {
  if (loaded) return config

  const { data } = store.getState()

  if (data.config) {
    loaded = true

    config = {
      ...variables,
      ...data.config.content
    }
  }

  return config
}
