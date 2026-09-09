import { useState } from 'react'
import '../styles/faq.css'

const temporaryQuestions = [
	{ question: 'What Services Does Your Travel Agency Provide?', answer: 'A travel agency typically provides a wide range of services to ensure a smooth and enjoyable travel experience. As like-Hotel booking, Flight Booking, Visa & Customized Travel Package etc.' },
	{ question: 'Do You Offer Customized Travel Packages?', answer: 'Yes. We can tailor destinations, activities, transport, accommodation, and trip length around your interests and budget.' },
	{ question: 'How do I book a tour or vacation package?', answer: 'Choose a destination and package, then contact our travel team or use the booking option to begin planning your trip.' },
	{ question: 'Do You Provide Visa Assistance?', answer: 'Our team can help you understand visa requirements, prepare the necessary documents, and guide you through the application process.' },
	{ question: 'Do you provide travel insurance options?', answer: 'We can help you compare travel insurance options for medical support, cancellations, baggage, and other unexpected situations.' },
]

function Faq({ questions = temporaryQuestions }) {
	const [openIndex, setOpenIndex] = useState(null)

	function toggleQuestion(index) {
		setOpenIndex((current) => (current === index ? null : index))
	}

	return (
		<section className="faq-section" aria-labelledby="faq-title">
			<div className="faq-heading">
				<h2 id="faq-title">General Questions</h2>
				<p>We&apos;re committed to offering more than just products—we provide exceptional experiences.</p>
			</div>
			<div className="faq-list">
				{questions.map((item, index) => {
					const isOpen = openIndex === index
					return (
						<div className={`faq-item ${isOpen ? 'open' : ''}`} key={item.question}>
							<button className="faq-question" type="button" aria-expanded={isOpen} aria-controls={`faq-answer-${index}`} onClick={() => toggleQuestion(index)}>
								<span>{item.question}</span><span className="faq-chevron" aria-hidden="true">⌄</span>
							</button>
							<div className="faq-answer-wrap" id={`faq-answer-${index}`}><div className="faq-answer"><p>{item.answer}</p></div></div>
						</div>
					)
				})}
			</div>
		</section>
	)
}

export default Faq
