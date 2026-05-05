import { useRef } from 'react';

export default function Answers({answers, selectedAnswer, answerState, onSelect}){
    const shuffeledAnswers = useRef();

    if(!shuffeledAnswers.current){
        shuffeledAnswers.current = [...answers];
        shuffeledAnswers.current.sort((a, b) => Math.random() - 0.5);
    }
    return <ul id="answers" >
                {shuffeledAnswers.current.map((answer, index) => {
                    const isSelected = selectedAnswer === answer;
                    let cssClasses = '';
                    if(answerState === 'answered' && isSelected){
                        cssClasses = 'selected'
                    }
                    if((answerState === 'correct' || answerState === 'wrong') && isSelected){
                        cssClasses = answerState;
                    }
                    return <li key={index} className="answer">
                        <button onClick={() => onSelect(answer)} className={cssClasses} disabled={answerState !== ''}>{answer}</button></li>
                })}
            </ul>
}