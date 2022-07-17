$(() => {





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

        // Remove the element "Add new category" because it is always the last element
        $('.categories option[value="1"]').remove();
        $(".categories").append(
          <option value="1">Add New Category</option>
        );

        console.log("New category posted.", data);
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








});
