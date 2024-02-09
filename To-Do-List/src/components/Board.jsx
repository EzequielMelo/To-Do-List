import { useState } from "react"

// eslint-disable-next-line react/prop-types
const Board = ({ initialBoard }) => {

    const [isFollowing, setIsFollowing] = useState(initialBoard)
    const text = isFollowing ? 'Hola' : 'Chau'
    const buttonClassName = isFollowing 
    ? 'tw-followCard-button is-following'
    : 'tw-followCard-button'

    return(
        <div className={`board-container`}>
            <h3>{text}</h3>
        </div>      
    )
}

export default Board