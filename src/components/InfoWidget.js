import React from 'react'
import styled from '@emotion/styled'

const StyledInfoWidget = styled.div({
  display: 'flex',
  justifyContent: 'center'
})
const StyledInfoWidgetIcon = styled.div({
  alignSelf: 'center',
  marginRight: 10
})
const StyledInfoWidgetContent = styled.div({
  'label, strong': {
    display: 'block'
  },
  strong: {
    fontSize: '2em',
    marginTop: 5
  },
  p: {
    fontSize: 11
  }
})

const InfoWidget = props => {
  const { icon, title, value, sub } = props
  return (
    <StyledInfoWidget>
      <StyledInfoWidgetIcon>
        <img src={icon} width={50} />
      </StyledInfoWidgetIcon>
      <StyledInfoWidgetContent>
        <label>{title}</label>
        <strong>{value}</strong>
        {sub && <p>{sub}</p>}
      </StyledInfoWidgetContent>
    </StyledInfoWidget>
  )
}
export default InfoWidget
