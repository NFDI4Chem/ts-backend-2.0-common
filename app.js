const express = require("express");
const cors = require("cors");
const ontology = require("./app_modules/ontology");
const chemOntology = require("./app_modules/chemOntology");
const ingOntology = require("./app_modules/ingOntology");
const termsModule = require("./app_modules/term");
const propertiesModule = require("./app_modules/property");
var bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
const port = 8000;
const host = "localhost";


var whitelist = ['http://localhost', 'http://ols02.develop.service.tib.eu'];
var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}


/* var corsOptions = {
  origin: "http://localhost",
}; */

app.listen(port, host, () => {
  console.log(`Example app listening at ${host}:${port}`);
});

app.disable("etag");

app.get("/", async function (req, res) {
  let data = [];
  data.push("OK ts backend is running");
  res.send(data);
});

app.get("/ontologies", cors(), async function (req, res) {
  let data = await ontology.getOntologies();
  res.send(data);
});
app.get("/ontologies/chemistry", cors(), async function (req, res) {
  let data = await chemOntology.getChemOntologies();
  res.send(data);
});
app.get("/ontologies/engineering", cors(), async function (req, res) {
  let data = await ingOntology.getIngOntologies();
  res.send(data);
});

app.get("/ontologies/:ontologyId", cors(), async function (req, res) {
  let data = await ontology.getOneOntology(req.params.ontologyId);
  res.send(data);
});

app.get("/rootterms/:ontologyId", cors(), async function (req, res) {
  let data = await termsModule.getRootTerms(req.params.ontologyId);
  res.send(data);
});

app.post("/termchildren", cors(), async function (req, res) {
  let data = await termsModule.getChildren(req.body.childrenLink);
  res.send(data);
});

app.get("/rootproperties/:ontologyId", cors(), async function (req, res) {
  let data = await propertiesModule.getRootProperties(req.params.ontologyId);
  res.send(data);
});

app.post("/propertychildren", cors(), async function (req, res) {
  let data = await propertiesModule.getChildren(req.body.childrenLink);
  res.send(data);
});
