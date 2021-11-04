import React from 'react';
import Question from './Question.jsx';
import Answer from './Answer.jsx';

// TODO: figure out what to display when there are no answers
const QAItem = (props) => {
  return (
    <div style={{'margin-bottom': '0.6rem'}} className={props.className}>
      <Question question={props.question} className="question"/>
      <Answer answers={props.question.answers} className="answer"/>
    </div>
  )
}

export default QAItem;