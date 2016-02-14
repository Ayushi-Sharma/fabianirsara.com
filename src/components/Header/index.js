
import React, { Component } from 'react'
import { Link } from 'react-router'

import Poster from '../Poster'
import Title from './Title'
import Navigation from '../Navigation'
import style from './style.css'
import grid from '../../assets/css/grid.css'
import logo from '../../assets/logo/white.png'

class Header extends Component {
  render() {
    const { poster, content } = this.props

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
            <Navigation className={style.nav} />
          </div>
        </div>
        <Title content={content} />
      </header>
    )
  }
}

export default Header
