$(() => {

const accounts = [];


function returnBalance(accountID) {
  for (let i = 0; i < accounts.length; i++) {
    if (accountID == accounts[i].id) {
      return accounts[i].balance;
    }
  }
}




  $.ajax({
    method: "get",
    url: "http://localhost:3000/accounts",
    dataType: "json",
  }).done((accountList) => {
    console.log("Get account value.", accountList);

    for (let i = 0; i < accountList.length; i++) {
      const newAccount = new Account(accountList[i].username);
      newAccount.id = accountList[i].id;
      newAccount.transactions = accountList[i].transactions;
      accounts.push(newAccount);

    
      $(".inputAccountSelect").append(
        <option value="${newAccount.id}">${newAccount.username}</option>
      );

      $(".inputAccountFrom").append(
        <option value="${newAccount.id}">${newAccount.username}</option>
      );

      $(".inputAccountTo").append(
        <option value="${newAccount.id}">${newAccount.username}</option>
      );

      $(".filterAccount").append(
        <option value="${newAccount.id}">${newAccount.username}</option>
      );



      $(".accountSummary").append(
        `<li id=${newAccount.id}>Username: ${newAccount.username} - Balance: ${newAccount.balance}</li>`
      );
    }
    
  });









  $("#categoryInfo").hide();


  $.ajax({
    method: "get",
    url: "http://localhost:3000/categories",
    dataType: "json",
  }).done((categoriesList) => {
    console.log("Get categories value.", categoriesList);
  
  
  
    for (let i = 0; i < categoriesList.length; i++) {
      $(".categories").append(
        <option value="${categoriesList[i].name.newCategory}">${categoriesList[i].name.newCategory}</option>
      );
    }
  
  
    $(".categories").append(<option value="1">Add New Category</option>);
  });

  
  


$.ajax({
    method: "get",
    url: "http://localhost:3000/accounts",
    dataType: "json",
  }).done((accountList) => {
    console.log("Get transactions.", accountList);

    accountList.forEach(account => {
      let transactions = account.transactions;
      for (let i = 0; i < transactions.length; i++) {
        $("#transactionsTable").append(
          `<tr> <td>${transactions[i].accountId}</td> <td>${account.username}</td> <td>${transactions[i].id}</td> <td>${transactions[i].transaction}</td> <td>${transactions[i].category}</td> <td>${transactions[i].amount}</td> <td>${transactions[i].accountIdFrom == 0 ? `-` : transactions[i].accountIdFrom}</td> <td>${transactions[i].accountIdTo == 0 ? `-` : transactions[i].accountIdTo}</td></tr>`
        );
      }
    });
  });

  







  $("#newAccount.submit").submit((e) => {
    e.preventDefault();
    console.log($('input').val());
  });


$("#newAccountNameButton").click(function () {
  let accountName = $("#newAccountName").val();

  let storedAccount = true;
  for (let i = 0; i < accounts.lenght; i++) {
    if (accountName == "") {
      alert("Field is empty.");
      storedAccount = false;
      break;
    }
  


if (accountName == accounts[i].username) {
  alert("Account already exists.");
  storedAccount = false;
  break;}
}










if (storedAccount) {
  const newAccount = {
    username: accountName,
    transactions: [],
  };





 




  $.ajax({
    method: "POST",
    data: JSON.stringify({
      newAccount,
    }),
    url: "http://localhost:3000/accounts",
    dataType: "json",
    contentType: "application/json",
  })
  .done((data) => {
    alert("New Account Added.", data);

    const newAccount = new Account(data.username);
        accounts.push(newAccount);

        $(".inputAccountSelect").append(
          <option value="${data.id}">${data.username}</option>
        );

        $(".accountSummary").append(
          `<li id=${data.id}>Username: ${data.username} - Balance: ${
            data.balance | "-"
          }</li>`
        );
  
  });
}

});
















$(".categories").on("change", function (e) {
  var valueSelected = this.value;

  if (valueSelected == 1) {
    $("#categoryInfo").show();
  } else {
    $("#categoryInfo").hide();
  }
});





$("#buttonNewCategory").click(function () {
  let inputCategory = $("#inputNewCategory").val();
  let validCategory = true;

  if (inputCategory == "") {
    alert("Category is empty.");
    validCategory = false;
  }

  $.ajax({
    method: "get",
    url: "http://localhost:3000/categories",
    dataType: "json",
  }).done((categoriesList) => {
    console.log("Get categories value.", categoriesList);

    for (let i = 0; i < categoriesList.length; i++) {
      if (inputCategory == categoriesList[i].name.newCategory) {
        alert("Category exists.");
        validCategory = false;
        break;
      }
    }

    if (validCategory) {
      const newCategory = {
        newCategory: inputCategory,
      };

      $.ajax({
        method: "POST",
        data: JSON.stringify({
          newCategory,
        }),
        url: "http://localhost:3000/categories",
        dataType: "json",
        contentType: "application/json",
      }).done((data) => {
        $("#categoryInfo").hide();
        $(".categories").val("0");
        $(".inputNewCategory").val("");
        $(".descriptionCategory").val("");

        $(".categories").append(
          <option value="${data.name.newCategory}">${data.name.newCategory}</option>
        );
        $('.categories option[value="1"]').remove();
        $(".categories").append(
          <option value="1">Add New Category</option>
        );
        console.log("New category added.", data);
      });
    }
  });
});











$('input[type="radio"]').click(function () {
  let inputValue = $(this).attr("value");
  if (inputValue == "withdraw" || inputValue == "deposit") {
    $("#from").hide();
    $("#to").hide();

    $("#account").show();
  }
});








$('input[type="radio"]').click(function () {
  let inputValue = $(this).attr("value");
  if (inputValue == "transfer") {
    $("#account").hide();

    $("#from").show();
    $("#to").show();
  }

}); 



$("#formNewTransaction").submit((e) => {
  e.preventDefault();
  console.log($("input").val());
});


$("#buttonNewTransaction").click(function () {
  let inputTransaction = $("input[name='transaction']:checked").val();
  let inputAccountTransaction = $(".inputAccountSelect").val();
  let inputFromTransaction = $(".inputAccountFrom").val();
  let inputToTransaction = $(".inputAccountTo").val();
  let inputCategoryTransaction = $(".categories").val();
  let inputAmmount = $(".inputAmount").val();

  let validTransaction = true;


if (inputAmmount <= 0) {
  alert("The amount should be bigger than 0.");
  validTransaction = false;
}


if (inputCategoryTransaction == 0) {
  alert("The category can not be empty.");
  validTransaction = false;
}


if (inputTransaction == "transfer") {
  if (inputFromTransaction == "0") {
    alert("The account From can not be empty.");
    validTransaction = false;
  }
  if (inputToTransaction == "0") {
    alert("The account To can not be empty.");
    validTransaction = false;
  }
  
  if (inputFromTransaction == inputToTransaction) {
    alert("The account To and From can not be the same.");
    validTransaction = false;
  }
}


if (inputTransaction == "deposit" || inputTransaction == "withdraw") {
  if (inputAccountTransaction == 0) {
    alert("The account can not be empty.");
    validTransaction = false;
  }
}


if(inputTransaction == undefined) {
  alert("The transaction can not be empty.");
  validTransaction = false;
}



if (inputTransaction == "transfer") {
  let balance = returnBalance(inputFromTransaction);

  if (balance < inputAmmount) {
    alert("The amount is not enough to do the transaction.");
    validTransaction = false;
  }
} 
if (inputTransaction == "withdraw") {
  let balance = returnBalance(inputAccountTransaction);

  if (balance < inputAmmount) {
    alert("The amount is not enough to do the transaction.");
    validTransaction = false;
  }
}   


if (validTransaction) {
  const newTransaction = {
    transaction: inputTransaction,
    accountId: inputAccountTransaction,
    accountIdFrom: inputFromTransaction,
    accountIdTo: inputToTransaction,
    category: inputCategoryTransaction,
    amount: inputAmmount,
  };


  $.ajax({
    method: "POST",
    data: JSON.stringify({
      newTransaction,
    }),
    url: "http://localhost:3000/transactions",
    dataType: "json",
    contentType: "application/json",
  }).done((data) => {
    alert("New transaction added.", data);

    $("#transactionsTable").append(
      `<tr> <td>${data[0].accountId}</td> <td>${data[0].id}</td> <td>${data[0].id}</td> <td>${data[0].transaction}</td> <td>${data[0].category}</td> <td>${data[0].amount}</td> <td>${data[0].accountIdFrom == 0 ? `-` : data[0].accountIdFrom}</td> <td>${data[0].accountIdTo == 0 ? `-` : data[0].accountIdTo}</td></tr>`
    );

  });
} else {
  alert("Unsuccessful transaction.");
}
});









});