const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');


const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(cors())
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use('/auth', require ('./routes/jwtAuth'))

  app.get('/api/posts', async (req, res) => {
    try {
      const allPosts = await pool.query('SELECT * FROM posts');
      res.json(allPosts.rows)
    } catch (err) {
      console.error(err.message)
    }
  });

  app.get('/api/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const posts = await pool.query ('SELECT * FROM posts WHERE post_id = $1', [id])
      res.json(posts.rows[0])

    } catch (err) {
      console.error(err.message)
    }
  });

  app.post('/api/posts', (req, res, next) => {
      const author = req.body.author;
      const postBody =  req.body.postBody;
      const title = req.body.title;

      pool.query('INSERT INTO posts (body, title, author) VALUES($1, $2, $3)', [postBody, title, author]);
    res.status(201).json({
      message: 'Post added successfuly'
    });
  });

  app.put('/api/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updateGif = await pool.query('UPDATE posts SET title = $1 WHERE gif_id = $2', [title, id]);
      res.json('Gif was updated');
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletePost = await pool.query('DELETE FROM posts WHERE post_id = $1', [id]);
      res.json('Post was deleted');
    } catch (error) {
      console.error(err.message)
    }
  });

  app.use('/dashboard', require('./routes/dashboard'));

module.exports = app;