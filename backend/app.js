const express = require('express');

const app = express();

app.use('/api/gifs', (req, res, next) => {
    const gifs =[
        {
            _id: '3',
            title: 'Mouse',
            source: ''
        },
        {
            _id: '4',
            title: 'Lama',
            source: ''
        }
    ];
    res.status(200).json(gifs)
});

module.exports = app;