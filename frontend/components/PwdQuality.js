import styled from 'styled-components'
import PropTypes from 'prop-types'

const PwdQuality = styled.span`
  display: grid;
  grid-template-columns: auto repeat(6, 1fr);
  grid-gap: 5px;
  align-items: center;
  font-size: 1.25rem;
  color: ${props => props.theme.black};
  .pwd {
    display: block;
    align-self: center;
    height: 5px;
    transition: all 0.5s ease-in;
  }
  .pwd1 {
    background: red;
    opacity: ${props => (props.pwd > 0 ? 1 : 0)};
  }
  .pwd2 {
    background: orangered;
    opacity: ${props => (props.pwd > 1 ? 1 : 0)};
  }
  .pwd3 {
    background: darkorange;
    opacity: ${props => (props.pwd > 2 ? 1 : 0)};
  }
  .pwd4 {
    background: orange;
    opacity: ${props => (props.pwd > 3 ? 1 : 0)};
  }
  .pwd5 {
    background: gold;
    opacity: ${props => (props.pwd > 4 ? 1 : 0)};
  }
  .hide {
    font-size: 1.5rem;
    text-align: center;
    cursor: pointer;
  }
`

const Pwd = ({ pwd, hide, handleHide }) => (
  <PwdQuality pwd={pwd}>
    Password Quality:
    <span className="pwd pwd1" />
    <span className="pwd pwd2" />
    <span className="pwd pwd3" />
    <span className="pwd pwd4" />
    <span className="pwd pwd5" />
    <span className="hide" onClick={handleHide}>
      {hide ? '👓' : '🚫'}
    </span>
  </PwdQuality>
)

Pwd.propTypes = {
  pwd: PropTypes.number.isRequired,
  hide: PropTypes.bool.isRequired,
  handleHide: PropTypes.func.isRequired
}

export default Pwd
