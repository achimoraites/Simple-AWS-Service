'use strict';
const dynamoDb = require('./dynamodb');
const uuid = require('uuid');

// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async (event, context, callback) => {
  console.log('3:: Started backup function ');
  console.log(JSON.stringify(event,null,2));
  // testing the event by puting a record in MUSIC-BACKUP table
  const params = artist => {
    return {
      TableName: process.env.DYNAMODB_TABLE2,
      Item: {
        id: uuid.v1(),
        artist
      }
    };

  };

  try {
    await dynamoDb.put(params(`artist ${uuid.v4()}`)).promise();
    callback(null, 'ok');    // successful response
  } catch (error) {
    callback(error, error);    // failed response
  }
 



};