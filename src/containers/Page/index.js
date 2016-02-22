
import React, { Component } from 'react'
import ReactMarkdown from 'react-markdown'
import { Link } from 'react-router'

import classnames from 'classnames'

import Arrow from '../../components/Arrow'
import MainSection from '../../components/MainSection'
import Poster from '../../components/Poster'
import Title from '../../components/Title'
import Footer from '../../components/Footer'

import markdown from '../../utils/markdown'
import getPageContent from '../../utils/getPageContent'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import scrollTo from '../../utils/scrollTo'
import setSiteTitle from '../../utils/setSiteTitle'

import List from '../List'
import Text from '../Text'
import Collection from '../Collection'

class Page extends Component {
  componentDidMount() {
    setSiteTitle(this.data)

    scrollTo(0, 0.75)
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this.handleResize()

    setTimeout(() => {
      window.dispatchEvent(new Event('closeNavigation'))
    }, 170)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
  }

  handleResize() {
    this.refs.node.parentNode.style.height = this.refs.node.offsetHeight + 'px'
  }

  render() {
    const { children } = this.props

    if (! this.data) {
      this.data = getPageContent(this.props.location.pathname)
      this.path = this.data.path
    }

    let content = null

    if (this.data.config.template === 'list') {
      content = <List data={this.data} />
    } else if (this.data.config.template === 'collection') {
      content = <Collection data={this.data} />
    } else if (this.data.config.template === 'home') {
      content = <Text data={this.data} />
    } else if (this.data.config.template === 'contact') {
      content = <Text data={this.data} />
    } else {
      content = <Text data={this.data} />
    }


    let prev = null

    if (this.data.prev) {
      prev = (
        <Link className={classnames(style.link, style.prevLink)} to={this.data.prev.config.link}>
          <Arrow left />
        </Link>
      )
    }


    let next = null

    if (this.data.next) {
      next = (
        <Link className={classnames(style.link, style.nextLink)} to={this.data.next.config.link}>
          <Arrow right />
        </Link>
      )
    }

    let subnav = null

    if (next || prev) {
      subnav = (
        <nav className={style.subnav}>
          <div className={classnames(grid.container, style.subnavInner)}>
            <div className={style.subnavWrapper}>
              {prev}
              {next}
            </div>
          </div>
        </nav>
      )
    }

    let classes = classnames(
      style.page,
      'template-' + this.data.config.template
    )

    return (
      <div ref="node" className={classes}>
        {subnav}
        <Poster file={this.data.poster} data={this.data} />
        <MainSection data={this.data} content={this.data.content}>
          <Title content={this.data.header} data={this.data} />
          <div ref="main">
            {content}
          </div>
          <Footer data={this.data} />
        </MainSection>
      </div>
    )
  }
}

export default Page
