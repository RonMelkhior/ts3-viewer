# TS3 Viewer

TS3 Viewer is a web-based Teamspeak 3 server viewer, with _live_ updates.

# Framework

TS3 Viewer contains a simple framework around Teamspeak 3's Telnet interface (located in `src/query`).

# Installation

TS3 Viewer requires Node.js v7.6+  
Rename `.env.example` to `.env`, and edit it's values to your preference.

```
> npm install -S
> node index.js
```

# License

TS3 Viewer (excluding `src/query`) is licensed under GPL v2, while `src/query` is MIT.
