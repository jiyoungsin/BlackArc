const mongoose = require('mongoose');
const express = require('express');
const Points = require('./models/points');

const app = express();
const PORT = 3000;
app.use('/assets', express.static('public'));

// Connecting to MongoDB
mongoose.connect("mongodb+srv://admin:admin@cluster0.qsz8x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('connected to Mongo database');
}).catch((ERR) => {
    console.log(`Error occurred connecting to Database: ${ERR}`);
});

// 1 fetch the HTML.
app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html');
});


// Querying the Data
app.get('/points', (req, res) => {
    Points.find()
    .then(function(data){ 
        return res.json(data);
    }).catch(function(ERR){ 
        console.log(`ERROR: while fetching Points: ${ERR}`);
    });
});


// Querying the Data
app.post('/points', (req, res) => {
    Points.create({
        points: [200,170,300,260,380,220,330,370,150,320],
        color: "0xAA33BB",
        shapeType: "Polygon",
    }).then(function(data){ 
        console.log(`Successfully added new points!`);
        res.sendStatus(201);
    }).catch(function(ERR){ 
        console.log(`ERROR: while adding Points: ${ERR}`);
        res.status(500).json(ERR);
    });
});




app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}!`)
});