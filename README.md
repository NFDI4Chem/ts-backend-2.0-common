# ts backend 2.0 common

The common backend for the Terminology Service V2.0

This backend is used by TIB-Termonology-Service-Library (https://git.tib.eu/lab-linked-scientific-knowledge/terminology-service/tib-terminology-service-library) to fetch the ontology-related information from http://service.tib.eu/ts4tib/api/

Configuration as middleware / backend with express
https://expressjs.com/en/resources/middleware/cors.html


### Run
in the project directory run: (default port 8000)
        
        > node app.js

### Currently supported functions:

- `/ontologies`: returns all ontologies metadata. The returned object is a JSON array. (look at: `ontology.js`)

- `/ontologies/:id`: returns metadata (json format) about one ontology based on Id. 

- `/ontologies/chemistry`: returns metadata about chemistry ontologies 


### Dockers

- `backend2.0`: container for backend API services
