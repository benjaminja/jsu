import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import Error from '../App/Error'
import { Card } from './EmailCard'
import PwdQuality from '../User/PwdQuality'

const UPDATE_PASSWORD_MUTATION = gql`
  mutation UPDATE_PASSWORD_MUTATION($password: String!, $newPassword: String!) {
    updatePwd(password: $password, newPassword: $newPassword) {
      success
      message
    }
  }
`

export default ({ password, newPassword, onChange, onUpdatePwd }) => (
  <Mutation mutation={UPDATE_PASSWORD_MUTATION}>
    {(updatePwd, { loading, error }) => (
      <Card>
        <div className="top">Password</div>
        <form className="content" method="POST" onSubmit={e => onUpdatePwd(e, updatePwd)}>
          <span className="label">Current Password</span>
          <input
            type="password"
            name="password"
            placeholder="👉 current password"
            value={password}
            onChange={onChange}
          />
          <span className="label">New Password</span>
          <input
            type="password"
            name="newPassword"
            placeholder="🙈 new password"
            value={newPassword}
            onChange={onChange}
          />
          <Error error={error} />
          <button>Updat{loading ? 'ing' : 'e'}</button>
        </form>
      </Card>
    )}
  </Mutation>
)
