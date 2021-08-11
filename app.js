const express = require('express')
const ontology = require('./ontology')
const app = express()
const port = 8000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

app.disable('etag');

app.get('/ontologies/:page', async function(req, res){
    let data =  await ontology.getOntologies(req.params.page);    
    res.send(data);   
});

app.get('/ontologies/count', async function(req, res){
    let count = await ontology.ontologiesCount();
    res.send(count.toString())
});