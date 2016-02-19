
import React, { Component } from 'react'
import { Link } from 'react-router'

import style from './style.css'
import Item from './Item'
import Text from '../Text'

class List extends Component {
  renderPageItem(page) {
    return (
      <li key={page.id}>
        <Link to={page.link}>
          <Item page={page} data={this.props.data} />
        </Link>
      </li>
    )
  }

  render() {
    const { data } = this.props

    let pages = []

    for (let k in data.children) {
      if (! data.children[k].index) continue
      if (! data.children[k].config) continue

      let page = {}
      page.config = data.children[k].config.content
      page.title = page.config.title
      page.category = page.config.category
      page.id = data.children[k].index.rev
      page.link = page.config.link
      page.path = this.props.data.path + '/' + data.children[k].path
      page.preview = page.config.preview
      pages.push(page)
    }

    return (
      <section className={style.list}>
        <Text data={data} />
        <div className={style.listInner}>
          <ul>
            {pages.map(::this.renderPageItem)}
          </ul>
        </div>
      </section>
    )
  }
}

export default List
