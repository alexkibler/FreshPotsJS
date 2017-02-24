
var DashButton = require('dash-button');
// We need this to build our post string
var querystring = require('querystring');
var http = require('http');
var https = require('https');
var fs = require('fs');


const DASH_BUTTON_MAC_ADDRESS = 'YOUR_MAC_ADDRESS_HERE';
const TOKEN = 'SLACK_BOT_TOKEN';
console.log ('About to set up the DashButtonListener');
let button = new DashButton(DASH_BUTTON_MAC_ADDRESS);

let subscription = button.addListener(async () => {
  console.log('Dash button pushed!');
    // Build the post string from an object
  var post_data = querystring.stringify({
      'channel': 'C4A9WUNJE',
      'token': TOKEN,
      'text': ':coffee: Fresh Pots :coffee:',
      'as_user': 'true'
  });

  // An object of options to indicate where to post to
  var post_options = {
      host: 'slack.com',
      port: '443',
      path: '/api/chat.postMessage',
      method: 'POST',
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(post_data)
      }
  };
  console.log('sending message...');
  // Set up the request
  var post_req = https.request(post_options, function(res) {
      res.setEncoding('utf8');
      res.on('data', function (chunk) {
          console.log('Response: ' + chunk);
          console.log('Waiting for next button press');
      });
  });
  // post the data
  post_req.write(post_data);
  post_req.end();

});

console.log('Listener added... waiting for button press');
