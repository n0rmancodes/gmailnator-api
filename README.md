# gmailnator-api
NPM module built to access gmailnator.com programically.

## Requirements
None other than the package itself.

``npm i gmailnator``

## Sample Code
```js
const gmailnator = require("gmailnator");
(async () => {
	gmailnator.generateEmail(function(err,body) {
		console.log("generated email: " + body);
		gmailnator.checkEmails(body, function(err,body) {
			if (body == "[]") {
				console.log("no mail");
			} else if (body && !err) {
				console.log("you've got mail");
				console.log(body)
			} else {
				console.log("err")
			}
		})
	});
})()
```
