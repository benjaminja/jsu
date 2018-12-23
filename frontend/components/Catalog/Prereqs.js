import React from 'react'
import styled from 'styled-components'
import PREREQUISITES from './data'

const Tabs = styled.div`
  display: grid;
  grid-template-rows: repeat(7, auto);
  float: left;
`

const Tab = styled.button`
  font-family: 'Text', Arial, Helvetica, sans-serif;
  font-size: 1.25rem;
  text-align: center;
  background: ${props =>
    props.index === props.tabIndex ? props.theme.black : props.theme.offWhite};
  color: ${props => (props.index === props.tabIndex ? props.theme.white : props.theme.grey[2])};
  border: 0;
  border-bottom: 1px dashed ${props => (props.index === props.tabIndex ? 0 : props.theme.grey[0])};
  outline: 0;
  padding: 0.5rem;
`

const Content = styled.div`
  display: ${props => (props.index === props.tabIndex ? 'grid' : 'none')};
  align-items: center;
  font-size: 1.25rem;
  padding: 0 0.5rem 0 1rem;
  margin: 0;
  p {
    line-height: 1.25;
    text-align: justify;
    margin: 0;
  }
  a {
    display: block;
    color: ${props => props.theme.primary.main};
    text-decoration: underline;
    &:hover {
      color: ${props => props.theme.primary.dark};
    }
  }
`

export default class Prereqs extends React.Component {
  state = {
    tabIndex: 0
  }

  setTabIndex = tabIndex => this.setState({ tabIndex })

  render() {
    const tabIndex = this.state.tabIndex
    const index = this.props.index
    return (
      <React.Fragment>
        <Tabs>
          {PREREQUISITES[index].map((p, i) => (
            <Tab key={p.tab} index={i} tabIndex={tabIndex} onClick={() => this.setTabIndex(i)}>
              {p.tab}
            </Tab>
          ))}
        </Tabs>
        {PREREQUISITES[index].map((p, i) => (
          <Content key={i} index={i} tabIndex={tabIndex}>
            <p>{p.text}</p>
            {p.links && (
              <div>
                {p.links.map((p, j) => (
                  <a key={p.href} href={p.href} target="blank">
                    {p.text}
                  </a>
                ))}
              </div>
            )}
          </Content>
        ))}
      </React.Fragment>
    )
  }
}
