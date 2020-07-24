const gmailnator = require("../../index.js");
(async () => {
	gmailnator.generateEmail(function(err,body) {
		console.log("generated email: " + body);
		gmailnator.checkEmails(body, function(err,body) {
			if (body == "[]") {
				console.log("no mail");
			} else if (body && !err) {
				console.log("you've got mail");
				console.log(body);
			} else {
				console.log("err");
			}
		})
	});
})()