
import React from 'react';

import BaseLightbox from 'react-images'
import theme from './theme'

const Lightbox = (props) => {
  return <BaseLightbox {...props} theme={theme} />
}

export default Lightbox;
