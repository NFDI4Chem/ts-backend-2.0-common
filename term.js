const fetch = require('node-fetch');
const ontologyModule = require('./ontology');
const settings = { method: "Get", headers: {'Accept': 'application/json'}};
const size = 100;



async function getRootTerms(ontologyId){
    try{
        let ontology = await ontologyModule.getOneOntology(ontologyId);
        let termsLink = ontology['_links']['terms']['href'];
        let pageCount = await getPageCount(termsLink + '/roots');
        for(let page=0; page < pageCount; page++){
            let url = termsLink + "/roots?page=" + page + "&size=" + size;      
            let res =  await fetch(url, settings);
            res = await res.json();  
            if(page == 0){
                var terms = processJson(res);
            }
            else{
                terms = terms.concat(processJson(res));
            }      
        }
        return terms;

    }
    catch (e){
        return e.message ;
    }
    

}

async function getPageCount(url){
    let answer = await fetch(url, settings);
    answer = await answer.json();
    return Math.ceil(answer['page']['totalElements'] / size);
}


function processJson(jsonArray){
    let result = [];
    let body = jsonArray['_embedded']['terms'];
    for(let i=0; i<body.length; i++){
        temp = {};
        temp['iri'] = body[i]['iri'];
        temp['labe'] = body[i]['label'];
        temp['description'] = body[i]['description'];
        temp['ontologyId'] = body[i]['ontology_name'];
        temp['has_children'] = body[i]['has_children'];
        temp['is_root'] = body[i]['is_root'];
        temp['short_form'] = body[i]['short_form'];
        if(body[i]['has_children']){
            temp['children'] = body[i]['_links']['children']['href'];
        }
        
        result.push(temp);
    }
    return result;
}


module.exports.getRootTerms = getRootTerms;