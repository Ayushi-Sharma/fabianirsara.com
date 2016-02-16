
import React, { Component } from 'react'
import { Link } from 'react-router'

import Navigation from '../Navigation'
import style from './style.css'
import store from '../../store'
import grid from '../../assets/css/grid.css'
import imagepath from '../../utils/imagepath'

class Header extends Component {
  getFile(name) {
    const { data } = store.getState()

    let file = null

    if (data[`${name}@2x.png`]) {
      file = (
        <img
          src={imagepath(data[`${name}@2x.png`].localFile, 'full')}
          width={data[`${name}@2x.png`].width / 2}
          height={data[`${name}@2x.png`].height / 2} />
      )
    }

    if (data[`${name}.png`]) {
      file = (
        <img
          src={imagepath(data[`${name}.png`].localFile, 'full')}
          width={data[`${name}.png`].width}
          height={data[`${name}.png`].height} />
      )
    }

    return file
  }

  render() {
    let logoDefault = this.getFile('logo')
    let logoActive = this.getFile('logo.active')

    let logo = (
      <div className={style.logoWrap}>
        <div className={style.logoDefault}>{logoDefault}</div>
        <div className={style.logoActive}>{logoActive}</div>
      </div>
    )

    return (
      <header className={style.header}>
        <div className={grid.container}>
          <div className={style.logo}>
            <Link to="/">{logo}</Link>
          </div>
          <Navigation className={style.nav} />
        </div>
      </header>
    )
  }
}

export default Header
