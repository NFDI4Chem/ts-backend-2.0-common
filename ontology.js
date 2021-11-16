const fetch = require('node-fetch');
const size = 20;
const baseUrl = "http://service.tib.eu/ts4tib/api/ontologies"
const settings = { method: "Get", headers: {'Accept': 'application/json'}};

async function getOntologies(){  
    var pageCount = await getPageCount();
    for (let page=0; page < pageCount; page++){
        let url = baseUrl + "?page=" + page + "&size=" + size;       
        let res =  await fetch(url, settings);
        res = await res.json();  
        if(page == 0){
            var ontologies = processResult(res);
        }
        else{
           ontologies = ontologies.concat(processResult(res));
        }        
    }

    return ontologies;
}

async function getOneOntology(id){
    try{
        let url = baseUrl + "/" + id;
        let result = await fetch(url, settings);
        result = await result.json();
        return result;
    }
    catch{
        return '0';
    }

}

async function getPageCount(){
    let url = baseUrl + "?page=0&size=1";        
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
        temp['updated'] = body[i]['updated'].split('T')[0];
        temp['termsCount'] = body[i]['numberOfTerms'];
        temp['individualsCount'] = body[i]['numberOfIndividuals'];
        temp['propertiesCount'] = body[i]['numberOfProperties'];
        result.push(temp);
    }
    return result;
}


module.exports.getOntologies =  getOntologies;
module.exports.getOneOntology = getOneOntology;
