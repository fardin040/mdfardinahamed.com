---
title: "Introduction to Network Scanning"
date: "2026-02-23"
description: "Principles, ethics, and practical tools for network scanning and reconnaissance."
category: "Cybersecurity Labs"
tags:
  - "Network Security"
  - "Port Scanning"
  - "TryHackMe Writeups"
---

Network scanning is one of the first steps in understanding attack surface. It is also one of the easiest activities to misunderstand if the workflow is treated like a tool shortcut rather than a protocol exercise.

## What a scan is actually doing

At a technical level, a scan sends packets that trigger stateful responses. The analyst then interprets those responses to infer whether a host is alive, whether a port is open, and which service may be behind it.

## Safe learning approach

I only practice scanning inside lab environments or explicitly authorized targets. A simple baseline command for learning is:

```bash
nmap -sS -Pn -p 22,80,443 10.10.10.10
```

From there, the important work is interpretation: understanding filtered states, firewall interference, timing behavior, and how noisy scans appear in monitoring tools.
