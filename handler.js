'use strict';
const dynamoDb = require('./dynamodb');
const uuid = require('uuid');
// TESTING
// const rejectedPromise = require('./tests/rejectedPromise');

// write function
// puts items in MUSIC table
module.exports.write = async () => {
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
  const put10Items = () => {
    // console.log(" put10Items started ");
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(dynamoDb.put(params(`artist ${uuid.v4()}`)).promise());
      // console.log('Inserting element :', i);
    }
    //TESTING: for test purposes only push the rejected promise
    // results.push(rejectedPromise());
    // TESTING END

    return Promise.all(results);
  };

  try {
    // console.log("before put10Items ");
    await put10Items();
    // console.log(" put10Items ended");
    return {
      success: true,
      comments: 'Some comments'
    }; // successful response

    // or
    // return 'ok'

  } catch (err) {
    console.error(err);

    return {
      success: false,
      err,
      comments: 'Some comments explaining error'
    };
  }
};
