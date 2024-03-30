const userInfo = JSON.parse(localStorage.getItem("userInfo"));
let products = JSON.parse(localStorage.getItem("soldProducts"));

window.onload = function () {
  const profileContainer = document.getElementById("profileContainer");
  const sellerMenu = document.getElementById("sellerMenu");
  const cartLink = document.getElementById("cartLink");
  const customerMenu = document.getElementById("customerMenu");
  const moneyBalance = document.getElementById("moneyBalance");

  if (userInfo && userInfo.hasOwnProperty("customer")) {
    customerMenu.style.display = "block";

    balance = userInfo.customer.money_balance;
    moneyBalance.innerText = "$" + balance;
    cartLink.href = "my_order.html";
  } else if (userInfo && userInfo.hasOwnProperty("seller")) {
    sellerMenu.style.display = "block";

    const totalPrice = products.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.price * currentProduct.quantity;
    }, 0);
    console.log(totalPrice);
    userInfo.seller.bank_account = totalPrice;
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    moneyBalance.innerText = "$" + totalPrice;
    cartLink.href = "order_list.html";
  } else {
    cartLink.href = "account.html";
  }

  if (userInfo) {
    profileContainer.style.display = "block";
  }
};

const isCodeExecuted = localStorage.getItem("isCodeExecuted");

// If the flag doesn't exist or if it's set to "false", execute the code
if (!isCodeExecuted || isCodeExecuted === "false") {
  if (userInfo && userInfo.hasOwnProperty("customer")) {
    const filteredProducts = products?.filter(
      (product) => product.userName === userInfo.customer.name
    );
    if (filteredProducts) {
      const totalPrice = filteredProducts.reduce(
        (accumulator, currentProduct) => {
          return accumulator + currentProduct.price;
        },
        0
      );
      userInfo.customer.money_balance =
        userInfo.customer.money_balance - totalPrice;
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
    }
  }

  // Set the flag to indicate that the code has been executed
  localStorage.setItem("isCodeExecuted", "true");
}

document.getElementById("logout-btn").addEventListener("click", function () {
  // Remove user information from localStorage
  localStorage.removeItem("userInfo");
  // Redirect user to login page
  window.location.href = "account.html";
});

function toggleMenu() {
  var dropdownMenu = document.getElementById("dropdownMenu");
  dropdownMenu.classList.toggle("active");
}
