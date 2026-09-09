import '../styles/companies.css'

const companyLogos = [
	{ name: 'Borcelle Tour & Travel', image: 'https://dummyimage.com/220x70/ffffff/cb2027.png&text=Borcelle+Tour+%26+Travel' },
	{ name: 'GoTrip Global Agency', image: 'https://dummyimage.com/220x70/ffffff/111111.png&text=GoTrip+Global+Agency' },
	{ name: 'Travel', image: 'https://dummyimage.com/220x70/ffffff/258bd7.png&text=travel' },
	{ name: 'Wanderly', image: 'https://dummyimage.com/220x70/ffffff/ef8c21.png&text=Wanderly' },
	{ name: 'Worldwise', image: 'https://dummyimage.com/220x70/ffffff/2d925a.png&text=Worldwise' },
]

function Companies() {
	const logos = [...companyLogos, ...companyLogos]
	return <section className="companies-section" aria-labelledby="companies-title"><h2 id="companies-title">Those Company You Can Easily Trust!</h2><div className="company-marquee"><div className="company-track">{logos.map((company, index) => <img src={company.image} alt={company.name} key={`${company.name}-${index}`} />)}</div></div></section>
}

export default Companies