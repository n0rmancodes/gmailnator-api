// Generate an email, check it, and if there emails there, read the most recent one.

const gmailnator = require("../../index.js");

gmailnator.generateEmail(function(err, email) {
	if (err) {
		console.log("error: " + err)
	} else {
		console.log("- successfully generated email (" + email + ") ! checking it...");
		gmailnator.checkEmails(email, function(err, body) {
			if (err) {
				console.log("error getting emails: " + err);
			} else {
				console.log("- you have " + body.emails.length + " email(s)");
				if (body.emails.length > 0) {
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