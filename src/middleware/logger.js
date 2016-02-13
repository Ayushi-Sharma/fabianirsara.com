
import config from '../config'

export default store => next => action  => {
  if (config.debug) console.log(action)
  return next(action)
}