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


async function getTerms(ontologyId){
    try{
        let rootTerms = await getRootTerms(ontologyId);
        for(let i=0; i < rootTerms.length; i++){
            if(rootTerms[i].has_children){
                    let children_link =  rootTerms[i]['children_link'];
                    
                    rootTerms[i]['children'] = await getChildren(children_link);
            }
            
        }
        return rootTerms;
    }
    catch (e){
        return e.message ;
    }
   
}


async function getChildren(link){
    try{
        let result = await fetch(link, settings);
        result = await result.json();
        let body = result['_embedded']['terms'];
        let children = [];
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
            temp['children'] = []

            if(body[i]['has_children']){
                temp['children'] = await getChildren(body[i]['_links']['children']['href']); 
                
            }

            children.push(temp);

        }
        
        return children;
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
        temp['id'] = i;
        temp['iri'] = body[i]['iri'];
        temp['label'] = body[i]['label'];
        temp['description'] = body[i]['description'];
        temp['ontologyId'] = body[i]['ontology_name'];
        temp['has_children'] = body[i]['has_children'];
        temp['is_root'] = body[i]['is_root'];
        temp['short_form'] = body[i]['short_form'];
        if(temp['has_children']){
            temp['children_link'] = body[i]['_links']['children']['href'];
        }
        temp['children'] = [];
        
        
        result.push(temp);
    }
    return result;
}


module.exports.getTerms = getTerms;