import { useEffect, useRef, useState } from 'react'
import fallbackImage from '../assets/hero.png'
import temporaryReviews from '../data/reviews'
import '../styles/reviews.css'

function ReviewCard({ review }) {
	return <article className="review-card"><div className="review-author"><img src={review.avatar} alt={review.name} onError={(event) => { event.currentTarget.onerror = null; event.currentTarget.src = fallbackImage }} /><div><strong>{review.name}</strong><span>{review.role}</span></div></div><div className="review-stars" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: 5 }, (_, index) => <span className={index < review.rating ? 'filled' : ''} key={index}>★</span>)}</div><h3>Average Experience</h3><p>{review.text}</p></article>
}

function Reviews({ reviews = temporaryReviews }) {
	const [activeIndex, setActiveIndex] = useState(0)
	const [visibleCount, setVisibleCount] = useState(1)
	const swipeStart = useRef(null)
	const slides = [...reviews, ...reviews, ...reviews]
	const maxIndex = reviews.length * 2 - visibleCount

	useEffect(() => {
		const updateVisibleCount = () => setVisibleCount(window.innerWidth >= 1100 ? 3 : window.innerWidth >= 601 ? 2 : 1)
		updateVisibleCount()
		window.addEventListener('resize', updateVisibleCount)
		return () => window.removeEventListener('resize', updateVisibleCount)
	}, [])

	useEffect(() => {
		const timer = window.setInterval(() => setActiveIndex((current) => current + 1), 4500)
		return () => window.clearInterval(timer)
	}, [])

	useEffect(() => {
		if (activeIndex >= reviews.length * 2) setActiveIndex(reviews.length)
	}, [activeIndex, reviews.length])

	function handlePointerDown(event) {
		swipeStart.current = event.clientX
		event.currentTarget.setPointerCapture?.(event.pointerId)
	}

	function handlePointerUp(event) {
		if (swipeStart.current === null) return
		const distance = event.clientX - swipeStart.current
		if (Math.abs(distance) > 45) setActiveIndex((current) => Math.max(0, Math.min(current + (distance < 0 ? 1 : -1), maxIndex)))
		swipeStart.current = null
		event.currentTarget.releasePointerCapture?.(event.pointerId)
	}

	return <section className="reviews-section" aria-labelledby="reviews-title"><div className="reviews-heading"><h2 id="reviews-title">Hear It from Travelers</h2><p>We go beyond just booking trips—we create unforgettable travel experiences that match your dreams!</p></div><div className="reviews-carousel" onPointerDown={handlePointerDown} onPointerUp={handlePointerUp} onPointerCancel={() => { swipeStart.current = null }}><div className="reviews-track" style={{ transform: `translateX(-${activeIndex * (100 / visibleCount)}%)` }}>{slides.map((review, index) => <div className="review-slide" key={`${review.name}-${index}`}><ReviewCard review={review} /></div>)}</div></div><div className="review-platforms"><div><strong>◉ Tripadvisor</strong><span>Reviews <b>●●●●◐</b></span></div><div><strong>★ Trustpilot</strong><span><em>4.5</em> <b>★★★★★</b> Reviews</span></div></div></section>
}

export default Reviews