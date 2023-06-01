---
title: "Building Systems at Scale: how Skyscanner approaches engineering design reviews"
date: "2023-06-01"
slug: "building-systems-at-scale"
tags:
  - Software Architecture
  - System Design
---

_[Originally published on the Skyscanner Engineering Medium Blog - 31/10/2022](https://medium.com/@SkyscannerEng/building-systems-at-scale-how-skyscanner-approaches-engineering-design-reviews-78067635f6b8)_

Designing systems at scale can be a daunting task at the best of times and when you add in the complexity of managing stakeholders, the whole process can get complicated fast.

One of our [engineering principles](https://medium.com/@SkyscannerEng/using-engineering-principles-to-create-autonomous-teams-at-scale-a73120c4e252) at Skyscanner is that we peer-review every change and we apply this principle to everything from one-line code changes to system design. We accomplish this by conducting a design review: a process centered around a document capturing the what, why, and how of a problem and its proposed solution.

### What are design reviews, and why do we use them?
When designing systems, there are a few challenges we try to overcome with our design review process. The first is developing a shared context. In order to provide appropriate feedback, we need to ensure that everyone reading the document understands the “why” and the “what” of the problem. The “why” can be understood as why are we thinking about this in the first place, and why is this work important to the business. The “what” is the problem’s parameters — what issue are you trying to solve with this design, and what are you explicitly not doing. It’s also important to think deeply about who should be involved in the process and who should be informed of the changes. Often the most difficult part of building systems at scale is aligning your stakeholders, and setting the scene up front in a design document is a great way to bring people along in your process.

Given that we have over 80 engineering teams working on a wide variety of services, a large change such as replacing our web framework of choice naturally affects a wide number of people. The team responsible for this conducts a series of design reviews to outline their thoughts and how this will affect the wider business. This gives each of the teams involved a place to contribute to and challenge the proposal while highlighting any assumptions that might not be correct.

The design review process usually involves a single author but a number and variety of readers. As such design review documents are optimised for the reader with clear section headings and summaries for each section highlighted throughout the document. This way each person can pinpoint the information that is most relevant to them and provide feedback on areas that cross their specialism. For example, all design reviews have a section for security considerations and our fantastic in-house security team ([including Maria](https://medium.com/@SkyscannerEng/my-career-pivot-from-it-recruiter-to-information-security-cf955ca39d24)) monitors this and provides guidance across the whole business.

To keep the document as readable as possible we use sub-documents to dig into the detail and provide additional information for those that want it. Keeping the detail separate but close to the main document allows us to cover complex topics without overwhelming the reader with too much information at once.

The second challenge we’re trying to solve is working asynchronously with a distributed team. Skyscanner has engineers split across eight offices and each one has a wealth of talent and expertise. We have designed our process to enable engineers to review the document in their own time, ask questions in the form of comments directly onto the document, and digest it at their own pace. We then follow up with a session scheduled at least a week in advance so the author can walk through some of the larger questions and comments on the document. This session is recorded and the link is embedded directly into the document.

Lastly, our design review documents are intended to be living documents. By this we mean they are kept up to date with changes to the system and act as the first point of call for anyone that wants to learn about a service. We have found that an up-to-date set of design reviews for a team’s services is a great starting point for anyone joining a new team at Skyscanner, providing both a technical overview of a service as well as the context behind its inception.

This has been particularly useful for us during our move to a Cells Based Architecture, which by design was something very new to us. Through a series of design reviews on each part of the system, the teams involved built a large collection of knowledge and context about the system design — something that comes in very handy when [things don’t work out as planned](https://medium.com/@SkyscannerEng/how-a-couple-of-characters-brought-down-our-site-356ccaf1fbc3).


### How’s this working out for us?
Design reviews have been a fantastic tool for us: not only for ensuring we’re building the best solutions available to us at the time, but also for compiling a back-catalogue of system designs and solved problems with all of the context behind them. This library of information is so useful when redesigning parts of our system, troubleshooting an issue, or onboarding new engineers to one of our teams. Each reader can see the reasoning that led up to the current system and understand the constraints the system is working under. We’re currently running around 10 design reviews a month, and a quick search of our Confluence shows a count of about 1350 design review documents — that’s a huge repository of knowledge and a history of Skyscanner.

Recently we’ve started to apply this process to how we think about the data and metrics our systems produce. Rather than emitting as much information as possible and trying to make sense of it once the system is live, we’re trying to be more holistic in our approach and apply the same rigour that we apply to system designs. Although we’ve just started this approach, we’re starting to see the benefits by having clearly mapped-out data sets from which we can calculate KPIs consistently.

As a learning org, we’d love to hear how you tackle design reviews in your engineering teams — let us know in the comments.
