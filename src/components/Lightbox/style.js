
const CLOSE_SIZE = 20
const ARROW_HEIGHT = 60
const GAP_BOTTOM = 50
const GAP_TOP = 40

const styles = {
  // SCENE
  container: {
    boxSizing: 'border-box',
    height: '100%',
    left: 0,
    padding: '20px 0 20px 20px',
    position: 'fixed',
    textAlign: 'left',
    top: 0,
    width: '100%',
    zIndex: 1001,
  },
  content: {
    backgroundColor: 'rgba(24,24,24,1)',
    display: 'block',
    margin: '0',
    width: '100%',
    height: '100%',
    position: 'relative',
    verticalAlign: 'middle',
  },
  contentHeightShim: {
    //display: 'inline-block',
    display: 'none',
    height: '100%',
    lineHeight: 0,
    verticalAlign: 'middle',
  },

  // IMAGES
  image: {
    boxSizing: 'border-box',
    display: 'inline-block',
    lineHeight: 0,
    maxWidth: '100%',
    margin: '0 auto',
    paddingBottom: 40,
    paddingLeft: 20,
    paddingTop: 40,
    height: 'auto',
    width: 'auto',
    margin: 0,
    paddingRight: 80,
    textAlign: 'center',
    position: 'relative',
    top: '50%',
    transform: 'translate(0, -50%)',

    // disable user select
    WebkitTouchCallout: 'none',
    userSelect:         'none',

  },
  figure: {
    lineHeight: 1,
    minHeight: 200,
    minWidth: 300,
    display: 'block',
    height: '100%',
    width: '100%',
    margin: 0,
    textAlign: 'center',
  },
  figureShadow: {
    display: 'none'
  },
  footer: {
    color: 'white',
    lineHeight: 1.3,
    height: GAP_BOTTOM,
    marginTop: -GAP_BOTTOM,
    paddingTop: 5,
    position: 'absolute',
    textAlign: 'left',
    top: '100%',
    right: 0,
    width: '80px',
    cursor: 'auto',
    textAlign: 'center'
  },
  footerCount: {
    fontSize: '.85em',
    opacity: .75,
  },
  footerCaption: {
    paddingRight: 80,
  },

  // BUTTONS
  arrow: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    outline: 'none',
    marginTop: ARROW_HEIGHT / -2,
    maxWidth: 80,
    padding: 20,
    position: 'absolute',
    top: '50%',
    height: ARROW_HEIGHT,
    width: '16%',
    zIndex: 1001,
    opacity: 0.8,
    transition: 'opacity 170ms ease',

    '&:hover': {
      opacity: 1
    },

    // disable user select
    WebkitTouchCallout: 'none',
    WebkitUserSelect:   'none',
    MozUserSelect:      'none',
    msUserSelect:       'none',
    userSelect:         'none',
  },
  arrowNext: {
    right: 0,
    marginTop: ARROW_HEIGHT / -2 - 30,
  },
  arrowPrev: {
    right: 0,
    marginTop: ARROW_HEIGHT / -2 + 30,
  },
  closeBar: {
    height: GAP_TOP,
    left: 0,
    position: 'absolute',
    textAlign: 'right',
    top: 15,
    width: '100%',
    zIndex: 100,
  },
  closeButton: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    height: CLOSE_SIZE + 20,
    outline: 'none',
    padding: 10,
    position: 'absolute',
    right: 5,
    top: 0,
    width: CLOSE_SIZE + 20,
    opacity: 0.8,
    transition: 'opacity 170ms ease',

    '&:hover': {
      opacity: 1
    }
  },
}

export default styles
