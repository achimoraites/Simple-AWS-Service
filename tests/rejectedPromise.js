module.exports = function rejectedPromise () {
     console.log(' before fail ');
    new Promise(
      (resolve, reject) => {
        const reason = new Error('TEST: something went wrong');
        reject(reason);
      }
    )
    .catch (err=> {console.error(err);});
};
