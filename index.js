#!/usr/bin/env node
'use strict';
const Post2Slack = require('post2slack');
const yargs = require('yargs')
.options({
  additionalFields: {
    default: [],
    type: 'array',
  },
  hideTags: {
    type: 'boolean',
    default: false
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
  iconEmoji: {
    type: 'string'
  },
  hook: {
    alias: 'slackHook',
  },
})
.env('SLACK_')
.demandOption('message', 'You must provide a --message to send to Slack')
.help('h')
.argv;

const config = {};
Object.keys(yargs).forEach((key) => {
  if (yargs[key] !== undefined) {
    config[key] = yargs[key];
  }
});
config.slackHook = yargs.hook;
if (!config.slackHook) {
  throw new Error('You must provide a --hook or set your SLACK_HOOK env variable');
}
const post2slack = new Post2Slack(config);
post2slack.postFormatted(yargs.tags, yargs.message, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log('Message Posted.');
});
