
import React, { Component } from 'react'
import Page from '../Page'

class Home extends Component {
  render() {
    return (
      <Page location={this.props.location}>
        <p>Test</p>
      </Page>
    )
  }
}

export default Home
