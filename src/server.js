const express = require('express')
const session = require('cookie-session')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')
// const urlencodedParser = bodyParser.urlencoded({ extended: false })

const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: 'mangafinder'}))

app.use(express.static(__dirname + '/public'))



.get('/', function(req, res) {
	res.render('pages/index')
})

.get('/noob', function(req, res) {
	let data = fetch('https://www.mangaeden.com/api/list/0/?p=2')
		.then(res => res.json())
		.then(data => res.render('pages/noob', { data: data.manga }))
	})

.get('/pro', function(req, res) {
	res.render('pages/pro')
})

.listen(8080, console.log('listening on port 8080'))
