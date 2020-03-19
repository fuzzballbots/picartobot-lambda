const LambdaResponseHelper = require('./lib/lambdaResponseHelper');

class Collector {
  constructor(event, context, callback, options, aws, axios) {
    this.options = Object.assign({ ignoreQueue: false }, options || {});
    this.event = event;
    this.context = context;
    this.callback = callback;
    this.responseHelper = new LambdaResponseHelper(this.callback);
    this.aws = aws;
    this.axios = axios;
  }

  work(done) {
    // done is the callback function for this method
    // TODO: implement the work of collecting the data frome the databse
    // and chunking it into messages to push onto SQS
  }

  startup() {
    this.work((data, err) => {
      console.log(data);
      if (err) { 
        console.log(err);
        if (err.statusCode === 200) {
          this.responseHelper.sendFile(err.message.body.toString('base64'), err.message.type);
        } else {
          this.sendError(err);
        }
      } else {
        // Send the binary file to the request
        this.responseHelper.sendFile(data.buffer.toString('base64'), data.mimeType);
      }
    });
  }
}

module.export = Collector;
