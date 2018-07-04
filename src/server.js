const express = require('express')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const request = require('request')
const fetch = require('node-fetch')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

const url = 'https://www.mangaeden.com/api/list/0/?p=1'
const allMangaUrl = 'https://www.mangaeden.com/api/list/0/'

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'mangafinder'}))

app.use(express.static(__dirname + '/public'))

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
			let filterGenre = ['Shounen', 'Fantasy', 'Romance', 'Adventure']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			// console.log(data.manga[1].c.filter(x => x.manga[1].c.every(g => filter.includes(g))))
			console.log(filterImg)
			res.render('pages/avatar', { data: filterImg })
		}
	})
})

.get('/crime', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Drama', 'Shounen', 'Tragedy']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			// console.log(data.manga[1].c.filter(x => x.manga[1].c.every(g => filter.includes(g))))
			console.log(filterImg)
			res.render('pages/crime', { data: filterImg })
		}
	})
})

.get('/western', function(req, res) {
	request(allMangaUrl, { json: true }, function(err, response, data) {
		if (err) {
			console.log(err)
		} else {
			let filterGenre = ['Sci-fi', 'Comedy', 'Action']
			let avatarManga = data.manga.filter(x => x.c.every(g => filterGenre.includes(g)))
			let filterImg = avatarManga.filter(function(image) {
  				return image.im != null && image.c.length > 0 
			})
			// console.log(data.manga[1].c.filter(x => x.manga[1].c.every(g => filter.includes(g))))
			console.log(filterImg)
			res.render('pages/western', { data: filterImg })
		}
	})
})

.get('/pro', function(req, res) {
	res.render('pages/pro')
})

.listen(8080, console.log('listening on port 8080'))
