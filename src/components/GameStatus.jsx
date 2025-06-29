export default function GameStatus(props) {
    return <><h2>{props.gameWin ? "You win!" : null}</h2>
                <h2>{props.gameLose ? "You lose, better luck next time!" : null}</h2>
                <h2>{props.status > 0 ? `Lives: ${props.status}` : null}</h2></>
}