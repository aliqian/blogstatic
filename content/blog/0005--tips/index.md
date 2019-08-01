---
title: Tips of JavaScript
date: "2019-07-31T00:10:31.495Z"
description: "Collection of tips for JavaScript. Some knowledge is just too short to be a blog, so they stay together."
---

#### 1. Swap values

```javascript
let x = 1, y = 2;
[y, x] = [x, y];
```
This can be used for more than two variables.

#### 2. Array flat trick

```javascript
let arr = [1, [2, 3, [4, 5]], [6, 7]];
String(arr).split(','); // [ '1', '2', '3', '4', '5', '6', '7' ]
```

Interesting, but may be useless. Elements in the result are changed into string.
