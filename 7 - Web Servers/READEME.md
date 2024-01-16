# Web Server

## Introduction to HTTP Response and Requests

### Requests

**METHOD**

* GET
* POST
* PUT
* DELETE

**PATH**

> /messages

**BODY**

* JSON

> { text: "hello", photo: "smile.jpg" }

**HEADERS**

Metadados: informações adicionais

> host: facebook.com

### Response

> https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

**HEADERS**

> content-type: application/json

**BODY**

> { text: "hi", photo: "wave.jpg" }

**STATUS_CODE**

> 200 (OK)

HTTP response status codes indicate whether a specific HTTP request has been successfully completed. Responses are grouped in five classes:

Informational responses (100 – 199)
Successful responses (200 – 299)
Redirection messages (300 – 399)
Client error responses (400 – 499)
Server error responses (500 – 599)