
import isTouch from './isTouch'

export default function screenSize() {
  if (isTouch() && screen.width < 1025) {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    }
  } else {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  }
}
