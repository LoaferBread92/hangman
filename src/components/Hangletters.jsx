import '/src/styles/Hangletters.css'

export default function Hangletters(props) {
    return (
    <div className='letter-container' >
    <p>{props.isSel ? props.letter : '_'}</p>
    </div>)
}