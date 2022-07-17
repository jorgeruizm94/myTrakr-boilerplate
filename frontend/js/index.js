$(() => {

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
  
  })
}






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
