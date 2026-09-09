import Popular from './popular'
import temporaryDeals from '../data/deals'

function Deals() {
	return <Popular packages={temporaryDeals} title="Last Minute Deals!" description="A curated list of the most popular travel packages based on different destinations." />
}

export default Deals