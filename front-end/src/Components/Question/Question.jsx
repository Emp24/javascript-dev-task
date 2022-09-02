import "./Question.css";

import { useEffect, useState } from "react";

//Question Component to render a multiple choice question with its options
const Question = ({
  id,
  word,
  answer,
  prevQuestion,
  nextQuestion,
  setQuestions,
  questions,
  numberOfAnsweredQuestions,
  setNumberofAnweredQuestions,
  setCorrectAnswers,
  correctAnswers,
}) => {
  //selected option state holds the option selected by the user
  //is used to compare the option to the answer to display the style of whether the answer was right or wrong
  const [selectedOption, setSelectedOption] = useState(null);
  //  The options the user can choose from
  const [options, setOptions] = useState([
    { choice: "A", answer: "noun", selected: false },
    { choice: "B", answer: "adverb", selected: false },
    { choice: "C", answer: "adjective", selected: false },
    { choice: "D", answer: "verb", selected: false },
  ]);
  //disable state to prevent the user from changing his answer after choosing
  const [disabled, setDisabled] = useState(false);
  //Use effect that shows the question with its selected answer if it has already been answered
  //in case the user wants to go back (clicks on previous) to check the older questions
  useEffect(() => {
    if (questions[id].answered) {
      setSelectedOption(questions[id].answered);
      let optionsIndex = options.findIndex(
        (option) => option.answer === questions[id].answered
      );
      let newOptions = options;
      newOptions[optionsIndex].selected = true;
      setOptions(newOptions);
      setDisabled(true);
    }
  }, []);

  //A handler to handle the picking an answer from the provided options
  //it sets the selected option with the chosen answer
  //then changes the options array to show which option has been picked
  //so that their color is updated based on whether the answer was right or wrong
  //it also updates the questions array provided to this component to show that a question has already been answered (to support the previous and next)
  //lastly if a question has been answered correctly it updates the correct answers state
  const chooseAnswerHandler = (index, choice) => {
    if (!disabled) {
      setSelectedOption(choice.answer);
      let newOptions = options;
      newOptions[index].selected = true;
      setOptions(newOptions);
      let newQuestions = questions;
      newQuestions[id].answered = choice.answer;
      setQuestions(newQuestions);
      setNumberofAnweredQuestions(numberOfAnsweredQuestions + 1);
      setDisabled(true);
      if (answer === choice.answer) {
        setCorrectAnswers(correctAnswers + 1);
      }
    }
  };

  return (
    <div className="border-gray-200 border-solid border rounded py-4 px-4 w-1/3 my-4 flex justify-center">
      {/* The question or in case of the task (the word) */}
      <div className="w-full">
        <h1 className="font-bold">
          Q{id + 1}: {word}
        </h1>
        {/* The options to choose from rendered from an options list */}
        {options.map((option, index) => {
          return (
            <div
              key={index}
              className="flex my-2 cursor-pointer"
              onClick={() => {
                chooseAnswerHandler(index, option);
              }}
            >
              <h1
                className={
                  // conditonal rendering of the options colors
                  // if an option has been selected and the answer is true it renders a green color
                  // if the option has been selected but the answer is false it renders a red color
                  // if the option has not been selected at all it renders a grey color
                  answer === selectedOption && option.selected === true
                    ? "border-green-400 border-solid border rounded px-2 mr-4 text-green-400"
                    : selectedOption !== "" && option.selected !== false
                    ? "border-red-400 border-solid border rounded px-2 mr-4 text-red-400"
                    : "border-gray-400 border-solid border rounded px-2 mr-4"
                }
              >
                {option.choice}
              </h1>
              <h1
                className={
                  //same conditional rendering as the options
                  answer === selectedOption && option.selected === true
                    ? "px-2 mr-4 text-green-400"
                    : selectedOption !== "" && option.selected !== false
                    ? "px-2 mr-4 text-red-400"
                    : "px-2 mr-4"
                }
              >
                {option.answer}
              </h1>
            </div>
          );
        })}
        {/* Previous and Next buttons that use the handlers provided from the parent component to move to the next or previous question */}
        <div className="flex justify-between mt-6">
          <button className="question-buttons" onClick={prevQuestion}>
            Previous
          </button>
          <button className="question-buttons" onClick={nextQuestion}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Question;
