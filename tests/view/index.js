// Just check an email you already generated and if it has mail, read the first one.

const gmailnator = require("../../index.js");

gmailnator.checkEmails("jcnetmp+iw1dp@gmail.com", function(err,body) {
	console.log(body.emails.length + " mail");
	if (body.emails[0]) {
		console.log("- getting most recent email...");
		gmailnator.getMessage(body.emails[0].link, body.csrf, function (err, body) {
			if (err) {
				console.log(err);
			} else {
				console.log(body)
			}
		})
	} else if (body !== null) {
		console.log("- there is no mail to retrieve!")
	} else {
		console.log(err)
	}
})