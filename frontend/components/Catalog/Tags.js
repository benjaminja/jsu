import styled from 'styled-components'

const Tags = styled.div`
  width: 350px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
  padding: 1rem;
  .tag {
    text-align: center;
    color: ${props => props.theme.black};
    background: ${props => props.theme.secondary.main};
    font-size: 1.75rem;
    padding: 0 0.5rem;
    border: 1px solid ${props => props.theme.secondary.dark};
  }
`

export default ({ tags }) => (
  <Tags>
    {tags.map(t => (
      <span className="tag" key={t}>
        {t}
      </span>
    ))}
  </Tags>
)
