
let tombolaBtn = document.getElementById('tombola-btn');
let cardsNumberWrapper = document.getElementById('numbers-cards-wrapper');
let numberCard = document.querySelectorAll('.number-card');

cardsNumberWrapper.style.display = 'none';


function getInputNumbers() {
  let resultArr = [];
  for(let i = 1; i < 8; i++) {
    let inputVal = document.getElementById('input' + i).value;
    resultArr.push(parseInt(inputVal))
  }
  return resultArr;
}

function genRandomNum() {
  return Math.floor(Math.random() * 99) + 1;
}

function generateRandomArray() {
  let uniqueVals = new Set();
  for(let i = 0; i < 7; i++) {
    let randomVal = genRandomNum()
    uniqueVals.add(randomVal)
  }
  return uniqueVals;
}

function genNextUniqueRandomVal(currentSet) {
  let nextRandomVal = genRandomNum();
  while(currentSet.has(nextRandomVal)) {
    nextRandomVal = genRandomNum();
  }
  return nextRandomVal;
}

function calcMatches(arr, set) {
  let matches = 0;
  for(let i = 0; i < arr.length; i++) {
    if(set.has(arr[i])) {
      matches++;
    }
  }
  return matches;
}

function isValidInputArr(arr) {
  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];
    if (isNaN(element)) {
      console.log('element is not a number:' + element)
      return false;
    }
    if (element > 99) {
      console.log('element is bigger than 99:' + element)

      return false;
    }
    if (element < 1) {
      console.log('element is lower than 1:' + element)
      return false;
    }
  }
  return true;
}

tombolaBtn.addEventListener('click', () => {
  cardsNumberWrapper.innerHTML = '';
  cardsNumberWrapper.style.display = 'flex';
  const inputArr = getInputNumbers();

  if (!isValidInputArr(inputArr)) {
    console.log('not valid input array. You must enter numbers between 1 and 99.')
    return;
  }
  const randSet = generateRandomArray();
  let matchesCount = calcMatches(inputArr, randSet)

  while(matchesCount < 7) {
    let nextRandValue = genNextUniqueRandomVal(randSet);
    randSet.add(nextRandValue)
    matchesCount = calcMatches(inputArr, randSet)
  }

  console.log("Tombola")
  console.log(randSet)

  let inputSet = new Set(inputArr)

  randSet.forEach(element => {
    let div = document.createElement('div')
    if(inputSet.has(element)) {
      div.className = 'number-matched'
    } else {
      div.className = 'number-card';
    }
    div.textContent = element;
    cardsNumberWrapper.appendChild(div);
  })

});