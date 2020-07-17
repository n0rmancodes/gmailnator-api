const needle = require('needle');
exports.generateEmail = (cb) =>{
	var data = "action=GenerateEmail&data=[]=2&data[]=1&data[]=3";
	needle.post("https://gmailnator.com/index/indexquery",data,function(err,resp,body){
		if (!err) {
			var err = null;
			cb(err,body);
		} else {
			var body = null;
			cb(err,body)
		}
	})
}

exports.checkEmails = (email, cb) => {
	if (!email) {
		console.error("Needs email param");
		return false;
	}
	var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	if (!regex.test(email)) {
		console.error("Not valid email");
		return false;
	}
	var data = "action=LoadMailList&=Email_address=" + email;
	needle.post("https://gmailnator.com/mailbox/mailboxquery",data,function(err,resp,body) {
		if (!err) {
			var err = null;
			cb(err,body);
		} else {
			var body = null;
			cb(err,body)
		}
	})
}