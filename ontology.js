const fetch = require('node-fetch');
const size = 5;
const baseUrl = "http://service.tib.eu/ts4tib/api/ontologies?";
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
        temp['id'] = body[i]['ontologyId'];
        temp['name'] = body[i]['config']['title'];
        temp['description'] = body[i]['config']['description'];
        temp['updated'] = body[i]['updated'];
        temp['termsCount'] = body[i]['numberOfTerms'];
        result.push(temp);
    }
    return result;
}


module.exports.getOntologies =  getOntologies;
module.exports.ontologiesCount = getOntologiesCount;
