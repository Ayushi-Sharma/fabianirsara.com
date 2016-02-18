
import React, { Component } from 'react'
import classnames from 'classnames'

import style from './style.css'
import Text from '../Text'

class List extends Component {
  render() {
    const { data } = this.props

    return (
      <section className={style.list}>
        <Text data={data} />
      </section>
    )
  }
}

export default List
