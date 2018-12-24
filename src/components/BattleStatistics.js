import React from 'react'
import Table from 'rc-table'
import Guild from './Guild'
import styled from '@emotion/styled'
import StyledHeader from '../components/StyledHeader'
import StyledTable from '../components/StyledTable'

const StyledBattleStatistics = styled.section({
  gridArea: 'stats'
})

const BattleStatistics = props => {
  const { data } = props
  // GUILD	KILLS	DEATHS	FAME
  const columns = [
    {
      title: 'Guild',
      key: 'guild',
      render: ({ guild }) => {
        return <Guild guild={guild} />
      }
    },
    {
      title: 'Kills',
      dataIndex: 'kills',
      key: 'kills'
    },
    {
      title: 'Deaths',
      dataIndex: 'deaths',
      key: 'deaths'
    },
    {
      title: 'Fame',
      key: 'fame',
      render: ({ fame }) => {
        return new Intl.NumberFormat('en-US').format(fame)
      }
    }
  ]
  return (
    <StyledBattleStatistics>
      <StyledHeader>battle statistics</StyledHeader>
      <StyledTable>
        <Table columns={columns} data={data} />
      </StyledTable>
    </StyledBattleStatistics>
  )
}
export default BattleStatistics
