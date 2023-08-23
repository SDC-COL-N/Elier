import React, { useEffect, useState } from 'react';
import axios from "axios";
import SearchBar from "./QnAcomponents/Searchbar.jsx";
import IdividualAnswer from "./QnAcomponents/indvAnswer.jsx";
import AddQuestions from "./QnAcomponents/addQuestion.jsx";
const QuestionsAndAnswers = () => {
  const product = '37323';

  useEffect(() => {
    axios.get(`/questions/${product}`).then((result) => {
      updateQuestions(result.data.results);
      updateStatic(result.data.results)
      updatePerma(result.data.results)
      wasUpdated(true)
    }).catch((err) => {
      console.error(err)
    })
  }, [])

  const [permaInfo, updatePerma] = useState('')
  const [sliceNum, updateSlice] = useState(2)
  const [staticInfo, updateStatic] = useState('')
  const [updated, wasUpdated] = useState(false)
  const [questions, updateQuestions] = useState([{
    question_body: 'Please wait for page to load',
    question_date: '2020-11-16T00:00:00.000Z',
  }])


useEffect(() => {
  questions.sort((a,b) => {
    return b.question_helpfulness
    - a.question_helpfulness
  })
  var topQuestions = questions.filter((question, index) => {
    if(index < sliceNum){
      return question
    }
  })
  updateQuestions(topQuestions)
},[updated, sliceNum, staticInfo])

return (
<div className="bg-[#27272A]">
  <div className="p-20 bg-[#27272A] text-white relative fullPageDiv">
    <h2 className="text-lg">Questions & Answers</h2>
    <SearchBar static={staticInfo} updateStatic={updateStatic} questions={questions} updateQuestions={updateQuestions} perma={permaInfo}/>
    <div className="flex flex-col space-y-32 mt-3.5 pt-6 testers">
      {questions.map((question, index) => {
        var answers = [];
        for (var key in question.answers) {
          answers.push(question.answers[key])
        }
        return <IdividualAnswer questions={question} answers={answers} key={index}/>
      })}
    </div>
    <div className="my-1.5 flex">
      {staticInfo.length < 2 || questions.length === staticInfo.length ? "" : <button className="rounded bg-neutral-400 p-3" onClick={(e) => {
        updateSlice((prevVal) => {
          updateQuestions(staticInfo.slice(0, prevVal + 2))
          return prevVal + 2
        })
      }} key={sliceNum}>More Answered Questions</button>} &nbsp; <AddQuestions/>
    </div>
  </div>
</div>

)
}


export default QuestionsAndAnswers