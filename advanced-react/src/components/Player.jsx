import { useState } from "react";

export default function Player({initialName, symbol, isActive, onChangeName }) {
    // const [ name, setName ] = useState();
    const [ isEditing, setIsEditing ] = useState(false);
    const [ playerName, setPlayerName] = useState(initialName);

    function handleEditClick() {
        setIsEditing((editing) => !editing);
        if(isEditing){
            onChangeName(symbol, playerName);
        }
    }

    function handleName(event){
        setPlayerName(event.target.value);
    }

    let editablePlayerName = <span className="player-name">{playerName}</span>;
    if (isEditing) {
        editablePlayerName = <input type="text" placeholder="name.." value={playerName} required onChange={handleName} />;
    }

    return (
        <li className={isActive ? 'active' : undefined}>
            {editablePlayerName}
            <span className="player-Symbol">{symbol}</span>
            <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
        </li>
    );
}