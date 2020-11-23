/* Importing express librery */
const express = require('express');

/* Importung model layout */
const postModel = require('../models/postModel.js');

/* Importing an instance of Routing and Middleware */
const router = new express.Router()

/* Creating CRUD */

/* {---------- POST ----------} */
router.post('/posts', async (req, res) => {
    const post = new postModel(req.body)

    try {
        await post.save() 
        res.redirect('/')     
    } catch (e) {
        res.status(400).send(e)
    }
});

/* {---------- GET ----------} */
router.get('/posts', async (req, res) => {
    const posts = await postModel.find({})
    try {
        res.send(posts)
    } catch (e) {
        res.status(500).send()
    }
});

/* Exporting REST-API */
module.exports = router;