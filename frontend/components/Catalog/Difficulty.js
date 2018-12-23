import styled from 'styled-components'

const Difficulty = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  .difficulty {
    justify-self: center;
    font-size: 1.75rem;
    color: ${props => props.theme.black};
    background: ${props => props.theme.secondary.main};
    border: 1px solid ${props => props.theme.secondary.dark};
    padding: 0 0.5rem;
  }
  input {
    width: 90%;
  }
  .levels {
    width: 90%;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    cursor: help;
  }
`

export default ({ difficulty }) => (
  <Difficulty>
    <span className="difficulty">Difficulty Level</span>
    <div>
      <div className="levels">
        <span
          style={{
            fontSize: difficulty === 'BEGINNER' ? '2.25rem' : '1.25rem'
          }}
          title="Beginner"
        >
          🐣
        </span>
        <span
          style={{
            fontSize: difficulty === 'INTERMEDIATE' ? '2.25rem' : '1.25rem'
          }}
          title="Intermediate"
        >
          🎓
        </span>
        <span
          style={{
            fontSize: difficulty === 'ADVANCED' ? '2.25rem' : '1.25rem'
          }}
          title="Advanced"
        >
          🧠‍
        </span>
      </div>
      <input
        type="range"
        min={1}
        max={3}
        step={1}
        readOnly
        onChange={() => {}}
        value={difficulty === 'BEGINNER' ? 1 : difficulty === 'INTERMEDIATE' ? 2 : 3}
      />
    </div>
  </Difficulty>
)
