import temporaryInspirations from '../data/inspirations'
import '../styles/inspirations-page.css'

function InspirationsPage({ slug }) {
	const selected = slug ? temporaryInspirations.find((item) => item.slug === slug) : null
	if (selected) return <main className="inspiration-detail-page"><img src={selected.image} alt={selected.title} /><article><p>⌾ {selected.location} · {selected.date}</p><h1>{selected.title}</h1><span>{selected.description}</span><a href="/inspirations">← All Inspirations</a></article></main>
	return <main className="inspirations-page"><header><h1>Travel Inspirations</h1><p>Stories and ideas for your next journey.</p></header><div className="inspirations-list">{temporaryInspirations.map((item) => <article key={item.slug}><img src={item.image} alt={item.title} /><div><p>⌾ {item.location} · {item.date}</p><h2>{item.title}</h2><span>{item.description}</span><a href={`/inspiration/${item.slug}`}>Read Inspiration ↗</a></div></article>)}</div></main>
}

export default InspirationsPage