/* {---------- EXPRESS ----------} */
const express = require('express');
const app = express();

/* {---------- mongoDB CONNECTION ----------} */
require('./db/mongoose.js');

/* {---------- MODELS & ROUTERS ----------} */
const postModel = require('./models/postModel.js');
const postRouter = require('./routers/postRouter.js');

/* {---------- PORT CONNECTION ----------} */
const port = process.env.PORT || 3001;

/* {---------- APP PORT LISTENING ----------} */
app.listen( port, () => {console.log( `Listening to port ${port}` )} );

/* {---------- IMPORTING EJS VIEW ENGINE ----------} */
app.set('view engine', 'ejs');

/* {---------- MIDDLEWARE ----------} */
app.use( express.static('public') );

/* {---------- RUTAS WEB ----------} */

/* app.get('/', async (req, res) => {
    await postModel.find({}).then((data) => {
        res.render('index', { posts: data })
    });
}); */

app.get('/', async (req, res) => {
    try{
        const posts = await postModel.find({}) 
        res.render('index', { posts })
    } catch (error) {
        res.render('index', { posts: []})
    }
   
});

app.get('/index', (req, res) => {
    res.render('index', {})
});

app.get('/form', (req, res) => {
    res.render('form', {})
});

/* {---------- WE PARSE THE DATA TO JSON ----------} */
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());

/* {---------- API ROUTING ----------} */
app.use('/api', postRouter);

/* {---------- 404 ERROR ----------} */
app.use((req, res) => {
    res.status(404).render('404', {});
});