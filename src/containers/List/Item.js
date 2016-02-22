
import React, { Component } from 'react'
import classnames from 'classnames'

import style from './item.css'
import grid from '../../assets/css/grid.css'

import imagepath, { fetch } from '../../utils/imagepath'

class Item extends Component {
  handleMouseOver() {
    let height = this.refs.node.offsetHeight
    this.refs.image.style.height = height + 'px'
  }

  render() {
    const { page } = this.props
    const path = page.preview
      ? imagepath(fetch(page.preview, page.path), 'large')
      : ''

    let imageCss = {
      backgroundImage: `url("${path}")`
    }

    let classes = classnames(
      style.item,
      page.preview ? style.hasImage : null
    )

    return (
      <article ref="node" className={classes} onMouseOver={::this.handleMouseOver}>
        <header className={style.itemText}>
          <div className={classnames(grid.container, grid.shortContainer)}>
            <h2 className={style.itemSubTitle}>{page.category}</h2>
            <h1 className={style.itemTitle} dangerouslySetInnerHTML={{__html: page.title}} />
          </div>
        </header>
        <div className={style.preview}>
          <div className={style.previewWrap}>
            <div ref="image" className={style.previewImage} style={imageCss} />
          </div>
        </div>
      </article>
    )
  }
}

export default Item
