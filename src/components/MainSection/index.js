
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import ReactMarkdown from 'react-markdown'
import style from './style.css'

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
    this._node.style.paddingTop = (window.innerHeight / 6 * 5) + 'px'
  }

  render() {
    const { children, data, content } = this.props

    console.log('render')
    //console.log(content.content)

    return (
      <section className={style.main}>
        <ReactMarkdown source={content} />
        {children}
      </section>
    )
  }
}

export default MainSection
