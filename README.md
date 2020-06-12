# slack-message-automation
Set of tests to verify messaging and save message functionality using Slack API

## Prerequisites
- [Node.js ](https://nodejs.org/en/) - v12.16.2
- [npm](https://www.npmjs.com/) - v6.14.4
	- Recommend installing with [nvm](https://github.com/nvm-sh/nvm)

## Tools Used
- [tape](https://www.npmjs.com/package/tape) - its minimalist feature-set lets us craft simple maintainable tests that run fast.
- [tiny-json-http](https://www.npmjs.com/package/tiny-json-http) - HTTP client for GET and POSTing JSON payloads.
- [tap-spec](https://www.npmjs.com/package/tap-spec) - formatted TAP output like Mocha's spec reporter.
- [node-env-file](https://www.npmjs.com/package/node-env-file) - parse and load environment files (containing ENV variable exports) into Node.js environment, i.e. process.env.

## Quickstart
Clone this repo and install all the required packages first
     
     npm install

Create a file called `.env` in the root with the following:
    
    OAUTH_ACCESS_TOKEN=xxxxx
    SLACK_BOT_TOKEN=xxxxx
    CHANNEL=xxxxx

The tests require the app to have the following scopes, and for the target slack to have a `#test` channel:

- `channels.history`
- `chat.postMessage`
- `conversations.history`
- `search.all`
- `stars.add`
- `stars.list`

## Testing
To execute tests type following in the console:
    
    npm test
    
## Slack Web API
Below is the list of APIs used:

- `slack.channels.history({token, channel})`
- `slack.chat.postMessage({token, channel, text})`
- `slack.conversations.history({token, channel})`
- `slack.search.all({token, query})`
- `slack.stars.add({token})`
- `slack.stars.list({token})`
