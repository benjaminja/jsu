import styled from 'styled-components'

const Title = styled.div`
  display: grid;
  align-items: center;
  .title {
    text-align: justify;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    font-size: 4rem;
    margin: 0;
    line-height: 1;
    color: ${props => props.theme.black};
  }
  .summary {
    font-size: 2rem;
    margin: 0;
    color: ${props => props.theme.black};
  }
`

export default ({ course }) => (
  <Title>
    <p className="title">{course.title}</p>
    <div className="summary">{course.summary}</div>
  </Title>
)
