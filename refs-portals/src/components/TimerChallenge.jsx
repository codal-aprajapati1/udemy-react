import { useRef, useState } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({title, targetTime}) {
    const timer = useRef();
    const dialog = useRef();
    // const [timerStarted, setTimerStarted] = useState(false);
    // const [timerExpired, setTimerExpired] = useState(false);
    const [timRemaining, setTimRemaining] = useState(targetTime * 1000);

    const timerIsActive = timRemaining > 0 && timRemaining <  targetTime * 1000;

    if(timRemaining <= 0){
        clearInterval(timer.current);
        dialog.current.open();
    }

    function handleReset(){
        setTimRemaining(targetTime * 1000);
    }
    
    function handleStart(){
        timer.current = setInterval(() => {
            setTimRemaining(preTimRemaining => preTimRemaining - 10);
        }, 10);
    }

    function handleStop(){
        dialog.current.open();
        clearInterval(timer.current);
    }

    return (
        <>
        <ResultModal ref={dialog} targetTime={targetTime} remainingTime={timRemaining} onReset={handleReset} />
        <section className="challenge">
            <h2>{title}</h2>
            <p className="challenge-time">
                {targetTime} second{targetTime > 1 ? 's' : ''}
            </p>
            <p>
                <button ref={timer} onClick={timerIsActive ? handleStop : handleStart}>{timerIsActive ? 'Stop' : 'Start'} Challenge</button>
            </p>
            <p className={timerIsActive ? 'active' : undefined}>
                {timerIsActive ? 'Timer is running...' : 'Timer is stopped.'}
            </p>
        </section>
        </>
    );
}