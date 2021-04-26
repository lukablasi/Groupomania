const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');

const app = express();

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.get('/api/gifs', async (req, res) => {
    try {
      const allGifs = await pool.query('SELECT * FROM db');
      res.json(allGifs.rows)
    } catch (err) {
      console.error(err.message)
    }
  });

  app.get('/api/gifs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const gifs = await pool.query ('SELECT * FROM db WHERE gif_id = $1', [id])
      res.json(gifs.rows[0])
    } catch (err) {
      console.error(err.message)
    }
  });

  app.post('/api/gifs', (req, res, next) => {
      const source = req.body.source;
      const title = req.body.title;
      pool.query('INSERT INTO db (source, title) VALUES($1, $2)', [source, title]);
    res.status(201).json({
      message: 'Gif added successfuly'
    });
  });

  app.put('/api/gifs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const { title } = req.body;
      const updateGif = await pool.query('UPDATE db SET title = $1 WHERE gif_id = $2', [title, id]);
      res.json('Gif was updated');
    } catch (err) {
      console.error(err.message);
    }
  });

  app.delete('/api/gifs/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deleteGit = await pool.query('DELETE FROM db WHERE gif_id = $1', [id]);
      res.json('Gif was deleted');
    } catch (error) {
      console.error(err.message)
    }
  });

module.exports = app;