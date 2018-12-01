'use strict';
const AWS = require('aws-sdk');
// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');
const s3 = new AWS.S3(); // Usually put here, no need to run every time lambda is invoked

// streamProcessor function
// listens to event streams from MUSIC table
// puts event data in S3 bucket
module.exports.streamProcessor = async event => {
  console.log('2:: Started streamProcessor function ');
  // simply put received data in the bucket
  const params = {
    Bucket: 'music-service-dev-tempbucket-ll2ztsovqmpg',
    ContentType: "application/json",
    Key: 'data.json',
    Body: JSON.stringify(event)
  };

  try {
    // console.log(' before putObject ');
    const data = await s3.putObject(params).promise();
    // console.log(' after putObject ');
    //  TESTING : failed promise
    //  await new rejectedPromise();
    // TESTING END
    // console.log(data);
    return {
      success: true,
      comments: 'Some comments'
    };                            // successful response
  } catch (err) {
    console.log(err, err.stack);  // an error occurred
    return {
      success: false,
      err,
      comments: 'Some comments explaining error'
    };
  }

};
