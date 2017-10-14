const express = require('express');

const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const routes = require('./waitlist/routes/waitlistRoutes'); //importing route
routes(app)

app.listen(port)

console.log('Up and running! Port:' + port)
