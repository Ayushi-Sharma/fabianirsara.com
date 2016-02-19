
import React, { Component } from 'react'

import classnames from 'classnames'
import style from './style.css'

class Arrow extends Component {
  state = {
    active: false
  };

  toggle() {
    this.setState({
      active: ! this.state.active
    })
  }

  setActiveState(value) {
    this.setState({
      active: value
    })
  }

  render() {
    let classes = classnames(
      style.arrow,
      this.state.active ? style.active : null,
      this.props.bottom ? style.bottom : null,
      this.props.top ? style.top : null,
      this.props.left ? style.left : null,
      this.props.right ? style.right : null,
      this.props.menu ? style.menu : null
    )

    return (
      <span className={classes}>
        <span className={style.arrowInner}>
          <span className={classnames(style.line, style.first)} />
          <span className={classnames(style.line, style.second)} />
        </span>
      </span>
    )
  }
}

export default Arrow
