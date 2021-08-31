# ts backend 2.0 common

The common backend for the Terminology Service V2.0

This backend is used by TIB-Termonology-Service-Library (https://git.tib.eu/lab-linked-scientific-knowledge/terminology-service/tib-terminology-service-library) to fetch the ontology-related information from http://service.tib.eu/ts4tib/api/

### Run
in the project directory run: (default port 8000)
        
        > node app.js

### Currently supported functions:

- `/ontologies`: returns all ontologies metadata. The returned object is a JSON array. (look at: `ontology.js`)

- `/ontology/:id`: returns metadata (json format) about one ontology based on Id. 