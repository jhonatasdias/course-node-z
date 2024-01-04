# JavaScript Advanced Concepts

## Compiler

Pros 

> Processa mais rapidamente o que está contecendo dentro de um loop caso seja expresso corretamente

``` js

function sum(a, b){
    return a + b;
}

for(int i = 0; i < 1000; i++){
    sum(4,5); // Compiler is always 9, one thousand time
}

```

Conter

> 

## Interpreter

Pros

> 

Conter

>

``` js

function sum(a, b){
    return a + b;
}

for(int i = 0; i < 1000; i++){
    sum(4,5); // Interpreter calculate all one thousand times it's bad.
}

```

## JIT (just-in-time) Compiler

V8 enginer = best of both (Interpreter and Compiler)