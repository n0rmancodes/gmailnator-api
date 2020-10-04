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
	} else {
		console.log("- there is no mail to retrieve!")
	}
})