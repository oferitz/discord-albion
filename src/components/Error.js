import React from 'react'
import styled from '@emotion/styled'

const StyledError = styled.div({
  position: 'absolute',
  top: '50%',
  left: 'calc(50% - 250px)',
  transform: 'translate(-50%, -50%)'
})

const Error = props => {
  const { msg } = props
  return (
    <StyledError>
      <h1>No Data Yet...</h1>
    </StyledError>
  )
}
export default Error
