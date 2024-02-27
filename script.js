"use strict";
// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT",
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

// FUNCTION TO DISPLAY ALL THE MOVIMENTS
const displayMoviments = (movements, sort = false) => {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;
  movs.forEach((movement, index) => {
    const type = movement > 0 ? "deposit" : "withdrawal";
    const html = ` 
    <div class="movements__row">
                      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
                      <div class="movements__date">3 days ago</div>
                      <div class="movements__value">${movement.toFixed(
                        2
                      )}€</div>
                    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// Function to Calculate the Balance
function calculateBalance(acc) {
  acc.balance = acc.movements.reduce((acc, mov) => (acc += mov), 0);
  return acc.balance;
}

// Function tom calculate the incomes
const calculateIncomes = (acc) => {
  const incomes = acc.movements
    .filter((movement) => movement > 0)
    .reduce((acc, mov) => (acc += mov), 0);

  return incomes;
};

// Function to Calculate the Outcomes

const calculateOutcomes = (acc) => {
  const outcomes = acc.movements
    .filter((movement) => movement < 0)
    .reduce((acc, mov) => (acc += mov), 0);

  return Math.abs(outcomes);
};

// Function to Calculate the interest
const calculateInterest = (acc) => {
  const interest = acc.movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((interest) => interest >= 1)
    .reduce((acc, deposit) => (acc += deposit), 0);
  return interest;
};

// Function to display any information into the DOM
const display = (value, element) => {
  element.textContent = `${value.toFixed(2)}€`;
};

// Calling the display function to display different values into the DOM

// Function to create a user Name
const createUserName = (account) => {
  account.forEach(
    (userName) =>
      (userName.username = userName.owner
        .toLocaleLowerCase()
        .split(" ")
        .map((user) => user[0])
        .join(""))
  );
};

createUserName(accounts);

// Fucntion to Update the UI
function updateUI(acc) {
  displayMoviments(acc.movements);
  display(calculateBalance(acc), labelBalance);
  display(calculateIncomes(acc), labelSumIn);
  display(calculateOutcomes(acc), labelSumOut);
  display(calculateInterest(acc), labelSumInterest);
}

// LOGIN FUNCITONALITY
let currentAccount;
btnLogin.addEventListener("click", (event) => {
  event.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome, ${currentAccount.owner.split(" ")[0]}`;

    containerApp.style.opacity = 100;
    //Update UI
    updateUI(currentAccount);

    inputLoginPin.value = "";
    inputLoginPin.blur();
    inputLoginUsername.value = "";
  } else {
    containerApp.style.opacity = 0;
    inputLoginPin.value = "";
    inputLoginPin.blur();
    inputLoginUsername.value = "";
    alert("User or Password is incorrect");
    labelWelcome.textContent = "Log in to get started";
  }
});

// Tranfer money functionality
btnTransfer.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    updateUI(currentAccount);
    alert(`Transfer to ${receiverAcc.owner} completed successfully`);
  } else {
    alert(`Transfer failed. Plase check your information`);
  }

  inputTransferAmount.value = " ";
  inputTransferTo.value = " ";
});

// Function to Delete an account from the accounts list
btnClose.addEventListener("click", (event) => {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    if (
      confirm(`Are you sure you want to delete ${currentAccount.owner} account`)
    ) {
      accounts.splice(index, 1);
      containerApp.style.opacity = 0;
      labelWelcome.textContent = "Log in to get started";
    }
  }

  inputCloseUsername.value = "";
  inputClosePin.value = "";
});

// FUNCTION TO GET LOAN
btnLoan.addEventListener("click", (event) => {
  event.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  } else {
    alert("You are not allowed to receive this amount of money");
  }
  inputLoanAmount.value = "";
});

let sorted = false;
btnSort.addEventListener("click", (event) => {
  event.preventDefault();
  displayMoviments(currentAccount.movements, !sorted);
  sorted = !sorted;
});
