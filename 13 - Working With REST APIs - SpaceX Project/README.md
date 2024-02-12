# Working With REST APIs - SpaceX Project

## API version

> /v1/*

## JavaScript Property

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Property_accessors

> https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer

> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

> https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap


## Query JSON

```json
{
    "query": {},
    "options": {
        "page": 5,
        "limit": 20,
        "populate": [
            {
                "path": "rocket",
                "select": {
                    "name": 1
                }
            },
            {
                "path": "payloads",
                "select": {
                    "customers": 1
                }
            }
        ]
    }
}
```
