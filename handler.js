'use strict';

const dynamoDb = require('./dynamodb');
const uuid = require('uuid');

module.exports.write = (event, context, callback) => {

// Customized params
    const params = (artist) => {
      return {
        TableName: process.env.DYNAMODB_TABLE,
        Item: {
          id: uuid.v1(),
          artist
        }
      };
     
    };

// put 10 records
    for(let i=0;i<10;i++) {

      setTimeout(() => {

        dynamoDb.put(params(`artist ${uuid.v4()}`), (error) => {
          if (error) {
            console.error(error);
            callback(null, {
              statusCode: error.statusCode || 501,
              headers: {
                'Content-Type': 'text/plain'
              },
              body: 'Couldn\'t create the record item.'
            });
            return;
          }
      });

         }, 10);

    }

    const response = {
      statusCode: 200,
      body: JSON.stringify(params.Item)
    };
    callback(null, response);
 
    };