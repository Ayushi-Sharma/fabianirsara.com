
import React, { Component } from 'react'
import { Link } from 'react-router'

import Arrow from '../Arrow'

import classnames from 'classnames'
import style from './style.css'
import store from '../../store'
import getPageContent from '../../utils/getPageContent'
import { rollText } from '../../utils/transformText'

class Navigation extends Component {
  state = {
    active: false
  };

  renderPageItem(page) {
    let classes = classnames(
      page.active ? style.pageActive : null
    )

    return (
      <li key={page.id} className={classes}>
        <Link to={page.link} onMouseOver={::this.cycle} data-text={page.title}>
          {page.title}
        </Link>
      </li>
    )
  }

  cycle(event) {
    rollText(event.target)
  }

  toggleNav() {
    this.refs.burger.toggle()

    this.setState({
      active: ! this.state.active
    })
  }

  render() {
    const { data } = store.getState()

    let pages = []
    let keys = ['home']

    for (let k in data.pages) {
      if (k === '404') continue
      if (k === 'home') continue
      if (! data.pages[k]['index.md']) continue

      keys.push(k)
    }

    for (let i = 0, _len = keys.length; i < _len; i++) {
      let k = keys[i]
      let page = {}
      page.title = k
      page.id = data.pages[k]['index.md'].rev
      page.link = k === 'home' ? '/' : `/${k}`
      page.active = page.link === this.props.location.pathname
      pages.push(page)
    }

    let classes = classnames(
      this.props.className,
      style.nav,
      this.state.active ? style.active : null
    )

    return (
      <nav className={classes}>
        <div className={style.burger} onClick={::this.toggleNav}>
          <Arrow ref="burger" menu />
        </div>
        <div className={style.navInner}>
          <ul>
            {pages.map(::this.renderPageItem)}
          </ul>
        </div>
      </nav>
    )
  }
}

export default Navigation
