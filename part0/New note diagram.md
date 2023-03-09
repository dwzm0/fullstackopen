sequenceDiagram
participant browser
participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    browser->>server: POST request new_note
    activate server
    server-->>browser: HTTP status code 302. URL redirect, with which the server asks the browser to do a new HTTP GET. So files are reloaded.
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes