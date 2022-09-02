import "./App.css";

import { useEffect, useState } from "react";

import ProgressBar from "./Components/ProgressBar/ProgressBar";
import Question from "./Components/Question/Question";
import ResultsModal from "./Components/ResultsModal/ResultsModa";
import { getQuestionsAPI } from "./API/getQuestions";
import { postScoreAPI } from "./API/postScore";

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [numberOfAnsweredQuestions, setNumberofAnweredQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [score, setScore] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [rank, setRank] = useState(null);
  //A handler to move to the previous question
  const prevQuestion = () => {
    //A condition so it doesn't go outside of the array limit (-1)
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  //A handler to move to the next question
  const nextQuestion = () => {
    //A condition so it does not exceed the length of the questions array
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  //A function to load the question from the back-end and set them into the questions state
  const loadQuestions = async () => {
    const { res } = await getQuestionsAPI();
    if (res) {
      const questions = res.map((question) => {
        return {
          word: question.word,
          answered: null,
          id: question.id,
          answer: question.pos,
        };
      });
      setQuestions(questions);
    }
  };
  //A function that takes the calculated score and sends it to the scores API and loads the rank into the rank state
  const loadRank = async (score) => {
    const { res } = await postScoreAPI(score);
    if (res) {
      setRank(res);
    }
  };
  //Use effect to load questions once the application starts running (this component is visited)
  useEffect(() => {
    loadQuestions();
  }, []);
  //Use effect that calculates the score each time a correct answer has been added
  useEffect(() => {
    setScore((correctAnswers / questions.length) * 100);
  }, [correctAnswers]);

  return (
    <div>
      <div className=" flex justify-center">
        {questions.map((question, id) => {
          if (id === currentQuestion) {
            return (
              <Question
                key={question.id}
                id={id}
                word={question.word}
                prevQuestion={prevQuestion}
                nextQuestion={nextQuestion}
                answer={question.answer}
                answered={question.answered}
                setQuestions={setQuestions}
                questions={questions}
                setNumberofAnweredQuestions={setNumberofAnweredQuestions}
                numberOfAnsweredQuestions={numberOfAnsweredQuestions}
                correctAnswers={correctAnswers}
                setCorrectAnswers={setCorrectAnswers}
              />
            );
          }
        })}
      </div>
      <div className="flex justify-center">
        <ProgressBar
          percent={Math.floor(
            (numberOfAnsweredQuestions / questions.length) * 100
          )}
        />
      </div>
      {/* Show result button that is only shown when the user has reached the final question */}
      {currentQuestion + 1 === questions.length ? (
        <div className="flex justify-center my-4">
          <button
            className="question-buttons"
            onClick={() => {
              setShowModal(true);
              loadRank(score);
            }}
          >
            Show Result
          </button>
        </div>
      ) : (
        <></>
      )}
      {/* Results modal that is only shown when the user clicks on Show Results Button */}
      <ResultsModal
        showModal={showModal}
        setShowModal={setShowModal}
        rank={rank?.rank}
      />
    </div>
  );
}

export default App;
