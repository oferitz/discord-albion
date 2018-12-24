import React, { Fragment, useEffect, useState } from 'react'
import { Global } from '@emotion/core'
import Events from './components/Events'
import Main from './Main'
import Error from './components/Error'
import globalStyle from './style/global'

const useFetch = (url, trigger=null) => {
	const [data, setData] = useState({})
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const effectParams = trigger ? [trigger, setData] : [null, null]
	useEffect(async () => {
		const response = await fetch(url)
		const d = await response.json()
		if(d.error) {
			setError(d.error)
		} else {
			setData(d)
		}
		setLoading(false)
	}, effectParams)

	return { data, loading, error }
}

const App = props => {
	const onEventSelect = (eventId) => {
		setEventId(eventId)
	}
	const [eventId, setEventId] = useState(0)
	const events = useFetch(`http://localhost:7861/events`)
	console.log(events)
	const kills = useFetch(`http://localhost:7861/kills/${eventId}`, eventId)

	return (
		<Fragment>
			<Global styles={globalStyle} />
			<Events data={events.data} loading={events.loading} onSelect={onEventSelect} />
			{kills.error ? <Error msg={kills.error} /> : <Main data={kills.data} loading={kills.loading}/>}
		</Fragment>
	)
}

export default App
