import React from 'react'
import styled from '@emotion/styled'

const StyledGuild = styled.div({
	display: 'flex'
})

const GuildIcon = styled.span(({ guild }) => ({
	background: guild === 'Red' ? '#ff006a' : '#03a9f4',
	width: 14,
	height: 14,
	borderRadius: '50%',
	alignSelf: 'center',
	marginRight: 5
}))

const Guild = props => {
	const { name, guild } = props
	return (
		<StyledGuild>
			<GuildIcon guild={guild} />
			{name && <strong>{name}</strong>}
		</StyledGuild>
	)
}
export default Guild
