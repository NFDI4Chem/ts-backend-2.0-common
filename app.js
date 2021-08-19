const express = require('express')
const ontology = require('./ontology')
const app = express()
const port = 8000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.disable('etag');

app.get('/ontologies', async function(req, res){
    let data =  await ontology.getOntologies();    
    res.send(data);   
});

app.get('/ontology/:id', async function(req, res){
  let data =  await ontology.getOneOntology(req.params.id);    
  res.send(data);   
});
