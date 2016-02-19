
import React, { Component } from 'react'
import { Link } from 'react-router'

import classnames from 'classnames'

import style from './style.css'
import grid from '../../assets/css/grid.css'

import Masonry from 'react-masonry-component'

import Item from './Item'
import Text from '../Text'

class Collection extends Component {
  renderImage(image) {
    return (
      <Item key={image.id} image={image} data={this.props.data} />
    )
  }

  render() {
    const { data } = this.props
    const masonryOptions = {
      gutter: 10,
      transitionDuration: 0
    }

    let images = []

    for (let k in data.images) {
      let image = {}
      image.id = data.images[k].rev
      image.src = data.images[k].localFile
      images.push(image)
    }

    return (
      <section className={style.collection}>
        <Text data={data} />
        <div className={classnames(grid.container, style.collectionInner)}>
          <Masonry className={style.masonry} options={masonryOptions}>
            {images.map(::this.renderImage)}
          </Masonry>
        </div>
      </section>
    )
  }
}

export default Collection
