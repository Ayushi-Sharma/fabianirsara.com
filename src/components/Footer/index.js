
import React, { Component } from 'react'
import style from './style.css'
import grid from '../../assets/css/grid.css'

import superb from 'superb'
import weekday from '../../utils/weekday'

class Footer extends Component {
  render() {
    return (
      <footer className={style.footer}>
        <div className={grid.container}>
          <p>Have {superb.prefix()} {weekday()}</p>
        </div>
      </footer>
    )
  }
}

export default Footer
