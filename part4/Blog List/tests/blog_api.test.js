const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


const initialBlogs = [
  {
    title: 'First blog post',
    author: 'Author One',
    url: 'http://example.com/one',
    likes: 5
  },
  {
    title: 'Second blog post',
    author: 'Author Two',
    url: 'http://example.com/two',
    likes: 12
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json and correct amount is returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)


  expect(response.body).toHaveLength(initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})

test('blog posts have an id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length)
  
  expect(response.body[0].id).toBeDefined()

  expect(response.body[0]._id).toBeUndefined()
})