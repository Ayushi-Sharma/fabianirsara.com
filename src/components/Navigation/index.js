
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
    this._justClicked = false
    window.addEventListener('closeNavigation', (this._handleCloseNavigation = ::this.handleCloseNavigation))
    document.body.addEventListener('click', (this._handleBodyClick = ::this.handleBodyClick))
  }

  componentWillUnmount() {
    window.removeEventListener('closeNavigation', this._handleCloseNavigation)
    document.body.removeEventListener('click', this._handleBodyClick)
  }

  handleCloseNavigation() {
    setTimeout(::this.checkIfCanClose, 17)
  }

  handleBodyClick(event) {
    window.dispatchEvent(new Event('closeNavigation'))
  }

  checkIfCanClose() {
    if (! this._justClicked) {
      this.setActiveState(false)
    }
  }

  clicked() {
    this._justClicked = true
    setTimeout(::this.unlock, 170)
  }

  unlock() {
    this._justClicked = false
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
    this.clicked()
  }

  cycle(event) {
    if (window.innerWidth > 1025) {
      rollText(event.target)
    }
  }

  handleBurgerClick(event) {
    event.stopPropagation()
    this.toggleNav()
    this.clicked()
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

    let pageKeys = []

    for (let k in data.pages) {
      pageKeys.push(k)
    }

    pageKeys.sort()

    for (let i = 0; i < pageKeys.length; i++) {
      let k = pageKeys[i]

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
