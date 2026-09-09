import { useState } from 'react'
import Destination from './destination'
import '../styles/customize.css'

function Customize() {
	const [location, setLocation] = useState('')
	const [open, setOpen] = useState(false)
	const locations = Destination.catalog.map(({ name, slug }) => ({ name, slug }))

	function selectLocation(value) {
		setLocation(value)
		setOpen(false)
	}

	function goToDestination(event) {
		event.preventDefault()
		if (!location) return
		window.location.href = `/destination/${locations.find((item) => item.name === location).slug}`
	}

	return (
		<section className="customize-section" aria-labelledby="customize-title">
			<div className="customize-panel">
				<h2 id="customize-title">Customize Your Travel Package!</h2>
				<form className="customize-form" onSubmit={goToDestination}>
					<div className="location-select-wrap">
						<button className="location-select" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open}><span aria-hidden="true">⌾</span>{location || 'Select Your Location'}</button>
						{open && <div className="location-options" role="listbox">{locations.map((item) => <button type="button" role="option" aria-selected={location === item.name} key={item.slug} onClick={() => selectLocation(item.name)}>{item.name}</button>)}</div>}
					</div>
					<button className="customize-search" type="submit">Search Now</button>
				</form>
				<div className="customize-promises"><span>✓ Make Your Favourite Package</span><span>✓ Easily Customize Tours</span><span>✓ Enjoy Your Trip</span></div>
				<a className="guide-link" href="/contact/">Meet Our Local Tour Guider! <strong>Contact Now ↗</strong></a>
			</div>
		</section>
	)
}

export default Customize