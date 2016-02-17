
import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.css'
import grid from '../../assets/css/grid.css'

import { rollText } from '../../utils/transformText'

class Links extends Component {
  renderPageItem(link) {
    return (
      <li key={link.id}>
        <Link to={link.link} target="_blank" onMouseOver={::this.cycle} data-text={link.title}>
          {link.title}
        </Link>
      </li>
    )
  }

  cycle(event) {
    rollText(event.target)
  }

  render() {
    let links = []

    for (let k in this.props.links) {
      if (! this.props.links[k].title) continue
      if (! this.props.links[k].link) continue

      this.props.links[k].id = links.length
      links.push(this.props.links[k])
    }


    return (
      <nav className={style.links}>
        <ul>
          {links.map(::this.renderPageItem)}
        </ul>
      </nav>
    )
  }
}

export default Links
