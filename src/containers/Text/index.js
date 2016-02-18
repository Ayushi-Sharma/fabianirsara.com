
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'

import markdown from '../../utils/markdown'
import style from './style.css'
import grid from '../../assets/css/grid.css'

class Text extends Component {
  render() {
    const { data } = this.props

    this.path = data.path || this.props.path

    if (data.content && data.content.replace(/\s/g, '').length > 0) {
      return (
        <section className={classnames(grid.container, grid.shortContainer)}>
          <ReactMarkdown className={style.text} source={data.content} walker={markdown.handle.bind(this)} />
        </section>
      )
    } else {
      return null
    }
  }
}

export default Text
