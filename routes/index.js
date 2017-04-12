var express = require('express');
var router = express.Router();

var aws = require("aws-sdk");
var ses = new aws.SES({
            "accessKeyId": "YOUR_ACCESS_KEY_ID",
            "secretAccessKey": "YOUR_SECRET_ACCESS_KEY",
            "region": "YOUR_REGION_SERVICE"
          });

var asunto        = "Asunto SES Example";
var email         = "recipe@domain.com";
var body          = "<h1>TITULO</h1><br/>Grover Trujillo";
var emailadjunto  = "";

var rawMessage = `From: yourmail@domain.com\nTo: ${email}\nSubject:${asunto}\nMIME-Version: 1.0\nContent-type: Multipart/Mixed; boundary=\"NextPart\"\n\n--NextPart\nContent-Type: text/html;charset=UTF-8\n\n${body}\n\n--NextPart${emailadjunto}`;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/send', function(req, res, next) {
  ses.sendRawEmail({RawMessage : { Data: rawMessage } }, function(err, data) {
    console.log('Error', err);
    res.json(data);
  });
})

module.exports = router;
