if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config().parsed
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const indexRouter = require('./routes/index')
const mongoose = require('mongoose')

// configure 
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/master')

app.use(expressLayouts)
app.use(express.static('public'))

app.use('/', indexRouter)

// mongo db connection
mongoose.connect(process.env.DATABASE_URI, { 
    useUnifiedTopology: true, 
    useNewUrlParser: true 
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose.'))

// listener
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000.')
})