const express = require('express')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const request = require('request')
const fetch = require('node-fetch')

const app = express()

const url = 'https://www.mangaeden.com/api/list/0/?p=1'
const allMangaUrl = 'https://www.mangaeden.com/api/list/0/?p=1'

//'https://www.mangaeden.com/api/list/0/' Original link

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'mangafinder'}))

app.use(express.static(__dirname + '/public'))
app.use('/manga', express.static(__dirname + '/public'))

.get('/', function(req, res) {
	res.render('pages/index')
})

.get('/noob', function(req, res) {
	request(url, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterImg = data.manga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/noob', { data: filterImg })
		}
	})
})

.get('/avatar', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Shounen']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			}) 
			res.render('pages/avatar', { data: filterImg })
		}
	})
})

.get('/crime', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Psychological', 'Mystery', 'Mystery', 'Drama']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/crime', { data: filterImg })
		}
	})
})

.get('/western', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Sci-fi', 'Comedy', 'Adventure']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/western', { data: filterImg })
		}
	})
})

.get('/pro', function(req, res) {
	res.render('pages/pro')
})

.get('/shounen', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Shounen']
			let avatarManga = data.manga.filter(x => x.c.some(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/shounen', { data: filterImg })
		}
	})
})

.get('/shoujo', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Shoujo']
			let avatarManga = data.manga.filter(x => x.c.some(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/shoujo', { data: filterImg })
		}
	})
})

.get('/seinen', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Seinen']
			let avatarManga = data.manga.filter(x => x.c.some(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/seinen', { data: filterImg })
		}
	})
})

.get('/josei', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Josei']
			let avatarManga = data.manga.filter(x => x.c.some(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/josei', { data: filterImg })
		}
	})
})

.get('/manga/:id', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		let mangaID = req.params.id
		let idURL = `https://www.mangaeden.com/api/manga/${mangaID}`
		request(idURL, { json: true }, function(err, response, data) {
			if (err) {
				console.log(err)
			} else {
				console.log(data)
				res.render('pages/manga', { data: data })
			}
		})
	})
})

// Experiment to include data inside a previous called request, didn't work

// .get('/test', function(req, res) {
// 	request(allMangaUrl, { json: true }, function(err, response, manga) {
// 		// console.log(manga)
// 		for (let i = 0; i < manga.manga.length; i++) {
// 			let mangaID = manga.manga[i].i
// 			let idURL = `https://www.mangaeden.com/api/manga/${mangaID}`
// 			console.log(idURL)
// 			request(idURL, { json: true }, function(err, response, data) {
// 				if (err) {
// 					console.log(err)
// 				} else {
// 				res.render('pages/test', { 
// 						data: data,
// 						manga: manga
// 					})
// 				}
// 			})
// 		}
// 	})
// })

.listen(8080, console.log('listening on port 8080'))
