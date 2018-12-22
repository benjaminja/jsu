import React from 'react'
import styled from 'styled-components'
import { endOfMonth, format } from 'date-fns'
import media from './styles/Media'
import Subscribe from './Subscribe'
import Courses from './Courses'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Courses />
      </div>
    )
  }
}
