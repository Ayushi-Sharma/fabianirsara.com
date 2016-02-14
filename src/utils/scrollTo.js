
import TweenLite from 'gsap'
import ScrollToPlugin from '../../node_modules/gsap/src/uncompressed/plugins/ScrollToPlugin'

export default function scrollTo(y, duration, ease) {
  let distance = Math.abs(y - window.scrollY)
  duration = duration || ((200 + distance / 3) / 1000 * 1.5)

  TweenLite.to(window, duration, {
    scrollTo: {
      y: y
    },
    ease: ease || Quint.easeInOut
  })
}
