'use strict';
const dynamoDb = require('./dynamodb');
const uuid = require('uuid');
// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');

// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async (event, context, callback) => {
  console.log('3:: Started backup function ');
  console.log(JSON.stringify(event,null,2));
 
// HELPERS FOR updateTable()

/**
 * Puts a record in MUSIC-BACKUP
 * @param record the record to put
 */
async function putRecord (record) {
  dynamoDb.put(
    { TableName: process.env.DYNAMODB_TABLE2,
      Item: record.NewImage
    }
  ).promise();
}

/**
 * Removes a record from MUSIC-BACKUP
 * @param record the record to remove
 */
async function removeRecord (record) {
  dynamoDb.deleteItem(
    { TableName: process.env.DYNAMODB_TABLE2,
      Item: record.Keys
    }
  ).promise();
}

/**
 * Updates the MUSIC-BACKUP table based on received event Records
 * @returns {Promise} of all operations to be performed.
 */
  async function updateTable () {

  }

  try {
    // await dynamoDb.put(params(`artist ${uuid.v4()}`)).promise();
    await updateTable();
    //  TESTING : failed promise
    // await new rejectedPromise();
    // TESTING END
    callback(null, 'ok');    // successful response
  } catch (error) {
    callback(error, error);    // failed response
  }
 



};