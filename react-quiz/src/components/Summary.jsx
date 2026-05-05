import React from 'react';
import quiz_summary from '../assets/quiz-complete.png';
import QUESTIONS from "../questions.js";

export default function Summary({ userAnswers }) {

    const skippedAnswers = userAnswers.filter((answer) => answer === null);

    const correctAnswers = userAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);

    
    const skippedAnswerShare = Math.round((skippedAnswers.length / userAnswers.length) * 100);
    const correctAnswersShare = Math.round((correctAnswers.length / userAnswers.length) * 100);
    const wrongAnswersShare = 100 - skippedAnswerShare - correctAnswersShare; 




    return <div id="summary">
            <h2>Quiz complete</h2>
            <img src={quiz_summary} alt="Quiz Complete Logo" />
            <div id='summary-stats'>
                <p>
                    <span className="number">{skippedAnswerShare}%</span>
                    <span className="text">Skipped</span>
                </p>
                <p>
                    <span className="number">{correctAnswersShare}%</span>
                    <span className="text">answered correctly</span>
                </p>
                <p>
                    <span className="number">{wrongAnswersShare}%</span>
                    <span className="text">answered incorrectly</span>
                </p>
            </div>
            <ol>
                    {userAnswers.map((answer, index) => {
                        let cssClass = 'user-answer';

                        if(answer === null){
                            cssClass += ' skipped';
                        }else if(answer === QUESTIONS[index].answers[0]){
                            cssClass += ' correct';
                        }else{
                            cssClass += ' wrong';
                        }
                        return  (
                            <li key={index}>
                                <h3>{ index + 1 }</h3>
                                <p className='question'>{QUESTIONS[index].text}</p>
                                <p className={cssClass}>{answer ?? 'No Answer Selected'}</p>
                            </li>
                        )
                    })}
            </ol>
        </div>
}