
import React, { Component } from 'react'
import { Link } from 'react-router'

import Poster from '../Poster'
import Claims from './claims'
//import Navigation from '../Navigation'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import logo from '../../assets/logo/white.png'

class Header extends Component {
  render() {
    const { poster } = this.props

    return (
      <header className={style.header}>
        <Poster file={poster} />
        <div className={style.top}>
          <div className={grid.container}>
            <div className={style.logo}>
              <Link to="/">
                <img src={logo} />
              </Link>
            </div>
          </div>
        </div>
        <div className={style.text}>
          <h1>Fabian Irsara</h1>
          <h2><Claims /></h2>
        </div>
      </header>
    )
  }
}

export default Header
