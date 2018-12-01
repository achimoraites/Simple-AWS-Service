'use strict';
const AWS = require('aws-sdk');
const { updateTable } = require('./utils/backupOps');
// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');

// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async () => {
  console.log('3:: Started backup function ');

  const s3 = new AWS.S3();
  let records = {};
  const params = {
    Bucket: "music-service-dev-tempbucket-ll2ztsovqmpg",
    Key: "data.json"
  };
         
  try {
    // We need to get the data.json file from the S3 bucket
    const { Body } = await s3.getObject(params).promise();
    // Parse the file and get the contents as JSON object
    records = JSON.parse(Body.toString());
    // Run updateTable(records) !
    if(records) {
      // console.log(records);
      await updateTable(records);
    }
    //  TESTING : failed promise
    // await new rejectedPromise();
    // TESTING END
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