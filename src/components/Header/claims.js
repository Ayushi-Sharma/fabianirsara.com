
import React, { Component } from 'react'
import shuffle from '../../utils/shuffle'
import transformText from '../../utils/transformText'

const words = [
  'Web Developer',
  'Photographer',
  'Traveller',
  'Casual Nerd',
  'Chocolate Lover',
  'Coffee addict'
]

class Claims extends Component {
  componentDidMount() {
    this.list = []
    this.nextCycle()
  }

  componentWillUnmount() {
    if (this._cycleTimeout) {
      clearTimeout(this._cycleTimeout)
    }
  }

  getListItem() {
    if (this.list.length === 0) {
      this.list = shuffle(words.concat([]))
    }

    return this.list.shift()
  }

  nextCycle() {
    if (this._cycleTimeout) clearTimeout(this._cycleTimeout)
    this._cycleTimeout = setTimeout(::this.cycle, 3500)
  }

  cycle() {
    this.nextCycle()

    setTimeout(::this.cycle1, 17 + Math.random() * 900)
    setTimeout(::this.cycle2, 170 + Math.random() * 900)
    setTimeout(::this.cycle3, 300 + Math.random() * 900)
  }

  cycle1() {
    transformText(this.refs.word1, this.getListItem())
  }

  cycle2() {
    transformText(this.refs.word2, this.getListItem())
  }

  cycle3() {
    transformText(this.refs.word3, this.getListItem())
  }

  render() {
    return (
      <span>
        <span ref="word1">{words[0]}</span>, <span ref="word2">{words[1]}</span>, <span ref="word3">{words[2]}</span>
      </span>
    )
  }
}

export default Claims
