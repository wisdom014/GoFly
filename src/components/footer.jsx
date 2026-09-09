import '../styles/footer.css'

const topDestinations = [
	['Maldives Tour', '/destination/maldives'],
	['Bali, Indonesia Tour', '/destination/bali'],
	['Thailand Tour', '/destination/thailand'],
	['Philippines Tour', '/destination/philippines'],
	['Hawaii, USA Tour', '/destination/hawaii'],
	['Switzerland Tour', '/destination/swiss-alps'],
	['New Zealand Tour', '/destination/new-zealand'],
	['Costa Rica Tour', '/destination/costa-rica'],
	['Peru (Machu Picchu)', '/destination/peru'],
	['Paris, France Tour', '/destination/paris'],
	['Rome, Italy Tour', '/destination/rome'],
]

const popularSearches = [
	['Adventure', '/tour/adventure'], ['Hiking & Trekking', '/tour/hiking-trekking'], ['Holiday Packages', '/tour/holiday-packages'],
	['Flights And Hotels', '/tour/flights-and-hotels'], ['Honeymoon Trip', '/tour/honeymoon'], ['Bali Vacation Package', '/destination/bali'],
	['Desert Safari', '/tour/desert-safari'], ['Last-Minute Deals', '/#last-minute-deals'], ['Summer Vacation', '/tour/summer-vacation'],
	['Wildlife Safari', '/tour/wildlife-safari'], ['Dubai Luxury Tours', '/destination/dubai'],
]

const resources = [
	['About GoFly', '/#about'], ['Health & Safety Measure', '/#safety'], ['Visa Processing', '/#visa'], ['Customize Tour', '/#customize'],
	['Travel Inspirations', '/inspirations'], ['Traveler Reviews', '/#reviews'], ['Terms & Condition', '/#terms'], ['Sitemap', '/sitemap'],
]

function FooterLinks({ title, links }) {
	return <section className="footer-link-group"><h2>{title}</h2><ul>{links.map(([label, href]) => <li key={label}><a href={href}>{label}</a></li>)}</ul></section>
}

function Footer() {
	return (
		<footer className="site-footer">
			<div className="footer-contact">
				<div className="contact-icon" aria-hidden="true">☏</div>
				<h2>To More Inquiry</h2><p>Don&apos;t hesitate Call to GoFly.</p>
				<div className="contact-item"><a className="contact-round whatsapp" href="https://wa.me/91345533865" target="_blank" rel="noreferrer">◉</a><h3>WhatsApp</h3><a href="https://wa.me/91345533865" target="_blank" rel="noreferrer">+91 345 533 865</a></div>
				<div className="contact-item"><a className="contact-round" href="mailto:info@example.com">✉</a><h3>Mail Us</h3><a href="mailto:info@example.com">info@example.com</a></div>
				<div className="contact-item"><a className="contact-round" href="tel:+91456453345">☎</a><h3>Call Us</h3><a href="tel:+91456453345">+91 456 453 345</a></div>
			</div>

			<div className="footer-main">
				<div className="footer-brand-block"><a className="footer-brand" href="/" aria-label="GoFLY Travel home"><span className="footer-logo-mark">▤</span><span><strong>GoFLY</strong><small>Travel.co</small></span></a><h2>GoFly Travel Agency</h2><address>Skyline Plaza, 5th Floor, 123 Main Street<br />Los Angeles, CA 90001, USA</address><div className="social-links"><a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">f</a><a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">X</a><a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">▶</a><a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a></div><a className="app-badge" href="https://play.google.com" target="_blank" rel="noreferrer"><span>▶</span><small>GET IT ON</small><strong>Google Play</strong></a></div>
				<FooterLinks title="Top Destination" links={topDestinations} /><FooterLinks title="Popular Search" links={popularSearches} /><FooterLinks title="Resources" links={resources} />
			</div>

			<div className="footer-bottom"><p>Copyright 2025 <strong>Egens Lab</strong> | All Right Reserved.</p><p>Accepted Payment Methods:</p><div className="payment-methods"><span>VISA</span><span>PayPal</span><span>G Pay</span></div></div>
		</footer>
	)
}

export default Footer