
import React, { Component } from 'react'

import classnames from 'classnames'
import style from './item.css'

import imagepath from '../../utils/imagepath'

class Item extends Component {
  state = {
    loaded: false
  };

  loaded() {
    this.setState({
      loaded: true
    })

    if (this.props.onReady) {
      this.props.onReady()
    }
  }

  render() {
    const { image } = this.props
    const path = image.src
      ? imagepath(image.src, 'mini')
      : ''

    let imageCss = {
      backgroundImage: `url("${path}")`
    }

    let classes = classnames(
      style.item,
      this.state.loaded ? style.loaded : null
    )

    return (
      <div {...this.props} className={classes}>
        <img src={path} onLoad={::this.loaded} />
        <div className={style.preview}>
          <div className={style.previewImage} style={imageCss}>
          </div>
        </div>
      </div>
    )
  }
}

export default Item
