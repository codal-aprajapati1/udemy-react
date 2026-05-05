import Header from "./components/Header.jsx";
import Calc from "./components/Calc.jsx";
import Result from "./components/Result.jsx";
import { useState } from "react";


function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput(prevUserInput => {
      return {
        ...prevUserInput, [inputIdentifier]: +newValue
      }
    });
  }

  const inputIsValid =  userInput.duration > 0;

  return (
    <>
      <Header />
      <Calc userInput={userInput} onChangeInput={handleChange} />
      {!inputIsValid && <p className="center">Please Enter Duration Greater than zero.</p>}
      {inputIsValid && <Result input={userInput} />}
    </>
  )
}

export default App
