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
import EmpAdmin from './components/LOGASEMPADmin/EmpAdmin';
import AdminLoginForm from './components/AdminContainer/AdminLoginPage/AdminLoginForm';
import AdminTrack from './components/AdminContainer/AdminTrackPages/Admin/Admin';
import LeaveView from './components/AdminContainer/AdminTrackPages/ViewLeaveReq/LeaveReq';
import Employees from './components/AdminContainer/AdminTrackPages/CRUDPAGES/Employees';
import AddUser from './components/AdminContainer/AdminTrackPages/CRUDPAGES/Employee/AddUser';
import EditUser from './components/AdminContainer/AdminTrackPages/CRUDPAGES/Employee/EditUser';
import User from './components/AdminContainer/AdminTrackPages/CRUDPAGES/Employee/User';
import EditReqView from './components/AdminContainer/AdminTrackPages/ViewEditReq/ViewEditReq';
import ChangeDetails from './components/EmployeeContainer/TrackUpdateMydetailsMyrecords/TrackPage/ChangeInDetail/ChangeDetail'
import ForgetPass from './components/ForgetPassWord/ForgetPass';


const ProtectedRoute = ({ component: Component, ...rest }) => {
  return <Route {...rest} render={(props) => {
    return localStorage.getItem('token') ? <Component {...props} /> : <Redirect to="/empLogin" />
  }} />
}


class App extends Component {
  render() {
    return (
      <Router >
        <div>
          <Header />
          <Switch>
            <Route exact path="/" component={EmpAdmin} />
            <Route exact path="/adminTrack" component={AdminTrack} />
            <Route exact path='/adminLogin' component={AdminLoginForm} />
            <Route exact path='/empLogin' component={LoginForm} />
            <Route exact path='/forget' component={ForgetPass} />
            <Route exact path='/track' component={Track} />
            <ProtectedRoute exact path="/viewLeaveReq" component={LeaveView} />
            <ProtectedRoute exact path="/employees" component={Employees} />
            <ProtectedRoute exact path='/leave' component={LeaveTrack} />
            <ProtectedRoute exact path='/update' component={Update} />
            <ProtectedRoute exact path='/mydetails' component={MyDetails} />
            <ProtectedRoute exact path='/myrecords' component={MyRecords} />
            <ProtectedRoute exact path="/users/add" component={AddUser} />
            <ProtectedRoute exact path="/users/edit/:id" component={EditUser} />
            <ProtectedRoute exact path="/users/:id" component={User} />
            <ProtectedRoute exact path="/editReq" component={EditReqView} />
            <ProtectedRoute exact path="/detailChange" component={ChangeDetails} />
            <Route component={Falsy} />
          </Switch>
        </div>

      </Router>

    )
  }
}

export default App;
