const needle = require('needle');
const cheerio = require('cheerio');
const url = require('url');

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
	var data = "action=LoadMailList&Email_address=" + encodeURIComponent(email);
	needle.post("https://gmailnator.com/mailbox/mailboxquery",data,function(err,resp,body) {
		if (!err) {
			var err = null;
			var d = JSON.parse(body);
			var b = [];
			for (var c in d) {
				var $ = cheerio.load(d[c].content);
				var lin = $("a")[0].attribs.href;
				var sub = $("tbody td")[0].children[0].data;
				var des = $("tbody td")[1].children[0].data;
				var tim = $("tbody td")[2].children[0].data;
				var data = {
					"subject": sub,
					"description": des,
					"lastSent": tim,
					"link": lin
				}
				b.push(data)
			}
			var body = JSON.parse(JSON.stringify(b));
			cb(err,body);
		} else {
			var body = null;
			cb(err,body)
		}
	})
}

exports.getMessage = (str, cb) => {
	if (!str) {
		console.error("Needs email param");
		return false;
	}
	var s = url.parse(str, true);
	var email = s.pathname.split("/")[1];
	var id = s.hash.substring(1, s.hash.length);
	var data = "action=get_message&message_id=" + id + "&email=" + email;
	needle.post("https://gmailnator.com/mailbox/get_single_message/", data, function(err,resp,body) {
		if (err) {
			var body = null;
			cb(err, body);
		} else {
			var body = body.split("<hr />")[1];
			var err = null;
			cb(err, body);
		}
	})
}