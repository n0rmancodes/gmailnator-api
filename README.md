# gmailnator-api
NPM module built to access gmailnator.com programically.

Gmailnator.com is a website that you can create a gmail.com email that acts like a service like [10 Minute Mail](https://10minutemail.com).
## Requirements
Just install the package in [NPM](https://npmjs.com/package/gmailnator).

``npm i gmailnator``

## Sample Code
```js
const gmailnator = require("gmailnator-api");
gmailnator.generateEmail(function(err, email) {
	if (err) {
		console.log("error: " + err);
		// this means there was an error generating the email.
	} else {
		// this means it has generated an email and it's checking for emails there
		gmailnator.checkEmails(email, function(err, body) {
			if (err) {
				console.log("error getting emails: " + err);
				// error retrieve email count and description
			} else {
				console.log("- you have " + body.emails.length + " email(s)");
				// telling you how many emails are at that email
				if (body.emails.length > 0) {
					// if it has more than one email, it then retrieves the html content of the email
					console.log("checking most recent email...");
					gmailnator.getMessage(body.emails[0].url, body.csrf, function(err, body) {
						if (err) {
							console.log("error getting most recent email: " + err);
						} else {
							console.log("most recent email:");
							console.log(body);
						}
					})
				}
			}
		})
	}
});
```
