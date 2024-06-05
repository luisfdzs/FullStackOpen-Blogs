const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const {info} = require('../utils/logger')

blogsRouter.get('/', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      info(`Returned ${blogs.length} blogs`)
      response.json(blogs)
    })
    .catch(error => next(error))
})  
blogsRouter.get('/:id', (request, response, next) => {
  const {id} = request.params
  Blog
    .findById(id)
    .then(blog => {
      info(`Returned the blog: ${blog}`)
      response.json(blog)
    })
    .catch(error => next(error))
})  
blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)
  blog
    .save()
    .then(result => {
      info(`Blog was saved correctly as the new blog: ${blog}`)
      response.status(201).json(result)
    })
    .catch(error => next(error))
})
blogsRouter.put('/:id', (request, response, next) => {
  const {params, body} = request
  const {id} = params
  const {title, author, url, likes} = body
  const changes = {title: title, author: author, url: url, likes: likes}
  Blog
    .findByIdAndUpdate(id, changes, {new: true, runValidators: true})
    .then(updatedBlog => {
      info(`Blog was updated correctly as the new blog: ${updatedBlog}`)
      response.status(200).json(updatedBlog)
    })
    .catch(error => next(error))
})
blogsRouter.delete('/:id', (request, response, next) => {
  const {id} = request.params
  Blog
    .findByIdAndDelete(id)
    .then(() => {
      info(`Blog with id ${id} deleted correctly`)
      response.status(200).json({success: `Blog with id ${id} deleted correctly`})
    })
    .catch(error => next(error))
})

module.exports = blogsRouter