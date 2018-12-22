import React from 'react'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import Meta from './Meta'
import ChatContainer from '../Chat/ChatContainer'
import UserButton from '../User/UserButton'
import shadows from '../styles/shadows'

const theme = {
  primary: {
    light: '#51A3E6',
    main: '#2089DF',
    dark: '#1B73BB'
  },
  secondary: {
    light: '#FFEB85',
    main: '#FFDA1F',
    dark: '#FAC400'
  },
  grey: ['#F0F0F0', '#D9D9D9', '#BFBFBF', '#A6A6A6', '#8C8C8C'],
  black: '#333333',
  white: '#FFFFFF',
  offWhite: '#FAFAFA',
  maxWidth: '1200px',
  shadows,
  background: 'white'
}

const StyledPage = styled.div`
  background: ${props => props.theme.background};
  color: ${props => props.theme.color};
`

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  height: 100vh;
  overflow: auto;
`

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Regular';
    src: url('/static/YanoneKaffeesatz-Regular.ttf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Text';
    src: url('/static/RobotoCondensed-Regular.ttf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  @font-face {
    font-family: 'Display';
    src: url('/static/Wellfleet-Regular.ttf') format('opentype');
    font-weight: normal;
    font-style: normal;
  }
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    overflow: hidden;
  }
  a {
    text-decoration: none;
    color: #333333;
  }
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: ${props => props.theme.grey[0]};
  }
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.grey[1]};
  }
  .emoji-mart-scroll {
    height: 180px;
    padding: 0 3px 6px 3px;
  }
  .emoji-mart-search input {
    font-family: 'Text';
  }
`

export default class Page extends React.Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <GlobalStyle />
          <Inner>{this.props.children}</Inner>
          <UserButton />
          <ChatContainer />
        </StyledPage>
      </ThemeProvider>
    )
  }
}
