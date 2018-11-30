'use strict';
// const dynamoDb = require('./dynamodb');


// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async (event, context, callback) => {
  console.log('3:: Started backup function ');

   callback(null, 'ok');    // successful response

};