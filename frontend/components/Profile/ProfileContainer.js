import React from 'react'
import Error from 'next/error'
import styled from 'styled-components'
import Signout from './Signout'
import User from '../User/User'
import Courses from './Courses'
import Settings from './Settings'

const Container = styled.div`
  height: calc(100vh - 45px);
  padding: 1rem;
`

export default props => (
  <User>
    {({ data, loading, error }) => {
      if (loading) return <p>Loading...</p>
      const user = data.me
      if (!user) return <Error />
      return (
        <Container>
          <Courses user={user} />
          <Settings user={user} />
          <Signout />
        </Container>
      )
    }}
  </User>
)
