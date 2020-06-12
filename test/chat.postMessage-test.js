const test = require('tape');
const slack = require('..');
const msg = slack.chat.postMessage;
const history = slack.conversations.history;
const star = slack.stars.add;
const allStars = slack.stars.list;
const search = slack.search.all;
const env = require('./_env');

// load environment varibles for testing
env();

test('Verify that message was sent successfully', t => {
  const token = process.env.SLACK_BOT_TOKEN;
  const channel = process.env.CHANNEL;
  const text = 'test message2';
  const params = {token, text, channel};
  
  // post a message there
  msg(params, (err, data) => {
    if (err) {
      t.fail(err, 'chat.postMessage fails');
      console.error(err);
    }
    else {
      t.ok(data.message, 'Message sent!');
      console.log(data);
    }
    t.end();
  })
})

test('Verify that message is saved', t => {
  const token = process.env.OAUTH_ACCESS_TOKEN;
  const channel = process.env.CHANNEL;
  const params = {token, channel};
  
  history(params, (err, data) => {
    if (err) {
      t.fail(err, 'conversations.history fails');
      console.error(err);
    } else {
      t.ok(data.messages[0], 'Get the last message we sent');
      console.log(data.messages[0]);
    }

    // add timestamp argument to the list of params
    const message = data.messages[0].ts;
    params.timestamp = message;

    star(params, (err, data) => {
      if (err) {
        t.fail(err, 'stars.add method failed');
        console.error(err);
      } else {
        t.ok(data, 'Message has been saved!');
        console.log(data);
      }
    });
    t.end();

    function callSearch() {
      // add query parameter
      const query = 'has:star';
      const params = {token, query};

      search(params, (err, data) => {
        if (err) {
          t.fail(err, 'search.all method failed');
          console.error(err);
        } else {
          /**
           * This part doesn't work consistently, I am having problems with messages to diplay right away,
           * maybe it takes some time to index search. I attached a videoflow where I constantly clicking search, 
           * but the saved message wouldn't show.
           */
          t.equal(data.messages.matches[0].ts, message, 'Check if our message shows up in the search results of a query has:star');
          
          /**
           * Here is a block of code that would actully search the object for our message
           * however, since our message was just added, it will be the first in the list anyways.
          */ 
          // let obj = data.messages.matches;
          // for (var i = 0; i<obj; i++) {
          //   for (key in obj[i]) {
          //     if (obj[i][key].indexOf(message) != -1) {
          //       t.ok(obj[i][key], "Our message is in the list");
          //       console.log(obj[i]);
          //     }
          //   }
          // }
        }
      });
    }
    
    setTimeout(callSearch, 6000);

    // save our message id to use it later
    let getMessage = () => message;
    //let token = process.env.SLACK_BOT_TOKEN;

    function callAllStars() { 
      allStars(params, (err, data) => {
        if (err) {
          t.fail(err, 'stars.list method failed');
          console.error(err);
        } else {
          t.equal(data.items[0].message.ts, message, 'Check if message is in the list of saved items');

          /**
           * To search for a message explicitly, the same block of commented code above can go here
           */
        }
      });
    }

    setTimeout(callAllStars, 3000);
  });
});