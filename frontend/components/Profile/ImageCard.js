import { Mutation } from 'react-apollo'
import { Card, UPDATE_USER_MUTATION } from './EmailCard'
import { SIGN_S3_MUTATION } from '../Chat/ChatBottom'
import Error from '../App/Error'

export default ({ fileRef, image, newImage, onImageClick, onFileChange, onUpdateImage }) => (
  <Mutation mutation={UPDATE_USER_MUTATION}>
    {(updateUser, { loading: l1, error: e1 }) => (
      <Mutation mutation={SIGN_S3_MUTATION}>
        {(s3Sign, { loading: l2, error: e2 }) => (
          <Card>
            <div className="top">Image</div>
            <form className="content" method="POST" onSubmit={e => onUpdateImage(e, updateUser)}>
              <img src={newImage ? newImage : image} onClick={onImageClick} />
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple={false}
                onChange={e => onFileChange(e, s3Sign)}
              />
              <span>{newImage ? "🤔 don't forget to update" : '🔳 square image is best'}</span>
              <Error error={e1 || e2} />
              <button>{l2 ? '💪' : l1 ? 'Updating' : 'Update'}</button>
            </form>
          </Card>
        )}
      </Mutation>
    )}
  </Mutation>
)
