/* Importamos la libreria Mnongo DB */
const mongoose = require('mongoose');

/* Especificamos la coneción con Mongo DB */
mongoose.connect( process.env.MONGODB_URL, {useNewUrlParser: true,  useUnifiedTopology: true, useCreateIndex:true, useFindAndModify:false} );