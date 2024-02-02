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

## What's Origin

![Origin URL](/images/origin-url.jpg)

### Same-origin policy

> https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy


Say you're browsing a page on www.wikipedia.org. In general, will the following requests succeed, or fail?

1. A JavaScript GET request to www.bank.com.

2. A JavaScript POST request to www.bank.com.

3. Clicking an HTML link to a video on www.bank.com.

**Here we go!** There are possible exceptions, but in general the following will be true:

1. This request will FAIL, because requests to get information from a cross-origin domain are not allowed by the browser. The browser is trying to protect your privacy by preventing www.wikipedia.org from stealing your private information from www.bank.com.

2. This request will SUCCEED. This is a little known exception to the Same Origin Policy! The decision to allow POST requests is mostly historical, but there is also a lower chance that a POST request will steal your private information. POST requests are used to write data to a server, rather than GET data from it, so it's less likely the response will contain private information.

3. This request will SUCCEED. The Same Origin Policy applies only to scripts and not static resources like HTML tags.

### Cross-Origin Resource Sharing (CORS)

> https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS

