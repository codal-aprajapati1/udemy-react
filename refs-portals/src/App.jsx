import Player from "./components/Player";
import TimerChallenge from "./components/TimerChallenge";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimerChallenge title="Easy Challenge" targetTime={1}></TimerChallenge>
        <TimerChallenge title="Not Easy " targetTime={5}></TimerChallenge>
        <TimerChallenge title="Getting Tough" targetTime={10}></TimerChallenge>
        <TimerChallenge title="Pros Only" targetTime={10}></TimerChallenge>
      </div>
    </>
  );
}

export default App;
