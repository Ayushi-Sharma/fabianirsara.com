
import imagepath, { fetch } from './imagepath'

const IMAGE_REGEX = /\ssrc=(?:(?:'([^']*)')|(?:"([^"]*)")|([^\s]*))/gi

let markdown = {}

markdown.handle = function(item) {
  if (item.type === 'Image') {
    item.destination = imagepath(fetch(item.destination), 'medium')
  } else if (item.type === 'HtmlBlock' && item.literal.indexOf('<img') !== -1) {
    let match = null
    let url = null

    while (true) {
      match = IMAGE_REGEX.exec(item.literal)
      if (! match) break

      url = match[1] || match[2] || match[3]

      item.literal = item.literal.replace(`src="${url}"`, `src="${imagepath(fetch(url), 'medium')}"`, item.destination)
    }
  }
}

export default markdown
