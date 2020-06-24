import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './SideBar.css'
import HomeIcon from '@material-ui/icons/Home';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ViewListIcon from '@material-ui/icons/ViewList';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
const SideBar = (props) => {

    // protected route logic
    const token = localStorage.getItem('token');
    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/empLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
    //
    const show = props.show;

    return (


        show ? <div style={{ ...props }} className={'sideBar'} >

            <ul>
                <NavLink to="/track"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><HomeIcon />Home</button></NavLink>
                {/* <NavLink to="/kanban"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><KeyboardTabIcon />Kanban</button></NavLink> */}
                <NavLink to="/update"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><DonutLargeIcon />Update</button></NavLink>
                <NavLink to="/leave"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><TrackChangesIcon />Leave</button></NavLink>
                <NavLink to="/mydetails"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><AccountCircleIcon />My Details</button></NavLink>
                <NavLink to="/detailChange"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><AccountCircleIcon />EditProfile</button></NavLink>
                {/* <NavLink to="/myrecords"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" >< ViewListIcon /> Records</button></NavLink> */}
                <NavLink to="/projectsEmp"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><DonutLargeIcon />Projects</button></NavLink>

                <NavLink to="#"  ><button style={{ display: 'flex', justifyContent: 'row' }} onClick={handleLogout} className="SBlink" ><ExitToAppIcon />Logout</button></NavLink>
            </ul>

        </div > : null


    )

}

export default SideBar;