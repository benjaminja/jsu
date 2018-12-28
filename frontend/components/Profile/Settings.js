import React from 'react'
import axios from 'axios'
import EmailCard from './EmailCard'
import ImageCard from './ImageCard'
import PwdCard from './PwdCard'
import { Row, Header } from './Courses'
import { ME_QUERY } from '../User/User'
import formatFilename from '../../lib/formatFilename'

export default class Courses extends React.Component {
  state = {
    name: '',
    email: '',
    newImage: '',
    password: '',
    newPassword: ''
  }

  file = React.createRef()

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  onUpdateEmail = async (e, updateUser) => {
    e.preventDefault()
    let email = this.state.email || this.props.user.email
    let name = this.state.name || this.props.user.name
    const res = await updateUser({
      variables: { email, name },
      refetchQueries: [{ query: ME_QUERY }]
    })
    if (res.data.updateUser.success) {
      alert(res.data.updateUser.message)
    }
  }

  onUpdateImage = async (e, updateUser) => {
    e.preventDefault()
    const { newImage } = this.state
    if (!newImage) {
      return alert('Choose an new image before updating.')
    }
    const res = await updateUser({
      variables: { image: newImage },
      refetchQueries: [{ query: ME_QUERY }]
    })
    if (res.data.updateUser.success) {
      alert(res.data.updateUser.message)
    }
  }

  onImageClick = () => {
    this.file.current.click()
  }

  onFileChange = async (e, s3Sign) => {
    const { id } = this.props.user
    const file = e.target.files[0]
    if (file.type.slice(0, 5) !== 'image') {
      return alert('Error: File must be an image.')
    }
    const filename = formatFilename('avatars', id, file.name)
    const res = await s3Sign({
      variables: { filename, filetype: file.type }
    })
    const { requestUrl, fileUrl } = res.data.signS3
    await axios({
      method: 'PUT',
      url: requestUrl,
      headers: {
        'Content-Type': file.type
      },
      data: file,
      onUploadProgress: async e => {
        const completed = Math.round((e.loaded * 100) / e.total)
        if (completed === 100) {
          this.setState({ newImage: fileUrl })
        }
      }
    })
  }

  onUpdatePwd = async (e, updatePwd) => {
    e.preventDefault()
    const { password, newPassword } = this.state
    const res = await updatePwd({
      variables: { password, newPassword },
      refetchQueries: [{ query: ME_QUERY }]
    })
    if (res.data.updatePwd.success) {
      this.setState({ password: '', newPassword: '' })
      alert(res.data.updatePwd.message)
    }
  }

  render() {
    const {
      props: { user }
    } = this
    return (
      <Row>
        <Header>Profile</Header>
        <ImageCard
          fileRef={this.file}
          image={user.image}
          newImage={this.state.newImage}
          onImageClick={this.onImageClick}
          onFileChange={this.onFileChange}
          onUpdateImage={this.onUpdateImage}
        />
        <EmailCard
          name={user.name}
          email={user.email}
          onChange={this.onChange}
          onUpdateEmail={this.onUpdateEmail}
        />
        <PwdCard
          password={this.state.password}
          newPassword={this.state.newPassword}
          onChange={this.onChange}
          onUpdatePwd={this.onUpdatePwd}
        />
      </Row>
    )
  }
}
