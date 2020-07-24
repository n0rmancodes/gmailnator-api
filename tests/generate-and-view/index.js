const gmailnator = require("../../index.js");
(async () => {
	gmailnator.generateEmail(function(err,body) {
		console.log("generated email: " + body);
		gmailnator.checkEmails(body, function(err,body) {
			if (body[0]) {
				console.log("you've got mail");
				console.log(body);
			} else if (!body[0] && !err) {
				console.log("no mail")
			} else {
				console.log("err");
			}
		})
	});
})()