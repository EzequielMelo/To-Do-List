import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Board = ({ initialBoard }) => {
    const [haveAName, setHaveAName] = useState(initialBoard);
    const [isEditing, setIsEditing] = useState(false);
    const [customText, setCustomText] = useState(initialBoard);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleBlur = () => {
        setIsEditing(false);
        if (customText.trim() !== '') {
            setHaveAName(customText);
        } else {
            setCustomText(haveAName); // Revertir al nombre original si el campo está vacío
        }
    };

    return (
        <div className={`board-container`}>
            {!isEditing 
            ? 
            (<h3 onClick={handleClick}>{haveAName}</h3>) 
            : 
            (<input type="text" value={customText} onChange={handleChange} onBlur={handleBlur}autoFocus/>)}
        </div>
    );
};

export default Board;