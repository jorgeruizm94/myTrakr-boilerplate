class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    return this.transactions.reduce((total, transaction) => 
    parseInt(total) +
    (transaction.transaction == "deposit"
    ? parseInt(transaction.amount)
    : transaction.transaction == "withdraw"
    ? -parseFloat(transaction.amount)
    : transaction.transaction == transaction.accountIdTo
    ? parseFloat(transaction.amount)
    : -parseFloat(transaction.amount)
    ), 0);
  }
}
