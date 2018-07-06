if ('IntersectionObserver' in window) {
console.log('Hallo')

const loadContentElement = function() {
	const contentElements = document.querySelectorAll('.random')
	const config = {
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.25
	}
	
	let contentObserver = new IntersectionObserver(function(entries, self) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				console.log('in Viewport')
				preloadContent(entry.target)
				self.unobserve(entry.target)
			} 
		})
	}, config )

	contentElements.forEach(content => {
		contentObserver.observe(content)
	})

	function preloadContent(content) {
		const element = content.querySelector('.manga-container')
		element.classList.add('visible')

	}

} 

loadContentElement()

} else {
	const element = document.querySelectorAll('.manga-container')
	for (let [i] of element.entries()) {
    	element[i].classList.add('visible') 
	}

}