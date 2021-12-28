/* 
 * This code is provided solely for the personal and private use of students 
 * taking the CSC309H course at the University of Toronto. Copying for purposes 
 * other than this use is expressly prohibited. All forms of distribution of 
 * this code, including but not limited to public repositories on GitHub, 
 * GitLab, Bitbucket, or any other online platform, whether as given or with 
 * any changes, are expressly prohibited. 
*/  

/* E4 server.js */
'use strict';
const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { Restaurant } = require('./models/restaurant')

/* 
   Restaurant API routes below. 
   Note: You may use async-await if you wish, but you will have to modify the functions as needed.
*/

/// Route for adding restaurant, with *no* reservations (an empty array).
/* 
Request body expects:
{
	"name": <restaurant name>
	"description": <restaurant description>
}
Returned JSON should be the database document added.
*/
// POST /restaurants
app.post('/restaurants', async (req, res) => {
	// Add code here

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// Create a new restaurant using the Restaurant mongoose model
	const restaurant = new Restaurant({
		name: req.body.name,
		description: req.body.description,
		reservations: []
	})


	// Save restaurant to the database
	// async-await version:
	try {
		const result = await restaurant.save()	
		res.send(result)
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		if (isMongoError(error)) { // check for if mongo server suddenly dissconnected before this request.
			res.status(500).send('Internal server error')
		} else {
			res.status(400).send('Bad Request') // 400 for bad request gets sent to client.
		}
	}

})


/// Route for getting all restaurant information.
// GET /restaurants
app.get('/restaurants', async(req, res) => {
	// Add code here
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 

	// Get the restaurant
	try {
		const restaurants = await Restaurant.find()
		// res.send(students) // just the array
		res.send({ restaurants }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})


/// Route for getting information for one restaurant.
// GET /restaurants/id
app.get('/restaurants/:id', async (req, res) => {
	// Add code here
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const restaurant = await Restaurant.findById(id)
		if (!restaurant) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			//res.send({student})   
			res.send(restaurant)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}


})


/// Route for adding reservation to a particular restaurant.
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the updated restaurant database 
//   document that the reservation was added to, AND the reservation subdocument:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// POST /restaurants/id
app.post('/restaurants/:id', async (req, res) => {
	// Add code here
	const id = req.params.id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const restaurant = await Restaurant.findById(id)
		if (!restaurant) {
			res.status(404).send('Resource not found')  // could not find this student
		} else {
			/// sometimes we might wrap returned object in another object:
			//res.send({student}) 
			const reservation = req.body
			restaurant.reservations.push(reservation)
			const result = await restaurant.save()	
			res.send(result)
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}


})


/// Route for getting information for one reservation of a restaurant (subdocument)
// GET /restaurants/id
app.get('/restaurants/:id/:resv_id', async (req, res) => {
	// Add code here
	const id = req.params.id
	const resv_id = req.params.resv_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const restaurant = await Restaurant.findById(id)
		if (!restaurant) {
			res.status(404).send('Resource not found (restaurant)')  // could not find this student
		}
		/// sometimes we might wrap returned object in another object:
		//res.send({student})
		const reservation =  restaurant.reservations.id(resv_id)
		if (!reservation) {
			res.status(404).send('Resource not found (reservation)')  // could not find this student
		}
		res.send(reservation)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})


/// Route for deleting reservation
// Returned JSON should have the updated restaurant database
//   document from which the reservation was deleted, AND the reservation subdocument deleted:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// DELETE restaurant/<restaurant_id>/<reservation_id>
app.delete('/restaurants/:id/:resv_id', async (req, res) => {
	// Add code here
	
	const id = req.params.id
	const resv_id = req.params.resv_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const restaurant = await Restaurant.findById(id)
		if (!restaurant) {
			res.status(404).send('Resource not found (restaurant)')  // could not find this student
		}
		/// sometimes we might wrap returned object in another object:
		//res.send({student})
		const reservation =  restaurant.reservations.id(resv_id)
		if (!reservation) {
			res.status(404).send('Resource not found (reservation)')  // could not find this student
		}
		restaurant.reservations = restaurant.reservations.filter(x => x != reservation)
		const result = await restaurant.save()	
		res.send(reservation)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})


/// Route for changing reservation information
/* 
Request body expects:
{
	"time": <time>
	"people": <number of people>
}
*/
// Returned JSON should have the updated restaurant database
//   document in which the reservation was changed, AND the reservation subdocument changed:
//   { "reservation": <reservation subdocument>, "restaurant": <entire restaurant document>}
// PATCH restaurant/<restaurant_id>/<reservation_id>
app.patch('/restaurants/:id/:resv_id', async (req, res) => {
	// Add code here
	const id = req.params.id
	const resv_id = req.params.resv_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const restaurant = await Restaurant.findById(id)
		if (!restaurant) {
			res.status(404).send('Resource not found (restaurant)')  // could not find this student
		}
		/// sometimes we might wrap returned object in another object:
		//res.send({student})
		var reservation =  restaurant.reservations.id(resv_id)
		if (!reservation) {
			res.status(404).send('Resource not found (reservation)')  // could not find this student
		}
		reservation.time = req.body.time
		reservation.people = req.body.people
		const result = await restaurant.save()	
		res.send(result)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}

})


////////// DO NOT CHANGE THE CODE OR PORT NUMBER BELOW
const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
