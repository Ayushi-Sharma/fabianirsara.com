
import React, { Component } from 'react'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import Footer from '../../components/Footer'
import style from './style.css'

class App extends Component {
  render() {
    const { children } = this.props
    const poster = 'storage/portfolio/collections/alm/_dsf4407.jpg'
    return (
      <div className={style.wrapper}>
        <Header poster={poster} />
        <MainSection />
        <Footer />
        {children}
      </div>
    )
  }
}

export default App
