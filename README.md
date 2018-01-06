# Simple Login Application built on MEAN stack (MySQL-Express-Angular-Node)
For developer coming from LAMP (Linux-Apache-MySql-Php) backgroud.

Client
Angular 4
bootstrap (for css/js/layout)

Server
Node
Express

Middleware
Passport

Database
Mysql


Note :
------

Angular Client will not be able to reach the Node api router unless body-parse is imported

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

Above statements need to included in index.js file to allow parsing of request.