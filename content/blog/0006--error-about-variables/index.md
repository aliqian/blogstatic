---
title: TypeError and ReferenceError
date: "2019-07-31T09:19:35.327Z"
description: "The TypeError object represents an error when a value is not of the expected type. The ReferenceError object represents an error when a non-existent variable is referenced."
---

## How to create a TypeError

In general, a TypeError will be thrown when a value is not and can't be converted to the expected type.

```javascript
0() // TypeError: 0 is not a function
{ toString: null } + 1 // TypeError: Cannot convert object to primitive value
null.x // TypeError: Cannot read property 'x' of null
let Car = (name) => { this.name = name }
new Car() // TypeError: Car is not a constructor
for(let v of {}) { } // TypeError: {} is not iterable
```

## How to create a ReferenceError

```javascript
// ReferenceError: x is not defined
x + 1
x = 5
console.log(x)
/* ... */
```

**Only** `typeof` operator can reference an undeclared variable and not throw an error (ReferenceError).

"Undeclared" is not the same as `undefined`, even though:

```
typeof x // 'undefined'
```
