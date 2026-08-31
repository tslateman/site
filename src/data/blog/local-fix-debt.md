---
author: Tommy Slater
pubDatetime: 2026-08-30T00:00:00Z
title: Local-Fix Debt
slug: local-fix-debt
featured: false
draft: false
tags:
  - ai
  - engineering
description: The minimal edit that silences the checker without fixing the design, and why nothing in your pipeline catches it.
---

An agent hits a compiler error. It can restructure the ownership, or it can add `.clone()`. While both make the error disappear, only one addresses why the error existed.

The agent optimizes for the signal it can see, and the signal it can see is a green build. Either edit satisfies it. So it picks the cheaper one, every time, in every file. The result is local-fix debt, the minimal edit that silences the checker without fixing the design.

Ousterhout named the human version in _A Philosophy of Software Design_: the tactical tornado, the programmer who outproduces everyone and leaves the design for whoever comes next. Facundo Olano [argues that coding agents work the same way](https://olano.dev/blog/tactical-tornado/), diff by diff, never holding the system in view.

## The Dialects

Every language offers a different way to make the complaint stop. The debt is the same; the spelling changes.

| Language   | The silencer                               | What it hides                         |
| ---------- | ------------------------------------------ | ------------------------------------- |
| Rust       | `.clone()` to satisfy the borrow checker   | Ownership fighting the data flow      |
| Python     | `try/except: pass`, `# type: ignore`       | The error, and where it came from     |
| Go         | `_ = err`, `strings.Contains(err.Error())` | A package with no error contract      |
| TypeScript | `as any`, `!`, `@ts-ignore`                | The runtime value the type lied about |
| Shell      | `2>/dev/null`, `\|\| true`                 | Whether the script worked at all      |
| Tests      | Assert on whatever came out                | That the suite cannot detect a break  |

One pattern runs beneath all of them. Each silencer is a one-line edit, needs no understanding of the surrounding system, and turns the build green. The alternative, restructuring the design, requires holding the whole module in mind. An agent patching locally has no reason to prefer the expensive fix and no way to see that it is needed.

The Rust Design Patterns book named it years before agents existed: [cloning to satisfy the borrow checker](https://rust-unofficial.github.io/patterns/anti_patterns/borrow_clone.html). The clone creates an independent copy whose state silently diverges from the original. That defeats the guarantee the borrow checker exists to provide. The advice was written for humans learning ownership. It now describes a machine that never learns it, because it never has to.

## The Evidence

`strongdm/cxdb` is the open repository behind StrongDM's Level 5 claim: software written by agents with no human code review. Worth reading rather than arguing about.

Someone did. On Hacker News, `lunar_mycroft` answered Simon Willison's question about which Rust anti-patterns show up, and the audit reads as a catalog of local-fix debt. Error control flow by string-matching instead of enum variants. `String::clone` scattered where ownership should have been restructured. `unwrap_or_default` swallowing legitimate failures. An 800-line closure working around an unstable language feature. Bare `unwrap()` with no stated invariant.

Every one of those compiles. Every one passes tests. The repository is both a working system and a demonstration of the debt. That is the uncomfortable part. Green is not evidence of design. It is [evidence of green](https://news.ycombinator.com/item?id=20050090).

## Why Review Misses It

Local-fix debt is invisible to the tools that catch bad code.

The compiler passes, which is the definition. Linters catch a fraction. Clippy flags some redundant clones and `errcheck` finds discarded errors, but neither can judge whether a suppression was warranted, because that judgment requires knowing which specific failure was expected. Code review catches it only if the reviewer reads for design rather than diff, and a reviewer facing thousands of generated lines reads for diff.

The pattern is older than agents. Fred Hebert's [local optimizations don't lead to global optimums](https://ferd.ca/local-optimizations-don-t-lead-to-global-optimums.html) describes systems tuned point by point until they run well under the load they were tuned for and break under anything else. They look healthy right up to the moment the spare capacity runs out. Every silenced error is one of those local optimizations. The build stays green while the codebase loses the ability to diagnose its next failure.

So the debt accumulates in the one place nothing is looking: code that works, passes, ships, and that no one can reason about.

## The Antidote

Read the suppression, not the error it hides. Each one looks reasonable where it sits, which is why the pattern only surfaces when you go looking for it.

1. **The checker passing is the floor, not the verdict.** Compilation, green tests, and a clean lint run are preconditions for review, never conclusions of one.
2. **Every suppression must name the failure it suppresses.** `except KeyError` with a comment is engineering. `except Exception` is a wish. If the specific error cannot be named, the suppression is a finding.
3. **Repeated silencers are one design finding, not many.** Five clones of the same field point at one struct's ownership. Twelve mocks of one collaborator point at one untestable seam. Counting instances measures the symptom; naming the seam fixes it.

That judgment is also why the [software factory](https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md) stays out of reach. You can write the banned-construction list down, and both a human and a linter can enforce it. Neither can tell you whether a given hit is fine, a mechanical fix, or a design that was wrong from the start. The rule catches the spelling. The design is still yours.
