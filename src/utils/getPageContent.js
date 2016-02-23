
import store from '../store'

let getPageContent = function(folder) {
  let path = folder.config.lpath.substring(0, folder.config.lpath.lastIndexOf('/'))
  path = path.substring(1)
  path = path.substring(path.indexOf('/') + 1)

  let children = {}
  let items = {}
  let images = {}

  for (let k in folder) {
    if (! folder[k].lpath) {
      children[k] = {...folder[k]}
      children[k].path = k
    } else {
      items[k] = {...folder[k]}

      if (folder[k].mime_type === 'image/jpeg' || folder[k].mime_type === 'image/png' || folder[k].mime_type === 'image/gif') {
        images[k] = {...folder[k]}
      }
    }
  }

  let content = {
    poster: null,
    content: null,
    config: null,
    header: null,
    meta: null,
    children: children,
    items: items,
    images: images,
    path: path
  }

  if (folder.poster) content.poster = folder.poster.localFile
  if (folder.index) content.content = folder.index.content
  if (folder.config) content.config = folder.config.content
  if (folder.header) content.header = folder.header.content
  if (folder.meta) content.meta = folder.meta.content

  return content
}

export default function getContent(pathname) {
  let state = store.getState()
  let folder = {...state.data.pages[state.data.config.content.index]}
  let parent = null

  for (let k in state.data.pages) {
    if (state.data.pages[k].config.content.link === pathname) {
      folder = state.data.pages[k]
      break
    }

    for (let j in state.data.pages[k]) {
      if (state.data.pages[k][j].config && state.data.pages[k][j].config.content.link === pathname) {
        folder = state.data.pages[k][j]
        parent = state.data.pages[k]
        break
      }
    }
  }

  let content = getPageContent(folder)

  if (parent) {
    content.parent = getPageContent(parent)

    let found = false

    for (let k in content.parent.children) {
      if (found) {
        content.next = content.parent.children[k]
        break
      }

      if (content.parent.path + '/' + k === content.path) {
        found = true
      }

      if (! found) {
        content.prev = content.parent.children[k]
      }
    }

    if (content.prev && content.prev.path === content.path) {
      delete content.prev
    }

    if (content.prev) {
      content.prev = getPageContent(content.prev)
    }

    if (content.next) {
      content.next = getPageContent(content.next)
    }
  }

  return content
}
