const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()
const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio, para que todo mundo lo use
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());


// Conexión a Base de datos
// mongodb+srv://pradi:123@apiauth.31noblb.mongodb.net/?retryWrites=true&w=majority
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@${process.env.DBNAME}.31noblb.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes

const dashboadRoutes = require('./routes/dashboard');
const verifyToken = require('./routes/validate-token');
const authRoutes = require('./routes/auth');

// route middlewares

app.use('/api/user', authRoutes);
app.use('/api/dashboard', verifyToken, dashboadRoutes);

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})