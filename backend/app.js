const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

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
      const posts = await pool.query ('SELECT * FROM posts WHERE post_id = $1', [id]);
      res.json(posts.rows[0])

    } catch (err) {
      console.error(err.message)
    }
  });

  app.post('/api/posts', async (req, res, next) => {
    
      const author = req.body.author;
      const postBody =  req.body.postBody;
      const title = req.body.title;
      const filename = req.body.filename;

      pool.query('INSERT INTO posts (body, title, author, imgname) VALUES($1, $2, $3, $4)', [postBody, title, author, filename]);

    res.status(201).json({
      message: 'Post added successfuly'
    });
  });


  // app.put('/api/posts/:id', async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const { title } = req.body;
  //     const updateGif = await pool.query('UPDATE posts SET title = $1 WHERE gif_id = $2', [title, id]);
  //     res.json('Gif was updated');
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // });

  app.delete('/api/posts/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const deletePost = await pool.query('DELETE FROM posts WHERE post_id = $1', [id]);
      res.json('Post was deleted');
    } catch (error) {
      console.error(err.message)
    }
  });

  //save visited post

  app.post('/api/posts/seen', async (req, res, next) => {

    try {
      const postID = req.body.postID;
    const userID = req.body.userID;
    console.log(postID)

    pool.query('INSERT INTO seen (post_id, user_id) VALUES($1, $2)', [postID, userID]);

  res.status(201).json({
    message: 'Post visited'
  });
    } catch (error) {
      console.error(err.message)
    }

});

//get seen posts

app.post('/api/posts/visited', async (req, res) => {
  try {
    const userID = req.body.userID;
    const allSeenPosts = await pool.query('SELECT DISTINCT post_id FROM seen WHERE user_id = $1', [userID]);
    res.json(allSeenPosts.rows)
  } catch (err) {
    console.error(err.message)
  }
});

//upload file

// const fileFilter = function(req, file, cb) {
//   const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

//   if (!allowedTypes.includes(file.mimetype)) {
//     const error = new Error('Wrong file type');
//     error.code = "LIMIT_FILE_TYPES";
//     return cb(error, false);
//   }

//   cb(null, true);
// }

// const upload = multer({
//   dest: './images/users/',
//   fileFilter
// }).single("file");

const storage = multer.diskStorage({
  destination: function(req, file, cb) { 
     cb(null, '../frontend/public/images/');    
  }, 
  filename: function (req, file, cb) { 
    cb(null,Date.now() + path.extname(file.originalname));  
  }
});

const upload = multer({ storage: storage }).single("file");


// const store = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, './images/users/')
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
//   }
// })

// const upload = multer({ storage: storage });

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if(err) {
      res.status(400).send("Something went wrong!");
    }
    return res.send(req.file.filename)

  });
});


  app.use('/dashboard', require('./routes/dashboard'));

module.exports = app;