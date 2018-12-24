import styled from '@emotion/styled'

const StyledTable = styled.div({
	table: {
		width: '100%',
		borderCollapse: 'collapse',
		textAlign: 'left',
		'& th, & td': {
			borderBottom: '1px solid #555',
			padding: '0.75em'
		}
	}
})

export default StyledTable
