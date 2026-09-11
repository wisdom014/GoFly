import { useEffect, useRef, useState } from 'react'
import fallbackImage from '../assets/hero.png'
import '../styles/discount.css'

const temporaryOffers = [
	{
		name: 'Maldives',
		price: '$399.00/pp',
		duration: '04 Days, 03 Nights',
		image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=85',
	},
	{
		name: 'Bali',
		price: '$499.00/pp',
		duration: '05 Days, 04 Nights',
		image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=85',
	},
	{
		name: 'Dubai',
		price: '$599.00/pp',
		duration: '04 Days, 03 Nights',
		image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=85',
	},
	{
		name: 'Santorini',
		price: '$699.00/pp',
		duration: '06 Days, 05 Nights',
		image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1200&q=85',
	},
	{
		name: 'Swiss Alps',
		price: '$799.00/pp',
		duration: '07 Days, 06 Nights',
		image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&w=1200&q=85',
	},
]

function Discount() {
	const [activeIndex, setActiveIndex] = useState(0)
	const [isPaused, setIsPaused] = useState(false)
	const [visibleCount, setVisibleCount] = useState(2)
	const swipeStart = useRef(null)
	const maxIndex = Math.max(0, temporaryOffers.length - visibleCount)

	useEffect(() => {
		const updateVisibleCount = () => setVisibleCount(window.innerWidth > 775 ? 3 : window.innerWidth >= 768 ? 2 : 1)
		updateVisibleCount()
		window.addEventListener('resize', updateVisibleCount)
		return () => window.removeEventListener('resize', updateVisibleCount)
	}, [])

	useEffect(() => {
		setActiveIndex((current) => Math.min(current, maxIndex))
	}, [maxIndex])

	useEffect(() => {
		if (isPaused) return undefined
		const timer = window.setInterval(() => {
			setActiveIndex((current) => Math.min(current + 1, maxIndex))
		}, 4500)
		return () => window.clearInterval(timer)
	}, [isPaused, maxIndex])

	function handleSwipeStart(event) {
		swipeStart.current = event.clientX
		setIsPaused(true)
		event.currentTarget.setPointerCapture?.(event.pointerId)
	}

	function handleSwipeEnd(event) {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (Math.abs(distance) > 45) setActiveIndex((current) => Math.max(0, Math.min(current + (distance < 0 ? 1 : -1), maxIndex)))
		swipeStart.current = null
		setIsPaused(false)
		event.currentTarget.releasePointerCapture?.(event.pointerId)
	}

	return (
		<section className="discount-section" aria-labelledby="discount-title">
			<div className="discount-heading">
				<h2 id="discount-title">Discounts &amp; Offers</h2>
				<p>A curated list of the most popular travel packages based on different destinations.</p>
			</div>

			<div
				className="discount-carousel"
				onMouseEnter={() => setIsPaused(true)}
				onMouseLeave={() => setIsPaused(false)}
				onPointerDown={handleSwipeStart}
				onPointerUp={handleSwipeEnd}
				onPointerCancel={handleSwipeEnd}
			>
				<div className="discount-track" style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}>
					{temporaryOffers.map((offer) => (
						<article className="discount-slide" key={offer.name}>
							<img src={offer.image} alt={`${offer.name} travel package`} draggable="false" onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} />
							<div className="offer-overlay">
								<strong>{offer.name}</strong>
								<span>Total Price</span>
								<b>{offer.price}</b>
								<div className="offer-duration">{offer.duration}<small>• Condition Applicable*</small></div>
							</div>
						</article>
					))}
				</div>
			</div>

			<div className="carousel-dots" role="status" aria-label={`Showing offers ${activeIndex + 1} to ${Math.min(activeIndex + visibleCount, temporaryOffers.length)} of ${temporaryOffers.length}`}>
				{temporaryOffers.slice(0, maxIndex + 1).map((offer, index) => (
					<span className={`carousel-dot ${index === activeIndex ? 'active' : ''}`} key={offer.name} aria-hidden="true" />
				))}
			</div>
		</section>
	)
}

export default Discount
