'use strict';
const log = console.log;

// Express
const express = require('express')
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json());

const cors = require('cors')
app.use(cors())

// Mongo and Mongoose
const { ObjectID } = require('mongodb')
const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user')
const { Post } = require('./models/post')


/*
{
    "name": "a",
    "email": "a@gmail.com",
    "password": "123456"
}
*/
app.post('/login', async (req, res) => {
	// Add code here
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	User.find({'email' : req.body.email}, function(err, docs){
		const exist = docs.length > 0
		if(exist) {
			if(docs[0].password === req.body.password) {
				const user = docs[0]
				res.send(user)
			} else {
				res.status(401).send("wrong password")
			}
		} else {
			res.status(404).send("User not found")
		} 
	});
})

app.post('/signup', async (req, res) => {
	// Add code here
	log(req.body)
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	User.find({'email' : req.body.email}, function(err, docs){
		const exist = docs.length > 0
		if(exist){
			res.send("Email has already been used")
		} else {
			const user = new User({
				name: req.body.name,
				email: req.body.email,
				password: req.body.password,
				requests: [],
				posts: [],
				founds: []
			})
			try {
				const result = user.save()	
				res.send(result)
			} catch(error) {
				log(error) // log server error to the console, not to the client.
				res.status(400).send('Bad Request')
			}
		}		
	});
})


/// Route for getting information for one post.
// GET /post/id
app.post('/post/id', async (req, res) => {
	// Add code here
	const id = req.body.id

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
		const post = await Post.findById(id)
		if (!post) {
			res.status(404).send('Post not found')  // could not find this student
		}
		res.send(post)
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

// GET /post
app.get('/post', async (req, res) => {

	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const posts = await Post.find()
		// res.send(students) // just the array
		res.send({ posts }) // can wrap students in object if want to add more properties
	} catch(error) {
		log(error)
		res.status(500).send("Internal Server Error")
	}
})
/// get losts posts from this user
app.post('/user/info', async (req, res) => {
	const user_id = req.body.user
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findById(user_id)
		console.log(user)
		if (!user) {
			res.status(404).send('User not found') 
		} else {
			// TODO: whether allow to have post about their lost item
			const losts = user.posts
			const founds = user.founds
			const requests = user.requests
			const lost_result = []
			const found_result = []
			for (let i = 0; i < losts.length; i++) {
				const lost = await Post.findById(losts[i])
				lost_result.push(lost)
			}
			for (let i = 0; i < founds.length; i++) {
				const found = await Post.findById(founds[i])
				found_result.push(found)
			}
			res.send({lost_result, found_result, requests})
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// deletion for one post from user end.
app.delete('/user/post', async (req, res) => {
	const user_id = req.body.user
	const post_id = req.body.post
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id) || !ObjectID.isValid(post_id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found') 
		} else {
			// TODO: whether allow to have post about their lost item
			const exist = await Post.findById(post_id)
			if(!exist) {
				res.status(404).send('Item not found')  // could not find this reservation
			} else {
				user.posts = user.posts.filter(item => item._id != post_id)	
				user.founds = user.founds.filter(item => item._id != post_id)
				await user.save()
				await Post.findOneAndRemove(exist)
				res.send({ user })
			}	
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})


/// deletion for one post.
// delete /post/id
app.delete('/admin/post', async (req, res) => {
	const post_id = req.body.post
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(post_id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	try {
		const post = await Post.findById(post_id)
		if (!post) {
			res.status(404).send('Post not found') 
		}
		const user = await User.findById(post.user_id)
		if (!user) {
			res.status(404).send('User not found') 
		}
		// TODO: whether allow to have post about their lost item
		user.posts = user.posts.filter(item => item._id != post_id)
		user.founds = user.founds.filter(item => item._id != post_id)
		await user.save()
		await Post.findOneAndRemove(post)
		const posts = await Post.find()
		
		res.send({ user, post, posts })
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

/// Route for getting information for items called 'content'.


// make a post about an item
// TO THINK: do we need to seperate found item and lost item
/*
{
    "user_id": "61afa0027a54470c17aff80c",
    "uesrname": "a",
    "type": "found",
    "date": "2021/10/10",
    "time": "10:10:10",
    "location": "dream",
    "description": "hahaha"
}
*/
app.post('/makepost', async (req, res) => {
	const user_id = req.body.user_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id)) {
		res.status(404).send('invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	try {
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		}

		console.log(user.name)
		const post = new Post({
			user_id: user_id,
			username: user.name,
			item: req.body.item,
			type: req.body.type,
			date: req.body.date,
			time: req.body.time,
			location: req.body.location,
			description: req.body.description,
			discussions: []
		})

		// here only allow people wh founds somehting to make post
		const post_res = await post.save()
		if(req.body.type == "found") {
			user.founds.push(post_res._id.valueOf())
		} else if (req.body.type == "lost") {
			user.posts.push(post_res._id.valueOf())
		}
		const result = await user.save()
		res.send({ post_res, result })
	} catch(error) {	
		log(error) // log server error to the console, not to the client.
		res.status(400).send('Bad Request')
	}
})



// make a discussion about an item
// TO THINK: do we need to seperate found item and lost item
/*
{
    "post_id": "61aff7811efefab87a949386",
    "user_id": "61aff61c0e61decd27943a01",
    "date": "today",
    "time": "now",
    "content": "shabi"
}
*/
app.post('/makediscussion', async (req, res) => {
	const post_id = req.body.post_id
	const user_id = req.body.user_id

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id) || !ObjectID.isValid(post_id)) {
		res.status(404).send('invalid id')  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	} 
	try {
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		}

		
		const post = await Post.findById(post_id)
		if (!post) {
			res.status(404).send('Post not found')  // could not find this user
		}

		
		const discussion = {
			user_id: user_id,
			username: user.name,
			date: req.body.date,
			time: req.body.time,
			content: req.body.content
		}

		// here only allow people wh founds somehting to make post
		post.discussions.push(discussion)
		const result = await post.save()		
		res.send(result)
	} catch(error) {	
		log(error) // log server error to the console, not to the client.
		res.status(400).send('Bad Request')
	}
})



// GET info about this user
app.post('/profile', async (req, res) => {
	const user_id = req.body.user

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id)) {
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
		
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		} else {
			/// sometimes we might wrap returned object in another object:
			res.set({
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			});
			res.send({ user })
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

app.patch('/profile', async(req, res) => {
	const user_id = req.body.user

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id)) {
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
		
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		} else {
			for(let field in req.body) {
				user[field] = req.body[field]
			}
			res.send({ user })
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

// make a request
app.post('/profile/request', async (req, res) => {
	const user_id = req.body.user
	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id)) {
		res.status(404).send()  // if invalid id, definitely can't find resource, 404.
		return;  // so that we don't run the rest of the handler.
	}

	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}  
	const request = {
		status: "IN PROGRESS",
		description: req.body.description,
		username: req.body.username
	}
	try {
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		} else {
			/// sometimes we might wrap returned object in another object:
			user.requests.push(request)
			await user.save()	
			res.send({ request, user })
		}
	} catch(error) {
		log(error) // log server error to the console, not to the client.
		res.status(400).send('Bad Request')
	}
})

// modify request's status
app.patch('/admin/request-table', async(req, res) => {
	const user_id = req.body.user

	// Good practise: Validate id immediately.
	if (!ObjectID.isValid(user_id)) {
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
		
		const user = await User.findById(user_id)
		if (!user) {
			res.status(404).send('User not found')  // could not find this user
		} else {
			let request = user.requests.filter(request => request._id == req.body.req_id)	
			if(!request) {
				res.status(404).send('Request not found')  // could not find this request
			} else {		
				// TODO: do we need to accept input here?
				request[0].status = "Complete"
				await user.save()
				res.send({ request, user })
			}			
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})


// GET all users, post, and requests
// TO THINK: whether need to split them into three server requests
app.get('/admin/user', async (req, res) => {
	// check mongoose connection established.
	if (mongoose.connection.readyState != 1) {
		log('Issue with mongoose connection')
		res.status(500).send('Internal server error')
		return;
	}

	// If id valid, findById
	try {
		const users = await User.find()
		if (!users) {
			res.status(404).send('User not found')  // could not find this user
		} else {
			let losts = []
			let founds = []
			let requests = []
			
			// TODO: loop through user and push to lists
			res.send({ users })
		}
	} catch(error) {
		log(error)
		res.status(500).send('Internal Server Error')  // server error
	}
})

const port = process.env.PORT || 5000
app.listen(port, () => {
	log(`Listening on port ${port}...`)
});
