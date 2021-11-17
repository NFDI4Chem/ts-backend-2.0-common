const fetch = require('node-fetch');
const ontologyModule = require('./ontology');
const settings = { method: "Get", headers: {'Accept': 'application/json'}};
const size = 100;


async function getRootProperties(ontologyId){
    try{
        let ontology = await ontologyModule.getOneOntology(ontologyId);
        let propertiesLink = ontology['_links']['properties']['href'];
        let pageCount = await getPageCount(propertiesLink + '/roots');
        for(let page=0; page < pageCount; page++){
            let url = propertiesLink + "/roots?page=" + page + "&size=" + size;      
            let res =  await fetch(url, settings);
            res = await res.json();  
            if(page == 0){
                var props = processJson(res);
            }
            else{
                props = props.concat(processJson(res));
            }      
        }
        return props;

    }
    catch (e){
        return e.message ;
    }
}


async function getChildren(childrenLink){
    try{
        let data = await fetch(childrenLink, settings);
        data = await data.json();
        return processJson(data);
    }
    catch(e){
        return [];
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
        temp['id'] = i;
        temp['iri'] = body[i]['iri'];
        temp['label'] = body[i]['label'];
        temp['description'] = body[i]['description'];
        temp['ontologyId'] = body[i]['ontology_name'];
        temp['has_children'] = body[i]['has_children'];
        temp['is_root'] = body[i]['is_root'];
        temp['short_form'] = body[i]['short_form'];
        temp['children'] = [];
        temp['definition'] = body[i]['annotation']['definition'];
        temp['example_usage'] = body[i]['annotation']['example of usage'];
        temp['editor note'] = body[i]['annotation']['editor note'];
        temp['isDefinedBy'] = body[i]['annotation']['isDefinedBy'];

        if(body[i]['has_children']){
            temp['childrenLink'] = body[i]['_links']['children']['href'];
        }
        
        result.push(temp);
    }
    return result;
}


module.exports.getRootProperties = getRootProperties;
module.exports.getChildren =getChildren;
