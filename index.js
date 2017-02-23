'use strict';
const Post2Slack = require('post2slack');
const yargs = require('yargs')
.options({
  additionalFields: {
    default: [],
    type: 'array'
  },
  hideTags: {
    default: false,
    type: 'boolean'
  },
  channel: {
    type: 'string'
  },
  iconURL: {
    type: 'string'
  },
  username: {
    type: 'string'
  },
  tags: {
    default: [],
    type: 'array'
  },
  message: {
    type: 'string'
  },
  hook: {
    alias: 'slackHook',
    default: process.env.SLACK_HOOK
  },
})
.demandOption('message', 'You must provide a --message to send to Slack')
.help('h')
.argv;

yargs.slackHook = yargs.hook;
const post2slack = new Post2Slack(yargs);

post2slack.postFormatted(yargs.tags, yargs.message, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Message Posted.');
});
