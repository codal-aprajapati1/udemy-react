import { useRef, useState } from "react";
import Input from "./input.jsx";
import { isEmail, isNotEmpty, hasMinLength, isEqualsToOtherValue } from "../util/validation.js";

export default function Login() {

  const [formIsInvalid, setFormIsInvalid] = useState(false);

  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [enteredPassword, setEnteredPassword]  = useState('');

  const [enteredValues, setEnteredValues] = useState({
    email: '',
    password: ''
  });

  const [didEdit, setDidEdit] = useState({
    email: false,
    password: false
  });

  const emailIsInvalid = didEdit.email && !isEmail(enteredValues.email) && isNotEmpty(enteredValues.email);
  const passwordIsInvalid =  didEdit.password && hasMinLength(enteredValues.password, 6);

  const email = useRef();
  const password = useRef();

  function handleSubmit(event) {
    event.preventDefault(); 
    const enteredEmail = email.current.value;
    const enteredPassword = password.current.value;

    const emailIsValid =  didEdit.email && enteredEmail.includes('@');

    if(!emailIsValid || !passwordIsInvalid){
      setFormIsInvalid(true);
      return;
    }

    setFormIsInvalid(false);

    console.log("Submitted", enteredValues.email);
  }

  function handleInputBlur(identifier){
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: true
    }));
  }

  function handleInputChange(identifier, value){
    setEnteredValues(prevValues => ({
      ...prevValues,
      [identifier]: value
    }));
    setDidEdit(prevState => ({
      ...prevState,
      [identifier]: false
    }));
  }

  // function handleInputReset(){
  //   setEnteredValues({
  //     email: '',
  //     password: ''
  //   });
  // }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className="control-row">
        <Input label="Email" id="email" type="input" name="email" error={emailIsInvalid && "Please enter a valid email address."}
        onBlur={() => handleInputBlur('email')}
        onChange={(event) => handleInputChange('email', event.target.value)} 
        value={enteredValues.email} 
        ref={email}
        />

        <div className="control no-margin">
          <Input label="Password" id="password" type="input" name="password" error={passwordIsInvalid && "Please enter a valid password."}
            onBlur={() => handleInputBlur('password')}
            onChange={(event) => handleInputChange('password', event.target.value)} 
            value={enteredValues.password} 
            ref={password}
          />
        </div>
      </div>

      <p className="form-actions">
        <button className="button button-flat">Reset</button>
        <button className="button">Login</button>
      </p>
    </form>
  );
}
