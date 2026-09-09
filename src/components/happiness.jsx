import '../styles/happiness.css'

function Happiness() {
	return (
		<section className="happiness-section" aria-labelledby="happiness-title">
			<div className="happiness-flyer">
				<div className="happiness-copy">
					<p>Make Meet Happiness.</p>
					<h2 id="happiness-title">Travel isn&apos;t a<br />luxury, it&apos;s a<br />way of life!</h2>
					<h3>Mr. Gabriel Haringson</h3>
					<strong>CEO, GoFly</strong>
					<a href="/tour/">Grab the Deal Now <span aria-hidden="true">↗</span></a>
				</div>
			</div>
		</section>
	)
}

export default Happiness