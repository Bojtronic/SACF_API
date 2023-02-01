const express = require("express");

const cuentasRoute = require('./src/routes/route_cuenta');
const asientosRoute = require('./src/routes/route_asiento');
const lineasAsientoRoute = require('./src/routes/route_lineaAsiento');

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );
  next();
});


app.use('/api/cuentas', cuentasRoute);
app.use('/api/asientos', asientosRoute);
app.use('/api/lineasasiento', lineasAsientoRoute);

app.listen(port, () => console.log(`listening on port ${port}`));

app.get('/', (consulta, respuesta) => {
  respuesta.send('BOJTRONIC - SACF API');
});

module.exports = app;