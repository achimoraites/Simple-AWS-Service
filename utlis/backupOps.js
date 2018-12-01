const dynamoDb = require('../dynamodb');
// 
module.exports = {
  // HELPERS FOR updateTable()

  /**
   * Puts a record in MUSIC-BACKUP
   * @param record the record to put
   */
  async putRecord(record) {
    return dynamoDb.put({
      TableName: process.env.DYNAMODB_TABLE2, // MUSIC-BACKUP table
      Item: record.NewImage // new Item
    }).promise();
  },

  /**
   * Removes a record from MUSIC-BACKUP
   * @param record the record to remove
   */
  async removeRecord(record) {
    return dynamoDb.deleteItem({
      TableName: process.env.DYNAMODB_TABLE2,
      Item: record.Keys // item to delete
    }).promise();
  },

  /**
   * Updates the MUSIC-BACKUP table using provided data
   * @param record the record to remove
   * @returns {Promise} of all operations to be performed.
   */
  async updateTable(data) {
    // for each record in data perform put or remove actions
    const actions = [];
    data.Records.forEach(record => {
      if (record.eventName) {
        const { eventName } = record;
        if (eventName === 'MODIFY' || eventName === 'INSERT') {
          actions.push(this.putRecord(record));
        } else if (eventName === 'DELETE') {
          actions.push(this.removeRecord(record));
        } else {
          console.error('Unknown event: ', eventName);
        }

      }
    });
    return await Promise.all(actions);
  }

};