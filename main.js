function sendText(){
    var twilio = require('twilio');

    // var accountSid = KEYS.accountSid;
    // var authToken = KEYS.authToken;
    var client = new twilio.RestClient(accountSid, authToken);
    var message = 'this is a test message - please replace me with the real message';
    var phoneNumbers = require('./phoneNumbers.json');

    // var xphoneNumbers = [
    //     '9197401963'
    // ];

    /*
     * loop through all of the numbers and send a text. edit the body
     * as you need to. any link will automatically be turned into a hyperlink by
     * the phone
     */
    phoneNumbers.forEach(function (phoneNumber) {
        console.log(phoneNumber);
        client.messages.create({
            body: 'A. Thanks for signing up for cat facts! you will now receive fun daily facts about CATS! >o<',
            to: phoneNumber,
            from: '919-636-7134'
        }, function (err, message) {
            if (err) {
                console.log(err.message);
            }
        });
    });
}
