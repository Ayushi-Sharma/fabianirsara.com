
import React, { Component } from 'react'
import style from './style.css'
import { config } from '../../utils/getConfig'
import screenSize from '../../utils/screenSize'

import classnames from 'classnames'

class MainSection extends Component {
  render() {
    const { children, data, content } = this.props

    this.config = {
      ...config,
      ...data.config
    }

    return (
      <section ref="node" className={classnames('main-wrapper', style.main, this.props.data.poster ? style.hasPoster : null)}>
        <div className={style.mainWrapper}>
          <div className={style.mainWrapperInner}>
            {children}
          </div>
        </div>
      </section>
    )
  }
}

export default MainSection
