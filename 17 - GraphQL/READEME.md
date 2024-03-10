# GraphQL

## Over-fetching and Under-fetching

> https://nordicapis.com/what-are-over-fetching-and-under-fetching/

## Advantages

* No under-fetiching

* No over-fetching

* Schemas and types

* Speeds up development

## Disvantages

* Flexibility adds complexity

* Difficult to cash

## Graphiql Yoga

```yml
#
# Welcome to Yoga GraphiQL
#
# Yoga GraphiQL is an in-browser tool for writing, validating, and
# testing GraphQL queries.
#
# Type queries into this side of the screen, and you will see intelligent
# typeaheads aware of the current GraphQL type schema and live syntax and
# validation errors highlighted within the text.
#
# GraphQL queries typically start with a "{" character. Lines that start
# with a # are ignored.
#
# An example GraphQL query might look like:
#
#     {
#       field(arg: "value") {
#         subField
#       }
#     }
#
# Keyboard shortcuts:
#
#  Prettify Query:  Shift-Ctrl-P (or press the prettify button above)
#
#     Merge Query:  Shift-Ctrl-M (or press the merge button above)
#
#       Run Query:  Ctrl-Enter (or press the play button above)
#
#   Auto Complete:  Ctrl-Space (or just start typing)
#
```

## Graphql Components

Schemas and Resolvers

## Mutation

```js
mutation {
  addNewProduct(id: "orangejacket", description: "Orange Jacket", price: 80.00) {
    description
    price
    reviews {
      rating
      comment
    }
  }
  showReview: addNewProductReview(id: "redshoe", rating: 5, comment: "Show item") {
    rating
    comment
  }
  jacketReview: addNewProductReview(id: "orangejacket", rating: 4) {
    rating
    comment
  }
}
```