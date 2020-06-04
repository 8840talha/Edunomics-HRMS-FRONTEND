import React from 'react'

import './Wrong.css'

const Wrong = (props) => {
    return (
        <div className="pre">
            <div ><a href="/" className="back">‹</a></div>
            <div><h1>
                <h1 style={{fontSize:'100px' ,fontWeight:'bolder'}}>404</h1>
                Ahh!! Route Doesnt Exists ...
                Go Back;
        </h1></div>
            <div>
                <a href="/" className="next">›</a>
            </div>

        </div>

    )

}

export default Wrong;