import React from 'react'
import styled from 'styled-components'
import formatTime from '../../lib/formatTime'

const Row = styled.div`
  button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    text-align: left;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    padding: 0.5rem 0.25rem;
    border: 1px solid ${props => props.theme.grey[1]};
    outline: 0;
    background: ${props => (props.open ? props.theme.black : props.theme.white)};
    color: ${props => (props.open ? props.theme.offWhite : props.theme.black)};
    transition: all 0.5s;
    & > :last-child {
      margin-right: 0.25rem;
    }
  }
  .accordion {
    max-height: ${props => (props.open ? `${props.maxHeight}px` : `0px`)};
    line-height: 1.25;
    font-size: 1.25rem;
    text-align: justify;
    padding: 0 0.25rem;
    overflow: hidden;
    transition: all 0.5s;
    p {
      margin: 0;
      padding: 0.5rem;
    }
  }
`

export default class VideoRow extends React.Component {
  render() {
    const {
      video: { number, title, description, time },
      selected,
      onClick
    } = this.props
    return (
      <Row open={selected} maxHeight={this.div ? this.div.scrollHeight : 0}>
        <button onClick={onClick}>
          <span>
            {number}. {title}
          </span>
          <span>{formatTime(time)}</span>
        </button>
        <div ref={ref => (this.div = ref)} className="accordion">
          <p>{description}</p>
        </div>
      </Row>
    )
  }
}
