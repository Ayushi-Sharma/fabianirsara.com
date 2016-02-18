
import React, { Component } from 'react'

import classnames from 'classnames'
import style from './style.css'
import imagepath from '../../utils/imagepath'

import Title from './Title'
import Arrow from '../Arrow'

import scrollTo from '../../utils/scrollTo'
import snap from '../../utils/snap'
import isTouch from '../../utils/isTouch'
import screenSize from '../../utils/screenSize'

import { config } from '../../utils/getConfig'

class Poster extends Component {
  state = {
    loaded: false,
    width: 0,
    height: 0,
    imageWidth: 0,
    imageHeight: 0,
    y: 0
  };

  componentDidMount() {
    this._mounted = true
    this._oldScroll = null
    this._handleScroll = ::this.handleScroll

    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    window.addEventListener('scroll', (this._handleScroll = ::this.handleScroll))

    this.handleResize()
    this.handleScroll()
  }

  componentWillUnmount() {
    this._mounted = false
    window.removeEventListener('resize', this._handleResize)
    window.removeEventListener('scroll', this._handleScroll)
  }

  getImageSize(event) {
    this.setState({
      loaded: true,
      imageWidth: event.target.naturalWidth || event.target.offsetWidth,
      imageHeight: event.target.naturalHeight || event.target.offsetHeight
    })
  }

  handleScroll(event) {
    let top = Math.min(screenSize().height * 1.5, window.scrollY)

    if (this._oldScroll !== top) {
      this._oldScroll = top
      this.setState({y: top})
    }
  }

  handleResize() {
    this.setState({
      width: screenSize().width,
      height: screenSize().height * (config.poster_height / 100)
    })
  }

  scrollToContent() {
    scrollTo(this.state.height)
  }

  render() {
    const { file, text } = this.props

    if (file) {
      const path = imagepath(file, 'large')

      let percentage = 0
      let options = {}
      let arrowCss = {}
      let css = {}
      let imageCss = {}
      let titleCss = {}

      if (this.state.loaded) {
        if (this.state.width / this.state.height > this.state.imageWidth / this.state.imageHeight) {
          options.bgWidth = this.state.width
          options.bgHeight = Math.round(this.state.width / this.state.imageWidth * this.state.imageHeight)
        } else {
          options.bgHeight = this.state.height
          options.bgWidth = Math.round(this.state.height / this.state.imageHeight * this.state.imageWidth)
        }

        let difference = Math.floor((options.bgHeight - this.state.height) / 2)
        percentage = Math.max(0, this.state.y / (this.state.height / 2))

        let maxPercentage = Math.min(1, percentage)
        let scale = 1 + config.poster_scale * maxPercentage

        options.y = 0 - difference * maxPercentage * Math.min(1, config.poster_move)
        options.blur = snap(Math.min(20, maxPercentage * 2 * 20), 1) * config.poster_blur

        titleCss.marginTop = (0 - this.state.height * percentage * config.poster_title_move) + 'px'
        titleCss.opacity = Math.max(1 - config.poster_title_fade, Math.max(0, 1 - percentage * config.poster_title_fade))

        arrowCss.opacity = Math.max(1 - config.poster_fade, Math.max(0, 1 - percentage * 2 * config.poster_fade))
        css.opacity = Math.max(1 - config.poster_fade, Math.max(0, 1 - percentage / 1.5 * config.poster_fade))

        css.transform = 'translate3d(0, ' + (0 - this.state.y / 4 * config.poster_parallax) + 'px, 0px)'

        imageCss.width = options.bgWidth + 'px'
        imageCss.height = options.bgHeight + 'px'
        imageCss.top = (0 - difference) + 'px'
        imageCss.left = (0 - Math.floor((options.bgWidth - this.state.width) / 2)) + 'px'
        imageCss.transform = 'translate3d(0, ' + options.y + 'px, 0) scale(' + scale + ')'
      }

      css.width = this.state.width + 'px'
      css.height = this.state.height + 'px'

      imageCss.backgroundImage = 'url("' + path + '")'
      imageCss.backgroundSize = options.bgWidth + 'px ' + options.bgHeight + 'px'
      imageCss.WebkitFilter = 'blur(' + options.blur + 'px)'

      let className = classnames(
        this.state.loaded ? style.loaded : null,
        config.poster_vignette ? style.vignette : null,
        config.poster_fixed ? style.fixed : null,
        this.state.y > 50 ? style.scrolled : null,
        isTouch() && screen.width < 1025 ? style.touch : null,
        style.poster
      )

      let gradient = config.poster_gradient
        ? <div className={style.gradient} />
        : null

      return (
        <figure className={className} style={css}>
          <Title content={text} style={titleCss} />
          <div className={style.image} style={imageCss}>
            <img src={path} onLoad={::this.getImageSize} />
          </div>
          <div className={style.arrow} style={arrowCss} onClick={::this.scrollToContent}>
            <Arrow bottom />
          </div>
          {gradient}
        </figure>
      )
    } else {
      return null
    }
  }
}

export default Poster
