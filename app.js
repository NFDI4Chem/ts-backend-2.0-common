const express = require('express')
const ontology = require('./ontology');
const termsModule = require('./term');
const app = express()
const port = 8000

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

app.get('/ontology/:id', async function(req, res){
  let data =  await ontology.getOneOntology(req.params.id);    
  res.send(data);   
});

app.get('/terms/:ontologyId', async function(req, res){
    let data =  await termsModule.getTerms(req.params.ontologyId);    
    res.send(data); 
});
