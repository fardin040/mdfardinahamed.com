---
title: "Building a Port Scanner in C"
date: "2026-02-27"
description: "Implementation notes on sockets, concurrency, and limits of a low-level learning scanner."
category: "Linux"
tags:
  - "C"
  - "Sockets"
  - "System Programming"
---

Writing a scanner in C forces careful thinking about packet construction, timeout behavior, and how target systems actually respond.

## Important design choices

- Blocking versus non-blocking sockets
- Sequential probing versus concurrency
- Timeout calibration
- Interpreting service banners safely

```c
connect(socket_fd, (struct sockaddr *)&server_addr, sizeof(server_addr));
```

The goal is not to replace established tools. It is to learn the underlying protocol mechanics well enough to reason about their output with confidence.
