
import React, { Component } from 'react'

import style from './style.css'
import imagepath from '../../utils/imagepath'

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
    var _this = this;
    window.addEventListener('scroll', ::this.handleScroll)
    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
    this.handleScroll()
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', ::this.handleScroll)
    window.removeEventListener('resize', ::this.handleResize)
  }

  getImageSize(event) {
    this.setState({
      loaded: true,
      imageWidth: event.target.naturalWidth || event.target.offsetWidth,
      imageHeight: event.target.naturalHeight || event.target.offsetHeight
    })
  }

  handleScroll(event) {
    this.setState({y: window.scrollY})
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight / 6 * 5
    })
  }

  render() {
    const { file } = this.props

    if (file) {
      const path = imagepath(file, 'large')

      let options = {}

      if (this.state.loaded) {
        if (this.state.width / this.state.height > this.state.imageWidth / this.state.imageHeight) {
          options.bgWidth = this.state.width
          options.bgHeight = Math.round(this.state.width / this.state.imageWidth * this.state.imageHeight)
        } else {
          options.bgHeight = this.state.height
          options.bgWidth = Math.round(this.state.height / this.state.imageHeight * this.state.imageWidth)
        }

        let difference = (options.bgHeight - this.state.height) / 2
        let percentage = Math.min(1, this.state.y / this.state.height)
        options.y = 0 - difference - percentage * difference * 0.9
        options.blur = percentage * 20
      }

      let css = {}
      css.backgroundImage = this.state.loaded ? 'url(' + path + ')' : ''
      css.backgroundPosition = '50% ' + options.y + 'px'
      css.backgroundSize = options.bgWidth + 'px ' + options.bgHeight + 'px'
      css.WebkitFilter = 'blur(' + options.blur + 'px)'
      css.width = this.state.width + 'px'
      css.height = this.state.height + 'px'

      return (
        <figure className={style.poster} style={css}>
          <img src={path} onLoad={::this.getImageSize} />
          <div className={style.gradient} />
        </figure>
      )
    } else {
      return null
    }
  }
}

export default Poster
