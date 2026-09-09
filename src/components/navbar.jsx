import '../styles/navbar.css'

function Navbar() {
	return (
		<header className="site-header">
			<a className="brand" href="/" aria-label="GoFLY Travel home">
				<span className="brand-mark" aria-hidden="true">
					<span className="brand-mark-globe">+</span>
					<span className="brand-mark-lines" />
				</span>
				<span className="brand-copy">
					<strong>GoFLY</strong>
					<small>Travel.co</small>
				</span>
			</a>

			<nav className="header-actions" aria-label="Main navigation">
				<button className="language-select" type="button" aria-label="Select language">
					<span className="globe-icon" aria-hidden="true">&#8853;</span>
					<span>EN</span>
					<span className="chevron" aria-hidden="true" />
				</button>
				<button className="icon-button search-button" type="button" aria-label="Search">
					<span className="search-icon" aria-hidden="true" />
				</button>
				<button className="icon-button menu-button" type="button" aria-label="Open menu">
					<span className="menu-icon" aria-hidden="true"><i /><i /><i /></span>
				</button>
			</nav>
		</header>
	)
}

export default Navbar
