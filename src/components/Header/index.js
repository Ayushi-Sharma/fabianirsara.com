
import React, { Component } from 'react'

import Poster from '../Poster'
import style from './style.css'
import logo from '../../assets/logo/white.png'

import reqwest from 'reqwest'

class Header extends Component {
  render() {
    const { poster } = this.props

    return (
      <header className={style.header}>
        <Poster file={poster} />
        <div className={style.text}>
          <div className={style.logo}>
            <img src={logo} />
          </div>
          <h1>Fabian Irsara</h1>
          <h2>Web Developer, Photographer, Traveller</h2>
        </div>
      </header>
    )
  }
}

export default Header
