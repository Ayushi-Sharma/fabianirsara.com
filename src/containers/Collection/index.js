
import React, { Component } from 'react'
import { Link } from 'react-router'

import classnames from 'classnames'

import style from './style.css'
import grid from '../../assets/css/grid.css'

import Masonry from 'react-masonry-component'

import Item from './Item'
import Text from '../Text'
import Lightbox from 'react-images'

import imagepath from '../../utils/imagepath'
import lightboxTheme from './lightboxTheme'

const masonryOptions = {
  gutter: 10,
  transitionDuration: 0
}

class Collection extends Component {
  state = {
    lightboxIsOpen: false,
    currentImage: 0
  };

  renderImage(image) {
    return (
      <Item
        data-index={image.index}
        key={image.id}
        image={image}
        data={this.props.data}
        onClick={::this.openLightbox} />
    )
  }

  openLightbox(event) {
    let index = parseFloat(event.currentTarget.getAttribute('data-index'))

    this.setState({
      lightboxIsOpen: true,
      currentImage: index
    })
  }

  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false
    })
  }

  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }

  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }

  render() {
    const { data } = this.props

    let images = []
    let lightboxImages = []

    for (let k in data.images) {
      let image = {}
      image.index = images.length
      image.id = data.images[k].rev
      image.src = data.images[k].localFile
      images.push(image)

      lightboxImages.push({src: imagepath(image.src, 'large')})
    }

    return (
      <section className={style.collection}>
        <Text data={data} />
        <div className={classnames(grid.container, grid.shortContainer, style.collectionInner)}>
          <Masonry className={style.masonry} options={masonryOptions}>
            {images.map(::this.renderImage)}
          </Masonry>
        </div>
        <Lightbox
          currentImage={this.state.currentImage}
          width={1900}
          images={lightboxImages}
          isOpen={this.state.lightboxIsOpen}
          onClickPrev={::this.gotoPrevious}
          onClickNext={::this.gotoNext}
          onClose={::this.closeLightbox}
          backdropClosesModal={true}
          theme={lightboxTheme} />
      </section>
    )
  }
}

export default Collection
