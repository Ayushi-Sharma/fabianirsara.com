
import React, { Component } from 'react'

import classnames from 'classnames'
import style from './style.css'
import imagepath from '../../utils/imagepath'

import Title from './Title'

//import arrow from '../../assets/icons/arrow-bottom.png'
const arrow = ''
import scrollTo from '../../utils/scrollTo'
import snap from '../../utils/snap'

import { POSTER_RATIO } from '../../constants'

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
    this._scrollTimeout = requestAnimationFrame(this._handleScroll)
    window.addEventListener('scroll', (this._handleScroll = ::this.handleScroll))
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))

    this.handleResize()
    this.handleScroll()
  }

  componentWillUnmount() {
    this._mounted = false
    if (this._scrollTimeout) cancelAnimationFrame(this._scrollTimeout)
    window.removeEventListener('scroll', this._handleScroll)
    window.removeEventListener('resize', this._handleResize)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.file !== nextProps.file) {
      this.setState({
        loaded: false
      })
    }
  }

  getImageSize(event) {
    this.setState({
      loaded: true,
      imageWidth: event.target.naturalWidth || event.target.offsetWidth,
      imageHeight: event.target.naturalHeight || event.target.offsetHeight
    })
  }

  handleScroll(event) {
    if (this._mounted) {
      requestAnimationFrame(this._handleScroll)
    }

    if (this._oldScroll !== window.scrollY) {
      this._oldScroll = window.scrollY
      this.setState({y: window.scrollY})
    }
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight * POSTER_RATIO
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

      if (this.state.loaded) {
        if (this.state.width / this.state.height > this.state.imageWidth / this.state.imageHeight) {
          options.bgWidth = this.state.width
          options.bgHeight = Math.round(this.state.width / this.state.imageWidth * this.state.imageHeight)
        } else {
          options.bgHeight = this.state.height
          options.bgWidth = Math.round(this.state.height / this.state.imageHeight * this.state.imageWidth)
        }

        let difference = (options.bgHeight - this.state.height) / 2
        percentage = this.state.y / (this.state.height / 2)
        options.y = 0 - difference - percentage * difference * 0.9
        options.blur = snap(Math.min(10, percentage * 2 * 14), 2)

        arrowCss.opacity = Math.max(0, 1 - percentage * 2)
        css.opacity = Math.max(0, 1 - percentage / 1.5)
        css.transform = 'translate3d(0, ' + (0 - this.state.y / 4) + 'px, 0px)'
      }

      css.width = this.state.width + 'px'
      css.height = this.state.height + 'px'

      imageCss.backgroundImage = 'url(' + path + ')'
      imageCss.backgroundPosition = '50% ' + options.y + 'px'
      imageCss.backgroundSize = options.bgWidth + 'px ' + options.bgHeight + 'px'
      imageCss.WebkitFilter = 'blur(' + options.blur + 'px)'

      let className = classnames(
        this.state.loaded ? style.loaded : null,
        this.state.y > 50 ? style.scrolled : null,
        style.poster
      )

      return (
        <figure className={className} style={css}>
          <Title content={text} />
          <div className={style.image} style={imageCss}>
            <img src={path} onLoad={::this.getImageSize} />
          </div>
          <div className={style.arrow} style={arrowCss} onClick={::this.scrollToContent}>
            <img src={arrow} />
          </div>
          <div className={style.gradient} />
        </figure>
      )
    } else {
      return null
    }
  }
}

export default Poster
