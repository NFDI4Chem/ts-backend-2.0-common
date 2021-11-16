const express = require('express')
const ontology = require('./ontology');
const termsModule = require('./term');
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
  let data =  await ontology.getChemOntologies();    
  res.send(data);   
});
app.get('/ontologies/engineering', async function(req, res){
  let data =  await ontology.getIngOntologies();    
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
  // console.log(req.body.childrenLink);
  let data =  await termsModule.getChildren(req.body.childrenLink);    
  res.send(data); 
});
