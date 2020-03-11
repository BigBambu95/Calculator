import React from 'react';

const Screen = ({ value, expression }) => {
    return(
        <div className="screen" id="display">
            <div className="screen__expression">{expression}</div>
            <div className="screen__value">{value}</div>
        </div>
    )
}

export default Screen;