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
    display: grid;
    align-items: center;
    font-size: 2rem;
    margin: 0 0 0.5rem 0;
    color: ${props => props.theme.black};
    background: ${props => props.theme.offWhite};
    border: 1px solid ${props => props.theme.grey[1]};
    line-height: 1;
    padding: 0.5rem 0.5rem 0.25rem;
  }
`

export default ({ course }) => (
  <Title>
    <p className="title">{course.title}</p>
    <div className="summary">
      <span>👉 {course.summary}</span>
    </div>
  </Title>
)
