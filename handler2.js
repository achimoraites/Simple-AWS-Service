'use strict';
const AWS = require('aws-sdk');


// streamProcessor function
// listens to event streams from MUSIC table
// puts event data in S3 bucket
module.exports.streamProcessor = async (event, context, callback) => {
  console.log('2:: Started streamProcessor function ');
  // simply put received data in the bucket
  const s3 = new AWS.S3();
  const params = {
    Bucket: 'music-service-dev-tempbucket-ll2ztsovqmpg',
    Key: 'data.json',
    Body: JSON.stringify(event)
  };

  try {
   console.log(' before putObject ');
   const data = await s3.putObject(params).promise();
   console.log(' after putObject ');
   // TESTING : failed promise
  //  console.log(' before fail ');
  //  await new Promise(
  //     (resolve, reject) => {
  //       const reason = new Error('TEST: something went wrong');
  //       reject(reason);
  //     }
  //   );
   // TESTING END
  
   console.log(data);
   callback(null, 'ok');          // successful response
  } catch (err) {
    console.log(err, err.stack);  // an error occurred
    callback(err);
  }
 
};
