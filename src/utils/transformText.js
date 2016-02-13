
//import TweenLite from 'gsap'
//import TextPlugin from '../../node_modules/gsap/src/uncompressed/plugins/TextPlugin'

export default function transformText(node, text) {
  TweenLite.to(node, 0.9, {text: text, ease: Quint.easeOut})
}
