---
author: Tommy Slater
pubDatetime: 2026-08-30T00:00:00Z
title: Software Factories Suck
slug: software-factories-suck
featured: true
draft: false
tags:
  - ai
  - engineering
  - philosophy
description: The agentic wave revived the software factory. What it would take to run one, and the limit no architecture escapes.
---

The software factory is an [old concept](https://en.wikipedia.org/wiki/Software_factory#History) renewed by the agentic wave of the AI hype storm. I'm surprised to see so many embrace it so eagerly. Did we not learn from last time?

## What It Takes

Borrowing from a [company centered on the concept](https://factory.com/articles/what-is-a-software-factory):

- **Standardized inputs**: scope, acceptance criteria, owner, target environment
- **Common inspection**: human-written and agent-written changes pass the same gate
- **Measurable output**: cycle time, regression coverage, defect rates
- **Replayability**: reproduce a shipped change from its input, prompt, and model version

Standardized inputs alone could make this a non-starter. Vague requirements are a notoriously difficult part of software engineering, _and an important one_. Most of the job is discovering what the ticket should have said. A factory requires that discovery to finish before the work enters the queue, which means requiring the hard part to be done before the line starts moving.

Accept the challenge anyway and dig into how it would work.

## The New Focus

For an AI-enabled factory, the basis for quality moves from who made the change to what conditions were met and what inspections were passed.

Harnesses run loops in parallel: pull from a work queue, pass inspections and reviews, flow into production. Failures and user feedback return to the queue. Humans own the design and the accountability.

That move costs more than it advertises. Code review runs on authorship today, whether or not we admit it. You read a careful senior's pull request differently than a first-week hire's, and you are right to. Strip the name off and every change arrives with identical standing. Inspection has to catch everything reputation used to.

**Verbalizing what counts as "good" becomes the scarce skill.** Building one good screen is not enough to hold quality in a factory that runs every day. That judgment must survive as constraints, guidelines, tests, and review items, in a form both humans and agents can use.

## This Is Hard

Declaring "good" is not easy. People fall back on fuzzy common sense and [I know it when I see it](https://en.wikipedia.org/wiki/I_know_it_when_I_see_it). That works for humans and [Farrah Fawcett hair](https://youtu.be/_OTRIp6nxB0?si=tIIaYVRKJ5dYth8f). It does not work for bots.

Try writing one down. "Handle errors appropriately" is a standard every engineer nods at and no agent can act on. Make it legible and you get a list of banned constructions: no bare `unwrap()`, no `except: pass`, no discarded error return. A human can follow that and a linter can enforce it, which feels like progress until you notice what the rule checks. It catches the spelling of the problem, not the design underneath. Every one of those constructions is correct somewhere. The standard you can automate and the standard you meant are two different documents, and the distance between them is where judgment lives. I've written about that gap separately in [Local-Fix Debt](/posts/local-fix-debt/).

Say we manage to write a definition of "good enough" legible to both. [Legibility](https://jimmyhmiller.com/legibility-is-ruining-you) can be an oppressive force.

What's the alternative? Anarchy? Agents [running amok](https://lwn.net/Articles/1077035/)? Tempting in ways, but no. Tech companies need to generate shareholder value, and engineers serve that need by solving problems within constraints. So say we define our standards. The next problem is verifying them.

### Human Limits in Verification

This isn't new. We've leaned on formatters, security scans, and automated tests for a long time. Go back to Bainbridge (1983), _Ironies of Automation_, or Richard Cook (1998), _How Complex Systems Fail_: complex systems are inherently opaque and run in perpetually degraded states. No single human maintains a complete, current mental model of a distributed state, which makes comprehensive [ex-ante verification](https://en.wikipedia.org/wiki/Ex-ante) an illusion.

### Mental Model Divergence

When automated controllers change state without clear feedback, the human controller's mental model drifts from the actual system state, and supervisory interventions go wrong. We can still do something about it. Nancy Leveson (2011), _Engineering a Safer World_, offers STAMP (Systems-Theoretic Accident Model and Processes). Treat safety as a dynamic hierarchical control loop with explicit feedback channels, latency margins, and constraint enforcement across automated and human components alike.

A [2025 report](https://arxiv.org/html/2509.21654v2) from Google and USC sharpens the limit. An AI system **cannot simultaneously satisfy all three**:

1. **Accuracy.** The system never makes false claims. It may abstain or say "don't know," but every assertion it makes is provably correct.
2. **Trust.** Humans formally rely on the assumption that the system is accurate.
3. **Human-level reasoning.** The system matches or exceeds human performance on every task instance provably solvable by humans.

There is no solving this. It's a mathematical limitation. Engineers architect around the trade-off by deciding which constraint to relax and where to draw structural boundaries.

| Engineering Choice                           | What You Give Up                  | What You Gain                         | Practical Application                             |
| -------------------------------------------- | --------------------------------- | ------------------------------------- | ------------------------------------------------- |
| Probabilistic calibration                    | 100% formal accuracy              | Broad problem coverage & high utility | LLM generation, scoring systems, automated agents |
| Strict scoping / sandboxing                  | Arbitrary self-referential inputs | High accuracy & predictability        | Domain-specific compilers, closed-world planning  |
| Human / meta escalation (Tarskian hierarchy) | Full end-to-end automation        | Zero catastrophic unhandled failures  | Safety-critical automation, legal verification    |

Evals are the go-to for probabilistic calibration. They help in some cases and fall short in others. Escalation is the real-world "of course" exception even AI boosters admit to.

That leaves scoping and sandboxing as the realistic choice. High accuracy and predictability are compelling, and worth giving up self-referential inputs for. JPL's coding rules ban recursion; self-referential AI is a sensible sacrifice. The hard part is defining where the boundaries sit and how verification works at them. You have to read the code.

Technically there's a fourth option: treat abstention as a first-class signal, encouraging "I don't know" as an honest answer. Sound advice for human engineers. Relying on it means proving what "knowing" means for an LLM, which Yann LeCun would call an architectural non-starter given how these models work. Include abstention as a consideration; don't trust it as a solution. Push honest truth to its limit and the machine turns [Socratic](https://en.wikipedia.org/wiki/I_know_that_I_know_nothing), and then we'd need digital hemlock.

## Architecting Autonomy As Best We Can

Software factories suck, as in they drain a ton of energy, mental and electrical, and they seem like a miserable way of working. The genie is out of the bottle, and the broader techno-capitalist machine marches toward agentic development by any means necessary. A more principled man might stand in opposition to the deployment. I'm no Tank Man.

As an engineer I sort the complexity, apply the tools and theories available, and solve the problems of today as best I can. To that end I lean on architecting autonomy: designing systems that federate decision-making and execution so agents and engineers can do what they need to.

### Six Levels of Autonomy

[Addy Osmani](https://addyo.substack.com/p/agentic-autonomy-levels) puts numbers on this. He ranks agentic autonomy across six levels, from suggestions a human accepts one at a time up to what he calls managed-by-exception orchestration: automatic dispatch, with people pulled in only when something escalates. Level 5 is the factory, described plainly and without the marketing.

The useful part is that he refuses to treat the top of the scale as the goal. The right level is a choice made per task, set by the stakes and by how easily you can undo the result. In his words, "high autonomy is not about leaving people out of the loop, but moving from having them do every step to having them decide which direction to go next."

That maps onto the trade-off table above. Managed-by-exception is the escalation row with a dispatcher bolted to the front: you give up end-to-end automation to keep a human at the point of failure. The factory survives as one setting out of six.

### What the Models Can't Do

[Sean Goedecke](https://www.seangoedecke.com/you-have-to-beat-the-models-at-something/) aims the same question at the person instead of the system.

> Even if you have a cunning system of multiple agents — the so-called "software factory" — you're still on dangerous ground. When the features of your system work their way into enterprise AI tooling (and they will), you'll be disposable.

Build a clever harness and you have built next year's product feature for somebody else. His answer, to "leverage your expertise to do what the models can't," comes down to two things: knowing a codebase well enough to tell an agent its solution is overcomplicated and its context is wrong, and writing clearly, a skill he notes the models have gotten worse at while getting better at code.

That is the scarce skill from earlier in this post, aimed at a single change instead of a whole standard.

### Governance and Verification

I'm one of the lucky ones. I have a job, and I work for a tech company still trying to solve problems, intent on using what's available without drifting into token-maxxing insanity. That earns me a duty to advocate for sensible decisions. AI in a large team codebase is, among many things, a governance and verification challenge.

Governance needs RFCs, design docs, some system for scaling collaboration and decision-making. It needs scoped domains and layered rules for humans and agents to follow. Yes, "it depends," and the work is naming those conditions and the extent of the controls. Verification sits at the other end: specifications and tests early, observability and SLOs for what reaches production.

If this sounds like a ton of work, that's because it is. If you hoped AI agents would remove the work like an automated money-printing factory, you'll be disappointed. Analogies between software development and manufacturing are risky business, and since I've taken the factory metaphor away, I'll offer a replacement. The system resembles a machine shop, which demands precision and specification down to the part. More autonomy and more interesting work. Stay sharp and lean into your edge over the models.
