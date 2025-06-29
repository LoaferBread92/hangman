import React, { useEffect } from 'react'
import './App.css'
import Langs from './components/Langs'
import Letters from './components/Letters'
import { generate } from 'random-words'
import Hangletters from './components/Hangletters'
import { nanoid } from 'nanoid'
import GameStatus from './components/GameStatus'
import TitleText from './components/titleText'

export default function App() {
  // Hangword is the word that requires guessing
const [hangword, setHangword] = React.useState(() => generate())

// Lives remaining
const [lives, setLives] = React.useState(7)

// Splits up the individual letters of the word to be guessed
const [hanglets,setHanglets] = React.useState(() => hangword.split('').map(char => ({letter: char, isSel: false, id: nanoid()})))

// Essentially an array to check whether the correct letters have all been picked
const [hangRightLets, setRightHangLets] = React.useState(() => hangword.split('').map(char => ({letter: char, isRight: false, id: nanoid()})))

// Provides a div for each letter of the word to be guessed
let hangdisp = hanglets.map(obj => <Hangletters letter={obj.letter} isSel={obj.isSel} key={obj.id} />)

// Whether the game is in play, lose, or win state
// 0=in play, 1=loss, 2=win
const [gameState, setGameState] = React.useState(0)

// Each of the letters that can be selected
const [letterArray, setLetterButtons] = React.useState(() => 'abcdefghijklmnopqrstuvwxyz'
.split('').map(char => ({letter: char, isSel: false, isRight: false, id: nanoid()})))

// Div for each of the letters that can be selected
const letterButtons = letterArray.map(obj => <Letters 
  letter={obj.letter} 
  isSel={obj.isSel} 
  isRight = {obj.isRight}
  key={obj.id}
  buttonHold={()=>toggleLetter(obj)}
   />)
  
   
//Fn to toggle a letter button 
// Does nothing if already clicked
// Also within the component, there is a function to determine
// if the button should be red (incorrect guess)
// or green (correct guess)
function toggleLetter (obj) {
  setLetterButtons(prevLet => prevLet.map(item => {
    return item.id === obj.id ? {...item, isSel: true} : item
  }))
if (hangword.includes(obj.letter)) {
setHanglets(prevHanglet => prevHanglet.map(item => {
  return item.letter === obj.letter ? {...item, isSel: true} : item
}))
setRightHangLets(prevHanglet => prevHanglet.map(item => {
  return item.letter === obj.letter ? {...item, isRight: true} : item
}))

setLetterButtons(prevLet => prevLet.map(item => {
    return item.id === obj.id ? {...item, isRight: true} : item
  }))
}
else {
  if (!obj.isSel) {setLives(a=>a-1)}
}
}


// Toggles the win/loss state - NOT YET WORKING
useEffect(()=>{
  let allCorrect = hangRightLets.every(item => item.isRight)
    if (lives === 0) {
    setGameState(1)
  }

  else if (allCorrect && lives > 0) {
    setGameState(2)
    allCorrect = false;
  }

},[gameState,lives,hangRightLets])

function handleRClick() {
   setHangword(() => generate())
  setLives(7)
  setGameState(0)
  setLetterButtons(() => 'abcdefghijklmnopqrstuvwxyz'
.split('').map(char => ({letter: char, isSel: false, isRight: false, id: nanoid()})))
hangdisp = hanglets.map(obj => <Hangletters letter={obj.letter} isSel={obj.isSel} key={obj.id} />)
}

useEffect(() => {
  setHanglets(hangword.split('').map(char => ({
    letter: char,
    isSel: false,
    id: nanoid()
  })));
  setRightHangLets(hangword.split('').map(char => ({
    letter: char,
    isRight: false,
    id: nanoid()
  })))
  setGameState(0)
}, [hangword]);


//Items for rendering
return (
    <>
        <TitleText gameState={gameState} />
        <GameStatus status={lives} gameState={gameState} /> 
        <div className='word-container' >{gameState == 0 && hangdisp}</div>
        <div className='gameboard' >{gameState == 0 && letterButtons}</div>
        <div className='start-again-button' >{gameState != 0 && <button onClick={()=>handleRClick()} >Play again</button>}</div>
    </>
  )
}

