const express = require('express')
const app = express()
app.use(express.json())

const cors = require('cors')
app.use(
	cors({
		optionsSuccessStatus: 200,
	}),
)

// ขี้เกียจเชื่อม database
const shortLists = []

app.get('/api/shorturl/:url', (req, res) => {
	const url = Number(req.params.url)

	const short = shortLists.find((row) => row.id === url)
	if (short) return res.redirect(short.url)

	return res.send({
		error: 'Url Not Found',
	})
})

app.post('/api/shorturl', (req, res) => {
	const url = req.body.url

	if (!/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi.test(url))
		return res.send({ error: 'Invalid URL' })

	const id = shortLists.length + 1

	shortLists.push({
		id,
		url: url,
	})

	return res.send({
		original_url: url,
		short_url: id,
	})
})

app.listen(3000)

module.exports = app
