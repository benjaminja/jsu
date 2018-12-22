import styled from 'styled-components'
import Media from './styles/Media'

const Card = styled.div`
  cursor: pointer;
  img {
    width: 350px;
    height: 175px;
  }
  .title {
    text-align: justify;
    font-family: 'Regular', Arial, Helvetica, sans-serif;
    font-size: 4rem;
    margin: 0;
  }
  .tags {
    width: 350px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 1rem;
    .tag {
      text-align: center;
      background: ${props => props.theme.secondary.main};
      font-size: 1.75rem;
      padding: 0 0.5rem;
    }
  }
`

export default ({ course }) => (
  <Card>
    <img src={course.image} />
    <div className="detail">
      <p className="title">{course.title}</p>
      <div className="tags">
        {course.tags.map(t => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
    </div>
  </Card>
)
