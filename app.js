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
    Points.findOne()
    .then(function(data){ 
        return res.json(data);
    }).catch(function(ERR){ 
        console.log(`ERROR: while fetching Points: ${ERR}`);
    });
});


app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}!`)
});