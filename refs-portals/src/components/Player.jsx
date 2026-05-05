import { useState, useRef } from "react";

export default function Player() {
  const playerName = useRef();
  const [submittedName, setSubmittedName] = useState(false);

  function handleClick() {
    setSubmittedName(playerName.current.value);
    playerName.current.value = '';
  }

  return (
    <section id="player">
      <h2>Welcome {submittedName ?? 'unknown entity'}!</h2>
      <p>
        <input ref={playerName} type="text" />
        <button onClick={handleClick} >Set Name</button>
      </p>
    </section>
  );
}
