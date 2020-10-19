// import libs
const express = require('express');
const path = require('path');
const pages = require('./pages.js');

// starting the libs express
const server = express()
server
// utilize body of req
    .use(express.urlencoded({ extended: true }))

// using the static files
.use(express.static('public'))

// setting templete engine
.set('views', path.join(__dirname, "views"))
    .set('view engine', 'hbs')

// routes of the application
.get('/', pages.index)
    .get('/orphanage', pages.orphanage)
    .get('/orphanages', pages.orphanages)
    .get('/create-orphanage', pages.createOrphanages)
    .post('/save-orphanage', pages.saveOrphanage)

//  start server 
server.listen(5500)