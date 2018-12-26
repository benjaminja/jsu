import styled from 'styled-components'

const DocsButton = styled.div`
  display: grid;
  justify-items: center;
  margin: 1rem auto 0.5rem;
  button {
    padding: 0.25rem 0.5rem;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    font-size: 1.75rem;
    color: ${props => props.theme.black};
    background: ${props => props.theme.offWhite};
    border: 1px solid ${props => props.theme.grey[1]};
    cursor: pointer;
    outline: 0;
    &:hover {
      background: ${props => props.theme.white};
    }
  }
`

export default props => (
  <DocsButton>
    <button onClick={props.toggleDetail}>
      {props.showDetail ? '📖' : '📓'} Learn the knitty gritty about this tutorial
    </button>
  </DocsButton>
)
