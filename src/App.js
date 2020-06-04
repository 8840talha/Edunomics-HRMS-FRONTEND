import React, { Component } from 'react';
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header/Header'
import LoginForm from './components/LoginPage/Form'
// import ForgetPass from './components/ForgetPassWord/ForgetPass';
import Track from './components/TrackUpdateMydetailsMyrecords/TrackPage/Track';
import Update from './components/TrackUpdateMydetailsMyrecords/TrackPage/Update Progress/Update';
import LeaveTrack from './components/TrackUpdateMydetailsMyrecords/TrackPage/LeaveTrack/LeaveTrack';
import MyDetails from './components/TrackUpdateMydetailsMyrecords/TrackPage/MyDetails/Mydetails';
import MyRecords from './components/TrackUpdateMydetailsMyrecords/TrackPage/MyRecords/MyRecords';
import Falsy from './components/WrongRoute/Wrong';
import EmpAdmin from './components/LOGASEMPADmin/EmpAdmin';
import AdminLoginForm from './components/AdminLoginPage/AdminLoginForm';
import AdminTrack from './components/AdminTrackPages/Admin/Admin';
import LeaveView from './components/AdminTrackPages/ViewLeaveReq/LeaveReq';
import ChangeDetails from './components/TrackUpdateMydetailsMyrecords/TrackPage/MyDetails/ChangeInDetail/ChangeDetail';
import Employees from './components/AdminTrackPages/pages/Employees';
import AddUser from './components/AdminTrackPages/pages/users/AddUser';
import EditUser from './components/AdminTrackPages/pages/users/EditUser';
import User from './components/AdminTrackPages/pages/users/User';

class App extends Component {
  render() {
    return (
      <Router >

        <div>

          <Header />
          <Switch>
            <Route exact path="/" component={EmpAdmin} />
            <Route exact path="/viewLeaveReq" component={LeaveView} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/adminTrack" component={AdminTrack} />
            <Route exact path='/adminLogin' component={AdminLoginForm} />
            <Route exact path='/empLogin' component={LoginForm} />
            {/* <Route exact path='/forget' component={ForgetPass} /> */}
            <Route exact path="/changeDetail" component={ChangeDetails} />
            <Route exact path='/track' component={Track} />
            <Route exact path='/leave' component={LeaveTrack} />
            <Route exact path='/update' component={Update} />
            <Route exact path='/mydetails' component={MyDetails} />
            <Route exact path='/myrecords' component={MyRecords} />
            <Route exact path="/users/add" component={AddUser} />
            <Route exact path="/users/edit/:id" component={EditUser} />
            <Route exact path="/users/:id" component={User} />
            <Route component={Falsy} />
          </Switch>
        </div>

      </Router>

    )
  }
}

export default App;
