const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')

// configure 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/master')

app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

// listener
app.listen(process.env.PORT || 3000)