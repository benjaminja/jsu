import styled from 'styled-components'
import { formatDistance } from 'date-fns'
import Code from './Code'

const Messages = styled.div`
  display: grid;
  grid-gap: 15px;
  align-self: flex-end;
  align-items: flex-end;
  .user,
  .admin {
    width: 66%;
    display: grid;
    justify-self: flex-end;
    font-size: 1rem;
    font-family: 'Text', Arial, Helvetica, sans-serif;
    text-align: right;
    .meta {
      display: grid;
      grid-template-columns: 1fr auto;
      grid-gap: 0.75rem;
      align-items: center;
      margin-bottom: 0.25rem;
      img {
        justify-self: flex-end;
        border-radius: 50%;
      }
      .details {
        justify-self: flex-end;
        display: grid;
        grid-template-rows: 1fr 1fr;
        line-height: 1.25;
        & > :last-child {
          color: ${props => props.theme.grey[4]};
        }
      }
    }
    .text {
      border-radius: 5px;
      font-size: 1.25rem;
      line-height: 1.5;
      text-align: justify;
      padding: 0.75rem 1rem;
      background: ${props => props.theme.black};
      color: ${props => props.theme.white};
      box-shadow: ${props => props.theme.shadows[0]};
    }
    .image {
      width: 100%;
      border: 1px solid ${props => props.theme.grey[0]};
      border-radius: 5px;
      cursor: zoom-in;
    }
  }
  .admin {
    justify-self: flex-start;
    text-align: left;
    .meta {
      grid-template-columns: auto 1fr;
      .details {
        justify-self: flex-start;
      }
    }
    .text {
      background: ${props => props.theme.grey[0]};
      color: ${props => props.theme.black};
    }
  }
`

const MiniAvatar = styled.div`
  width: 25px;
  height: 25px;
  display: grid;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;
  font-family: 'Regular', Arial, Helvetica, sans-serif;
  text-transform: uppercase;
  background: ${props => props.theme.black};
  color: ${props => props.theme.offWhite};
  border-radius: 50%;
`

export default props => (
  <Messages>
    {props.messages.map(m => {
      if (m.user.id === props.user.id) {
        return (
          <div
            key={m.id}
            className="user"
            style={{
              width: m.style === 'CODE' && '90%'
            }}
          >
            <div className="meta">
              <div className="details">
                <span>{m.user.name}</span>
                <i>{formatDistance(m.createdAt, Date.now())} ago</i>
              </div>
              {m.user.image ? (
                <img src={m.user.image} width="25" />
              ) : (
                <MiniAvatar>{m.user.name[0]}</MiniAvatar>
              )}
            </div>
            {m.style === 'TEXT' ? (
              <div className="text">{m.text}</div>
            ) : m.style === 'CODE' ? (
              <Code>{m.text}</Code>
            ) : m.style === 'IMAGE' ? (
              <img className="image" src={m.text} onClick={() => props.openImageModal(m.text)} />
            ) : null}
          </div>
        )
      } else {
        return (
          <div key={m.id} className="admin">
            <div className="meta">
              <img
                src="https://s3-us-west-1.amazonaws.com/js-universe/assets/myAvatar.png"
                width="25"
              />
              <div className="details">
                <span>benjaminadk</span>
                <i>{formatDistance(m.createdAt, Date.now())} ago</i>
              </div>
            </div>
            {m.style === 'TEXT' ? <div className="text">{m.text}</div> : <div>CODE</div>}
          </div>
        )
      }
    })}
    <span ref={props.scrollRef} />
  </Messages>
)
