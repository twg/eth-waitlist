const express = require('express')

const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const routes = require('./waitlist/routes/applicationRoute') //importing route
routes(app)

app.listen(port)

console.log('Up and running! Port:' + port)
