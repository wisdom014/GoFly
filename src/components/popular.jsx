import { useEffect, useRef, useState } from 'react'
import fallbackImage from '../assets/hero.png'
import '../styles/popular.css'

const temporaryPackages = [
	{ title: 'Mystic Mountains Retreat', location: 'Paris, France', duration: '01/Hours', price: '$65.00', tag: 'Solo Tour', images: ['https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Scuba Diving, Zip-lining, Rafting & Rock Climbing' },
	{ title: 'Old Town Discovery Walk', location: 'Qatar', duration: '02/Hours', price: '$69.00', tag: 'Family Tour', images: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Historic streets, local markets, and cultural landmarks' },
	{ title: 'A Magical City Adventure', location: 'Jamaica, Kenya', duration: '2 Days/1 Nights', price: '$444.00', oldPrice: '$599.00', tag: 'Group Tour', badges: ['Sale on!', 'Featured'], images: ['https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Waterfalls, rainforest trails, and local cuisine' },
	{ title: 'Cycling The Loire', location: 'Ghana', duration: '2 Days/1 Nights', price: '$699.00', tag: 'Adventure Tour', images: ['https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Scuba Diving, Zip-lining, Rafting & Rock Climbing' },
	{ title: 'Culture & Cuisine Discovery', location: 'Saudi Arabia', duration: '02/Hours', price: '$65.00', tag: 'Family Tour', images: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Traditional food, artisan workshops, and local stories' },
	{ title: 'Art, Music & Heritage Tour', location: 'Arab Emirates', duration: '03/Hours', price: '$69.00', tag: 'Adventure Tour', images: ['https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=900&q=85', 'https://images.unsplash.com/photo-1518684079-3c830dcef090?auto=format&fit=crop&w=900&q=85'], type: 'Experience', inclusion: 'Museums, music venues, and architectural highlights' },
]

function PackageCard({ packageItem }) {
	const [activeImage, setActiveImage] = useState(0)
	const swipeStart = useRef(null)
	const swipeTriggered = useRef(false)
	const imageCount = packageItem.images.length

	function handlePointerDown(event) {
		if (imageCount < 2) return
		swipeStart.current = event.clientX
		swipeTriggered.current = false
		event.currentTarget.setPointerCapture?.(event.pointerId)
	}

	function handlePointerUp(event) {
		swipeStart.current = null
		swipeTriggered.current = false
		event.currentTarget.releasePointerCapture?.(event.pointerId)
	}

	function handlePointerMove(event) {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (swipeTriggered.current || Math.abs(distance) <= 40) return
		setActiveImage((current) => Math.max(0, Math.min(current + (distance < 0 ? 1 : -1), imageCount - 1)))
		swipeTriggered.current = true
	}

	function handlePointerCancel() {
		swipeStart.current = null
	}

	return (
		<article className="package-card">
			<div className={`package-media ${imageCount > 1 ? 'is-swipeable' : ''}`} onPointerDown={handlePointerDown} onPointerMove={handlePointerMove} onPointerUp={handlePointerUp} onPointerCancel={handlePointerCancel}>
				<div className="package-image-track" style={{ transform: `translateX(-${activeImage * 100}%)` }}>
					{packageItem.images.map((image, index) => <img src={image} alt={`${packageItem.title} view ${index + 1}`} draggable="false" key={image} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />)}
				</div>
				{packageItem.badges?.map((badge) => <span className={`package-badge ${badge === 'Sale on!' ? 'sale-badge' : ''}`} key={badge}>{badge}</span>)}
				{imageCount > 1 && <div className="package-image-dots" aria-label={`Image ${activeImage + 1} of ${imageCount}`}>{packageItem.images.map((image, index) => <span className={index === activeImage ? 'active' : ''} key={image} />)}</div>}
			</div>
			<div className="package-content">
				<h3>{packageItem.title}</h3>
				<p className="package-meta"><span aria-hidden="true">⌾</span> {packageItem.location} <b>↔</b> {packageItem.duration}</p>
				<div className="package-action-row"><a className="book-button" href={`/tour/${packageItem.title.toLowerCase().replaceAll(' ', '-')}`}>Book Now <span aria-hidden="true">↗</span></a><div className="package-price"><small>per person</small>{packageItem.oldPrice && <del>{packageItem.oldPrice}</del>} <strong>{packageItem.price}</strong></div></div>
				<div className="package-features">
					<span className="package-feature-label">♧ {packageItem.type}<button type="button" className="info-icon" aria-label={`More information about ${packageItem.type}`}>i<span className="info-tooltip"><strong>{packageItem.type}</strong><span>{packageItem.inclusion}</span></span></button></span>
					<span className="package-feature-label">⊕ Inclusion<button type="button" className="info-icon" aria-label={`More information about the inclusion for ${packageItem.title}`}>i<span className="info-tooltip"><strong>Including Activities</strong><span>{packageItem.inclusion} with this premium package.</span></span></button></span>
				</div>
			</div>
		</article>
	)
}


function Popular({ packages = temporaryPackages, title = 'Popular Travel Packages', description = 'A curated list of the most popular travel packages based on different destinations.', carousel = false }) {
	const [activeCard, setActiveCard] = useState(0)
	const [visibleCount, setVisibleCount] = useState(1)
	const swipeStart = useRef(null)
	const maxCard = Math.max(0, packages.length - visibleCount)

	useEffect(() => {
		if (!carousel) return undefined
		const updateVisibleCount = () => {
			const width = window.innerWidth
			setVisibleCount(width >= 1100 ? 3 : width >= 601 ? 2 : 1)
		}
		updateVisibleCount()
		window.addEventListener('resize', updateVisibleCount)
		return () => window.removeEventListener('resize', updateVisibleCount)
	}, [carousel])

	function handleCarouselStart(event) {
		swipeStart.current = event.clientX
		event.currentTarget.setPointerCapture?.(event.pointerId)
	}

	function handleCarouselEnd(event) {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (Math.abs(distance) > 45) setActiveCard((current) => Math.max(0, Math.min(current + (distance < 0 ? 1 : -1), maxCard)))
		swipeStart.current = null
		event.currentTarget.releasePointerCapture?.(event.pointerId)
	}

	return (
		<section className="popular-section" aria-labelledby="popular-title">
			<div className="popular-heading"><h2 id="popular-title">{title}</h2><p>{description}</p></div>
			{carousel ? (
				<>
					<div className="package-carousel" onPointerDown={handleCarouselStart} onPointerUp={handleCarouselEnd} onPointerCancel={handleCarouselEnd}>
						<div className="package-carousel-track" style={{ transform: `translateX(-${activeCard * (100 / visibleCount)}%)` }}>{packages.map((packageItem) => <div className="package-carousel-slide" key={packageItem.title}><PackageCard packageItem={packageItem} /></div>)}</div>
					</div>
					<div className="package-carousel-dots" role="status" aria-label={`Showing package ${activeCard + 1} of ${packages.length}`}>{packages.slice(0, maxCard + 1).map((packageItem, index) => <span className={index === activeCard ? 'active' : ''} key={packageItem.title} />)}</div>
				</>
			) : <div className="package-grid">{packages.map((packageItem) => <PackageCard packageItem={packageItem} key={packageItem.title} />)}</div>}
		</section>
	)
}

export default Popular
