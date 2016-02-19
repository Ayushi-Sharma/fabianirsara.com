
import React, { Component } from 'react'
import classnames from 'classnames'

import style from './item.css'
import grid from '../../assets/css/grid.css'

import imagepath, { fetch } from '../../utils/imagepath'

class Item extends Component {
  render() {
    const { page } = this.props
    const path = page.preview
      ? imagepath(fetch(page.preview, page.path), 'large')
      : ''

    let imageCss = {
      backgroundImage: `url("${path}")`
    }

    return (
      <article className={style.item}>
        <header className={style.itemText}>
          <div className={classnames(grid.container, grid.shortContainer)}>
            <h2 className={style.itemSubTitle}>{page.category}</h2>
            <h1 className={style.itemTitle}>{page.title}</h1>
          </div>
        </header>
        <div className={style.preview}>
          <div className={style.previewImage} style={imageCss} />
        </div>
      </article>
    )
  }
}

export default Item
