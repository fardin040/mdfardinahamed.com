---
title: "How TCP SYN Port Scanning Works"
date: "2026-02-24"
description: "Half-open scanning, response interpretation, and what defenders can observe from SYN-based reconnaissance."
category: "Networking"
tags:
  - "Port Scanning"
  - "TCP"
  - "Reconnaissance"
---

TCP SYN scanning is often called a half-open scan because the scanner does not complete a full connection. Instead, it sends a SYN packet and interprets the response.

## Core packet logic

- `SYN/ACK` usually indicates an open port.
- `RST` usually indicates a closed port.
- No response or ICMP errors can suggest filtering.

## Why this matters

This technique is important because it reduces noise compared with a full TCP connect while still revealing useful information about reachable services.

```c
int sock = socket(AF_INET, SOCK_RAW, IPPROTO_TCP);
/* build and send SYN packet, then inspect reply flags */
```

From a defensive perspective, repeated SYN probes across many ports or hosts can be a clear early signal of reconnaissance.
