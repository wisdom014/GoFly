import '../styles/service.css'

const serviceItems = [
	{ icon: '✪', title: 'Local Guidance', text: 'Travel agencies have experienced professionals guidance.', tone: 'gold' },
	{ icon: '%', title: 'Deals & Discounts', text: 'Agencies have special discounts on flights, hotels, & packages.', tone: 'cyan' },
	{ icon: '▣', title: 'Saves Money', text: 'Avoids hidden fees & tourist traps, Multi-destination & budget-friendly options.', tone: 'gold' },
]

function Service() {
	return (
		<section className="service-section" aria-labelledby="service-title">
			<div className="service-panel">
				<h2 id="service-title">We&apos;re Providing Best<br />Service Ever!</h2>
				<div className="service-list">
					{serviceItems.map((item) => (
						<article className="service-item" key={item.title}>
							<span className={`service-icon ${item.tone}`} aria-hidden="true">{item.icon}</span>
							<div><h3>{item.title}</h3><p>{item.text}</p></div>
						</article>
					))}
				</div>
				<a className="service-offer" href="/tour/">Flat 30% Discounts All Packages <span>Check Offer ↗</span></a>
			</div>
		</section>
	)
}

export default Service