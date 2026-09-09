---
author: Tommy Slater
pubDatetime: 2026-09-10T08:00:00Z
title: Frothy Busywork
slug: frothy-busywork
featured: false
draft: false
tags:
  - ai
  - engineering
  - philosophy
description: Agents that grade each other's homework, work sold as innovation, and the question of which illusions are worth keeping.
---

Automation pays when the process is already defined. That is the precondition, and it is the one most often skipped.

Executives overestimate their ability to automate. Companies have spent this year [rehiring the roles they cut](https://qz.com/companies-rehiring-workers-ai-layoffs-automation-070126), Ford and IBM and Commonwealth Bank of Australia among them. Robert Half found nearly one in three US hiring managers eliminated a position citing AI and then hired back for that role or one like it. Forrester put the share of employers who regret an AI-related layoff at 55 percent.

Automation can also harm workers without replacing them, which is the quieter outcome: the job survives, and it gets worse. An NBER paper puts the mechanism plainly, that [automation can reduce the value of work before it eliminates jobs](https://news.ycombinator.com/item?id=49601814#49603242). Bargaining power goes first. Demonstrating the machine is enough to move the negotiation, whether or not anyone ever deploys it.

## Grading Each Other's Homework

Hugh Cumming, CTO at Vena, [names the shape of it](https://www.forbes.com/councils/forbestechcouncil/2026/08/27/ais-most-dangerous-problem-isnt-failure-its-the-illusion-of-progress/) in Forbes.

> The danger of AI isn't that it will fail. It's that it will succeed well enough, and for long enough, to look like progress—without ever driving real change.

Multi-agent systems reach that state by a specific route. Left unchecked, they settle into a loop where the agents grade each other's homework, and the grade is awarded for the cheapest signal available: the code compiled, the linter went quiet, the review came back approved. The intent that started the work goes unexamined, because nothing in the loop is pointed at it.

Every one of those signals is a proxy. Compilation stands in for correctness. A passing review stands in for a working change. A closed ticket stands in for a solved problem. Each substitution is reasonable on its own, and each one is cheaper to satisfy than the thing it represents.

Give a system a target and it will find the cheapest path to the target. That is not a defect in agents. It is what optimization is.

IBM ran the version of this that has a number attached. The AI they put on HR requests resolved about 94 percent of them. The remaining 6 percent is where the job turned out to live, and the company is now tripling entry-level hiring. Ninety-four percent is an excellent score against the proxy and a failing one against the work.

I have written about both ends of this. [Local-fix debt](/posts/local-fix-debt/) is the minimal edit that silences a checker without touching the design, and [software factories](/posts/software-factories-suck/) fail at exactly the point where inspection has to carry all the weight that judgment used to carry.

## The Part That Predates Agents

Frothy busywork gets sold as productivity innovation. You have seen this at work, and you saw it long before agents arrived.

The pattern does not need AI. It needs a metric, a deadline, and someone whose promotion depends on movement rather than outcome.

## What Actually Pays

I am not writing off agentic AI. The trick is sorting which uses add value. Chat, voice, translation, and prototyping earn their cost today. We are actively working out the rest at my company, and I can go deeper on that another time if there is interest.

## Two Illusions

Healthy skepticism and a critical eye keep you from being duped by grifters selling snake oil.

At the same time, we gotta get paid. Pragmatism allows for some waste, as long as the bosses stay happy and the business keeps running.

Directives often contradict. Such is the duality of the world we live in. Even in this post I caution you against one illusion while advising you to maintain another. We humans are complicated animals. Scale that up to social systems and their effectiveness turns on the incentives and constraints placed upon them. We use many imperfect abstractions to manage the overwhelming complexity of big problems.

## All Models Are Wrong

> All models are wrong, but some are useful.

[Box's line](https://en.wikipedia.org/wiki/All_models_are_wrong) sets the standard. A model's usefulness depends on how closely it resembles reality and whether it produces results aligned with the rewards you actually want.

So: are the CEOs and billionaires right, or have they lost touch? Do their strategies work, or are hidden factors like luck and survivorship bias being discounted? What scope and time scale are we judging on? Have we modeled the system accurately, and does that even matter in the applied context?
