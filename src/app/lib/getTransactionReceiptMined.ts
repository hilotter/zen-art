module.exports = function getTransactionReceiptMined(txHash, interval, blockLimit) {
  const self = this;
  let count = 0;
  const blocks = blockLimit;

  const transactionReceiptAsync = function (resolve, reject) {
    if (count > blocks) {
      reject('Contract transaction couldn\'t be found after ', blocks, ' blocks');
      return;
    }

    self.getTransactionReceipt(txHash, (error, receipt) => {
      if (error) {
        reject(error);
      } else if (receipt == null) {
        setTimeout(
          () => transactionReceiptAsync(resolve, reject),
          interval || 500,
        );
      } else {
        resolve(receipt);
      }
    });

    count++;
  };

  if (Array.isArray(txHash)) {
    return Promise.all(txHash.map(
      oneTxHash => self.getTransactionReceiptMined(oneTxHash, interval),
    ));
  } if (typeof txHash === 'string') {
    return new Promise(transactionReceiptAsync);
  }
  throw new Error(`Invalid Type: ${txHash}`);
};
