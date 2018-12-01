'use strict';
const dynamoDb = require('./dynamodb');

// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');

// backup function
// listens to events from an S3 bucket
// writes/updates the MUSIC-BACKUP table depending on the received data 
module.exports.backup = async (event, context, callback) => {
  console.log('3:: Started backup function ');
  console.log(JSON.stringify(event,null,2));

// We need to get the file from the S3 bucket
// Parse the file and get the contents as JSON name it: data
// Run updateTable(data) !
 
// HELPERS FOR updateTable()

/**
 * Puts a record in MUSIC-BACKUP
 * @param record the record to put
 */
async function putRecord (record) {
  dynamoDb.put(
    { TableName: process.env.DYNAMODB_TABLE2, // MUSIC-BACKUP table
      Item: record.NewImage                   // new Item
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
      Item: record.Keys                      // item to delete
    }
  ).promise();
}

/**
 * Updates the MUSIC-BACKUP table using provided data
 * @param record the record to remove
 * @returns {Promise} of all operations to be performed.
 */
  async function updateTable (data) {
    // for each record in data perform put or remove actions
  }

  try {
   // The interesting stuff begins here :)
    await updateTable();
    //  TESTING : failed promise
    // await new rejectedPromise();
    // TESTING END
    callback(null, 'ok');    // successful response
  } catch (error) {
    callback(error, error);    // failed response
  }
 



};