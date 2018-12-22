import React from 'react'
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import js from 'react-syntax-highlighter/dist/languages/prism/javascript'
import jsx from 'react-syntax-highlighter/dist/languages/prism/jsx'
import stizzle from 'react-syntax-highlighter/dist/styles/prism/darcula'

SyntaxHighlighter.registerLanguage('javascript', js)
SyntaxHighlighter.registerLanguage('jsx', jsx)

export default props => (
  <SyntaxHighlighter
    language="javascript"
    style={stizzle}
    wrapLines={true}
    lineProps={line => ({ style: { color: '#EEEEEE' } })}
    customStyle={{
      maxWidth: '360px',
      textAlign: 'left',
      borderRadius: '5px',
      fontSize: '1rem',
      color: '#EEEEEE'
    }}
  >
    {props.children}
  </SyntaxHighlighter>
)
