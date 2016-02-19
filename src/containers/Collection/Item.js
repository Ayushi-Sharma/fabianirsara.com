
import React, { Component } from 'react'

import style from './item.css'

import imagepath from '../../utils/imagepath'

class Item extends Component {
  render() {
    const { image } = this.props
    const path = image.src
      ? imagepath(image.src, 'medium')
      : ''

    let imageCss = {
      backgroundImage: `url("${path}")`
    }

    return (
      <div {...this.props} className={style.item}>
        <img src={path} />
        <div className={style.preview}>
          <div className={style.previewImage} style={imageCss}>
          </div>
        </div>
      </div>
    )
  }
}

export default Item
