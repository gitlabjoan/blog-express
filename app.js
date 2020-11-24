/* {---------- EXPRESS ----------} */
const express = require('express');
const app = express();

/* {---------- mongoDB CONNECTION ----------} */
require('./db/mongoose.js');

/* {---------- MODELS & ROUTERS ----------} */
const postModel = require('./models/postModel.js');
const postRouter = require('./routers/postRouter.js');

/* {---------- PORT CONNECTION ----------} */
const port = process.env.PORT;

/* {---------- APP PORT LISTENING ----------} */
app.listen( port, () => {console.log( `Listening to port ${port}` )} );

/* {---------- IMPORTING EJS VIEW ENGINE ----------} */
app.set('view engine', 'ejs');

/* {---------- MIDDLEWARE ----------} */
app.use( express.static('public') );

/* {---------- RUTAS WEB ----------} */
app.get('/', async (req, res) => {
    try{
        const posts = await postModel.find({}) 
        console.log('posts', posts);
        res.render('index', { title:'Blog', posts })
    } catch (error) {
        res.render('index', {  title:'Blog', posts:'[]' })
    }
   
});

app.get('/form', (req, res) => {
    res.render('form', {title: 'form'})
});

/* {---------- WE PARSE THE DATA TO JSON ----------} */
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json());

/* {---------- API ROUTING ----------} */
app.use('/api', postRouter);

/* {---------- 404 ERROR ----------} */
app.use((req, res) => {
    res.status(404).render('404', {title:'404'});
});