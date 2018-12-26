import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  align-self: flex-end;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0 0.25rem;
  margin-bottom: 0.6rem;
  cursor: pointer;
`

const VolumeBar = styled.div`
  width: 8px;
  &:nth-child(1) {
    height: 0.4rem;
    border-right: ${props =>
      props.volume > 0
        ? `4px solid ${props.theme.secondary.dark}`
        : `4px solid ${props.theme.grey[5]}`};
    transition: all 0.2s;
    &:hover {
      height: 1.5rem;
    }
  }
  &:nth-child(2) {
    height: 0.6rem;
    border-right: ${props =>
      props.volume >= 0.25
        ? `4px solid ${props.theme.secondary.dark}`
        : `4px solid ${props.theme.grey[5]}`};
    transition: all 0.2s;
    &:hover {
      height: 1.5rem;
    }
  }
  &:nth-child(3) {
    height: 0.9rem;
    border-right: ${props =>
      props.volume >= 0.5
        ? `4px solid ${props.theme.secondary.dark}`
        : `4px solid ${props.theme.grey[5]}`};
    transition: all 0.2s;
    &:hover {
      height: 1.5rem;
    }
  }
  &:nth-child(4) {
    height: 1.1rem;
    border-right: ${props =>
      props.volume >= 0.75
        ? `4px solid ${props.theme.secondary.dark}`
        : `4px solid ${props.theme.grey[5]}`};
    transition: all 0.2s;
    &:hover {
      height: 1.3rem;
    }
  }
  &:nth-child(5) {
    height: 1.3rem;
    border-right: ${props =>
      props.volume >= 1
        ? `4px solid ${props.theme.secondary.dark}`
        : `4px solid ${props.theme.grey[5]}`};
    transition: all 0.2s;
    &:hover {
      height: 1.5rem;
    }
  }
`

export default ({ volume, onClick }) => (
  <Container>
    <VolumeBar volume={volume} onClick={() => onClick(0.0)} />
    <VolumeBar volume={volume} onClick={() => onClick(0.25)} />
    <VolumeBar volume={volume} onClick={() => onClick(0.5)} />
    <VolumeBar volume={volume} onClick={() => onClick(0.75)} />
    <VolumeBar volume={volume} onClick={() => onClick(1.0)} />
  </Container>
)
