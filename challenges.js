// Challenges

const dogs = [
  { weight: 22, curFood: 250, owner: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owner: ["Matilda"] },
  { weight: 13, curFood: 275, owner: ["Sarah", "John"] },
  { weight: 32, curFood: 340, owner: ["Michael"] },
];

// 1
dogs.forEach(
  (dog) => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
// console.log(dogs);

/*
Eating too much means the dog's current food portion is larger than the recommended portion, and eating to little is the
opposit

Eantin an okay amount means the dog's current food portion is within a range of 10% above and 10% below the recommended portion

*/

//2
const sarahDog = dogs.find((dog) => dog.owner.includes("Sarah"));

if (sarahDog.curFood > sarahDog.recommendedFood) {
  console.log("Sarah's Dog is eating too much");
} else {
  console.log("Sarah's Dog is eating too little");
}

// 3
const ownersEatTooMuch = dogs
  .filter((dog) => dog.curFood > dog.recommendedFood)
  .flatMap((owner) => owner.owner);
console.log(ownersEatTooMuch);

const ownersEatTooLitter = dogs
  .filter((dog) => dog.curFood < dog.recommendedFood)
  .flatMap((owner) => owner.owner);
console.log(ownersEatTooLitter);

//4

//5
const anyPerfectDog = dogs.some((dog) => dog.curFood === dog.recommendedFood);
console.log(anyPerfectDog);

// 6
const anyOkDog = dogs.some(
  (dog) =>
    dog.curFood >
    (dog.recommendedFood * 0.9 && dog.curFood < dog.recommendedFood * 1.1)
);

console.log(anyOkDog);

// 7
const okayDogs = dogs.filter(
  (dog) =>
    dog.curFood > dog.recommendedFood * 0.9 &&
    dog.curFood < dog.recommendedFood * 1.1
);
console.log(okayDogs);

// 8
const dogsCopty = [...dogs];

const sortedDogs = dogsCopty.sort(
  (a, b) => a.recommendedFood - b.recommendedFood
);

console.log("======== NOT SORTED DOGS =================");
console.log(dogs);
console.log("========== SORTED DOGS");
console.log(sortedDogs);

// LECTURES

console.log("CALL AND APPLY METHODS");

const lufthansa = {
  airline: "lufthansa",
  aitaCode: "LH",
  bookings: [],
};

const eurowings = {
  airline: "Eurowings",
  aitaCode: "EW",
  bookings: [],
};

const swiss = {
  airline: "Swiss Air Line",
  aitaCode: "LX",
  bookings: [],
};
// Function to book on one of the airlines services

function book(flightNum, userName) {
  console.log(
    `${userName} booked a seat on ${this.airline} flight ${this.aitaCode}${flightNum}`
  );

  this.bookings.push({
    flight: `${this.aitaCode}${flightNum}`,
    userName,
  });
}

// CALL METHOD

book.call(eurowings, 2345, "Mariano Capiliku");
book.call(eurowings, 2358, "Misael Lopes");
book.call(lufthansa, 2334, "Mario Vicente");
book.call(lufthansa, 2378, "Chelsea de Carvalho");
book.call(swiss, 2790, "Scanner Afonso");

// APPLY METHODS
const flight = [2000, "Neri Lopes Capiliku"];
book.apply(swiss, flight);

// We can still using call with the spread operator
book.call(eurowings, ...flight);

// BIND METHOD
const bookEW = book.bind(eurowings);
const bookLU = book.bind(lufthansa);
const bookSW = book.bind(swiss);

bookEW(23, "Nataniela da Silva");
bookLU(245, "Dawit Capiliku");
bookSW(3545, "Marcos Aurelio");

console.log(eurowings.bookings);
console.log(lufthansa.bookings);
console.log(swiss.bookings);

console.log(eurowings);
console.log(lufthansa);
console.log(swiss);

// FUNCTION RETURN A FUNCTION

const addTaxRate = (rate) => {
  return function (value) {
    return value + value * rate;
  };
};

const AddVat = addTaxRate(0.5);

console.log(AddVat(100));
console.log(AddVat(23));

// CHALLENGE

const answerBtn = document.getElementById("answer");

const poll = {
  question: "What is your favorite programing language?",
  options: ["0: JavaScript", "1: Python", "2: Rust", "3: C++"],
  ansewrs: new Array(4).fill(0),
};

function registeNewAnswer() {
  const newAnswer = Number(
    prompt(
      `What is your favorite programing language?\n${this.options.join(
        "\n"
      )}\n(Write option number)`
    )
  );

  if (newAnswer >= this.options.length) return;
  this.ansewrs.map((item, index) => {
    if (newAnswer === index) {
      this.ansewrs[index] = item + 1;
    }
  });

  return displayPollResults.call(this);
}

function displayPollResults(type = "array") {
  if (type === "array") {
    console.log(this.ansewrs);
  }

  if (type === "string") {
    console.log(`poll results are : ${this.ansewrs.map((result) => result)}`);
  }
}

const newAnserPoll = registeNewAnswer.bind(poll);
answerBtn.addEventListener("click", newAnserPoll);

// CLOSURES

// CHALLENGE SETINTER

// setInterval(() => {
//   const date = new Date();
//   const hour = date.getHours();
//   const minute = date.getMinutes();
//   // const seconds = date.getSecond();

//   console.log(`${hour} : ${minute}`);
// }, 1000);
