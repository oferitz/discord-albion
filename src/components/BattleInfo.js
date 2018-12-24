import React from 'react'
import styled from '@emotion/styled'
import distanceInWords from 'date-fns/distance_in_words'
import InfoWidget from '../components/InfoWidget'
import skull from '../style/icons/skull.svg'
import fame from '../style/icons/fame.svg'
import clock from '../style/icons/clock.svg'
import format from 'date-fns/format'

const StyledBattleInfo = styled.section({
	gridArea: 'info',
	textAlign: 'center',
	padding: 15
})

const InfoWidgets = styled.section({
	marginTop: 20,
	display: 'grid',
	gridTemplateColumns: 'repeat(3, 1fr)'
})

const BattleInfo = props => {
	const { data } = props
	const { playersKilled, totalFame, eventStartTime, eventEndTime } = data
	let formattedFame = new Intl.NumberFormat('en-US').format(totalFame)
	let distance = distanceInWords(eventStartTime, eventEndTime)
	let sub = `Start: ${format(eventStartTime, 'HH:mm:ss')} | End: ${format(eventEndTime, 'HH:mm:ss')}`
	return (
		<StyledBattleInfo>
			<InfoWidgets>
				<InfoWidget icon={skull} title="Players Killed" value={playersKilled} />
				<InfoWidget icon={clock} title="Duration" value={distance} sub={sub} />
				<InfoWidget icon={fame} title="Total Fame" value={formattedFame} />
			</InfoWidgets>
		</StyledBattleInfo>
	)
}
export default BattleInfo
