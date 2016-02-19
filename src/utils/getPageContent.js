
import store from '../store'

export default function getContent(pathname) {
  let state = store.getState()
  let folder = state.data.pages[state.data.config.content.index]

  for (let k in state.data.pages) {
    if (state.data.pages[k].config.content.link === pathname) {
      folder = state.data.pages[k]
      break
    }

    for (let j in state.data.pages[k]) {
      if (state.data.pages[k][j].config && state.data.pages[k][j].config.content.link === pathname) {
        folder = state.data.pages[k][j]
        break
      }
    }
  }

  let path = folder.config.lpath.substring(0, folder.config.lpath.lastIndexOf('/'))
  path = path.substring(1)
  path = path.substring(path.indexOf('/') + 1)

  let children = {}

  for (let k in folder) {
    if (! folder[k].lpath) {
      children[k] = {...folder[k]}
      children[k].path = k
    }
  }

  let content = {
    poster: null,
    content: null,
    config: null,
    header: null,
    meta: null,
    children: children,
    path: path
  }

  if (folder.poster) content.poster = folder.poster.localFile
  if (folder.index) content.content = folder.index.content
  if (folder.config) content.config = folder.config.content
  if (folder.header) content.header = folder.header.content
  if (folder.meta) content.meta = folder.meta.content

  return content
}
