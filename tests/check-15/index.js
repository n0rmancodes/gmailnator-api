// This code automatically checks for a randomly generated mail every 15 seconds

const gmailnator = require("../../index.js");

gmailnator.generateEmail(function(err, email) {
    console.log("- generated email: " + email);
    if (!err) {
        var b = setInterval(function () {
            check(email, b);
        }, 15000)
    } else {
        console.log(err);
    }
})

function check(email, int) {
    gmailnator.checkEmails(email, function(err, body) {
        if (err) {
            console.log(err);
            console.log("-- stopping check due to an error")
            clearInterval(int);
        } else {
            console.log("- " + body.emails.length + " email(s) found!");
            if (body.emails.length > 0) {
                console.log("-- enough emails to stop checking! stopping check");
                clearInterval(int);
                console.log("-- attempting to read...");
                gmailnator.getMessage(body.emails[0].link, body.csrf, function(err, resp) {
                    if (err) {
                        console.log(err);
                        return;
                    } else {
                        console.log("- email body -");
                        console.log(resp);
                        return;
                    }
                })
            }
        }
    })
}