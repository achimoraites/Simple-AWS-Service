'use strict';

const dynamoDb = require('./dynamodb');
const uuid = require('uuid');

module.exports.write = async (event, context, callback) => {
  console.log('1:: Started write function ');
  // Customized params
  const params = artist => {
    return {
      TableName: process.env.DYNAMODB_TABLE,
      Item: {
        id: uuid.v1(),
        artist
      }
    };

  };

/**
 * Puts items in MUSIC table.
 * @param {int} num1 The first number.
 */
async function put10Items() {
  const results = [];
  for (let i=0;i<10;i++) {
    results.push(dynamoDb.put(params(`artist ${uuid.v4()}`)).promise());
    console.log('Inserting element :', i);
  }
  return await Promise.all(results);
}

  // BUG: The for loop is syncronous but the db operation is not. Neither is setTimeout.
  // put 10 records

  try {
    put10Items();
  } catch (error) {
    console.error(error);
    callback(null, {
      statusCode: error.statusCode || 501,
      headers: {
        'Content-Type': 'text/plain'
      },
      body: 'Couldn\'t create the record item.'
    });
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify({message:'success'})
  };

  // BUG: This callback will be invoked before items are put and before any
  // errors are returned from the db operations
  callback(null, response);

};