---
title: JavaScrit Coercion
date: "2019-07-29T03:44:40.990Z"
description: "单词很生僻，其实就是类型转换。理论上各门语言都会有类型转换，只是 JavaScript 稍微有点玩过头，导致有些情况跟预期不太相符。"
---

大概很多人会觉得 JS 中的类型转换比较坑。由于历史原因在内的种种复杂因素，导致 JS 规范中有些不合理的枝节。对于这些“坑”，一概否定是不可取的，不如了解清楚，合理利用。

为了尽量保持准确，本文会引用一些 [ECMAScript® 2019 Language Specification](http://www.ecma-international.org/ecma-262/10.0/index.html) 中的描述。

首先从下面这个表达式说起：

## 表达式 1: [] == ![]

结果是 true 还是 false 大家运行一下就知道。这里做一下推导。

表达式 `[] == ![]` 中，设 x 为 `[]`, y 为 `![]`. 以下即以 x ，y 指代。

### 1. 关于 `==`

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

解释如下：

a. 步骤 1 表示如果 x 与 y 类型相同，结果等同与 `x === y`;

b. 步骤 2 与步骤 3 表示 `null == undefined` 结果为 true；

c. 步骤 4 与步骤 5 表示如果 x 与 y 一方是 Number，另一方是 String，对 String 执行 ToNumber，并对结果取反.

d. 步骤 6 与步骤 7 表示如果 x 与 y 一方是 Boolean，则对 **这一方** 执行 ToNumber，并对结果取反.

e. 步骤 8 与步骤 9 表示如果 x 与 y 一方是 String, Number 或 Symbol，另一方是 Object，则对 Object 执行 ToPrimitive .

f. 步骤 10 表示如果能执行到这一步，直接返回 false。

要注意的有：

1. `null == 3` 可以到达步骤 10.
2. 各个步骤之间是 if ... else if ... 的关系，原文中有 return，解释时偷懒没加上。
3. 从步骤 6, 7 可以看出，双等号 `==` 偏向 Number 的比较。如果类型不同，一般转换结果是把两方都变成 Number 类型。

ToNumber 和 ToPrimitive 即是程序内进行的类型转换操作，类似于抽象函数。

### 转换操作

#### 1. ToBoolean(argument)

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

#### 2. ToNumber(argument)

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

#### 4. ToPrimitive ( input [ , PreferredType ] )

表达式 `[] == ![]` 中，x 为 `[]`, y 为 `![]`. 以下即以 x ，y 指代。

#### 步骤 ① ：判断 x 与 y 的类型是否相同。

根据上述过程，如果 x 与 y 类型相同，结果就等同于 `x === y` 的值。所以先判断 x 与 y 的类型。

JavaScript 的类型可以分为 7 类：Null, Boolean, String, Symbol, Number, Object. 一般可以使用 `typeof` 操作符进行判断，只有函数对象例外。

```javascript
typeof [] // => "object"
typeof ![] // => "boolean"
```

x 是一个数组，但是 JS 中没有单独设置数组类型，而是将其归于 Object 类型下。

y 中的感叹号 `!` 称为逻辑非运算符，用法为 `!expr` , 作用是对表达式 expr 取反。这个过程会先对 expr 做 ToBoolean 操作，意思是把 expr 转成 Boolean 类型，规则如下：

##### 转换操作 ToBoolean

| 原始值    | 转换类型                                      |
| --------- | --------------------------------------------- |
| Boolean   | 无需转换                                      |
| Undefined | false                                         |
| Null      | false                                         |
| Number    | +0, -0, NaN 返回 false，其余返回 true         |
| String    | 空字符串（长度为 0) 返回 false, 否则返回 true |
| Symbol    | true                                          |
| Object    | true                                          |

简单来讲就是只有 false, undefined, null, +0, -0, NaN, "" 的转换结果是 false，其余都是 true。

由于 `[]` 是 Object 类型的，所以 `![]` 结果是 false, 也就是 y 的值为 false，所以类型为 Boolean。

因为 x 的类型是 Object，y 的类型是 Boolean，两者类型不同，进入下一步。

#### 步骤 ②：如果 x 为 null 且 y 为 undefined，返回 true。

#### 步骤 ③：如果 x 为 undefined 且 y 为 null，返回 true。

上面两步的结论是，如果 x 与 y 的值都是 null 或 undefined，则 `x == y` 结果为 true。

显然本例中 x 与 y 都不是 null 或 undefined.

#### 步骤 ④：如果 x 类型为 Number，且 y 类型为 String，则返回 `x == !ToNumber(y)`

#### 步骤 ⑤：如果 x 类型为 String，且 y 类型为 Number，则返回 `!ToNumber(x) == y`

上面两步的结论是，如果 x 与 y 一方是 Number，另一方是 String，则对 String 执行 ToNumber 操作，然后对结果取反。ToNumber 即将值转换为 Number 类型。

由于本例中 x 与 y 都不是 String 或 Number，进入下一步，
