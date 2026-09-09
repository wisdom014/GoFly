import '../styles/stats.css'

const temporaryStats = [
	{ value: '13+', label: 'Tour Completed', icon: '✈' },
	{ value: '2+', label: 'Travel Experience', icon: '♙' },
	{ value: '0+', label: 'Happy Traveler', icon: '◇' },
	{ value: '47%', label: 'Retention Rate', icon: '♙' },
]

function Stats({ stats = temporaryStats }) {
	return (
		<section className="stats-section" aria-label="GoFly travel statistics">
			<div className="stats-list">
				{stats.map((stat) => (
					<article className="stat-item" key={stat.label}>
						<span className="stat-icon" aria-hidden="true">{stat.icon}</span>
						<div className="stat-copy"><strong>{stat.value}</strong><span>{stat.label}</span></div>
					</article>
				))}
			</div>
		</section>
	)
}

export default Stats