'use strict';
const AWS = require('aws-sdk');


//  streamProcessor function
// listens to events on MUSIC table

// NOTE: If callback is not called, function will exit with a null response.
module.exports.streamProcessor = async (event, context, callback) => {
  // simply put some data in the bucket
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'music-service-dev-tempbucket-ll2ztsovqmpg',
    Key: 'data.json',
    Body: JSON.stringify(event)
  };

  try {
   const data = await s3.putObject(params).promise();
   console.log(data);
   callback(null, 'ok');          // successful response
  } catch (err) {
    console.log(err, err.stack);  // an error occurred
    callback(err);
  }
 
};
