import React from 'react';

const buttons = [
    { id: 'seven', text: '7' },
    { id: 'eight', text: '8' },
    { id: 'nine', text: '9' },
    { id: 'four', text: '4' },
    { id: 'five', text: '5' },
    { id: 'six', text: '6' },
    { id: 'one', text: '1' },
    { id: 'two', text: '2' },
    { id: 'three', text: '3' },
    { id: 'zero', text: '0' },
]

const Keyboard = ({ handleClick, clear, action, equal, decimal, minus }) => {
    return(
        <div className="keyboard">
            <div className="left-panel">
                <button className="btn" id="clear" onClick={clear}>C</button>
                <button className="btn" id="divide" onClick={() => action('/')}>&divide;</button>
                {
                    buttons.map(({ id, text }) => {
                        return <button  
                                    className="btn" 
                                    key={id} 
                                    id={id} 
                                    onClick={() => handleClick(text)}
                                >
                                    {text}
                                </button>
                    })
                }
                <button className="btn" id="decimal" onClick={decimal}>.</button>
            </div>
            <div className="right-panel">
                <button className="btn" onClick={() => action('*')}>&times;</button>
                <button className="btn" onClick={minus}>&minus;</button>
                <button className="btn" id="add" onClick={() => action('+')}>+</button>
                <button className="btn" id="equals" onClick={equal}>=</button>
            </div>
        </div>
    )
}

export default Keyboard;