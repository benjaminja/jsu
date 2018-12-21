import React from 'react'
import styled from 'styled-components'
import { endOfMonth, format } from 'date-fns'
import media from './styles/Media'
import Subscribe from './Subscribe'

const getSize = size => {
  switch (size) {
    case 'sm':
      return '1.5rem'
    case 'md':
      return '2rem'
    case 'lg':
      return '2.5rem'
    default:
      return '1.5rem'
  }
}

const Button = styled.button.attrs(props => ({
  disabled: props.loading
}))`
  display: block;
  font-size: ${props => getSize(props.size)};
  font-family: 'Regular';
  padding: 0.5rem 1rem;
  margin: 1rem;
  margin-top: 10rem;
  border: 0;
  color: white;
  background: ${props => props.theme[props.color].main};
  box-shadow: ${props => props.theme.shadows[0]};
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    box-shadow: ${props => props.theme.shadows[6]};
  }
  &:focus {
    outline: 0;
  }
  &:disabled {
    background: ${props => props.theme.grey[2]};
  }
`

export default class Home extends React.Component {
  render() {
    return (
      <Subscribe>
        <Button color="primary" size="md" loading={false}>
          Subscribe
        </Button>
      </Subscribe>
    )
  }
}
