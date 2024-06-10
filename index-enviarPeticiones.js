const express = require('express');
const bodyParser = require("body-parser");
const https = require("https");
const http = require("http");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/transactions', function(req, res) {

console.log('peticion entrante')

const s =''
    res.send(s);
  });

  app.get('/enviar', function(req, res) {

  console.log('peticion de envio entrante')

  fetch("http://172.16.34.168:8084/transactions", {
  method: "GET",
  mode: 'no-cors',
  headers: {
    "Content-type": "application/json; charset=UTF-8",
    "Authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXIxIiwiZXhwIjoxNjc5Njg0ODYzfQ.WA6UMb311y5WOvkC5jSphrC_2EJDUa7evMg7C1VW-oU",
  },
})
.then((response) => response.json())
.then((json) => console.log(json));
    res.send("Respuesta");
     });



  app.listen(port);
  console.log('Server started at http://localhost:' + port);





