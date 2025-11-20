# Berties Books

Sample code for Dynamic Web Applications module.

Uses node.js with Express and EJS.

To install and run:

npm install
node index.js

Dotenv

To protect sensitive database credentials, I implemented the dotenv module.
I created a .env file in the project root which stores my database username, password, host, and database name.
These values are then loaded at the top of app.js using:

require('dotenv').config();


The database connection pool now uses:

user: process.env.DB_USER,
password: process.env.DB_PASS,
database: process.env.DB_NAME


The .env file is added to .gitignore, ensuring that no private credentials are pushed to GitHub.


Audit

I added an audit logging feature to record all login attempts.
A new MySQL table called login_audit stores the username, whether the attempt was successful (1) or failed (0), and a timestamp.

Inside the existing /loggedin route, I inserted a simple line to record each login attempt:

db.query("INSERT INTO login_audit (username, success) VALUES (?,?)",
         [req.body.username, 1 or 0]);


A new route /users/audit was also created to display the full audit log using an EJS page.

This allows the system to track all successful and failed logins in a clear and simple way.