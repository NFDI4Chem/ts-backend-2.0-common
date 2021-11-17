const express = require('express')
const ontology = require('./app_modules/ontology');
const chemOntology = require('./app_modules/chemOntology');
const ingOntology = require('./app_modules/ingOntology');
const termsModule = require('./app_modules/term');
const propertiesModule = require('./app_modules/property');
var bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const port = 8000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.disable('etag');

app.get('/', async function(req, res){
  let data = [];
  data.push("OK ts backend is running");
  res.send(data);   
});

app.get('/ontologies', async function(req, res){
    let data =  await ontology.getOntologies();    
    res.send(data);   
});
app.get('/ontologies/chemistry', async function(req, res){
  let data =  await chemOntology.getChemOntologies();    
  res.send(data);   
});
app.get('/ontologies/engineering', async function(req, res){
  let data =  await ingOntology.getIngOntologies();    
  res.send(data);   
});

app.get('/ontology/:id', async function(req, res){
  let data =  await ontology.getOneOntology(req.params.id);    
  res.send(data);   
});

app.get('/rootterms/:ontologyId', async function(req, res){
    let data =  await termsModule.getRootTerms(req.params.ontologyId);    
    res.send(data); 
});

app.post('/termchildren', async function(req, res){
  let data =  await termsModule.getChildren(req.body.childrenLink);    
  res.send(data); 
});

app.get('/rootproperties/:ontologyId', async function(req, res){
  let data =  await propertiesModule.getRootProperties(req.params.ontologyId);    
  res.send(data); 
});

app.post('/propertychildren', async function(req, res){
  let data =  await propertiesModule.getChildren(req.body.childrenLink);    
  res.send(data); 
});