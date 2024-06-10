const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get("/api/basic", function (req, res) {
  console.log("peticion entrante");
  const s = {
    Merchant_Identify: {
      integratorId: "1",
      merchantId: "150332",
      terminalId: "1",
    },
    Transaction_c2p_Response: {
      processing_date: "2019-09-12 03:07:53 VET",
      trx_status: "approved",
      trx_type: "compra",
      payment_method: "c2p",
      payment_reference: "0057718281656",
      amount: 30.11,
      currency: "ves",
      trx_internal_status: "00",
      authorization_code: "002166",
      service_fee: "0",
    },
  };

  res.send(s);
});

app.post("/simulador/consulta/", function (req, res) {
  console.log("peticion de consulta entrante");
  const listaSuscripciones = ["123456", "abc123", "xyz123", "101010"];
  const listaAliados = ["Fibratv", "Cablehogar"];

  const peticion = req.body;
  console.log(peticion);

  let contrato = peticion.contrato;
  let servicio = peticion.servicio;

  let s = {
    status: 400,
    mensaje: "No se encontraron registros",
    data: {},
  };
  let existeAliado = listaAliados.includes(servicio);
  let resultado = listaSuscripciones.find((e) => e == contrato);
  let x = "Valor no encontrado";
  console.log(existeAliado);
  console.log(resultado);
  if (resultado && existeAliado) {
    x = "Valor encontrado.";
    s = {
      status: "00",
      data: {
        // estado: mora,
        // estado: cortado,
        codigo: "00",
        estado: "Activo",
        monto: "17,2",
        fechaCorte: new Date(),
      },
    };
  }

  console.log(x);
  res.send(s);
});

app.post("/api/basic_post", function (req, res) {
  console.log("peticion basica post entrante");
  const s = {
    Merchant_Identify: {
      integratorId: "1",
      merchantId: "150332",
      terminalId: "1",
    },
  };

  res.send(s);
});

app.post("/api/c2p", function (req, res) {
  console.log(req.body);

  const factura = req.body.transaction_c2p.invoice_number;

  console.log("peticion entrante C2P");
  const s = {
    Merchant_Identify: {
      integratorId: "1",
      merchantId: "150332",
      terminalId: "1",
    },
    Transaction_c2p_Response: {
      processing_date: "2019-09-12 03:07:53 VET",
      trx_status: "approved",
      trx_type: "compra",
      payment_method: "c2p",
      payment_reference: "0057718281656",
      invoice_number: factura,
      amount: 30.11,
      currency: "ves",
      trx_internal_status: "00",
      authorization_code: "002166",
      service_fee: "0",
    },
  };

  res.send(s);
});

///Sistema metro
app.post("/simulador/metro", function (req, res) {
  const factura = req.body.referencia;
  const metodo_pago = req.body.metodoPago;
  const monto = req.body.monto;
  const tarjeta = req.body.tarjetaId;
  const tipoOperacion = req.body.tipoOperacion;

  console.log("peticion entrante METRO");
  var s = "";
  if (tipoOperacion == "Compra") {
    s = {
      fechaOperacion: new Date(),
      transaccionEstatus: "Aprobado",
      tipoOperacion: tipoOperacion,
      metodoPago: metodo_pago,
      referencia: factura,
      nroFactura: nrofacturaaleatorio(10),
      monto: monto,
      codigoEstatus: "00",
    };
  } else {
    s = {
      fechaOperacion: new Date(),
      transaccionEstatus: "Aprobado",
      tipoOperacion: tipoOperacion,
      metodoPago: metodo_pago,
      referencia: factura,
      nroFactura: nrofacturaaleatorio(10),
      monto: monto,
      codigoEstatus: "00",
      tarjetaId: tarjeta,
    };
  }

  res.send(s);
});

app.post("/simulador/cable", function (req, res) {
  console.log(req.body);

  const factura = req.body.referencia;
  const contrato = req.body.contratoId;

  console.log("peticion entrante cable");
  //const s = {
  //    "message": "Error en Pago de servicio, intente mas tarde",
  // "statusCode": "100",
  //"success": false,
  //"factura": factura,
  //  "contratoId": contrato
  //};

  const s = {
    message: "Operacion Exitosa",
    statusCode: "00",
    success: true,
    factura: factura,
    contratoId: contrato,
  };

  res.send(s);
});

app.listen(port);
console.log("Server started at http://localhost:" + port);

function nrofacturaaleatorio(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
