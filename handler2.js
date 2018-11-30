'use strict';

//  streamProcessor function
// listens to events on MUSIC table
module.exports.streamProcessor = (event, context, callback) => {
  console.log('2:: Started streamProcessor function ');
  console.log('Event: ',JSON.stringify(event,null,2));
  const processesedEvent = event.Records.map(record => {
    const { eventID , eventVersion, dynamodb, eventName } = record;
    const proscessedRecord = { eventID, eventVersion, dynamodb, eventName };
    return proscessedRecord;
  });

  console.log('Processesed Event : ',JSON.stringify(processesedEvent,null,2));

  const response = {
    statusCode: 200,
    body: JSON.stringify(processesedEvent)
  };
  callback(null, response);
};