---
title: JavaScrit Coercion
date: "2019-07-29T03:44:40.990Z"
description: "单词很生僻，其实就是类型转换。理论上各门语言都会有类型转换，只是 JavaScript 稍微有点玩过头，导致有些情况跟预期不太相符。"
---

大概很多人会觉得 JS 中的类型转换比较坑。由于历史原因在内的种种复杂因素，导致 JS 规范中有些不合理的枝节。对于这些“坑”，一概否定是不可取的，不如了解清楚，合理利用。

为了尽量保持准确，本文会引用一些 [ECMAScript® 2019 Language Specification](http://www.ecma-international.org/ecma-262/10.0/index.html) 中的描述。

首先从下面这个表达式说起：

```
[] == ![]
```

运行一下就知道结果，这里就不剧透了，文末是解释。要推导出结果，需要两个小知识。

### 一. 关于 `==`

表达式 `x == y` 的称为 **[Abstract Equality Comparison](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-abstract-equality-comparison)**, 其结果为 true 或 false。执行过程如下：

> 1. If Type(x) is the same as Type(y), then
>    1. Return the result of performing [Strict Equality Comparison](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-strict-equality-comparison) x === y.
> 2. If x is null and y is undefined, return true.
> 3. If x is undefined and y is null, return true.
> 4. If Type(x) is Number and Type(y) is String, return the result of the comparison x == ! [ToNumber](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-tonumber)(y).
> 5. If Type(x) is String and Type(y) is Number, return the result of the comparison ! [ToNumber](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-tonumber)(x) == y.
> 6. If Type(x) is Boolean, return the result of the comparison ! [ToNumber](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-tonumber)(x) == y.
> 7. If Type(y) is Boolean, return the result of the comparison x == ! [ToNumber](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-tonumber)(y).
> 8. If Type(x) is either String, Number, or Symbol and Type(y) is Object, return the result of the comparison x == [ToPrimitive](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-toprimitive)(y).
> 9. If Type(x) is Object and [Type](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-ecmascript-data-types-and-values)(y) is either String, Number, or Symbol, return the result of the comparison [ToPrimitive](http://www.ecma-international.org/ecma-262/10.0/index.html#sec-toprimitive)(x) == y.
> 10. Return false.

要注意文档中的感叹号 "!" 并不是运算符，而是一个文档标记，表示后续表达式必定会返回一个值，并且返回值会置于当前位置继续参与计算。

ToNumber 和 ToPrimitive 参考下一节。

解释如下：

a. 步骤 1 表示如果 x 与 y 类型相同，结果等同与 `x === y`;

b. 步骤 2 与步骤 3 表示 `null == undefined` 结果为 true；

c. 步骤 4 与步骤 5 表示如果 x 与 y 一方是 Number，另一方是 String，对 String 执行 ToNumber，再进行比较.

d. 步骤 6 与步骤 7 表示如果 x 与 y 一方是 Boolean，则对 **这一方** 执行 ToNumber，再进行比较.

e. 步骤 8 与步骤 9 表示如果 x 与 y 一方是 String, Number 或 Symbol，另一方是 Object，则对 Object 执行 ToPrimitive .

f. 步骤 10 表示如果能执行到这一步，直接返回 false。

要注意的有：

1. `null == 3` 可以到达步骤 10.
2. 各个步骤之间是 if ... else if ... 的关系，原文中有 return，解释时偷懒没加上。
3. 从步骤 6, 7 可以看出，双等号 `==` 偏向 Number 的比较。如果类型不同，一般转换结果是把两方都变成 Number 类型。

### 二. 转换操作

JavaScript 中的类型转换会借助一类抽象操作（Abstract Operation），类似于抽象函数，可以接受参数。

#### 1: ToBoolean(argument)

| argument 类型 | 转换结果                                      |
| ------------- | --------------------------------------------- |
| Boolean       | 无需转换                                      |
| Undefined     | false                                         |
| Null          | false                                         |
| Number        | +0, -0, NaN 返回 false，其余返回 true         |
| String        | 空字符串（长度为 0) 返回 false, 否则返回 true |
| Symbol        | true                                          |
| Object        | true                                          |

简单来讲就是只有 false, undefined, null, +0, -0, NaN, "" 的转换结果是 false，其余都是 true。

#### 2: ToNumber(argument)

| argument 类型 | 转换结果                                                         |
| ------------- | ---------------------------------------------------------------- |
| Number        | 无需转换                                                         |
| Undefined     | NaN                                                              |
| Null          | +0                                                               |
| Boolean       | true 转为 1，false 转为 +0                                       |
| String        | 【见下文】                                                       |
| Symbol        | 抛出 TypeError 异常                                              |
| Object        | 先调用 ToPrimitive(argument, hint Number), 再将结果传入 ToNumber |

String 转为 Number 有一套单独的语法，简单理解为先去除首尾空白字符，然后：

1. 如果结果是空字符串，转为 0；
2. 如果结果是数字形式，则转为对应数字；
3. 其它情况都转为 NaN。

```javascript
Number("") // => 0
Number("  \n \t0.  ") // => 0
Number("\t 10.35 ") // => 10.35
Number("\t 1.0.2 ") // => NaN
Number("1.x") // => NaN
```

#### 3: ToPrimitive ( input [ , PreferredType ] )

JavaScript 中的非 Object 类型称为原始类型(Primitive)，ToPrimitive 用于将 input 转为原始类型。基本过程如下：

1. PreferredType 表示想转成什么类型，可以是 “string" 或 ”number“，如果不指定，默认为 ”number“；
2. 转换方式是调用 input 的 valueOf() 和 toString() 方法，调用顺序取决于 PreferredType;
3. 以 PreferredType 为 "string" 为例:
   1. 先调用 toString(), 如果返回原始类型，则返回值就是转换结果，否则下一步
   2. 调用 valueOf() 方法，如果返回原始类型，则返回值就是转换结果，否则下一步
   3. 若两者的返回值都不是原始类型，则抛出 TypeError 异常。

```bash
"TypeError: Cannot convert object to primitive value"
```

Object 类型的 valueOf() 和 toString() 默认值继承自内置对象 `Object` , valueOf() 默认返回对象本身，toString() 默认返回字符串 `"[object Object]"` . 可以根据需要重写这两个方法。例如数组对象的 toString() 方法，重写为返回所有元素由逗号分隔组成的字符串：

```javascript
;[1, 2, 3].toString() // => '1,2,3'
```

---

### 演算表达式 [] == ![]

在这个表达式中，x 为 `[]`, y 为 `![]`. 以下即以 x ，y 指代。

#### 1. 判断 x 与 y 的类型

由 `==` 的规则可以看出类型起到关键作用。

JavaScript 的类型可以分为 7 类：Null, Boolean, String, Symbol, Number, Object. 一般可以使用 `typeof` 操作符进行判断，只有函数对象例外。

```javascript
typeof [] // => "object"
typeof ![] // => "boolean"
```

这里 x 是一个数组，但是 JS 中没有单独设置数组类型，而是将其归于 Object 类型下。

而 y 中的感叹号 `!` 称为逻辑非运算符，用法为 `!expr` , 计算过程会作用是先对 expr 做 ToBoolean 操作，然后将结果取反。根据上文 ToBoolean 规则可知，由于 `[]` 是 Object 类型的，转成 true，取反后为 false。即 y 的值为 false，类型为 Boolean。

```txt
结论：
    x 值为 [], 类型为 Object
    y 值为 false, 类型为 Boolean
```

#### 2. 层层判断

```javascript
/*1*/ [] == ![]
/*2*/ [] == false
/*3*/ [] == ToNumber(false) // 步骤 7
/*4*/ [] == 0 // 参考 ToNumber 说明
/*5*/ ToPrimitive([]) == 0 // 步骤 9
/*6*/ '' == 0 // 参考下方解释
/*7*/ ToNumber('') == 0 // 步骤 5
/*8*/ 0 == 0 // 参考 ToNumber 说明
/*9*/ true
```

> 对第 5 步的解释： 虽然 ToPrimitive 默认转为 number，但是数组对象的 valueOf() 返回数组对象本身，不是原始类型，所以转而调用 toString(), 数组对象的 toString() 是用逗号分隔的字符串，空数组转成空字符串。

## 总结

双等号 `==` 喜欢比较数字，规则就是，如果类型相同，效果等同于 `===` , 如果类型不同，则尽量转为数字。

JavaScript 中涉及类型转换的场合还有很多，这里只以比较运算为例。其它还有 if 和 while 语句的判断条件会把表达式转为 boolean，`number + string` 操作会把 number 转为 string 等等。

虽然有些转换并不直观，但还是有章可循的。
