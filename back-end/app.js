require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')

// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})
app.get('/aboutus', async (req, res) => {
  try{
    const aboutData = {
      title: 'About Us',
      paragraphs: [
        "My name is Carina Ilie. I am a junior at NYU, studying Finance & Data Science and a double major in Computer Science. I am originally from Bucharest, Romania. This esmester, I am studying aborad in Prague, Cezchia.",
        "One of my hobbies is traveling. I have been in most countries in Europe, some states in the US, and some countries in Asia. My current bucket-list destination is Singapore.",
        "I also love snowsports. I have been skiing since I was 4 and snowboarding since I was 9. I try to go to the mountains at least 3 times a year, but it had been hard the past 2 years while I've been at university in the US.",
        "Lastly, I am trying to learn a third language: French. I take private tutoring classes twice a week. My current level is B2, but I hope to reach C1 soon.",
        "That's all about me! Can't wait to get to know you better too!"
      ]
    }
    return res.json({
      data: aboutData,
      status: 'all good',
    })
  }
  catch(err){
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to retrieve about us data',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
