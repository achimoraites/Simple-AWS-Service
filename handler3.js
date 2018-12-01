'use strict';
const AWS = require('aws-sdk');
const backupOps = require('./utlis/backupOps');
// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');

// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async (event, context, callback) => {
      console.log('3:: Started backup function ');

      // We need to get the data.json file from the S3 bucket
      const s3 = new AWS.S3();
      let records = {};
      const params = {
        Bucket: "music-service-dev-tempbucket-ll2ztsovqmpg",
        Key: "data.json"
      };
         
        try {
          // We need to get the data.json file from the S3 bucket
          const data = await s3.getObject(params).promise();
          // Parse the file and get the contents as JSON object
          records = JSON.parse(data.Body.toString());
          // Run updateTable(records) !
          if(records) {
            // console.log(records);
            await backupOps.updateTable(records);
          }
          //  TESTING : failed promise
          // await new rejectedPromise();
          // TESTING END
          callback(null, 'ok'); // successful response
        } catch (error) {
          callback(error, error); // failed response
        }




      };