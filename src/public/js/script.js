if ('IntersectionObserver' in window) {

const loadContentElement = function() {
	const contentElements = document.querySelectorAll('.random')
	const config = {
		rootMargin: '0px 0px 0px 0px',
		threshold: 0.25
	}
	
	let contentObserver = new IntersectionObserver(function(entries, self) {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
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

let genreSelection = document.querySelector('#action')
console.log(genreSelection)

// for (let i = 0; i < manga.manga.length; i++){
// 	let unix = manga.manga[i].ld 

// 	let calc = (manga.manga[i].h/manga.manga[i].ld) * 365


// 	if (calc > 0) {console.log(calc)}
// }