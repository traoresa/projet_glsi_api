const express = require('express');
const app = express();
const bodyParser = require('body-parser');;
const cors = require('cors');
const dotenv = require('dotenv');
const swaggerUi = require('swagger-ui-express');

const swaggerDocumentation = require("./src/doc/swagger.json");

dotenv.config();


const student = require('./src/routes/index');
const mean = require('./src/routes/mean');

// Autoriser les requêtes de toutes mes origines
// Eviter les CORS policy
app.use( (req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-Width, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


// JSON Format dans les transactions des data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use('/assets',express.static(__dirname + '/public/uploads'));
app.use(cors());



app.use('/student', student);
app.use('/mean', mean);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocumentation));


const host = '0.0.0.0';
// Utiliser le port en .env ou ajouter le port 3000
const port = process.env.PORT || 3000;



app.listen(port, ()=> {
    console.log("Server is running ... ");
});