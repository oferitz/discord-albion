import React, { useState } from 'react'
import format from 'date-fns/format'
import styled from '@emotion/styled'
import {SIDE_BAR_WIDTH} from '../style/global'

const StyledEvents = styled.div({
	position: 'fixed',
	left: 0,
	top: 0,
	width: SIDE_BAR_WIDTH,
	background: '#673ab7',
	height: '100vh',
	'h2': {
		padding: 10,
		textAlign: 'center',
	}
})
const StyledEventList = styled.div({
	marginTop: 10
})

const StyledEventItem = styled.div(
	{
		padding: '20px 6px 20px 10px',
		cursor: 'pointer',
		':hover': {
			background: '#8053E4',
			borderLeft: '2px solid #fff'
		}
	},
	({isActive}) => ({
		background: isActive ? '#8053E4' : 'none',
		borderLeft: isActive ? '2px solid #fff' : 'none'
	})

)

const renderLoading = () => <div>...loading</div>

const renderEvents = (data, onSelect) => {
	const [activeEvent, setActiveEvent] = useState(data[0].eventId)
	const onEventClick = (eventId) => {
		setActiveEvent(eventId)
		onSelect(eventId)
	}
	return (
		<StyledEvents>
			<h2>Events</h2>
			<StyledEventList>
				{data.map(e => (
					<StyledEventItem key={e.eventId} onClick={() => onEventClick(e.eventId)} isActive={activeEvent === e.eventId}>
						{e.eventId} - {format(e.start, 'DD/MM/YYYY')}
					</StyledEventItem>
				))}
			</StyledEventList>
		</StyledEvents>
	)
}

const Events = props => {
	const { data, loading, onSelect } = props
	return <section>{loading ? renderLoading() : renderEvents(data, onSelect)}</section>
}
export default Events
