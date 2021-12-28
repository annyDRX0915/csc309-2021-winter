/* server.js, with mongodb API */
'use strict';
const log = console.log
const path = require('path')

const express = require('express')
// starting the express server
const app = express();

// body-parser: middleware for parsing HTTP JSON body into a usable object
const bodyParser = require('body-parser') 
app.use(bodyParser.json())

/*** Webpage routes below **********************************/
/// We only allow specific parts of our public directory to be access, rather than giving
/// access to the entire directory.

// static js directory
app.use(express.static(path.join(__dirname, '/pub')))
app.use(express.static(path.join(__dirname, '#')))

// route for root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/main.html'))
})
// route for root
app.get('/api', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/api.html'))
})
// route for root
app.get('/example', (req, res) => {
	res.sendFile(path.join(__dirname, '/pub/example.html'))
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
}) 