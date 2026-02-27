---
author: Tommy Slater
pubDatetime: 2025-06-22T00:00:00Z
title: Documentation as Code
slug: documentation-as-code
featured: true
draft: false
tags:
  - engineering
description: Documentation deserves the same rigor as code. What it means to treat docs as a first-class citizen.
---

Documentation deserves the same respect, rigor, and processes we apply to our code. Too often, documentation is an afterthought: something we grudgingly update when we remember. But what if we treated it as a first-class citizen in our development workflow?

## The Problem with Traditional Documentation

Most documentation fails because:

- It lives separately from code, making it easy to forget
- It lacks version control or has a different versioning system
- No one reviews it for accuracy or clarity
- It's written once and slowly rots
- There's no clear ownership or maintenance plan

## Principles of Documentation as Code

### 1. Live with the Code

Keep documentation in the same repository as your code. When you change behavior, the documentation changes in the same commit. This proximity creates a natural reminder and makes it easier to keep things in sync.

### 2. Version Together

Documentation should travel through the same version control system. You should be able to checkout any commit and have documentation that matches that exact state of the code.

### 3. Review Like Code

Documentation changes should go through the same review process as code. Check for:

- Technical accuracy
- Clarity and readability
- Completeness
- Grammar and formatting

### 4. Test Your Docs

Just as we test code, we can test documentation:

- Code examples should be executable
- Links should be verified
- API documentation should be generated from code where possible
- Set up automated checks for common issues

### 5. Automate Where Possible

- Generate API docs from code comments
- Use tools that extract examples from test files
- Create templates for common documentation patterns
- Set up CI/CD checks for documentation health

## Practical Implementation

Start small:

1. Move your README into your repo if it isn't already
2. Add documentation checks to your PR template
3. Include "update relevant docs" in your definition of done
4. Use markdown linters in your CI pipeline
5. Treat documentation bugs with the same severity as code bugs

## The Payoff

When documentation is treated as code:

- New team members onboard faster
- You spend less time answering the same questions
- Your future self thanks your past self
- External users actually succeed with your APIs
- Knowledge doesn't leave when people do

Documentation as code isn't about writing more. It's about writing documentation that stays accurate, useful, and alive. Make it part of your development cycle, not an afterthought.

Remember: Code explains _what_ and _how_. Documentation explains _why_.
