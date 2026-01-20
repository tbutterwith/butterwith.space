---
title: "Nailing Your First Technical Interview"
date: "2022-02-15"
slug: "nailing-your-first-technical-interview"
description: Information and research topics to help you smash your first technical interview and land your first job.
tags:
  - Career
---
The hunt for your first job can be a stressful time in your life. You’ve invested a huge amount of time and energy into learning the skills you think you need to start your journey in the world of professional software development, you’ve made some fantastic projects along the way, but who knows what those pesky interviewers are going to ask you in a “technical interview”.

Well, a technical interview could mean a number of different things - an hour of questions, writing some code (either on a whiteboard or in an online editor), or a walk through one of your projects. What I intend to set out below are some topics to help you prepare what ever comes your way.

🗒️ Throughout this page I’ll use the terms app, service or project interchangeably. What I mean by this is a *thing* of some kind that you’ve built.

Let’s start with the project walkthrough and some of the areas you might want to touch on. The topics below are also a great starting point for “an hour of questions” style interviews.

### “Tell me about your project”

*This style of interview requires you to think about a project that you’ve worked on and answer questions on the design and implementation.*

First things first, how do you decide which of your projects you should chose? When I’m interviewing I’m really looking for a project that fits two criteria:

1. Is this project complex enough to cover all of the areas I need to cover?
The project might not cover more complex topics like deployment or scale, but we need to be able to have a discussion about this in a hypothetical way. “If this app went viral, what’s the first thing that would break?”
2. Are you able to talk about every part of this project, whether you worked directly on it or not?
You don’t need to have built the entire project you’re talking through, but you do need to be able to talk through how it works and why certain decisions were made. You may have built the front-end but you need to know about the database and back-end (and visa versa).

If you find yourself building lots of “hello world” or todo list apps to show your versatility in learning frameworks or languages, a better investment with your time might be to create a single, more complex application so you can show your depth.

So, you’ve picked a project that you’re happy talking about in depth - what sort of topics should you prepare?

### Design decisions

Most of the questions in this area will be around why you made certain choices when building your application. You may not have considered any of these things when designing your application so it’s a good idea to retrospectively review some decisions you may have made. “Because this is the technology I know” is an *alright* answer, but companies will be looking for candidates that are able to see how the tools and technology they know fit into a wider ecosystem. There are a million and one frameworks and tools to solve a problem so you’re going to need to know how to pick the one that fits the job best.

I’ve included a non-exhaustive list of questions below, some may not be applicable to your project depending on its design.

- “Why did you chose language *x* over *y*?”
- “Why did you use a SQL database over NoSQL?” (or vice versa)
- “Why is the database structured the way it is? How do the relationships between entities work?”
- “Why do you have a server between your client and your database? What are the advantages of this?”
- “How does your application deal with failures?” - I personally like this one as it allows you to talk about how people might use your app and what kind of experience you want them to have when things don’t quite work out
- “Why did you use *x* front end framework? What advantages does it bring over plain/vanilla JS and HTML?”

### Testing

If you’ve learnt to programme via a bootcamp or you’re self-taught you may have never *needed* to write tests but you’ve probably had a lesson or two covering them. Testing is a really important tool for ensuring the software you write:

1. Works in the way that you intended
2. Interacts with other services and other software
3. Doesn’t break when someone else (or even you) comes to make changes later
4. Is easy to understand

It’s my opinion that you don’t need to have written tests to get your first job, but you should have an understanding of why they are important and an idea of the different types of testing. A couple of key questions to answer would be:

- “What value do tests provide?”
- “How might you stop the next contributor to your service breaking what you’ve written?”
- “How do you know the code you’ve written works as expected?”

A few types of tests to look into at unit tests, acceptance tests, integration tests, and performance tests.

Lastly, one often overlooked use of tests is to document your code. Unit tests can often provide information on the way a method is expected to be used and the kind of data the original programmer anticipated might be used. Next time you’re trying to understand someone else’s code, take a look at the tests.

### Scale

Depending on the type of applications you’ve written, you may have never had to think about scale. Code running on even the most basic laptop can support enough users to test your code, share with friends, and potentially even publish to the internet. Writing software for a business will take you beyond that and it’s important that you know how to think about scaling software.

The best place to start when thinking about performance is to look at your application and try to work out which part will break first. Will your server manage with 100 times the number of requests it’s got at the moment? What about 1000 times? How about your database? Focus in on the weakest part of your application and how might you improve its capacity.

To scale an application there are two main approaches:

- **Vertical scaling:** this is the simplest form of scaling and it involves increasing the power of the machine your code is running on. Got 500Mb of RAM? Make it 1Gb. This is useful for parts of your application that store data (or manage state as some people would refer to it.) It’s the easiest way to add capacity without too much difficultly. A word of caution with this approach - you can only go so big before cost becomes the prohibitive factor.

- **Horizontal scaling:** this involves running multiple copies (or instances) of your code on replica machines. Have one server running your back-end? Try two. This is a really effective way of splitting the load across different instances. When horizontally scaling your application you’ll need to think about balancing the load on each machine, and handily there are services called Load Balancers to do exactly that for you.

Similarly to the point on testing, I wouldn’t expect early career candidates to have experience in scaling an application but understanding **how** software scales is important to know.

### Deploying Software

Lastly. you should be aware of how to deploy software. Like the other sections, a surface understanding of the type of services you might use to get your application in front of users. Here’s a short list of topics:

- **Version control:** All good deployment pipelines start with source control. You should understand why git and version control in general are good ideas
- **Continuous deployment**: When committing to master, how does your traffic serving service get updated? Tools like Netlify and Heroku have this build in, services like Jenkins and Github Actions provide more customisation
- **Infrastructure**: What’s running your service? Things to look at here include EC2 instances (or other cloud provisioned virtual machines), cloud database providers like Dynamo DB or Azure Database.
- **Logging and alerting**: How do you know when your app has stopped working? Relying on users to contact you is one way but that’s often not the best idea. Tools like Loggly, NewRelic, and LogRocket allow you to find out automatically when something isn’t working as it should and help you get to the bottom of it.

### Summary

In short, the points above should take you beyond thinking about writing code and into the other problems you’ll face running software at scale. Take all of this with a pinch of salt. Not every company is going to ask you the same questions and have the same expectations of a junior engineer, but understanding how to get your code, your apps, your products in front of people is very powerful knowledge indeed.

Best of luck, you’re just getting started on an exciting and potentially rewarding journey! 🚀
