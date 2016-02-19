
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

  componentDidMount() {
    window.addEventListener('closeNavigation', (this._handleCloseNavigation = ::this.handleCloseNavigation))
  }

  componentWillUnmount() {
    window.removeEventListener('closeNavigation', this._handleCloseNavigation)
  }

  handleCloseNavigation() {
    this.setActiveState(false)
  }

  renderPageItem(page) {
    let classes = classnames(
      page.active ? style.pageActive : null
    )

    return (
      <li key={page.id} className={classes} onClick={::this.handleClick}>
        <Link to={page.link} onMouseOver={::this.cycle} data-text={page.title}>
          {page.title}
        </Link>
      </li>
    )
  }

  handleClick(event) {
    event.stopPropagation()
  }

  cycle(event) {
    if (window.innerWidth > 1025) {
      rollText(event.target)
    }
  }

  handleBurgerClick(event) {
    event.stopPropagation()
    this.toggleNav()
  }

  toggleNav() {
    this.refs.burger.toggle()

    this.setState({
      active: ! this.state.active
    })
  }

  setActiveState(value) {
    this.refs.burger.setActiveState(value)

    this.setState({
      active: value
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
      page.active = page.link === this.props.location.pathname
      if (page.link !== '/' && this.props.location.pathname.indexOf(page.link) === 0) {
        page.active = true
      }

      pages.push(page)
    }

    let classes = classnames(
      this.props.className,
      style.nav,
      this.state.active ? style.active : null
    )

    return (
      <nav ref="nav" id="nav" className={classes}>
        <div className={style.burger} onClick={::this.handleBurgerClick}>
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
