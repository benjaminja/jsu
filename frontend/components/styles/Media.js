import { css } from 'styled-components'

const sizes = {
  wide: 1199,
  desktop: 991,
  tablet: 768,
  phone: 575
}

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${sizes[label] / 16}em) {
      ${css(...args)}
    }
  `
  return acc
}, {})

export default media
