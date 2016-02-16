
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'
import { POSTER_RATIO } from '../../constants'

class MainSection extends Component {
  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    if (this.props.data.poster) {
      this._node.style.paddingTop = (window.innerHeight * POSTER_RATIO) + 'px'
    } else {
      this._node.style.paddingTop = ''
    }
  }

  render() {
    const { children, data, content } = this.props

    return (
      <section className={style.main}>
        <div className={style.mainWrapper}>
          {children}
        </div>
      </section>
    )
  }
}

export default MainSection
