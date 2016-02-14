
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

  let poster = null
  let content = null
  let header = null
  if (folder['poster.jpg']) poster = folder['poster.jpg'].localFile
  if (folder['poster.png']) poster = folder['poster.png'].localFile

  if (folder['index.md']) content = folder['index.md'].content
  if (folder['header.yaml']) header = jsyaml.load(folder['header.yaml'].content)
  if (folder['header.json']) header = JSON.parse(folder['header.json'].content)

  return {
    poster,
    content,
    header,
    path
  }
}
