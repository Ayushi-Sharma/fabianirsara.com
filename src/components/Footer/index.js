
import React, { Component } from 'react'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import classnames from 'classnames'

import Links from '../Links'

import superb from 'superb'
import weekday from '../../utils/weekday'
import transformText from '../../utils/transformText'
import { config } from '../../utils/getConfig'

class Footer extends Component {
  componentDidMount() {
    const { data } = this.props

    if (data.config.template === 'home') {
      this.nextCycle()
    }
  }

  componentWillUnmount() {
    if (this._cycleTimeout) {
      clearTimeout(this._cycleTimeout)
    }
  }

  nextCycle() {
    if (this._cycleTimeout) clearTimeout(this._cycleTimeout)
    this._cycleTimeout = setTimeout(::this.cycle, 3500 + Math.random() * 900)
  }

  cycle() {
    this.nextCycle()
    transformText(this.refs.word, superb.prefix())
  }

  render() {
    const { data } = this.props

    let footerLine = data.config.template === 'home'
      ? (
        <p className={style.text}><strong>Have <span ref="word">{superb.prefix()}</span> {weekday()}</strong></p>
      )
      : null

    return (
      <footer className={classnames(style.footer, data.config.template === 'home' ? style.hasFooterLine : null)}>
        <div className={classnames(grid.container, grid.shortContainer)}>
          {footerLine}
          <Links links={config.links} />
        </div>
      </footer>
    )
  }
}

export default Footer
