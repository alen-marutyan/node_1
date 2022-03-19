// @ts-ignore
const express = require('express');
require('dotenv').config();
const http = require('http');
const app = express();
const Server = http.createServer(app)
// @ts-ignore
const PORT = process.env.PORT || '3000';
const indexRouter = require('./routs/IndexRoute');
const bodyParser = require('body-parser')

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('/',indexRouter)


Server.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});



