// require dependencies
let express = require('express');
let bodyParser = require('body-parser');
let cors = require('cors');
let morgan = require('morgan');
let mongoose = require('mongoose');
let fs = require('file-system');
let path = require('path');

// dependency methods
let app = express()
let db = mongoose.connection

// Middleware
app.use(bodyParser.urlencoded({ limit: "900mb", extended: false }));
app.use(bodyParser.json({limit: "900mb"}));
app.use(cors());

// Server Connection
let PORT = process.env.PORT || 3080

if (process.env.PORT === 'production'){
    app.use(express.static('client/build'));
}

//Connection to databse
// Local test database
mongoose.connect('mongodb://localhost/ourPrayers', { useNewUrlParser: true})
db.once('open', () => console.log('Successfully connected to the database!'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// establish connection with server
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, './client/build'));
})

app.listen(PORT, function () {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });