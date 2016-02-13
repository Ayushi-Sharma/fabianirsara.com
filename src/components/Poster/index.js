
import React, { Component } from 'react'

import style from './style.css'
import imagepath from '../../utils/imagepath'

class Poster extends Component {
  state = {
    width: 0,
    height: 0,
    y: 0,
  };

  componentDidMount() {
    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.handleResize)
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight / 4 * 3,
      y: 0 - window.scrollY / 4
    })
  }

  render() {
    const { file } = this.props
    const css = {
      backgroundImage: 'url(' + imagepath(file, 'large') + ')',
      backgroundPosition: '50% ' + this.state.y + 'px',
      width: this.state.width + 'px',
      height: this.state.height + 'px'
    }

    if (file) {
      return (
        <figure className={style.poster} style={css} />
      )
    } else {
      return null
    }
  }
}

export default Poster
