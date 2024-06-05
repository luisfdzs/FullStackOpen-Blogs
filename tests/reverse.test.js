const assert = require('node:assert')
const { test, describe } = require('node:test')
const {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes} = require('../utils/list_helper')

describe('dummy', () => {
  test('dummy returns one', () => {
    assert.strictEqual(dummy([]), 1)
  })
})
describe('total likes', () => {
  test('of empty list is zero', () => {
    assert.strictEqual(totalLikes([]), 0)
  })
  test('when list has only one blog equals the likes of that', () => {
    assert.strictEqual(totalLikes([{likes: 1}]), 1)
  })
  test('of a bigger list is calculated right', () => {
    assert.strictEqual(totalLikes([{likes: 1}, {likes: 2}, {likes: 3}, {likes: 4}, {likes: 5}]), 15)    
  })
})
describe('favorite blog', () => {
  test('is the one with more likes', () => {
    assert.deepStrictEqual(favoriteBlog([
      {
        title: "Venecia",
        author: "LFS",
        url: "https://www.golfarounditaly.com/wp-content/uploads/2019/02/venezia.jpg",
        likes: 1
      },
      {
        title: "China",
        author: "LFS",
        url: "https://www.thehistoryhub.com/wp-content/uploads/2014/05/Great-Wall-of-China-Images.jpg",
        likes: 2
      }]),
      {
        title: "China",
        author: "LFS",
        likes: 2
      }
    )
  })
  test('If there are two blogs with the same number of likes, returns the first of them', () => {
    assert.deepStrictEqual(favoriteBlog([
      {
        title: "Venecia",
        author: "LFS",
        url: "https://www.golfarounditaly.com/wp-content/uploads/2019/02/venezia.jpg",
        likes: 30
      },
      {
        title: "China",
        author: "LFS",
        url: "https://www.thehistoryhub.com/wp-content/uploads/2014/05/Great-Wall-of-China-Images.jpg",
        likes: 30
      }]),
      {
        title: "Venecia",
        author: "LFS",
        likes: 30
      }
    )
  })

})
describe('favorite author', () => {
  test('the top author is who publish more blogs', () => {
    const blogs = [
      { title: "Blog 1", author: "Author A", url: "url1", likes: 10 },
      { title: "Blog 2", author: "Author B", url: "url2", likes: 20 },
      { title: "Blog 3", author: "Author A", url: "url3", likes: 30 },
      { title: "Blog 4", author: "Author C", url: "url4", likes: 40 },
      { title: "Blog 5", author: "Author A", url: "url5", likes: 50 }
    ];
    assert.deepStrictEqual(mostBlogs(blogs), { author: "Author A", blogs: 3 })
  })
  test('has a total of likes equals to the sum of all the blogs', () => {
    const blogs = [
      { title: "Blog 1", author: "Author A", url: "url1", likes: 10 },
      { title: "Blog 2", author: "Author B", url: "url2", likes: 20 },
      { title: "Blog 3", author: "Author A", url: "url3", likes: 30 },
      { title: "Blog 4", author: "Author C", url: "url4", likes: 40 },
      { title: "Blog 5", author: "Author A", url: "url5", likes: 50 }
    ]
    assert.deepStrictEqual(mostLikes(blogs), { author: "Author A", likes: 90 })
  })
})