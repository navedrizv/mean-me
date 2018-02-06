=======
# MEAN Application (MySQL-Express-Angular-Node)
For developer coming from LAMP (Linux-Apache-MySql-Php) backgroud.
<br><br>
Client : Angular 4, bootstrap <br>
Server : Node, Express<br>
Middleware: Session, JWT, Passport<br>
Database: MySql<b>

Authentication
Password is hashed with and stored in the database.


Note :
------

Angular Client will not be able to reach the Node api router unless body-parse is imported

app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json

Above statements need to included in index.js file to allow parsing of request.


