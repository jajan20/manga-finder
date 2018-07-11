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
        }, config)

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

(function() {
    // Items are in fact the results from the server, pushed into the DOM
    const items = Array.from(document.querySelectorAll('.item'))
    let header = document.querySelector('#header')
    let japGenre = document.querySelector('#jap-genre')
    let genres = ["Action", "Adventure", "Comedy", "Drama", "Fantasy", "Historical", "Horror", "Mystery", "Romance", "Sci-fi", "Sports"]
    let subGenres = ["Ecchi", "Harem", "Mecha", "Smut"]
    let genreBtn = document.querySelector('#genre-btn')

    genres.forEach(genre => {
        let input = document.createElement('input')
        let label = document.createElement('label')

        label.setAttribute('for', genre)
        label.setAttribute('tabindex', '1')
        label.textContent = genre
        input.type = 'checkbox'
        input.value = genre
        input.setAttribute('id', genre)

        input.addEventListener('change', function(e) {
            let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'))

            items.forEach(item => item.classList.remove('active'))

            let visibleItems = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) visibleItems = [...visibleItems, ...items.filter((item) => {
                    return item.classList.contains(checkbox.value)
                })]
            })
            visibleItems.forEach(item => item.classList.add('active'))
        })

        header.appendChild(input)
        header.appendChild(label)

        label.addEventListener('mouseup', function() {
            this.blur()
        })
    })

    japGenre.classList.add('hidden')
    subGenres.forEach(genre => {
        let input = document.createElement('input')
        let label = document.createElement('label')

        label.setAttribute('for', genre)
        label.setAttribute('tabindex', '1')
        label.textContent = genre
        input.type = 'checkbox'
        input.value = genre
        input.setAttribute('id', genre)

        input.addEventListener('change', function(e) {
            let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'))

            items.forEach(item => item.classList.remove('active'))

            let visibleItems = []
            checkboxes.forEach(checkbox => {
                if (checkbox.checked) visibleItems = [...visibleItems, ...items.filter((item) => {
                    return item.classList.contains(checkbox.value)
                })]
            })
            visibleItems.forEach(item => item.classList.add('active'))
        })

        japGenre.appendChild(input)
        japGenre.appendChild(label)

        label.addEventListener('mouseup', function() {
            this.blur()
        })
    })
    genreBtn.addEventListener('click', function() {
        if (japGenre.classList.contains('hidden') || genreBtn.textContent == `Show me more Genre's`) {
            japGenre.classList.remove('hidden')
            genreBtn.textContent = `Show me less genre's`
        } else {
            japGenre.classList.add('hidden')
            genreBtn.textContent = `Show me more Genre's`
        }
    })
})()