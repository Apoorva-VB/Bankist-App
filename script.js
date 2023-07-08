'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
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

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

/*/let arr = ['a', 'b', 'c', 'd', 'f', 'e'];
let arry = ['1', 2, 'a', 'g'];

//slice
console.log(arr.slice(1, 3));
console.log(arr.slice(1));
console.log(arr.slice());
console.log([...arr]);
console.log(arr.slice(1, -4));

//splice
//console.log(arr.splice(1));
console.log(arr);

//reverse
console.log(arr.reverse());

//concat
console.log(arr.concat(arry));
console.log([...arr, ...arry]);
//join
console.log(arr.concat(arry).join(','));

console.log(arr.at(-1));

const bank = [230, -2300, 699, -400, -60, 34, 3, -45, -62];
for (const [i, val] of bank.entries()) {
  console.log(i + 1, val);
}
bank.forEach(function (n, i, av) {
  if (n > 0) {
    console.log(`you have depeosited ${n}`);
  } else {
    console.log(`you have withdrawn ${Math.abs(n)}`);
  }
});

const currenciess = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);
currenciess.forEach(function (value, key, maps) {
  console.log(`${key} ${value}`);
});

const se = new Set([1, 2, 3, 3, 4, 4, 2, 3, 1]);
console.log(...se);
se.forEach(function (value, key, set) {
  console.log(` ${value} 2`);
});
//console.log(ac)

const display = function (movements, sort = false) {
  containerMovements.innerHTML = '';
  const mov = sort ? movements.slice().sort((a, b) => a - b) : movements;
  mov.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const html = `
    <div class="movements__row">
    <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>
      <div class="movements__value">${mov}</div>
    </div>`;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
  //containerMovements.insertAdjacentHTML('afterbegin', html);
};
//display(account1.movements);
console.log(account1);
const updateUI = function (acc) {
  display(acc.movements);
  displayBalance(acc);
  displayWithdraw(acc);
};
let currentAccount;

//console.log(currentAccount);

const displayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  labelBalance.textContent = `${acc.balance}€`;
};
//displayBalance(account1.movements);

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    ac => ac.userName === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    console.log('LOGIN');
    inputLoginUsername.value = inputLoginPin.value = '';
    labelWelcome.textContent = `welcome back ${currentAccount.owner}`;
    containerApp.style.opacity = 100;
    updateUI(currentAccount);
  }
});
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount >= 0 &&
    currentAccount.balance >= amount &&
    receiverAcc &&
    receiverAcc?.userName !== currentAccount.userName
  ) {
    console.log('valid');
  }
  currentAccount.movements.push(-amount);
  receiverAcc.movements.push(amount);
  updateUI(currentAccount);
});
btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  if (
    inputCloseUsername.value === currentAccount.userName &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.find(ac => ac.userName === currentAccount.userName);
    accounts.splice(index, 1);
    console.log(accounts);
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

//SOME AND EVERY

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const loan = Number(inputLoanAmount.value);
  if (loan > 0 && currentAccount.movements.some(mov => mov > loan * 0.1)) {
    currentAccount.movements.push(loan);
  }
  inputLoanAmount.value = '';
  updateUI(currentAccount);
});

const ah = account4.movements.every(mov => mov > 0);
console.log(ah);

const flt = accounts
  .map(ac => ac.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
console.log(flt);

const fl = accounts
  .flatMap(ac => ac.movements)
  .reduce((acc, cur) => acc + cur, 0);
console.log(fl);

const a = [
  [1, 2, 3],
  [3, 4],
  [56, 7, 5],
];
console.log(a.flat().reduce((acc, cur) => acc + cur, 0));

const art = [1, 2, 4, 6, -123, -12, -293, 67, 34];
art.sort((a, c) => c - a);
console.log(art);

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  display(currentAccount.movements, !sorted);
  sorted = !sorted;
});

const dice = Array.from({ length: 100 }, a =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(dice);

const z = new Array(7);
console.log(z.fill(1));

const x = Array.from({ length: 7 }, (cur, i) => i + 1);
console.log(x);

labelBalance.addEventListener('click', function () {
  const arf = Array.from(document.querySelectorAll('.movements_value'));
  console.log(
    arf
    //map(al => al.textContent.replace('€', ''))
  );
});

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const alp = ['A', 'B', 'C', 'D', 'E'];
let i;
const ab = num.map(ap => (ap = alp[i]));

//console.log((num[0] = alp[0]));

for (let i = 0; i < alp.length; i++) {
  //console.log((alp[i] = alp[i.length]));
}

const abn = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];
/*const ef = Number(prompt('enter your number'));
const ans = abn[ef];
console.log(ans);
if (ef > 26) {
  const bc = Math.trunc(ef / 26);
  const ab = ef % 26;
  console.log(bc * ab, bc);
  console.log(abn[bc - 1].concat(abn[ab - 1]));
}
let d = 20;
let b = 40;*/

const dep = accounts
  .flatMap(ac => ac.movements)
  .reduce((ac, cur) => (cur >= 1000 ? ac + 1 : ac), 0);
//console.log(dep);

//console.log(b % d);

//console.log((abn[] = ab.indexOf()));
////const an = ['A','B','c'...'AA',"AB"//]
//console.log(an);
/*  const newArr = clone.concat(kate);
const clone = julia.slice();
console.log(clone.splice(-2));
console.log(clone.shift());
console.log(newArr);

const checkDogs = function (agesJulia, agesKate) {
  const clone = agesJulia.slice();
  clone.splice(-2);
  clone.shift();
  console.log(clone);

  //console.log(agesKate);
  const newArr = clone.concat(agesKate);
  console.log(newArr);

  newArr.forEach(function (ages, i, val) {
    if (ages >= 3) {
      console.log(`Dog number ${i + 1} is an adult and is ${ages} years old`);
    } else {
      console.log(`Dog number ${i + 1} is still a puppy`);
    }
  });
  //console.log(ages);
};
//checkDogs(newArr);

checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

/*const movementss = [200, 450, -400, 3000, -650, -130, 70, 1300];
const usd = 1.1;
const news = movementss.map(mov => mov * 1.1);
console.log(news);

const movdis = movementss.map(
  (mov, i) =>
    `movement${i + 1}: you ${mov > 0 ? 'deposited' : 'withdrawn'} ${Math.abs(
      mov
    )}`

  if (mov > 0) {
    return `Movement${i + 1} : you have depeosited ${mov}`;
  } else {
    return `Movement ${i + 1} : you have withdrawn ${Math.abs(mov)}`;
  }
);
console.log(movdis);*/

/*const displayBalance = function (movements) {
  const ab = movements.reduce((acc, cur) => acc + cur);
  labelBalance.textContent = `${ab}€`;
};
displayBalance(account1.movements);*/

const displayWithdraw = function (acc) {
  const int = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumIn.textContent = `${int}€`;

  const out = acc.movements
    .filter(am => am < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep * acc.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = `${interest}€`;
};
//displayWithdraw(account1.movements);

const user = 'Steven Thomas Williams';

const userName = function (accounts) {
  accounts.forEach(function (acc) {
    acc.userName = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
userName(accounts);
//console.log(accounts);

const movementsss = [200, 450, -400, 3000, -650, -130, 70, 1300];

//const withdrawls = movementsss.filter(mov => mov < 0);

//console.log(withdrawls);

const sum = movementsss.reduce(function (acc, curr, i, arr) {
  return acc + curr;
}, 0);
//console.log(sum);

//const mo = function (movementsss) {
const mo = movementsss.reduce((acc, cur) => {
  if (acc > cur) return acc;
  else return cur;
}, movementsss[0]);

//mo(movementsss);
//console.log(mo);

/*const ag = [16, 6, 10, 5, 6, 1, 4];

const calAvgHumanAge = function (ages) {
  const abb = ages.map(age => {
    if (age <= 2) return 2 * age;
    else return 16 + age * 4;
  });

  console.log(abb);

  const gh = abb.filter(ag => {
    return ag >= 18;
  });
  console.log(gh);

  //const sum = 0;

  const bg = gh.reduce(function (arrr, crr, i, arr) {
    return arrr + crr / gh.length;
  }, 0);
  console.log(bg);
};

calAvgHumanAge(ag);

const calAvgHumanAgee = array => {
  const dog = array
    .map(age => {
      return age <= 2 ? 2 * age : 16 + age * 4;
    })
    //console.log(dog);

    .filter(
      ages => ages >= 18
      //console.log(arr);
    )
    .reduce((arry, cur, i, arru) => {
      return arry + cur / arru.length;
      //console.log(arru);
    }, 0);
  console.log(dog);
};
calAvgHumanAgee(ag);
//console.log(dog);
const fin = accounts.find(ac => ac.owner === 'Jessica Davis');
console.log(fin);

//const num = function (acc) {
for (const a of accounts) {
  if (a === a.owner) console.lgroup(a);
}

//num(accounts);
*/

/*const sumss = accounts
  .flatMap(ac => ac.movements)
  .reduce(
    (sums, cur) => {
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sumss;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sumss);*/

const sums = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sums, cur) => {
      // cur > 0 ? (sums.deposits += cur) : (sums.withdrawals += cur);
      sums[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sums;
    },
    { deposits: 0, withdrawals: 0 }
  );
console.log(sums);

/*const capital = function (word) {
  const gh = str => str[0].toUpperCase() + str.slice(1);
  const exp = ['a', 'an', 'in', 'on', 'the', 'and', 'of', 'with'];
  const th = word
    .toLowerCase()
    .split(' ')
    .map(wor => (exp.includes(wor) ? wor : gh(wor)))
    .join(' ');
  return gh(th);
};
console.log(capital('this is an example OF hw '));

/*const convertTitleCase = function (title) {
  const capitzalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitzalize(word)))
    .join(' ');

  return capitzalize(titleCase);
};

console.log(convertTitleCase('this is a nice title'));*/

const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

//1

dogs.forEach(function (dg, index, arr) {
  dg.portion = dg.weight ** 0.75 * 28;
}, console.log(dogs));

//2
const uv = dogs.find(dg => dg.owners.includes('Sarah'));
//console.log(dg);
console.log(uv);

if (uv.curFood < uv.portion) {
  console.log('eating less');
} else if (uv.curFood > uv.portion) {
  console.log(' eating more');
}

//3
//let eatsMuch = [];
//let eatsLess = [];

const eatsMuch = dogs
  .filter(ac => ac.curFood > ac.portion)
  .map(ac => ac.owners)
  .flat();
console.log(eatsMuch);

const eatsLess = dogs
  .filter(ac => ac.curFood < ac.portion)
  .map(ac => ac.owners)
  .flat();
console.log(eatsLess);
/*
dogs.forEach(function (dg) {
  dg.find(ac => ac.curFood < ac.portion);
  //console.log((eatsLess = dg.owners));
  //const bg = dg.find(ac => ac.curFood > ac.portion);
  //console.log((eatsMuch = bg.owners));
  //const huch = dogs.every(a => a.curFood > a.portion);
  //console.log();
});*/

/*dogs.forEach(function (dogd, i, ar) {
  if (dogd.curFood < dogd.portion) {
    eatsLess.push(dogd.owners);
  }
  //eatsLess = dogd.curFood < dogd.portion;
  else if (dogd.curFood > dogd.portion) {
    eatsMuch.push(dogd.owners);
  }
});
console.log(eatsLess);
console.log(eatsMuch);*/

//5
const max = eatsLess.flat();
console.log(`${max.join(' and ')}'s eat too less`);
const min = eatsMuch.flat();
console.log(`${min.join(' and ')}'s dog's eat much `);
//console.log(min);

//5
console.log(dogs.some(ac => ac.curFood === ac.portion));

//6
const dg = dogs.some(
  ac => ac.curFood > ac.portion * 0.9 && ac.curFood < ac.portion * 1.1
);
console.log(dg);

//7
const okay = [];
dogs.forEach(function (dg) {
  if (dg.curFood > dg.portion * 0.9 && dg.curFood < dg.portion * 1.1) {
    okay.push(dg);
  }
});
console.log(okay);

//console.log(340 > 376 * 0.9 && 340 < 376 * 1.1);

//8
const dog = dogs.slice().sort((a, b) => a.portion - b.portion);

console.log(dog);
