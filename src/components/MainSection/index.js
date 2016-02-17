
import React, { Component } from 'react'
import style from './style.css'
import { config } from '../../utils/getConfig'
import screenSize from '../../utils/screenSize'

class MainSection extends Component {
  componentDidMount() {
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    if (this.props.data.poster) {
      this.refs.node.style.paddingTop = (screenSize().height * (config.poster_height / 100)) + 'px'
    } else {
      this.refs.node.style.paddingTop = ''
    }
  }

  render() {
    const { children, data, content } = this.props

    return (
      <section ref="node" className={style.main}>
        <div className={style.mainWrapper}>
          <div className={style.mainWrapperInner}>
            {children}
          </div>
        </div>
      </section>
    )
  }
}

export default MainSection
