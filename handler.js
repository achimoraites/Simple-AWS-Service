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

  // In this function, there is no need to await anything, you can just return a
  // promise (Promise.all() is a promise), since it is being awaited later on.
  // If there was anything after the Promise.all() part, then it would make sense
  // to await the promise.
  /**
   * Puts 10 items in MUSIC table.
   */
  function put10Items() {
    console.log(" put10Items started ");
    const results = [];
    for (let i = 0; i < 10; i++) {
      results.push(dynamoDb.put(params(`artist ${uuid.v4()}`)).promise());
      console.log('Inserting element :', i);
    }
    //TESTING: for test purposes only push the rejected promise
    // results.push(rejectedPromise());
    // TESTING END

    return Promise.all(results);
  }

  try {
    console.log("before put10Items ");
    await put10Items();
    console.log(" put10Items ended");
    // since lambda function is async, there is no need for callback to be invoked,
    // you can simply return a response, or an error
    return 'ok'; // successful response
    // or
    // return {
    //   success: true,
    //   comments: 'Some comments'
    // };

  } catch (err) {
    console.error(err);
    // an error occurred
    // throw err; Not advisable, it is best to return a response that explains
    // that something went wrong
    return {
      success: false,
      err,
      comments: 'Some comments explaining error'
    };
  }
};
