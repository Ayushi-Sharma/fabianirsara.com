
import React, { Component } from 'react'
import style from './style.css'

class MainSection extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount() {
    window.addEventListener('resize', ::this.handleResize)
    this.handleResize()
  }

  componentWillUnmount() {
    window.removeEventListener('resize', ::this.handleResize)
  }

  handleResize() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight / 6 * 5
    })
  }

  render() {
    let css = {}
    css.paddingTop = this.state.height + 'px'

    const { children, data, content } = this.props

    return (
      <section className={style.main} style={css}>
        {children}
      </section>
    )
  }
}

export default MainSection
