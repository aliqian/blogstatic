---
title: JavaScript template literal - with tag
date: "2019-07-24T10:50:02.338Z"
description: "模板字符串(Template literals) 通常用来在字符串中插入表达式. 而实际上, 模板字符串会将字符串以表达式为分界点, 将表达式切分后传入一个函数中. 字符串连接只是默认的行为."
---

ES2015 引入了由反引号( \` \` ) 表示的模板字符串。如：

```javascript
let name = "Bob"
let age = 18
console.log(`${name} is ${age} years old.`)
// => 'Bob is 18 years old.'
```

实际上模板字符串会以其中的表达式为分界点, 将字符串切成数组后传给一个函数. 不指定的情况下默认调用的函数就是各个部分连接成一个字符串, 也就是上面见到的效果。

加上自定义函数的模板字符串称为 “tagged template”，形式为模板字符串紧跟在函数名后(可以有空格)，如下：

```javascript
// values 多个参数传入的, 这里借助 '...' 合成一个数组
function highlight(strings, ...values) {
  console.log(strings) // [ '', ' is ', ' years old.' ]
  console.log(values) // [ 'Bob', 18 ]

  let result = ""
  for (let i = 0; i < strings.length; i++) {
    result += strings[i]
    if (values[i]) {
      result += `<em>${values[i]}</em>`
    }
  }
  return result
}
let name = "Bob"
let age = 18

// 类似函数调用, 注意不加小括号, 否则就是整个字符串作为参数传递
console.log(highlight`${name} is ${age} years old.`)
// => '<em>Bob</em> is <em>18</em> years old.'
```

**Tag function**(上例中的 highlight 函数)**并不一定要返回字符串**, 如将上例修改如下:

```javascript
function highlight(strings, ...values) {
  // 返回一个函数
  return function(className) {
    let result = ""
    for (let i = 0; i < strings.length; i++) {
      result += strings[i]
      if (values[i]) {
        result += `<span class="${className}">${values[i]}</span>`
      }
    }
    return result
  }
}
let name = "Bob"
let age = 18
const highlightWith = highlight`${name} is ${age} years old.`
console.log(highlightWith("bold"))
// => '<span class="bold">Bob</span> is <span class="bold">18</span> years old.'
```

实现 CSS-in-JS 的 [styled-components](https://www.styled-components.com/) 库中使用了这种语法。
