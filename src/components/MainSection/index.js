
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import style from './style.css'
import { POSTER_RATIO } from '../../constants'

class MainSection extends Component {
  componentDidMount() {
    this._node = ReactDOM.findDOMNode(this)

    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.handleResize)
  }

  handleResize() {
    this._node.style.paddingTop = (window.innerHeight * POSTER_RATIO) + 'px'
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
