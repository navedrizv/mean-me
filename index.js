const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
const authentication = require('./routes/authentication'); // Import Authentication Routes
const path = require('path'); // NodeJS Package for file paths

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname + '/client/dist/')); // Provide static directory for frontend
app.use('/authentication', authentication);



app.get('*', (req, res) => {
    // res.send("<h1>Hello World</h1>");
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// Node listens to this port
app.listen('8080', () => {
    console.log('Listening on port 8080');
})