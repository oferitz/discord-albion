import React from 'react'
import Table from 'rc-table'
import styled from '@emotion/styled'
import StyledTable from './StyledTable'
import Guild from './Guild'
import StyledHeader from './StyledHeader'

const StyledTopPlayers = styled.section({
	gridArea: 'topPlayers'
})

const TopPlayers = props => {
	const { data } = props
	const columns = [
		{
			title: 'Guild',
			key: 'guild',
			render: ({ guild }) => {
				return <Guild guild={guild} />
			}
		},
		{
			title: 'Killer',
			dataIndex: '_id',
			key: 'killer'
		},
		{
			title: 'Kills',
			dataIndex: 'kills',
			key: 'kills'
		},
		{
			title: 'Fame',
			key: 'fame',
			render: ({totalFame}) => {
				return new Intl.NumberFormat('en-US').format(totalFame)
			}
		}
	]
	return (
		<StyledTopPlayers>
			<StyledHeader>top players</StyledHeader>
			<StyledTable>
				<Table columns={columns} data={data} />
			</StyledTable>
		</StyledTopPlayers>
	)
}
export default TopPlayers
