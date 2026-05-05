import { useEffect, useState } from "react"
export default function QuestionTimer({ timeout, onTimeOut, mode }){
    const [remainingTime, setRemainingTime] = useState(timeout);

    useEffect(() => {
        console.log('timeout' );
        const timer = setTimeout(onTimeOut, timeout);

        return () => {
            clearTimeout(timer);
        }
    }, [onTimeOut, timeout]);
    
    useEffect(() => {
        const Interval = setInterval(() => {
        console.log('interval' );
            setRemainingTime((prevTime) => prevTime - 100);
        }, 100);

        return () => {clearInterval(Interval)};
    }, []);


    return <progress id="question-time" value={remainingTime} max={timeout} className={mode} ></progress>
}