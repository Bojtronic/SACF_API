const express = require("express");
const cors = require('cors');

const cuentasRoute = require('./src/routes/route_cuenta');
const asientosRoute = require('./src/routes/route_asiento');
const lineasAsientoRoute = require('./src/routes/route_lineaAsiento');

const app = express();
const port = process.env.PORT || 3000;
const lista_de_origenes = ['https://sacf-2022.web.app'];

app.use(express.json());

//app.use(cors({origin:lista_de_origenes}));     //acceso limitado a una lista de origenes
app.use(cors({origin:'*'}));    //acceso a todos los origenes, cualquier url


/*
https://www.section.io/engineering-education/how-to-use-cors-in-nodejs-with-express/

const whitelist = ['https://sacf-2022.web.app']
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error())
    }
  }
}

app.get('/ingredients', cors(), (req, res, next) => {
    res.send(ingredients);
});
*/

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS,HEAD"
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

//module.exports = app;
//