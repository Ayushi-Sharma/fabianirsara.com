
import React, { Component } from 'react'
import style from './style.css'
import superb from 'superb'
import weekday from '../../utils/weekday'

class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <p>Have {superb.prefix()} {weekday()}</p>
      </footer>
    )
  }
}

export default Footer
