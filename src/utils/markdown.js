
import imagepath, { fetch } from './imagepath'

const IMAGE_REGEX = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/gi

let markdown = {}

markdown.handle = function(event) {
  if (! event.entering) return

  let node = event.node

  if (node.type === 'Image') {
    node.destination = imagepath(fetch(node.destination, this.path), 'medium')
  } else if (node.type === 'HtmlBlock' && node.literal.indexOf('<img') !== -1) {
    let match = null
    let url = null

    while (true) {
      match = IMAGE_REGEX.exec(node.literal)
      if (! match) break

      url = match[1] || match[2] || match[3]

      node.literal = node.literal.replace(`src="${url}"`, `src="${imagepath(fetch(url, this.path), 'medium')}"`, node.destination)
    }
  }
}

export default markdown
