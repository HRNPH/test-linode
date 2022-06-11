//import env
require('dotenv').config();

//import express
const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

//set static folder
app.use(express.static(__dirname + '/public/'));

//set view folder
app.set('views', __dirname + '/public/views');

//set view engine to ejs
app.set('view engine', 'ejs');

//create route
app.get('/', (req, res) => {
    //render index.ejs from views folder and send variable data
    res.render('index', { 'data': process.env.DATA });
});

const { base64 } = require('base64-img');
//create post request route
app.post('/api', (req, res) => {
    try {
        console.log(req)
        base64.img(image, './public/dump', Date.now()),
            function(err, filepath) {
                const pathArr = filepath.split('/');
                const fileName = pathArr[pathArr.length - 1];
            }
        console.log(image);
        res.status(200).json({
            success: true,
        });

    } catch (err) {
        console.log(err);
        res.status(500);
    }
});

// enable cross origin policy
var cors = require('cors')

app.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use('/api', createProxyMiddleware({
    target: 'http://localhost:8000/', //original url
    changeOrigin: true,
    //secure: false,
    onProxyRes: function(proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

//create web server from express
app.listen(port, () => console.log(`listening on port ${port}!`));