import styled from 'styled-components'
import Media from './Media'

const Form = styled.form`
  height: 80vh;
  display: grid;
  justify-items: center;
  align-items: center;

  fieldset {
    width: 400px;
    display: grid;
    grid-template-rows: 0.5fr auto 1fr 1fr 1fr 1fr 1fr 1fr;
    border: 1px solid ${props => props.theme.grey[2]};
    background: ${props => props.theme.grey[0]};
    ${Media.phone`
      width: 350px;
    `}
  }
  p {
    font-size: 3rem;
    text-align: center;
    margin: 0;
  }
  .small {
    display: block;
    font-size: 1.35rem;
    margin-bottom: 1rem;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
    outline: 0;
    &:hover {
      color: ${props => props.theme.primary.dark};
    }
  }
  label {
    display: grid;
    grid-template-columns: 1fr 2fr;
    margin-bottom: 1rem;
    font-size: 2rem;
  }
  input {
    padding: 0 0.5rem;
    font-size: 2rem;
    font-family: 'Regular';
    &:focus {
      outline: 1px solid ${props => props.theme.secondary.main};
    }
  }
  button {
    width: 100%;
    font-family: 'Regular';
    font-size: 3rem;
    margin-top: 2rem;
    padding: 1rem 0;
    border: 1px solid ${props => props.theme.secondary.dark};
    background: ${props => props.theme.secondary.main};
    transition: all 0.25s;
    &:focus {
      outline: none;
      box-shadow: ${props => props.theme.shadows[2]};
    }
  }
  .github {
    display: flex;
    justify-content: center;
    width: 100%;
    font-family: 'Regular';
    font-size: 3rem;
    line-height: 1.75;
    margin-top: 1rem;
    border: 1px solid ${props => props.theme.grey[2]};
    background: ${props => props.theme.grey[1]};
    color: ${props => props.theme.black};
    &:focus {
      outline: none;
      box-shadow: ${props => props.theme.shadows[2]};
    }
  }
`

export default Form
