
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import classnames from 'classnames'

import markdown from '../../utils/markdown'
import style from './style.css'
import grid from '../../assets/css/grid.css'

import { rollText } from '../../utils/transformText'

class Text extends Component {
  componentDidMount() {
    if (this.refs.node) {
      let tmp = this.refs.node.querySelectorAll('a')

      for (let i = 0, _len = tmp.length; i < _len; i++) {
        tmp[i].addEventListener('mouseover', this.handleMouseOver)
      }
    }
  }

  handleMouseOver(event) {
    rollText(event.target)
  }

  render() {
    const { data } = this.props

    this.path = data.path || this.props.path

    if (data.content && data.content.replace(/\s/g, '').length > 0) {
      return (
        <section ref="node" className={classnames(grid.container, grid.shortContainer)}>
          <ReactMarkdown className={style.text} source={data.content} walker={markdown.handle.bind(this)} />
        </section>
      )
    } else {
      return null
    }
  }
}

export default Text
