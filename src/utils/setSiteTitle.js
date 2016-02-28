
import { config } from './getConfig'

export default function setSiteTitle(data) {
  if (data.meta && data.meta.title) {
    document.title = [config.site_title, data.meta.title].join(' - ')
  } else {
    document.title = config.site_title
  }

  if (data.meta && data.meta.keywords) {
    document.querySelector('meta[name="keywords"]').setAttribute('content', data.meta.keywords)
  } else {
    document.querySelector('meta[name="keywords"]').setAttribute('content', config.site_keywords)
  }

  if (data.meta && data.meta.description) {
    document.querySelector('meta[name="description"]').setAttribute('content', data.meta.description)
  } else {
    document.querySelector('meta[name="description"]').setAttribute('content', config.site_description)
  }
}
