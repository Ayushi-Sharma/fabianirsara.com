
import { config } from './getConfig'

export default function setSiteTitle(data) {
  if (data.meta && data.meta.title) {
    document.title = [config.site_title, data.meta.title].join(' - ')
  } else {
    document.title = config.site_title
  }

  if (data.meta && data.meta.keywords) {
    document.querySelector('meta[name="keywords"]').innerHTML = data.meta.keywords
  } else {
    document.querySelector('meta[name="keywords"]').innerHTML = config.site_keywords
  }

  if (data.meta && data.meta.description) {
    document.querySelector('meta[name="description"]').innerHTML = data.meta.description
  } else {
    document.querySelector('meta[name="description"]').innerHTML = config.site_description
  }
}
