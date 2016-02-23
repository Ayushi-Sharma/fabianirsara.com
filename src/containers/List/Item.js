
import React, { Component } from 'react'
import classnames from 'classnames'

import style from './item.css'
import grid from '../../assets/css/grid.css'

import imagepath, { fetch } from '../../utils/imagepath'

class Item extends Component {
  state = {
    twocol: false
  };

  componentDidMount() {
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this._setSizeTimeout = setTimeout(::this.setSize, 170)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
    clearTimeout(this._setSizeTimeout)
  }

  handleResize() {
    if (! this._setSizeTimeout) {
      this._setSizeTimeout = setTimeout(::this.setSize, 170)
    }
  }

  handleLoad() {
    if (! this._setSizeTimeout) {
      this._setSizeTimeout = setTimeout(::this.setSize, 170)
    }
  }

  setSize() {
    if (this._setSizeTimeout) {
      clearTimeout(this._setSizeTimeout)
      this._setSizeTimeout = null
    }

    let height = this.refs.node.offsetHeight
    this.refs.image.style.height = height + 'px'

    if (this.props.data.config.twocol && window.innerWidth > 1300) {
      this.setState({
        twocol: true
      })
    } else {
      this.setState({
        twocol: false
      })
    }
  }

  render() {
    const { page, data } = this.props
    const path = page.preview
      ? imagepath(fetch(page.preview, page.path), 'large')
      : ''

    let imageCss = {
      backgroundImage: `url("${path}")`
    }

    let classes = classnames(
      style.item,
      page.preview ? style.hasImage : null,
      this.state.twocol ? style.twocol : null
    )

    return (
      <article ref="node" className={classes} onMouseOver={::this.setSize}>
        <header className={style.itemText}>
          <div className={classnames(grid.container, grid.shortContainer, style.itemInner)}>
            <h2 className={style.itemSubTitle}>{page.category}</h2>
            <h1 className={style.itemTitle} dangerouslySetInnerHTML={{__html: page.title}} />
          </div>
        </header>
        <div className={style.preview}>
          <div className={style.previewWrap}>
            <div ref="image" className={style.previewImage} style={imageCss}>
              <img src={path} onLoad={::this.handleLoad} />
            </div>
          </div>
        </div>
      </article>
    )
  }
}

export default Item
