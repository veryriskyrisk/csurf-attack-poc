# csurf-attack-poc

Demonstration of an attack against express that's using csurf library with cookie signing enabled.

To run it:

- checkout the repo
- go into csurf-signed-attacker and run `npm i`
- go into csurf-signed-victim and run `npm i`
- modify `csurf-signed-attacker/node_modules/cookie-signature/index.js` line 42 so it always returns `str` and does not check signature
- run `npm start` for both apps
- attacker website will run on `:3001`, victim one on `:3000`
- to demonstrate it nicely setup hosts on your local to simulate domain and subdomain, for example add/modify line like this: `127.0.0.1 localhost csrftest.com 1.csrftest.com`

There are two phases of the attack:

1. preparation by the attacker
2. victim visiting attacker website (phishing or so, as usual with CSRF)

# Preparation

- attacker visits victim website - `csrftest.com:3000` and saves signed cookie value

# Actual attack

- victim visits attacker website on a subdomain - for example `1.csrftest.com:3001` in our case, I'm using different ports to make it easier to run on localhost with vanila setup
- attacker website toses signed cookie value obtained previously into a cookie with domain set to `.csrftest.com` and with specific path - in our case `/csrfprotected` - that's happening by visiting `http://1.csrftest.com:3000/toss?tossme=XYZ` where `XYZ` is value previously captured by the attacker
- attacker website tricks user into submitting (or submits via JS) form available on `1.csrftest.com:3001`
- CSRF token present on the attacker website gets accepted on victims website
