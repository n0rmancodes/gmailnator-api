const gmailnator = require("../../index.js");
gmailnator.checkEmails("jcnetmp+iw1dp@gmail.com", function(err,body) {
	console.log(body)
	gmailnator.getMessage(body[0].link, function(err,body) {
		console.log(body);
	})
})