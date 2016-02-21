
import TweenLite from 'gsap'
import TextPlugin from '../../node_modules/gsap/src/uncompressed/plugins/TextPlugin'
import shuffle from './shuffle'

export default function transformText(node, text) {
  try {
    TweenLite.to(node, 0.9, {text: text, ease: Quint.easeOut, overwrite: 'all'})
  } catch(e) {}
}

export function rollText(node) {
  if (node._isRollingText) return
  node._isRollingText = true

  let originalText = node.getAttribute('data-text')
  if (! originalText) {
    originalText = node.innerHTML
    node.setAttribute('data-text', originalText)
  }

  let tmpText = shuffle(node.innerHTML.split(''))
    .map(item => {
      return String.fromCharCode(item.charCodeAt(0) - 10 + Math.floor(Math.random() * 20))
    })
    .join('')

  node.style.width = Math.round(parseFloat(window.getComputedStyle(node).width.toString().replace('px', ''))) + 'px'
  node.style.textAlign = 'center'

  try {
    TweenLite.to(node, 0.1, {text: tmpText, ease: Linear.easeNone, overwrite: 'all', onComplete: function() {
      TweenLite.to(node, 0.1, {text: originalText, ease: Linear.easeNone, overwrite: 'all', onComplete: function() {
        node.style.width = ''
        node.style.textAlign = ''
        node._isRollingText = false
      }})
    }})
  } catch(e) {}
}
