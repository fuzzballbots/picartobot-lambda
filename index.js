const __ = require('lodash');
const AWS = require('aws-sdk');
const Axios = require('axios');

const config = require('./config/config');
const defaults = require('./config/default.config');
const pkg = require('./package.json');

const Collector = require('./src/collector');
const Fetcher = require('./src/fetcher');
const Pusher = require('./src/pusher');

const baseConfig = __.merge(Object.assign({}, defaults), config);
/* eslint-disable no-unused-vars */
const AWSConfig = new AWS.Config({
  accessKeyId: baseConfig.credentials.accessKeyId,
  secretAccessKey: baseConfig.credentials.secretAccessKey,
  region: pkg.config.region
});
/* eslint-enable no-unused-vars */

exports.collectorHandler = function(event, context, callback, options) {
  const collector = new Collector(event, context, callback, options, AWS, Axios);
  collector.startup();
};

exports.fetcherHandler = function(event, context, callback, options) {
  const fetcher = new Fetcher(event, context, callback, options, AWS, Axios);
  fetcher.startup();
};

exports.pusherHandler = function(event, context, callback, options) {
  const pusher = new Pusher(event, context, callback, options, AWS, Axios);
  pusher.startup();
};
