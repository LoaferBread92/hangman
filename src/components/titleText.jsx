import React from "react";

export default function TitleText( { gameState }) {
    if (gameState == 0)
    {return <h1>Hangman game</h1>}
    
    else if (gameState == 1) 
    {return <h1>You lose! Better luck next time!</h1>}

    else if (gameState == 2) 
    {return <h1>You won! Yay!</h1>}
    
}