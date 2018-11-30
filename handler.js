'use strict';
const dynamoDb = require('./dynamodb');
const uuid = require('uuid');


// write function
// puts items in MUSIC table
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
 * Puts 10 items in MUSIC table.
 */
async function put10Items() {
  console.log(" put10Items started ");
  const results = [];
  for (let i=0;i<10;i++) {
    results.push(dynamoDb.put(params(`artist ${uuid.v4()}`)).promise());
    console.log('Inserting element :', i);
  }
  return await Promise.all(results);
}

  try {
   console.log("before put10Items "); 
   await put10Items();
   console.log(" put10Items ended");
   callback(null, 'ok');    // successful response
  } catch (err) {
    console.error(err);    
    callback(err);          // an error occurred
  }
  
};