const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// All authors route
router.get('/', async (request, response) => {
    let options = {}

    if(request.query.name != null && request.query.name !== '') {
        options.name = new RegExp(request.query.name, 'i')
    }

    try {
        const records = await Author.find(options)
        response.render('authors/index', {
            authors: records,
            options: request.query
        })
    } catch {
        response.redirect('/')
    }
})

// New author route
router.get('/create', (request, response) => {
    response.render('authors/create', { author: new Author() })
})

// Create author route
router.post('/', async (request, response) => {
    const author = new Author({
        name: request.body.name
    })

    try {
        const record = await author.save()
        response.redirect('authors')
    } catch {
        response.render('authors/create', {
            author: author,
            messages: 'Error creating Author.'
        })
    }
})

module.exports = router
