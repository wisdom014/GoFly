import Popular from './popular'
import temporaryDayTrips from '../data/day-trips'

function DayTrips() {
	return <Popular packages={temporaryDayTrips} title="One Day Trips" description="A curated list of the most popular travel packages based on different destinations." carousel />
}

export default DayTrips