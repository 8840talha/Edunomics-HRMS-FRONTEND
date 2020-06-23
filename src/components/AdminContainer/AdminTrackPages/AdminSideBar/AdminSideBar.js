import React, { useState } from 'react'
import { NavLink, Redirect } from 'react-router-dom'
import './AdminSideBar.css'
import HomeIcon from '@material-ui/icons/Home';
import PeopleIcon from '@material-ui/icons/People';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EditIcon from '@material-ui/icons/Edit';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import KeyboardTabIcon from '@material-ui/icons/KeyboardTab';
import TrackChangesIcon from '@material-ui/icons/TrackChanges';
import VisibilityIcon from '@material-ui/icons/Visibility';
const AdminSideBar = (props) => {

    // protected route logic

    const token = localStorage.getItem('token');

    var login = true;
    if (token == null) {
        login = false;
    }
    const [loggedIn, setLogin] = useState(login)

    if (loggedIn === false) {
        return <Redirect to="/adminLogin" />
    }
    const handleLogout = () => {
        localStorage.removeItem('token');
        setLogin(!login)

    }
    //
    const show = props.show;
    return (


        show ? <div className={'adminsideBar'} >

            <ul>
                <NavLink to="/adminTrack"><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><HomeIcon />Home</button></NavLink>
                {/* <NavLink to="/kanban"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><KeyboardTabIcon />Kanban</button></NavLink> */}

                {/* <NavLink to="/viewTask"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><VisibilityIcon />View Tasks</button></NavLink> */}
                <NavLink to="/viewAttendance"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><VisibilityIcon/>View Attendance</button></NavLink>
                <NavLink to="/progress"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><TrackChangesIcon />Progress</button></NavLink>
                <NavLink to="/employees"><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><PeopleIcon />Employees</button></NavLink>
                <NavLink to="/users/add"><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><PersonAddIcon />Add Employee</button></NavLink>
                <NavLink to="/viewLeaveReq"><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><TimeToLeaveIcon />Leave Requests</button></NavLink>
                <NavLink to="/editReq"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="adminSBlink" ><EditIcon />Edit Requests</button></NavLink>
                <NavLink to="/projects/add"  ><button style={{ display: 'flex', justifyContent: 'row' }} className="SBlink" ><DonutLargeIcon/>Projects</button></NavLink>
                <NavLink to="#"  ><button style={{ display: 'flex', justifyContent: 'row' }} onClick={handleLogout} className="adminSBlink" ><ExitToAppIcon />Logout</button></NavLink>
            </ul>

        </div > : null


    )

}

export default AdminSideBar;