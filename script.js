"use strict";

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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
const displayMoviments = (moviments) => {
  containerMovements.innerHTML = "";
  moviments.forEach((moviment, index) => {
    const type = moviment > 0 ? "deposit" : "withdrawal";
    const html = ` 
    <div class="movements__row">
                      <div class="movements__type movements__type--${type}">${
      index + 1
    } ${type}</div>
                      <div class="movements__date">3 days ago</div>
                      <div class="movements__value">${moviment}€</div>
                    </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

displayMoviments(account1.movements);

// Function to Calculate the Balance
const calculateBalance = (movements) => {
  const balance = movements.reduce((acc, mov) => (acc += mov), 0);
  return balance;
};

// Function tom calculate the incomes
const calculateIncomes = (movements) => {
  const incomes = movements
    .filter((movement) => movement > 0)
    .reduce((acc, mov) => (acc += mov), 0);

  return incomes;
};

// Function to Calculate the Outcomes

const calculateOutcomes = (movements) => {
  const outcomes = movements
    .filter((movement) => movement < 0)
    .reduce((acc, mov) => (acc += mov), 0);

  return Math.abs(outcomes);
};

// Function to Calculate the interest
const calculateInterest = (movements) => {
  const interest = movements
    .filter((movement) => movement > 0)
    .map((deposit) => (deposit * 1.2) / 100)
    .reduce((acc, deposit) => (acc += deposit), 0);
  return interest;
};

// Function to display any information into the DOM
const display = (value, element) => {
  element.textContent = `${value}€`;
};

// Calling the display function to display different values into the DOM
display(calculateBalance(account1.movements), labelBalance);
display(calculateIncomes(account1.movements), labelSumIn);
display(calculateOutcomes(account1.movements), labelSumOut);
display(calculateInterest(account1.movements), labelSumInterest);

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
