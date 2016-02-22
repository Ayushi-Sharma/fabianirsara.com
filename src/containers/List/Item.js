
import React, { Component } from 'react'
import classnames from 'classnames'

import style from './item.css'
import grid from '../../assets/css/grid.css'

import imagepath, { fetch } from '../../utils/imagepath'

class Item extends Component {
  componentDidMount() {
    this._setSizeTimeout = setTimeout(::this.setSize, 170)
  }

  componentWillUnmount() {
    clearTimeout(this._setSizeTimeout)
  }

  setSize() {
    console.log('size')
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
      <article ref="node" className={classes} onMouseOver={::this.setSize}>
        <header className={style.itemText}>
          <div className={classnames(grid.container, grid.shortContainer)}>
            <h2 className={style.itemSubTitle}>{page.category}</h2>
            <h1 className={style.itemTitle} dangerouslySetInnerHTML={{__html: page.title}} />
          </div>
        </header>
        <div className={style.preview}>
          <div className={style.previewWrap}>
            <div ref="image" className={style.previewImage} style={imageCss}>
              <img src={path} onLoad={::this.setSize} />
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default Item
