
import React, { Component } from 'react'
import { Link } from 'react-router'

import classnames from 'classnames'
import style from './style.css'
import store from '../../store'
import { rollText } from '../../utils/transformText'

class Navigation extends Component {
  renderPageItem(page) {
    return (
      <li key={page.id}>
        <Link to={page.link} onMouseOver={::this.cycle} data-text={page.title}>
          {page.title}
        </Link>
      </li>
    )
  }

  cycle(event) {
    rollText(event.target)
  }

  render() {
    const { data } = store.getState()

    let pages = []

    for (let k in data.pages) {
      if (k === '404') continue
      if (k === 'home') continue
      if (! data.pages[k]['index.md']) continue

      let page = {}
      page.title = k
      page.id = data.pages[k]['index.md'].rev
      page.link = `/${k}`
      pages.push(page)
    }

    return (
      <nav className={classnames(this.props.className, style.nav)}>
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
