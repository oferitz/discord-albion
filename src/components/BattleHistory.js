import React from 'react'
import Table from 'rc-table'
import format from 'date-fns/format'
import styled from '@emotion/styled'
import StyledHeader from './StyledHeader'
import StyledTable from './StyledTable'
import Guild from './Guild'

const StyledBattleHistory = styled.section({
  gridArea: 'history'
})

const BattleHistory = props => {
  const { data } = props
  const columns = [
    {
      title: 'Time',
      key: 'time',
      render: ({ ts }) => {
        return format(ts, 'DD/MM/YYYY HH:mm:ss')
      }
    },
    {
      title: 'Guild',
      key: 'guild',
      render: ({ guild }) => {
        return <Guild guild={guild} />
      }
    },
    {
      title: 'Killer',
      dataIndex: 'killer',
      key: 'killer'
    },
    {
      title: 'Victim',
      dataIndex: 'victim',
      key: 'victim'
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type'
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
    <StyledBattleHistory>
      <StyledHeader>battle history</StyledHeader>
      <StyledTable>
        <Table columns={columns} data={data} />
      </StyledTable>
    </StyledBattleHistory>
  )
}
export default BattleHistory
