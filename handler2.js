'use strict';
const AWS = require( 'aws-sdk' );


//  streamProcessor function
// listens to events on MUSIC table

module.exports.streamProcessor = (event, context, callback) => {
  // simply put some data in the bucket
  const s3 = new AWS.S3();
  const params = {
      Bucket : 'music-service-dev-tempbucket-ll2ztsovqmpg',
      Key : 'data.json',
      Body : JSON.stringify(event)
  };
  s3.putObject(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else {
      console.log(data);           // successful response
      callback(null, 'ok');
    }   
  });


};
