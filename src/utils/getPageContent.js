
import jsyaml from 'js-yaml'
import store from '../store'

export default function getContent(pathname) {
  let state = store.getState()
  let folder = state.data.pages.home
  let path = pathname.substring(1)

  if (path.substring(path.length - 1) === '/') path = path.substring(0, path.length - 1)
  if (path.length > 0 && state.data.pages[path] && state.data.pages[path]['index.md']) {
    folder = state.data.pages[path]
  }

  path = 'pages/' + (path || 'home')

  let content = {
    poster: null,
    content: null,
    header: null,
    meta: null,
    path
  }

  if (folder['poster.jpg']) content.poster = folder['poster.jpg'].localFile
  if (folder['poster.png']) content.poster = folder['poster.png'].localFile

  if (folder['index.md']) content.content = folder['index.md'].content
  if (folder['header.yaml']) content.header = jsyaml.load(folder['header.yaml'].content)
  if (folder['meta.yaml']) content.meta = jsyaml.load(folder['meta.yaml'].content)

  return content
}
