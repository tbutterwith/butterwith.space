---
title: "Thoughts on Boring Software"
date: "2021-12-30"
slug: "thoughts-on-boring-software"
description: Boring software is often the most stable, reliable, and innovative software. Here's a few reasons why.
tags:
  - General Software Development
  - Software Architecture
---

![A bonsai tree in a pond](/assets/blog/thoughts-on-boring-software/hero.jpg)

When leading projects I often find myself championing the use of boring technologies. You know the ones, tried and tested, well documented, been around for a while, that sort of thing. They’re the programming equivalent of your favourite jumper. Your go-to.

What I’m getting at is these are the technologies you know the limitations of, which frameworks or libraries work well with them, how to test them in production.

Building software can be hard and developers/teams/businesses have a limited amount of capacity for new things. A [blog I regularly refer back to](https://mcfunley.com/choose-boring-technology) describes this capacity as innovation tokens - the idea that you have a set amount of new things you can take on for each project and you can choose to spend them how you like. For example, a new product idea might cost you one innovation token, using a new database technology you’ve not tried before is another and so on. This concept helps you limit the ‘newness’ that adds complexity.

Personally, I like to spend the majority of my innovation tokens on product problems. These are the things that usually deliver the biggest impact in your work.

The benefits to this are two fold. Firstly, by limiting the variety of technology in your stack you free up your thinking time for really diving into the product you’re building, experimenting, and validating your ideas. I also find that in software product discussions are usually far smoother than those about which technology to use - an added bonus.

Secondly, in a world of microservices limiting the number of technologies you use creates a wonderfully homogenous landscape for support. You don’t need bespoke tools to debug each of your services. Working on service *x* on Monday and service *y* on Tuesday? Great, they’re both Java, using the same testing framework, and the same libraries. The only context switching you need to do is between domains (and even that’s a maybe if you’re team owns a subset of a product.)

So where does that leave you when you want to try something brand new? This is where I think the concept of innovation tokens really shines. There isn’t anything in this pattern that says you can’t use that brand new framework you heard about at that conference talk where everyone got sweet t-shirts. In order to do so you have to be explicit about the cost of change and the affect that will have on your capacity to deliver. Easy.
