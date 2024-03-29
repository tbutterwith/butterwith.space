---
title: "Refactor your if statements for improved readability"
date: "2021-03-04"
slug: "refactor-if-statements-code-readability"
tags:
  - Code Quality
  - Javascript
  - Refactoring
---

As I write more software and mature as an engineer, I've begun to understand that *less* code isn't always *better* code. Although the code we write is for machines to understand, it's often compiled and optimised for them before it's run. It's much more valuable to write code that's easier for people to understand - it leads to faster code reviews, less confusion, and safer code as people can easily see the intentions behind your code as well as what it does.

With this in mind, I've recently started writing `if` statements differently, trying to make the condition statements as legible as possible. One technique I've found particularly useful is moving the conditional statement into its own function.

Consider this if statement.

```js
if (statusCode == 400 || statusCode == 500) {
	console.log("Bad response");
}
```

It's quite obvious that this `if` statement checks for error code, but what if I'm not familiar with the exact error codes that should be considered an error or the list of 'bad' codes grows? We could refactor this `if` statement into it's own function.

```js
const isBadResponseCode = (statusCode) => {
	return statusCode == 400 || statusCode == 500;
}

if (isBadResponseCode(statusCode)) {
	console.log("Bad response");
}
```

The gains here are two-fold. Firstly,  it's crystal clear what we're looking for in that `if` statement and when we should trigger the condition - bad response codes. If I'm skim-reading the code to get a feel for what it does, I don't need to consider exactly which response codes are bad, just that the program does something if it receives one.

Secondly, the response code comparison is contained within its own function which means it's easier to read in isolation. I don't need to break down the `if` statement to review which response codes the program considers 'bad'.

This is an oversimplification of this concept but it helps to prove a point. We've added more lines of code but I would argue that we've made it easier to understand and reason about, and self-documenting.