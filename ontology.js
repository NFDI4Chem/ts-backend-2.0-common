const fetch = require('node-fetch');
const size = 20;
const baseUrl = "http://www.ebi.ac.uk/ols/api/ontologies?";
const settings = { method: "Get", headers: {'Accept': 'application/json'}};

async function getOntologies(page){  
    page = page - 1;  
    let url = baseUrl + "page=" + page + "&size=" + size;       
    let res =  await fetch(url, settings);
    res = await res.json();    
    return processResult(res);
}

async function getOntologiesCount(){
    let url = baseUrl + "page=0&size=1";        
    let res =  await fetch(url, settings);
    res = await res.json();    
    return Math.ceil(res['page']['totalElements'] / size)
    
}



function processResult(ontologies){
    let body = ontologies['_embedded']['ontologies'];
    result = [];
    for(let i=0; i<body.length; i++){
        temp = {};
        temp['id'] = i;
        temp['name'] = body[i]['ontologyId'];
        result.push(temp);
    }
    return result;
}


module.exports.getOntologies =  getOntologies;
module.exports.ontologiesCount = getOntologiesCount;