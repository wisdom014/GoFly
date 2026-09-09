import { useMemo, useState } from 'react'
import '../styles/hero.css'

const travelModes = [
	{ name: 'Tours', icon: '▥', fields: ['destination', 'date', 'tourType'] },
	{ name: 'Hotels', icon: '▰', fields: ['destination', 'checkIn', 'checkOut', 'guests'] },
	{ name: 'Visa', icon: '▣', fields: ['country', 'visaCategory', 'citizenship', 'currentLocation'] },
	{ name: 'Experience', icon: '◒', fields: ['destination', 'activityCategory', 'date'] },
]

const temporaryCatalog = {
	destinations: [
		{ name: 'Saudi Arabia', count: '02' },
		{ name: 'United States', count: '01' },
		{ name: 'Arab Emirates', count: '01' },
		{ name: 'Tokyo, Japan', count: '01' },
		{ name: 'Paris, France', count: '02' },
		{ name: 'Rome, Italy', count: '03' },
	],
	tourTypes: ['Family Tour', 'Adventure Tour', 'Solo Tour', 'Group Tour'],
	activityCategories: ['Culture & Cuisine', 'Outdoor Adventure', 'City Discovery', 'Wellness Retreat'],
	visaCategories: ['Tourist Visa', 'Business Visa', 'Student Visa', 'Transit Visa'],
	countries: ['Saudi Arabia', 'United States', 'Arab Emirates', 'Japan', 'France', 'Italy'],
	locations: ['Saudi Arabia', 'United States', 'United Kingdom', 'Canada', 'Australia'],
}

const initialValues = {
	destination: '', date: '2026-09-09', tourType: '', checkIn: '2026-09-10',
	checkOut: '2026-09-12', guests: '1 Adults, 0 Child', country: '',
	visaCategory: '', citizenship: '', currentLocation: '', activityCategory: '',
}

const fieldMeta = {
	destination: { label: 'Select', sublabel: 'Destination', icon: '⌾', type: 'destination' },
	country: { label: 'Select Destination', sublabel: 'Country', icon: '⌾', type: 'country' },
	date: { label: '9 September', sublabel: 'Wednesday 2026', icon: '▣', type: 'date' },
	checkIn: { label: '10 September', sublabel: 'Check-In', icon: '▣', type: 'date' },
	checkOut: { label: '12 September', sublabel: 'Check-Out', icon: '▣', type: 'date' },
	tourType: { label: 'Select', sublabel: 'Tour Types', icon: '☷', type: 'select', options: 'tourTypes' },
	activityCategory: { label: 'Select', sublabel: 'Activity Category', icon: '☷', type: 'select', options: 'activityCategories' },
	visaCategory: { label: 'Select', sublabel: 'Visa Category', icon: '▣', type: 'select', options: 'visaCategories' },
	citizenship: { label: 'Select', sublabel: 'Citizenship', icon: '✦', type: 'select', options: 'countries' },
	currentLocation: { label: 'Select', sublabel: 'Current Location', icon: '▤', type: 'select', options: 'locations' },
	guests: { label: '1 Adults, 0 Child', sublabel: '1 Room', icon: '●', type: 'select', options: 'guests' },
}

function formatDate(value) {
	if (!value) return 'Select date'
	return new Date(`${value}T00:00:00`).toLocaleDateString('en-US', { day: 'numeric', month: 'long' })
}

function DateField({ id, meta, value, onChange }) {
	const date = new Date(`${value}T00:00:00`)
	return (
		<label className="booking-field" htmlFor={id}>
			<span className="field-icon" aria-hidden="true">{meta.icon}</span>
			<span className="field-copy">
				<span className="date-value">{formatDate(value)}</span>
				<span className="field-subtext">{value ? (id === 'checkIn' ? 'Check-In' : id === 'checkOut' ? 'Check-Out' : `${date.toLocaleDateString('en-US', { weekday: 'long' })} ${date.getFullYear()}`) : meta.sublabel}</span>
				<input id={id} className="date-input" type="date" value={value} onChange={(event) => onChange(event.target.value)} aria-label={meta.sublabel} />
			</span>
		</label>
	)
}

function DestinationField({ id, meta, value, catalog, onChange }) {
	const [isOpen, setIsOpen] = useState(false)
	const matches = useMemo(() => catalog.filter((item) => item.name.toLowerCase().includes(value.toLowerCase())), [catalog, value])

	return (
		<div className="destination-wrap">
			<label className="booking-field" htmlFor={id}>
				<span className="field-icon" aria-hidden="true">{meta.icon}</span>
				<span className="field-copy">
					<span className={`field-label ${value ? 'selected-value' : ''}`}>{value || meta.label}</span>
					<input id={id} type="text" placeholder={meta.sublabel} value={value} onFocus={() => setIsOpen(true)} onChange={(event) => { onChange(event.target.value); setIsOpen(true) }} onBlur={() => setTimeout(() => setIsOpen(false), 120)} aria-label={meta.sublabel} autoComplete="off" />
				</span>
			</label>
			{isOpen && matches.length > 0 && (
				<div className="destination-results" role="listbox">
					<div className="destination-search">⌕ <span>Type Your Destination</span></div>
					{matches.map((item) => (
						<button type="button" className="destination-result" key={item.name} onMouseDown={() => { onChange(item.name); setIsOpen(false) }}>
							<span><strong>{item.name}</strong><small>{meta.sublabel}</small></span>
							<b>{item.count}<small>Tour</small></b>
						</button>
					))}
				</div>
			)}
		</div>
	)
}

function Hero() {
	const [activeMode, setActiveMode] = useState('Tours')
	const [catalog] = useState(temporaryCatalog)
	const [values, setValues] = useState(initialValues)
	const [searchMessage, setSearchMessage] = useState('')
	const activeFields = travelModes.find((mode) => mode.name === activeMode).fields

	function updateValue(id, value) {
		setValues((current) => ({ ...current, [id]: value }))
		setSearchMessage('')
	}

	function handleSearch(event) {
		event.preventDefault()
		const missingField = activeFields.find((field) => !values[field])
		if (missingField) {
			setSearchMessage(`Please complete ${fieldMeta[missingField].sublabel.toLowerCase()} first.`)
			return
		}
		const selection = values.destination || values.country || values.currentLocation
		setSearchMessage(`Showing ${activeMode.toLowerCase()} results${selection ? ` for ${selection}` : ''}.`)
	}

	return (
		<main className="hero-section">
			<div className="hero-content">
				<p className="hero-eyebrow">Explore the world with GoFLY</p>
				<h1>All-in-one Travel<br />Booking.</h1>
				<p className="hero-description">
					Highlights convenience and simplicity, Best for agencies with
					online &amp; mobile-friendly services.
				</p>
			</div>

			<form className="booking-card" onSubmit={handleSearch}>
				<div className="travel-modes" role="tablist" aria-label="Travel service">
					{travelModes.map((mode) => (
						<button
							className={`travel-mode ${activeMode === mode.name ? 'active' : ''}`}
							key={mode.name}
							type="button"
							role="tab"
							aria-selected={activeMode === mode.name}
							onClick={() => { setActiveMode(mode.name); setSearchMessage('') }}
						>
							<span className="mode-icon" aria-hidden="true">{mode.icon}</span>
							<span>{mode.name}</span>
						</button>
					))}
				</div>

				<div className={`booking-fields fields-${activeFields.length}`}>
					{activeFields.map((field) => {
						const meta = fieldMeta[field]
						if (meta.type === 'date') return <DateField key={field} id={field} meta={meta} value={values[field]} onChange={(value) => updateValue(field, value)} />
						if (meta.type === 'destination' || meta.type === 'country') return <DestinationField key={field} id={field} meta={meta} value={values[field]} catalog={meta.type === 'country' ? catalog.countries.map((name) => ({ name, count: '01' })) : catalog.destinations} onChange={(value) => updateValue(field, value)} />
						const options = meta.options === 'guests' ? ['1 Adults, 0 Child', '2 Adults, 0 Child', '2 Adults, 1 Child', '4 Adults, 2 Children'] : catalog[meta.options]
						return <label className="booking-field" key={field} htmlFor={field}><span className="field-icon" aria-hidden="true">{meta.icon}</span><span className="field-copy"><span className={`field-label ${values[field] ? 'selected-value' : ''}`}>{values[field] || meta.label}</span><span className="field-subtext">{meta.sublabel}</span><select id={field} value={values[field]} onChange={(event) => updateValue(field, event.target.value)} aria-label={meta.sublabel}><option value="">{meta.sublabel}</option>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></span></label>
					})}
				</div>

				<button className="search-submit" type="submit">
					<span className="submit-search-icon" aria-hidden="true" />
					SEARCH
				</button>

				<p className="custom-itinerary">
					Can&apos;t find what you&apos;re looking for? create your{' '}
					<a href="https://gofly-wp.egenstheme.com/contact/" target="_blank" rel="noreferrer">Custom Itinerary</a>
				</p>
				{searchMessage && <p className="search-message" role="status">{searchMessage}</p>}
			</form>
		</main>
	)
}

export default Hero
