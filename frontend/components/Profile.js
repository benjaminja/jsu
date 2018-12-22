import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import Signout from './Signout'
import User from './User/User'

const ProfileStyles = styled.div`
  height: 100vh;
  display: grid;
  justify-items: center;
  align-items: center;
`

export default class Profile extends React.Component {
  render() {
    return (
      <User>
        {({ data, loading, error }) => {
          if (loading) return <p>Loading...</p>
          const user = data.me
          if (!user) return null
          return (
            <ProfileStyles>
              <Signout />
            </ProfileStyles>
          )
        }}
      </User>
    )
  }
}
