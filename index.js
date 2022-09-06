const express = require('express');
const bodyParser = require("body-parser");


const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.post('/api/c2p', function(req, res) {

const factura = req.body.transaction_c2p.invoice_number;

console.log('peticion entrante')
    const s = {
        "Merchant_Identify": {
          "integratorId": "1",
          "merchantId": "150332",
          "terminalId": "1"
        },
        "Transaction_c2p_Response": {
          "processing_date": "2019-09-12 03:07:53 VET",
          "trx_status": "approved",
          "trx_type": "compra",
          "payment_method": "c2p",
          "payment_reference": "0057718281656",
          "invoice_number": factura,
          "amount": 30.11,
          "currency": "ves",
          "trx_internal_status": "00",
          "authorization_code": "002166",
          "service_fee": "0"
        }
      };

    res.send(s);
  });
  
  app.listen(port);
  console.log('Server started at http://localhost:' + port);