import React, { useState } from 'react';
import './style.css'


const EmpAdmin = (props) => {
    // deleting the token when user redirects mistakenly to / after login.
    const token = localStorage.getItem('token');
    console.log(token)
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggin, setLogin] = useState(login);
    if (loggin) {
        localStorage.removeItem('token')
    }

    return (
        <div >
            <div className="split left">
                <div className="centered">

                    <h1>Login As Employee</h1>
                    <img className="iimg" stys src={require('.././../assets/emp1.png')} />
                    <a href="/empLogin"><button className="buton">Login</button></a>
                </div>
            </div>


            <div className="split right">
                <div className="centered">

                    <h1>Login As Administrator</h1>
                    <img className="iimg" src={require('.././../assets/Boss.png')} />
                    <a href="/adminLogin"><button style={{ marginTop: '4px' }} className="buton">Login</button></a>
                </div>
            </div>
        </div>
    )

}

export default EmpAdmin; 
