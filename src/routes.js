import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
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
import { Router, browserHistory } from 'react-router';

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
      var basename = (document.location.href);
      get(Url.info, formData).then(function(resInfo){
        if(resInfo.data.user_sid){
          // console.log(resInfo);
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
  management = () =>{
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
  render(){
    if(this.state.auth){
      return(
        <Router history={browserHistory} >
          <Route>
            <Route path="login" component={LoginPage}/>
            <Route path="/" component={App}>
              <IndexRoute component={Dashboard}/>
              <Route path="dashboard" component={Dashboard}/>
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
