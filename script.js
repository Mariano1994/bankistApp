'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Mariano Capiliku',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Neri Capiliku',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};



const account3 = {
  owner: 'Ricardo Tchimbua',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');



// FUNCTIONS TO DISPLAY NEW MOVEMENTS
 const displayMovements = function(movements) { 

  containerMovements.innerHTML = '';
  movements.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
  
    const html = `
     <div class="movements__row">
       <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
       <div class="movements__value">${mov}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);

  });
 };
 


// CALCULATING BALANCES
const calcDisplayBalance = function(acc) {

  const balance = acc.movements.reduce(function(accumulatorBalance, mov) {
    return accumulatorBalance + mov;
  }, 0);
  acc.balance = balance;
  labelBalance.textContent = `${balance}€`;

}



// Calculating Sammury
const calDisplaySummay = function(acc) {
  // INCOMES
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce(function(accu, mov){
      return accu + mov;
  }, 0);

  // OUTCOMES
  const outComes = acc.movements
    .filter(mov => mov < 0)
    .reduce(function(accu, mov){
      return accu + mov;
  }, 0);

  // INTEREST
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter(deposit => deposit >= 1)
    .reduce((acc, int) => acc + int, 0);
   

  labelSumIn.textContent = `${incomes}€`;
  labelSumOut.textContent = `${Math.abs(outComes)}€`;
  labelSumInterest.textContent = `${interest}€`;

};



// CREATTING USER NAME
const createUserName = function(accounts) {
  accounts.forEach(function(account) {
    account.username = account.owner.toLowerCase()
    .split(' ').map(function(name) {
      return name[0];

    }).join('');

  });

}; 
createUserName(accounts);

// UPDATE UI FUNTION
const updatUI = function(acc){

 // Display movements
 displayMovements(acc.movements);
 // Display Balance 
 calcDisplayBalance(acc);
 // Display Summary
 calDisplaySummay(acc);

}


// LOGIN FUNCTOIN
let currentAccount;
btnLogin.addEventListener('click', function(event){
  // Prevent form from submitting
  event.preventDefault(); 

  currentAccount = accounts.find(function(account){
    return account.username === inputLoginUsername.value
  });

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display Welcome Message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;

   // Display UI (User Interface) 
    containerApp.style.opacity = 100;

    // Clear input fields 
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // UPDATE UI
    updatUI(currentAccount);

  }

});

// Transfer Function 
btnTransfer.addEventListener('click', function(e){
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiver = accounts.find(function(acc){
    return acc.username === inputTransferTo.value;
  });

  if(amount > 0 && receiver && currentAccount.balance >= amount && receiver.username !==   currentAccount.username){

    currentAccount.movements = [...currentAccount.movements, -amount];
    receiver.movements = [...receiver.movements, amount];

    // UPDATE UI
    updatUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
    inputTransferAmount.blur();

  };

})
