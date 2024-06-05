const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/Blogs')
const {MONGO_DB_URI, MONGO_DB_URI_TEST, NODE_ENV} = require('./utils/config')
const {info, error, requestLogger} = require('./utils/logger')

// Connects to Database
const mongoUrl = NODE_ENV === 'production'
? MONGO_DB_URI
: MONGO_DB_URI_TEST
mongoose.connect(mongoUrl)
.then(() => info('Database connected'))
.catch(e => error(e))

// App configuration
const app = express()
app.use(cors())
app.use(express.json())
app.use(requestLogger)
app.use('/api/blogs', blogsRouter)


module.exports = app