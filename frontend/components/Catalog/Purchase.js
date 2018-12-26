import styled from 'styled-components'
import Checkout from '../Checkout'
import formatMoney from '../../lib/formatMoney'

const PurchaseButton = styled.div`
  display: grid;

  button {
    border: 1px solid ${props => props.theme.secondary.dark};
    background: ${props => props.theme.secondary.main};
    padding: 1rem;
    font-size: 3rem;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      background: ${props => props.theme.tertiary.main};
      border: 1px solid ${props => props.theme.tertiary.dark};
    }
  }
`

export default ({ isOwned, course, moneyFace, onMouseOver, onMouseOut }) => {
  let content = isOwned
    ? `😎 You own it`
    : `Purchase ${moneyFace ? '🤑' : '😐'} ${formatMoney(course.price)}`
  return (
    <Checkout courseId={course.id} amount={course.price} description={course.title}>
      <PurchaseButton onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
        <button>{content}</button>
      </PurchaseButton>
    </Checkout>
  )
}
