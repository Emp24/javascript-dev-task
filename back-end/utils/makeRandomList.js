// Function to check whether the selected random word is already in the array
//To make sure the words array is unique
const isWordInArray = (questions, word) => {
  for (let i = 0; i < questions.length; i++) {
    if (questions[i].word === word) {
      return true;
    }
  }
  return false;
};
//Function to check whether all types (noun, verb, adverb, adjective) of words already exist in the words array
const areAllTypesInArray = (questions) => {
  const types = new Set();
  for (let i = 0; i < questions.length; i++) {
    types.add(questions[i].pos);
  }
  if (types.size === 4) {
    return true;
  } else {
    return false;
  }
};
//Function to check whether the selected random word type  is already inside the words array
//to make sure there's one at least one type of each word in the words list
const isTypeInArray = (questions, type) => {
  for (let i = 0; i < questions.lenght; i++) {
    if (questions[i].pos === type) {
      return true;
    }
  }
  return false;
};

//Pseudo code:
//while array.length !==10
//Select Randomly
//If all word types exist inside the array and word is not in array
//put in array
//else
//if type not in array and word not in array
//put in array

//Function to make a random word list from the provided test data
const makeRandomList = (wordList) => {
  let questions = [];
  //A loop that only stops when words (questions) have been selected that meet the provided conditions (unique words and at least one type of each word should exist)
  while (questions.length !== 10) {
    //Generating a random question
    let randQuestion = wordList[Math.floor(Math.random() * wordList.length)];
    //If all the word types are already in the array and the word is not in the array (unique) then we push that word into the array
    if (
      areAllTypesInArray(questions) &&
      !isWordInArray(questions, randQuestion.word)
    ) {
      questions.push(randQuestion);
    }
    //If word type is not in the array and the word is not in the array(unique) we push the word into the array
    //This way we priotrize word types that do not exist in the array until we make sure the array contains all word types
    else {
      if (
        !isTypeInArray(questions, randQuestion.pos) &&
        !isWordInArray(questions, randQuestion.word)
      ) {
        questions.push(randQuestion);
      }
    }
  }
  return questions;
};

module.exports = makeRandomList;
