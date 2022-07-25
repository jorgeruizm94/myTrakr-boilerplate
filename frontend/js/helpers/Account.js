class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }

  get balance() {
    let total=0;
    this.transactions.forEach(element => {
      switch (element.transaction){
        case 'deposit':
          if(this.id == element.accountId){
            total += parseInt(element.amount)
          }
          break
        case 'withdraw':
          if(this.id == element.accountId){
            total -= parseInt(element.amount)
          }
          break
        case 'transfer':
          if(element.accountIdFrom == this.id){
            total -= parseInt(element.amount)
          }
          if(element.accountIdTo == this.id){
            total += parseInt(element.amount)
          }
          break
      }

    });

    return total
  }
}
