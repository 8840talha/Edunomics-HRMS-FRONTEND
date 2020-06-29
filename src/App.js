import React, { Component } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Header from './components/Header/Header'
import LoginForm from './components/EmployeeContainer/LoginPage/Form'
import Track from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/Track';
import Update from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/Update Progress/Update';
import LeaveTrack from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/LeaveTrack/LeaveTrack';
import MyDetails from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/MyDetails/Mydetails';
import MyRecords from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/MyRecords/MyRecords';
import Falsy from './components/WrongRoute/Wrong';
import EmpAdmin from './components/HomePage/HomePage';
import AdminLoginForm from './components/AdminContainer/AdminLoginPage/AdminLoginForm';
import AdminTrack from './components/AdminContainer/AdminTrackPages/Admin/Admin';
import LeaveView from './components/AdminContainer/AdminTrackPages/ViewLeaveReq/LeaveReq';
import Employees from './components/AdminContainer/AdminTrackPages/CRUDPAGES/ViewAll/Employees';
import AddUser from './components/AdminContainer/AdminTrackPages/CRUDPAGES/CreateUser/AddUser';
import EditUser from './components/AdminContainer/AdminTrackPages/CRUDPAGES/editUser/EditUser';
import User from './components/AdminContainer/AdminTrackPages/CRUDPAGES/ViewSingleUser/User';
import EditReqView from './components/AdminContainer/AdminTrackPages/ViewEditReq/ViewEditReq';
import ChangeDetails from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/ChangeInDetail/ChangeDetail'
import ForgetPass from './components/ForgetPassWord/ForgetPass';
import Kanban from './components/kanban/KanbanApp'
import Progress from './components/AdminContainer/AdminTrackPages/EmployeeProgress/Progress';
import ViewTask from './components/AdminContainer/AdminTrackPages/ViewTask/ViewTask';
import Project from './components/AdminContainer/AdminTrackPages/ViewTask/project/Project';
import Attendance from './components/AdminContainer/AdminTrackPages/View Attendance/Attendance';
import Projects from './components/AdminContainer/AdminTrackPages/Project/Project';
import EmpProjects from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/Projects/project';
// Protected Routing Goes here
const ProtectedRoute = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(props) => {
    return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/" />

  }} />
}
// 
// 
const ProtectedRouteAdmin = ({ component: Component, ...rest }) => {

  return <Route {...rest} render={(props) => {
    return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/adminLogin" />

  }} />
}

// 

class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Header />
          <Switch>
            {/* <Route exact path="/" component={EmpAdmin} /> */}
            <Route exact path="/adminTrack" component={AdminTrack} />
            <Route exact path='/adminLogin' component={AdminLoginForm} />
            <Route exact path='/' component={LoginForm} />
            <Route exact path='/forget' component={ForgetPass} />
            <ProtectedRoute exact path='/track' component={Track} />

            <ProtectedRoute exact path="/kanban" component={Kanban} />
            <ProtectedRouteAdmin exact path="/progress" component={Progress} />{/* New Route for employee progress*/}
            <ProtectedRouteAdmin exact path="/viewTask" component={ViewTask} />{/* New Route for admin to view tasks*/}
            <ProtectedRoute exact path="/viewProject/:id" component={Project} />
            <ProtectedRouteAdmin exact path="/viewAttendance" component={Attendance} />{/* New Route for admin to view Attendance*/}
            <ProtectedRouteAdmin exact path="/viewLeaveReq" component={LeaveView} />
            <ProtectedRouteAdmin exact path="/employees" component={Employees} />
            <ProtectedRoute exact path='/leave' component={LeaveTrack} />
            <ProtectedRoute exact path='/update' component={Update} />
            <ProtectedRoute exact path='/mydetails' component={MyDetails} />
            <ProtectedRoute exact path='/myrecords' component={MyRecords} />
            <ProtectedRouteAdmin exact path="/users/add" component={AddUser} />
            <ProtectedRouteAdmin exact path="/users/edit/:id" component={EditUser} />
            <ProtectedRouteAdmin exact path="/users/:id" component={User} />
            <ProtectedRouteAdmin exact path="/editReq" component={EditReqView} />
            <ProtectedRoute exact path="/detailChange" component={ChangeDetails} />
            <ProtectedRouteAdmin exact path="/projects/add" component={Projects} />
            <ProtectedRoute exact path="/projectsEmp" component={EmpProjects} />


            <Route component={Falsy} />
          </Switch>
        </div>

      </Router>

    )
  }
}

export default App;
