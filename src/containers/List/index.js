
import React, { Component } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'

import grid from '../../assets/css/grid.css'
import style from './style.css'
import Item from './Item'
import Text from '../Text'

class List extends Component {
  state = {
    twocol: false
  };

  componentDidMount() {
    window.addEventListener('resize', (this._handleResize = ::this.handleResize))
    this._setSizeTimeout = setTimeout(::this.handleResize, 170)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._handleResize)
    clearTimeout(this._setSizeTimeout)
  }

  handleResize() {
    if (this.props.data.config.twocol && window.innerWidth > 1300) {
      this.setState({
        twocol: true
      })
    } else {
      this.setState({
        twocol: false
      })
    }

    let tmp = this.refs.list.querySelectorAll('li')

    for (let i = 0, _len = tmp.length; i < _len; i++) {
      tmp[i].style.height = ''
    }

    if (this.props.data.config.twocol && window.innerWidth > 1300) {
      let maxHeight = 0

      for (let i = 0, _len = tmp.length; i < _len; i++) {
        maxHeight = Math.max(maxHeight, tmp[i].offsetHeight)

        if ((i + 1) % 2 === 0) {
          tmp[i].style.height = `${maxHeight}px`
          tmp[i - 1].style.height = `${maxHeight}px`
        }
      }
    }
  }

  renderPageItem(page) {
    return (
      <li key={page.id}>
        <Link to={page.link}>
          <Item page={page} data={this.props.data} />
        </Link>
      </li>
    )
  }

  render() {
    const { data } = this.props

    let pages = []

    for (let k in data.children) {
      if (! data.children[k].index) continue
      if (! data.children[k].config) continue

      let page = {}
      page.config = data.children[k].config.content
      page.title = page.config.title
      page.category = page.config.category
      page.id = data.children[k].index.rev
      page.link = page.config.link
      page.path = this.props.data.path + '/' + data.children[k].path
      page.preview = page.config.preview
      pages.unshift(page)
    }

    let classes = classnames(
      style.list,
      this.state.twocol ? style.twocol : null
    )

    return (
      <section className={classes}>
        <Text data={data} />
        <div className={style.listInner}>
          <ul ref="list" className={grid.clear}>
            {pages.map(::this.renderPageItem)}
          </ul>
        </div>
      </section>
    )
  }
}

export default List
