---
author: Tommy Slater
pubDatetime: 2026-02-27T00:00:00Z
title: Bash Is All You Need
slug: bash-is-all-you-need
featured: false
draft: false
tags:
  - engineering
  - ai
description: The case for minimal agent architecture, and where it breaks down.
---

Every few years, the industry rediscovers Unix.

This time the catalyst is AI agents. Vercel's team [removed 80% of their agent's tools](https://vercel.com/blog/we-removed-80-percent-of-our-agents-tools), replaced fifteen specialized components with bash and SQL, and watched everything improve: 3.5x faster execution, 100% success rate (up from 80%), 37% fewer tokens. The agent got simpler and better at the same time.

The philosophy now has a name: "bash is all you need."

## The Claim

Andrew Qu, Vercel's chief of software, [put it plainly](https://vercel.com/blog/how-to-build-agents-with-filesystems-and-bash): "Models are getting smarter and context windows are getting larger, so maybe the best agent architecture is almost no architecture at all."

The argument has three pillars.

**Composition is free.** Piping three tools together (`grep | jq | sort`) burns no tokens. Each stage feeds the next without a model inference pass between them. A [five-step pipeline that costs fractions of a cent in bash](https://deadneurons.substack.com/p/forget-mcp-bash-is-all-you-need) can cost dollars when each step requires a model call.

**Discovery is lazy.** Protocols like MCP front-load tool schemas into the context window, sometimes [55,000+ tokens](https://deadneurons.substack.com/p/forget-mcp-bash-is-all-you-need) before the conversation starts. Bash discovers tools on demand, the same way Unix resolves binaries from `$PATH` without loading their manpages first.

**Scripts persist.** Once a model finds the right command sequence, that sequence becomes a script: deterministic, fast, free. No recurring inference cost. The insight compounds.

## The Evidence

Vercel's d0 agent provides the clearest before-and-after:

| Metric         | Specialized tools | Bash + SQL |
| -------------- | ----------------- | ---------- |
| Execution time | 274.8s            | 77.4s      |
| Success rate   | 80%               | 100%       |
| Token usage    | ~102k             | ~61k       |
| Steps required | ~12               | ~7         |

The team's diagnosis: they had been "solving problems the model could handle on its own." Specialized tools constrained the model's reasoning more than they helped. Stripping the scaffolding let the model reason directly.

Mario Zechner's [Pi agent](https://agentfactory.panaversity.org/docs/General-Agents-Foundations/seven-principles/bash-is-the-key) takes the idea further: four tools total (Read, Write, Edit, Bash). If the agent needs to do something new, it doesn't install a plugin. It writes the code itself.

## The Counterevidence

Vercel ran a [deeper evaluation](https://vercel.com/blog/testing-if-bash-is-all-you-need) and the results complicated the story:

| Metric   | SQL   | Bash   | Filesystem |
| -------- | ----- | ------ | ---------- |
| Accuracy | 100%  | 52.7%  | 63.0%      |
| Tokens   | 155k  | 1,062k | 1,275k     |
| Cost     | $0.51 | $3.34  | $3.89      |
| Duration | 45s   | 401s   | 126s       |

Bash consumed 7x more tokens and ran 9x longer than SQL on structured data queries. The winning approach was hybrid: SQL for queries, bash for verification. Neither tool alone was sufficient.

The Vercel team flagged a critical dependency: the simplified architecture requires "well-structured, consistently named" data. If your data layer is a mess of legacy naming conventions, the bash agent "just gets faster bad queries."

## Two Claims, One Name

"Bash is all you need" conflates two distinct ideas:

**1. Minimal tooling beats complex tooling for AI agents.** Strong evidence. Models reason better with fewer, general-purpose tools than with many specialized ones. The Vercel data supports this. So does Claude Code's architecture: Read, Write, Edit, Bash, plus a handful of search tools. The lesson is about agent design, not about bash specifically.

**2. Bash is the right implementation language for tools.** Weaker claim. Bash excels at file manipulation, process coordination, and text transformation. It breaks down when you need types, data structures, or complex state management.

The first claim is the durable insight. The second is context-dependent.

## Where It Holds

Bash works when the domain fits its strengths:

- **Append-only data.** `echo "$json" >> file.jsonl` is atomic, simple, correct.
- **Text search.** `grep`, `jq`, `yq`, `sqlite3` compose into powerful queries.
- **Process orchestration.** Piping, backgrounding, traps for cleanup.
- **Zero-dependency deployment.** No runtime to install. Bash ships with the OS.
- **Rapid iteration.** No compile step. Change a line, run it.

These properties make bash excellent glue. Most infrastructure problems are glue problems.

## Where It Breaks

The [conventional wisdom](https://pythonspeed.com/articles/shell-scripts/) on bash's limits is well-established. Rewrite when you encounter:

- **Data structures beyond strings and arrays.** Bash has no maps, no objects, no trees. Associative arrays exist but feel like an afterthought.
- **State machines.** Complex state transitions want types and pattern matching, not nested `case` statements in a 1,200-line file.
- **Error handling.** `set -euo pipefail` catches a class of bugs but introduces its own: arithmetic expressions that evaluate to zero kill the script, `grep` with no matches triggers `set -e`, and [retrofitting correctness into an existing script is difficult](https://dev.to/taikedz/shell-scripting-vs-go-practical-notes-form-a-reimplementation-project-1b18).
- **Testability.** No standard test framework. No mocking. Assertions are string comparisons wrapped in helper functions.
- **Concurrency.** Background jobs and `wait` work for simple parallelism. Anything involving shared state or coordination outgrows the model fast.

The complexity ceiling isn't a line count. It's the moment you find yourself building abstractions that the language fights you on.

## The Lesson

The "bash is all you need" movement is a rediscovery of the Unix philosophy through the lens of AI agents. Give tools one job each. Compose them through standard interfaces. Let the user (now a model) decide how to combine them.

The insight for agent builders: invest in fewer, sharper tools rather than more specialized ones. A model with bash access can `grep`, `curl`, `jq`, and `sqlite3` its way through problems that would require a dozen custom tools to solve.

The insight for tool builders: bash is a good default until it isn't. The ceiling arrives not when the line count gets large, but when the logic gets stateful. Know the boundary. Cross it deliberately.

The best architecture might be almost no architecture at all. But "almost" is doing real work in that sentence.
