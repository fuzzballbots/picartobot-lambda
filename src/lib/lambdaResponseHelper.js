
/**
 * A helper class for sending response back to the lambda controller
 * @param callback - The lambda callback
 * @class LambdaResponseHelper
 */
class LambdaResponseHelper {
  constructor(callback) {
    this.callback = callback;
  }

  /**
   * Returns an error message to the Lambda callback provieded
   *
   * @param {*} code -- Status Code to return
   * @param {*} message -- Message to return
   * @memberof ResponseHelper
   */
  createResponseError(code, message) {
    return {
      statusCode: code,
      message: message
    };
  }

  /**
   * Returns an error message to the Lambda callback provieded
   *
   * @param {*} err -- Error created with `createResponseError`
   * @memberof ResponseHelper
   */
  sendResponseError(err) {
    this.callback(null, {
      statusCode: err.statusCode,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ statusCode: err.statusCode, message: err.message })
    });
  }

  /**
   * Returns an data payload to the Lambda callback provieded
   *
   * @param {*} data -- Object or data to return
   * @memberof ResponseHelper
   */
  sendResponse(data) {
    if (typeof data !== 'string') {
      if (data instanceof Buffer) {
        data = data.toString('utf8');
      } else if (typeof data === 'object') {
        data = JSON.stringify(data);
      } else {
        data = data.toString();
      }
    }

    this.callback(null, {
      isBase64Encoded: true,
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: data
    });
  }


  /**
   * Returns a base64 encoded file with the mimetype provided
   *
   * @param {Buffer|string} databuffer -- Buffer Object or data to return
   * @param {string} mimetype -- mimetype of the data
   * @memberof ResponseHelper
   */
  sendFileResponse(databuffer, mimetype) {
    if (databuffer instanceof Buffer) {
      databuffer = databuffer.toString('base64');
    } 

    if (mimetype.indexOf('/') === -1) {
      mimetype = `image/${mimetype}`;
    }

    this.callback(null, {
      isBase64Encoded: true,
      statusCode: 200,
      headers: { 'Content-Type': mimetype },
      body: databuffer
    });
  } 
}

module.exports = LambdaResponseHelper;
