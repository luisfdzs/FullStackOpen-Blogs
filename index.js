const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const {PORT, MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = require('./utils/config')
const {info, error} = require('./utils/logger')

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

// Connects to Database
const mongoUrl = NODE_ENV === 'production'
    ? MONGO_DB_URI
    : MONGO_DB_URI_TEST
mongoose.connect(mongoUrl)
    .then(() => {
        info('Database connected')
    })
    .catch(e => {
        error(e)
    })

// App configuration
app.use(cors())
app.use(express.json())

// Endpoints
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})