'use strict';
const AWS = require('aws-sdk');


//  streamProcessor function
// listens to events on MUSIC table

// NOTE: If callback is not called, function will exit with a null response.
module.exports.streamProcessor = (event, context, callback) => {
  // simply put some data in the bucket
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'music-service-dev-tempbucket-ll2ztsovqmpg',
    Key: 'data.json',
    Body: JSON.stringify(event)
  };

  s3.putObject(params, function(err, data) {
    // an error occurred
    if (err) {
      console.log(err, err.stack);
      callback(err);

    } else {
      console.log(data); // successful response
      callback(null, 'ok');
    }
  });
};
