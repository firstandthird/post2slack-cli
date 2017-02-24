'use strict';
const Post2Slack = require('post2slack');
const yargs = require('yargs')
.options({
  additionalFields: {
    default: process.env.SLACK_ADDITIONAL_FIELDS || [],
    type: 'array',
  },
  hideTags: {
    type: 'boolean',
    default: process.env.SLACK_HIDE_TAGS || false
  },
  channel: {
    type: 'string',
    default: process.env.SLACK_CHANNEL
  },
  iconURL: {
    type: 'string',
    default: process.env.SLACK_ICON_URL
  },
  username: {
    type: 'string',
    default: process.env.SLACK_USERNAME
  },
  tags: {
    default: process.env.SLACK_TAGS || [],
    type: 'array'
  },
  message: {
    type: 'string'
  },
  iconEmoji: {
    type: 'string',
    default: process.env.SLACK_ICON_EMOJI
  },
  hook: {
    alias: 'slackHook',
    default: process.env.SLACK_HOOK
  },
})
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
