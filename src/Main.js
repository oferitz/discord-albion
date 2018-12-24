import React from 'react'
import BattleInfo from './components/BattleInfo'
import BattleStatistics from './components/BattleStatistics'
import TopPlayers from './components/TopPlayers'
import BattleHistory from './components/BattleHistory'
import styled from '@emotion/styled'
import {SIDE_BAR_WIDTH} from './style/global'

const StyledMain = styled.div({
	width: `calc(100% - ${SIDE_BAR_WIDTH})`,
	padding: 30,
	marginLeft: SIDE_BAR_WIDTH,
	display: 'grid',
	gridGap: 10,
	gridTemplateColumns: '1fr 1fr',
	gridTemplateRows: 'auto',
	gridTemplateAreas: "'info info' 'stats topPlayers' 'history history'"
})

const renderLoading = () => <div>...loading</div>

const renderBattle = (data) => {
	return (
		<StyledMain>
			<BattleInfo data={data.info}/>
			<BattleStatistics data={data.stats}/>
			<TopPlayers data={data.topPlayers}/>
			<BattleHistory data={data.history}/>
		</StyledMain>
	)
}



const Main = props => {
	const { data, loading } = props
	return <main>{loading ? renderLoading() : renderBattle(data)}</main>
}
export default Main
