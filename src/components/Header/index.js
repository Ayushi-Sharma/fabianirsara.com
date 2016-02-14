
import React, { Component } from 'react'
import { Link } from 'react-router'

import Navigation from '../Navigation'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import logo from '../../assets/logo/white.png'

class Header extends Component {
  render() {
    return (
      <header className={style.header}>
        <div className={grid.container}>
          <div className={style.logo}>
            <Link to="/">
              <img src={logo} />
            </Link>
          </div>
          <Navigation className={style.nav} />
        </div>
      </header>
    )
  }
}

export default Header
