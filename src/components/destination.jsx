import { useEffect, useMemo, useRef, useState } from 'react'
import fallbackImage from '../assets/hero.png'
import '../styles/destination.css'

const destinationCatalog = [
	{ name: 'Morocco', region: 'Africa', tours: '03 tours | 242 departures', travellers: '12,840 guests travelled.', image: 'https://images.unsplash.com/photo-1539020140153-e479b8c22e70?auto=format&fit=crop&w=1200&q=85', slug: 'morocco', tourLocations: ['Marrakech Medina', 'Sahara Desert', 'Chefchaouen'] },
	{ name: 'Zimbabwe', region: 'Africa', tours: '01 tour | 297 departures', travellers: '15,777 guests travelled.', image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85', slug: 'zimbabwe', tourLocations: ['Victoria Falls', 'Hwange National Park', 'Mana Pools'] },
	{ name: 'Egypt', region: 'Africa', tours: '04 tours | 265 departures', travellers: '16,308 guests travelled.', image: 'https://images.unsplash.com/photo-1568322445389-f64ac2515020?auto=format&fit=crop&w=1200&q=85', slug: 'egypt', tourLocations: ['Giza Pyramids', 'Nile Valley', 'Luxor'] },
	{ name: 'Kenya', region: 'Africa', tours: '03 tours | 188 departures', travellers: '10,951 guests travelled.', image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=1200&q=85', slug: 'kenya', tourLocations: ['Maasai Mara', 'Amboseli', 'Nairobi'] },
	{ name: 'South Africa', region: 'Africa', tours: '05 tours | 310 departures', travellers: '17,604 guests travelled.', image: 'https://images.unsplash.com/photo-1531176175280-7d9f0c7b1e35?auto=format&fit=crop&w=1200&q=85', slug: 'south-africa', tourLocations: ['Cape Town', 'Kruger National Park', 'Garden Route'] },
	{ name: 'Maldives', region: 'Asia', tours: '04 tours | 186 departures', travellers: '18,421 guests travelled.', image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85', slug: 'maldives', tourLocations: ['Malé', 'Maafushi Island', 'Ari Atoll'] },
	{ name: 'Bali', region: 'Asia', tours: '06 tours | 389 departures', travellers: '21,940 guests travelled.', image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85', slug: 'bali', tourLocations: ['Ubud', 'Uluwatu Temple', 'Nusa Penida'] },
	{ name: 'Thailand', region: 'Asia', tours: '05 tours | 348 departures', travellers: '20,130 guests travelled.', image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=85', slug: 'thailand', tourLocations: ['Bangkok', 'Phuket', 'Chiang Mai'] },
	{ name: 'Japan', region: 'Asia', tours: '04 tours | 276 departures', travellers: '14,902 guests travelled.', image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85', slug: 'japan', tourLocations: ['Tokyo', 'Kyoto', 'Mount Fuji'] },
	{ name: 'Vietnam', region: 'Asia', tours: '03 tours | 219 departures', travellers: '12,117 guests travelled.', image: 'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=85', slug: 'vietnam', tourLocations: ['Ha Long Bay', 'Hanoi', 'Hoi An'] },
	{ name: 'Rome', region: 'Europe', tours: '05 tours | 318 departures', travellers: '22,109 guests travelled.', image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=85', slug: 'rome', tourLocations: ['Colosseum', 'Vatican City', 'Trevi Fountain'] },
	{ name: 'Santorini', region: 'Europe', tours: '03 tours | 201 departures', travellers: '13,775 guests travelled.', image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85', slug: 'santorini', tourLocations: ['Oia', 'Fira', 'Red Beach'] },
	{ name: 'Paris', region: 'Europe', tours: '06 tours | 361 departures', travellers: '24,860 guests travelled.', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=85', slug: 'paris', tourLocations: ['Eiffel Tower', 'Louvre Museum', 'Montmartre'] },
	{ name: 'Barcelona', region: 'Europe', tours: '04 tours | 258 departures', travellers: '16,405 guests travelled.', image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?auto=format&fit=crop&w=1200&q=85', slug: 'barcelona', tourLocations: ['Sagrada Familia', 'Gothic Quarter', 'Park Guell'] },
	{ name: 'Swiss Alps', region: 'Europe', tours: '03 tours | 174 departures', travellers: '9,740 guests travelled.', image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85', slug: 'swiss-alps', tourLocations: ['Zermatt', 'Interlaken', 'Lucerne'] },
	{ name: 'Dubai', region: 'Middle East', tours: '04 tours | 277 departures', travellers: '19,360 guests travelled.', image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85', slug: 'dubai', tourLocations: ['Burj Khalifa', 'Dubai Marina', 'Desert Safari'] },
	{ name: 'Jordan', region: 'Middle East', tours: '03 tours | 149 departures', travellers: '8,910 guests travelled.', image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85', slug: 'jordan', tourLocations: ['Petra', 'Wadi Rum', 'Amman'] },
	{ name: 'Oman', region: 'Middle East', tours: '02 tours | 117 departures', travellers: '7,284 guests travelled.', image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85', slug: 'oman', tourLocations: ['Muscat', 'Wahiba Sands', 'Nizwa'] },
	{ name: 'Qatar', region: 'Middle East', tours: '03 tours | 136 departures', travellers: '8,421 guests travelled.', image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=1200&q=85', slug: 'qatar', tourLocations: ['Doha Corniche', 'Souq Waqif', 'The Pearl'] },
	{ name: 'Turkey', region: 'Middle East', tours: '05 tours | 291 departures', travellers: '18,207 guests travelled.', image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=85', slug: 'turkey', tourLocations: ['Istanbul', 'Cappadocia', 'Pamukkale'] },
	{ name: 'New York', region: 'North America', tours: '03 tours | 165 departures', travellers: '11,240 guests travelled.', image: 'https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=1200&q=85', slug: 'new-york', tourLocations: ['Times Square', 'Central Park', 'Statue of Liberty'] },
	{ name: 'Los Angeles', region: 'North America', tours: '04 tours | 224 departures', travellers: '14,670 guests travelled.', image: 'https://images.unsplash.com/photo-1534190760961-74e8c1c5c3da?auto=format&fit=crop&w=1200&q=85', slug: 'los-angeles', tourLocations: ['Hollywood', 'Santa Monica', 'Griffith Observatory'] },
	{ name: 'Vancouver', region: 'North America', tours: '03 tours | 151 departures', travellers: '9,830 guests travelled.', image: 'https://images.unsplash.com/photo-1559511260-66a654ae982a?auto=format&fit=crop&w=1200&q=85', slug: 'vancouver', tourLocations: ['Stanley Park', 'Granville Island', 'Whistler'] },
	{ name: 'Mexico City', region: 'North America', tours: '03 tours | 173 departures', travellers: '10,460 guests travelled.', image: 'https://images.unsplash.com/photo-1518105779142-d975f22f1b0a?auto=format&fit=crop&w=1200&q=85', slug: 'mexico-city', tourLocations: ['Zocalo', 'Frida Kahlo Museum', 'Teotihuacan'] },
	{ name: 'Toronto', region: 'North America', tours: '02 tours | 109 departures', travellers: '7,216 guests travelled.', image: 'https://images.unsplash.com/photo-1517090504586-fde19ea6066f?auto=format&fit=crop&w=1200&q=85', slug: 'toronto', tourLocations: ['CN Tower', 'Distillery District', 'Niagara Falls'] },
	{ name: 'Queenstown', region: 'Oceania', tours: '02 tours | 128 departures', travellers: '9,680 guests travelled.', image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&w=1200&q=85', slug: 'queenstown', tourLocations: ['Lake Wakatipu', 'Milford Sound', 'Skyline Queenstown'] },
	{ name: 'Sydney', region: 'Oceania', tours: '04 tours | 238 departures', travellers: '15,208 guests travelled.', image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=1200&q=85', slug: 'sydney', tourLocations: ['Opera House', 'Bondi Beach', 'Blue Mountains'] },
	{ name: 'Melbourne', region: 'Oceania', tours: '03 tours | 177 departures', travellers: '10,870 guests travelled.', image: 'https://images.unsplash.com/photo-1514395462725-fb4566210144?auto=format&fit=crop&w=1200&q=85', slug: 'melbourne', tourLocations: ['Great Ocean Road', 'Federation Square', 'Phillip Island'] },
	{ name: 'Fiji', region: 'Oceania', tours: '02 tours | 98 departures', travellers: '6,540 guests travelled.', image: 'https://images.unsplash.com/photo-1546500840-ae38253aba9b?auto=format&fit=crop&w=1200&q=85', slug: 'fiji', tourLocations: ['Nadi', 'Yasawa Islands', 'Coral Coast'] },
	{ name: 'Bora Bora', region: 'Oceania', tours: '03 tours | 112 departures', travellers: '7,825 guests travelled.', image: 'https://images.unsplash.com/photo-1505881502353-a1986add3762?auto=format&fit=crop&w=1200&q=85', slug: 'bora-bora', tourLocations: ['Matira Beach', 'Mount Otemanu', 'Coral Gardens'] },
]

const regions = ['Africa', 'Asia', 'Europe', 'Middle East', 'North America', 'Oceania']

function Destination() {
	const [activeRegion, setActiveRegion] = useState('Africa')
	const [activeIndex, setActiveIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const swipeStart = useRef(null)
	const destinations = useMemo(() => destinationCatalog.filter((item) => item.region === activeRegion), [activeRegion])
	const activeDestination = destinations[activeIndex] || destinations[0]

	useEffect(() => {
		if (isPaused || destinations.length < 2) return undefined
		const timer = window.setInterval(() => setActiveIndex((current) => Math.min(current + 1, destinations.length - 1)), 5000)
		return () => window.clearInterval(timer)
	}, [destinations.length, isPaused])

	function handleSwipeStart(event) {
		swipeStart.current = event.clientX
		setIsPaused(true)
		event.currentTarget.setPointerCapture?.(event.pointerId)
	}

	function handleSwipeEnd(event) {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (Math.abs(distance) > 45) setActiveIndex((current) => Math.max(0, Math.min(current + (distance < 0 ? 1 : -1), destinations.length - 1)))
		swipeStart.current = null
		setIsPaused(false)
	}

	return (
		<section className="destination-section" aria-labelledby="destination-title">
			<div className="destination-heading">
				<h2 id="destination-title">Featured Destinations</h2>
				<div className="region-filters" role="tablist" aria-label="Destination regions">
					{regions.map((region) => <button className={`region-filter ${activeRegion === region ? 'active' : ''}`} type="button" role="tab" aria-selected={activeRegion === region} key={region} onClick={() => { setActiveRegion(region); setActiveIndex(0) }}>{region}</button>)}
				</div>
			</div>

			<div className="destination-carousel" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)} onPointerDown={handleSwipeStart} onPointerUp={handleSwipeEnd} onPointerCancel={handleSwipeEnd}>
				<div className="destination-track" style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
					{destinations.map((destination) => (
						<article className="destination-slide" key={destination.slug}>
							<div className="destination-image" role="img" aria-label={`${destination.name} destination`}>
								<img src={destination.image} alt={`${destination.name} destination`} draggable="false" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
							</div>
							<div className="destination-copy">
								<a className="destination-name" href={`/destination/${destination.slug}`}><span aria-hidden="true">⌾</span> {destination.name}</a>
								<p>{destination.tours}</p>
								<p>{destination.travellers}</p>
								<div className="tour-location-links" aria-label={`${destination.name} tour locations`}>
									{destination.tourLocations.map((location) => <a href={`/destination/${destination.slug}/${location.toLowerCase().replaceAll(' ', '-')}`} key={location}>{location}</a>)}
								</div>
							</div>
						</article>
					))}
				</div>
			</div>

			<div className="destination-dots" role="status" aria-label={`Showing ${activeDestination.name}, destination ${activeIndex + 1} of ${destinations.length}`}>
				{destinations.map((destination, index) => <span className={`destination-dot ${index === activeIndex ? 'active' : ''}`} aria-hidden="true" key={destination.slug} />)}
			</div>
		</section>
	)
}

Destination.catalog = destinationCatalog

export default Destination
