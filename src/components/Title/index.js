
import React, { Component } from 'react'
import classnames from 'classnames'

import Claims from './Claims'
import style from './style.css'
import grid from '../../assets/css/grid.css'

class Title extends Component {
  render() {
    const { content } = this.props

    if (content && content.title) {
      let subtitle = null

      if (content.words && ! Array.isArray(content.words)) {
        content.subtitle = content.words
        delete content.words
      }

      if (content.words) subtitle = <h2 className={style.subtitle}><span className={style.subtitleText}><Claims words={content.words} /></span></h2>
      if (content.subtitle) subtitle = <h2 className={style.subtitle}><span className={style.subtitleText}>{content.subtitle}</span></h2>

      let classes = classnames(
        style.text,
        grid.container,
        grid.shortContainer,
        this.props.data.poster ? style.hasPoster : null
      )

      return (
        <section ref="node" className={classes}>
          <h1 className={style.title}><span className={style.titleText}>{content.title}</span></h1>
          {subtitle}
        </section>
      )
    } else {
      return null
    }
  }
}

export default Title
