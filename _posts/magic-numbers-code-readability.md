---
title: "Avoid Magic Numbers to Increase Code Readability"
date: "2021-03-03"
slug: "magic-numbers-code-readability"
tags:
  - Code Quality
  - Javascript
  - Refactoring
---
### What are magic numbers?

Magic numbers are any numeric constant declared in your code. They could help you convert minutes to seconds, set limits for the number of all records in a database, or repeat a process a constant number of times. In any case, you'll see things like `for(const i = 0; i < 10; i++)` or `return x * 60`. 

### Why should you avoid them?

On their own, these numbers carry no explicit meaning, the developer has to *infer* what they are from the context they are used. This might be easy, everyone knows there are 60 seconds in a minute. Others, like the example for converting kilometres to miles below, are more obscure. 

### What should you do instead?

Consider this example. On its own, `0.6213712` carries very little meaning. We can establish from the method name that this might be the number of miles in a kilometre but without looking it up or a code comment, we can only assume. 

By giving this value its own variable with a helpful name, we're writing self-documenting code that gives the next person to read this code all the information they need to know exactly what a value is.

**Example one**

```js
// Before: large float in the middle of a function
const convertKilometersToMiles = (distanceInKm) => {
	return distanceInKm * 0.6213712;
}

// After: The function is easier to read at a glace. 
// Anyone reviewing the code can clearly see the intent of the function
const MILES_IN_KILOMETER = 0.6213712;

const convertKilometersToMiles = (distanceInKm) => {
	return distanceInKm * MILES_IN_KILOMETER;
}
```

**Example two**

```js
// Before
if (users > 10) {
	throw new Error("too many users");
}

// After
const CONCURRENT_USER_LIMIT = 10;

if (users > CONCURRENT_USER_LIMIT) {
	throw new Error("too many users");
}
```