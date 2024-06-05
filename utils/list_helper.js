const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}
const totalLikes = (blogs) => {
  let total = 0
  blogs.map(blog => total+=blog.likes)
  return total
}
const favoriteBlog = (blogs) => {
  const result = blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
  const {title, author, likes} = result
  return {
    title: title,
    author: author,
    likes: likes
  }
}
const mostBlogs = (blogs) => {
  const authorBlogCount = _.countBy(blogs, 'author')
  const prolificAuthor = _.maxBy(_.keys(authorBlogCount), (author) => authorBlogCount[author])
  return {
    author: prolificAuthor,
    blogs: authorBlogCount[prolificAuthor]
  }
}
function mostLikes(blogs) {
  const groupedByAuthor = _.groupBy(blogs, 'author')
  const authorLikesCount = _.mapValues(groupedByAuthor, (authorBlogs) => 
    _.sumBy(authorBlogs, 'likes')
  )
  const mostLikedAuthor = _.maxBy(_.keys(authorLikesCount), (author) => authorLikesCount[author])
  return {
    author: mostLikedAuthor,
    likes: authorLikesCount[mostLikedAuthor]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}