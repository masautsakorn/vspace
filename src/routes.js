import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import AppMobile from './containers/AppMobile';

import NotFoundPage from './containers/NotFoundPage.js';
import LoginPage from './containers/LoginPage';
import FormPage from './containers/FormPage';
import TablePage from './containers/TablePage';
import Dashboard from './containers/DashboardPageSOS';
import Management from './containers/management/Management';
import Calendar from './containers/Calendar';
import Url from './config/url';
import get from './config/Get';
import InfoGen from './config/InfoGen';
import Welcome from './containers/login/Welcome';
import Maps from './containers/map/Maps';
import Schedule from './containers/appointment/Schedule';
import Profile from './containers/Profile';
import MobileDashboard from './containers/MobileDashboard/MobileDashboard';
import MobileManagement from './containers/MobileManagement/MobileManagement';

// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import ThemeDefault from './theme-default';
import { Router, browserHistory } from 'react-router';
var isMobile = false;
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  isMobile = true;
}
var formData = new FormData();
class routes extends React.Component {
  constructor(props){
    super(props);
    this.state = {auth:false,info:{},listUserCanAddTask:[], loaded:false};
  }
  componentWillMount(){
    var that = this;
    if(InfoGen.token){
      formData.append('token',InfoGen.token);
      formData.append('email',InfoGen.email);
      // var basename = (document.location.href);
      get(Url.info, formData).then(function(resInfo){
        if(resInfo.data.user_sid){
          // console.log(resInfo);
          localStorage.setItem("info", JSON.stringify(resInfo.data));
          localStorage.setItem("listUserCanAddTask",JSON.stringify(resInfo.listUserCanAddTask));

          that.setState({auth:true, info:resInfo.data, listUserCanAddTask:resInfo.listUserCanAddTask, loaded:true});
        }else{
          that.setState({auth:false, info:{},listUserCanAddTask:[], loaded:true});
          // localStorage.removeItem("case_token");
          // localStorage.removeItem("case_email");
          // window.location.reload("");
        }
      });
    }else{
        that.setState({auth:false, info:{},listUserCanAddTask:[],loaded:true});
    }
  }
  dashboard = () =>{
    if(isMobile)
      return <MobileDashboard />
    else
      return <Dashboard case={()=>{}} info={this.state.info} listUserCanAddTask={this.state.listUserCanAddTask}/>
  }
  management = () =>{
    if(isMobile)
      return <MobileManagement />
    else
      return <Management case={()=>{}} info={this.state.info} listUserCanAddTask={this.state.listUserCanAddTask}/>
  }
  calendar = () => {
    return <Calendar listUserCanAddTask={this.state.listUserCanAddTask} info={this.state.info} projectList={[]} />
  }
  map = () => {
    return <Maps info={this.state.info} />
  }
  schedule = () => (
    <Schedule info={this.state.info} />
  )
  profile = () => (
    <Profile info={this.state.info} />
  )
  app = () => {
    return <App info={this.state.info} />
  }
  router = () => {
    if(isMobile){
      return this.routerMobile();
    }else {
      return this.routerWeb();
    }
  }
  routerWeb = () => {
    return <Route>
      <Route path="login" component={LoginPage}/>
      <Route path="/" component={App}>
        <IndexRoute component={this.dashboard}/>
        <Route path="dashboard" component={this.dashboard}/>
        <Route path="management" component={this.management}/>
        <Route path="calendar" component={this.calendar}/>
        <Route path="schedule" component={this.schedule} />
        <Route path="profile" component={this.profile} />
        <Route path="map" component={this.map} />
        <Route path="form" component={FormPage}/>
        <Route path="table" component={TablePage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Route>
  }
  routerMobile = () => {
    return <Route>
      <Route path="login" component={LoginPage}/>
      <Route path="/" component={AppMobile}>
        <IndexRoute component={this.dashboard}/>
        <Route path="dashboard" component={this.dashboard}/>
        <Route path="management" component={this.management}/>
        <Route path="calendar" component={this.calendar}/>
        <Route path="schedule" component={this.schedule} />
        <Route path="profile" component={this.profile} />
        <Route path="map" component={this.map} />
        <Route path="form" component={FormPage}/>
        <Route path="table" component={TablePage}/>
        <Route path="*" component={NotFoundPage}/>
      </Route>
    </Route>
  }
  render(){
    // var pageInitial = Dashboard;
    if(this.state.auth){
      return(
        <Router history={browserHistory} >
            {this.router()}
        </Router>
      )
    }else if(this.state.loaded){
      return(<Welcome />)
    }else{
      return(<div>Loading...</div>)
    }
  }
}
export default routes;
