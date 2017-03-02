
const theme = {
  // container
  container: {
    background: 'rgba(24, 24, 24, 1)',
  },

  // arrows
  arrow: {
    backgroundColor: 'transparent',
    fill: '#ffffff',
    opacity: 0.9,
    transition: 'all 200ms',

    ':hover': {
      opacity: 1,
      fill: '#b3a577',
    },
  },
  arrow__size__medium: {
    borderRadius: 40,
    height: 40,
    marginTop: -20,

    '@media screen and (min-width: 1024px)': {
      height: 60,
      padding: 15,
    },
  },
  arrow__direction__left: { marginLeft: 10 },
  arrow__direction__right: { marginRight: 10 },

  // header
  close: {
    fill: '#ffffff',
    opacity: 0.9,
    transition: 'all 200ms',

    ':hover': {
      opacity: 1,
      fill: '#b3a577',
    }
  },

  // footer
  footer: {
    color: '#ffffff',
  },
  footerCount: {
    color: '#ffffff',
  },

  // thumbnails
  thumbnail: {
  },

  thumbnail__active: {
    boxShadow: '0 0 0 2px #00D8FF',
  },
}

export default theme
