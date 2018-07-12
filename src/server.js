const express = require('express')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const request = require('request')
const fetch = require('node-fetch')

const app = express()

const url = 'https://www.mangaeden.com/api/list/0/?p=1&l=5000'
const allMangaUrl = 'https://www.mangaeden.com/api/list/0/?p=1&l=5000'

// const url = 'https://www.mangaeden.com/api/list/0/'
// const allMangaUrl = 'https://www.mangaeden.com/api/list/0/'

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

.get('/action', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Shounen']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			}) 
			res.render('pages/action', { data: filterImg })
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

.get('/scifi', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Sci-fi', 'Mecha', 'Supernatural']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/scifi', { data: filterImg })
		}
	})
})

.get('/japanese', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Slice of Life', 'Seinen', 'Historical']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/japanese', { data: filterImg })
		}
	})
})

.get('/romance', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Romance', 'Mature']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/romance', { data: filterImg })
		}
	})
})

.get('/comedy', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Comedy']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/comedy', { data: filterImg })
		}
	})
})

.get('/everything', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Shounen', 'Josei', 'Shoujo', 'Seinen']
			let avatarManga = data.manga.filter(x => x.c.some(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/everything', { data: filterImg })
		}
	})
})

.get('/horror', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Horror']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			res.render('pages/horror', { data: filterImg })
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

.listen(8080, console.log('listening on port 8080'))
