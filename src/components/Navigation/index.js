
import React, { Component } from 'react'
import { Link } from 'react-router'

import Arrow from '../Arrow'

import classnames from 'classnames'
import style from './style.css'
import store from '../../store'
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

    for (let k in data.pages) {
      if (! data.pages[k].index) continue
      if (! data.pages[k].config.content.navigation) continue

      let page = {}
      page.config = data.pages[k].config.content
      page.title = page.config.title
      page.id = data.pages[k].index.rev
      page.link = page.config.link
      page.active = page.link.indexOf(this.props.location.pathname) === 0
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
