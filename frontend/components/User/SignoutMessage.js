import styled from 'styled-components'

const Container = styled.div`
  height: calc(100vh - 45px);
  display: grid;
  justify-items: center;
  align-items: center;
  span {
    font-size: 3rem;
    font-family: 'Display', Arial, Helvetica, sans-serif;
  }
`

export default props => (
  <Container>
    <span>Adios.</span>
  </Container>
)
