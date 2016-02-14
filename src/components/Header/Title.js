
import React, { Component } from 'react'

import Claims from './Claims'
import style from './style.css'

class Title extends Component {
  render() {
    const { content } = this.props

    if (content && content.title) {
      let subtitle = null

      if (content.words && ! Array.isArray(content.words)) {
        content.subtitle = content.words
        delete content.words
      }

      if (content.words) subtitle = <h2><Claims words={content.words} /></h2>
      if (content.subtitle) subtitle = <h2>{content.subtitle}</h2>

      return (
        <div className={style.text}>
          <h1>{content.title}</h1>
          {subtitle}
        </div>
      )
    } else {
      return null
    }
  }
}

export default Title
