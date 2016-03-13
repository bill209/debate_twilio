/*
	phoneNumbers.js format:
	var numbers={}
	exports.numbers = [ "1112223333", "2223334444"]

	keys.js format:
	exports.accountSid = '...';
	exports.authToken = '...';	

	by: bill rowland
*/

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var twilio = require('twilio');
var KEYS = require('./data/keys.js');

var accountSid = KEYS.accountSid;
var authToken = KEYS.authToken;
var client = new twilio.RestClient(accountSid, authToken);
var message = 'this is a test message - please replace me with the real message';
var phoneNumbers = require('./data/phoneNumbers.js');
var text = {};


app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.use(express.static('styles'));
app.use(express.static('images'));
app.use(express.static('data'));

io.on('connection', function(socket){
  socket.on('sms_message', function(senderID){
	sendText(senderID, function(res){	
		io.emit('sms_message', res);			
	});
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function sendText(senderID, callback){
	var results={};
	results.senderID = senderID;
	results.message = 'messages being sent';
console.log("phoneNumbers: ",phoneNumbers);
	phoneNumbers.numbers.forEach(function (phoneNumber) {
		client.messages.create({
			body: 'D. Thanks for signing up for cat facts! you will now receive fun daily facts about CATS! >o<',
			to: phoneNumber,
			from: '919-636-7134'
		}, function (err, message) {
			// nothing is done with these results at the moment
			if (err) {
				results.error ++;
			} else {
				results.success ++;
			}
		});
	});	
	callback(results);
}