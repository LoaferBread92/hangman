import '/src/styles/Letters.css'
import React from 'react'

export default function Letters(props) {   
    function setColour(a,b) {
        if (a && b) {
            return "green"
        }

        else if (a) {
            return "red"
        }

        else {return '#F5F5DC'}
    }

    return (
    <button className='letter-container' 
    style={{backgroundColor: setColour(props.isSel,props.isRight)}}
    onClick={props.buttonHold}>
    {props.letter}
    </button>)
}