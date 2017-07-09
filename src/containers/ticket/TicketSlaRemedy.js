import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import ServiceReportDialog from '../projectplan/ServiceReportDialog';
import Url from '../../config/url';
// import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import FlatButton from 'material-ui/FlatButton';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
// import Avatar from 'material-ui/Avatar';
// import { lightBlack} from 'material-ui/styles/colors';
// import Drawer from 'material-ui/Drawer';
// import IconButton from 'material-ui/IconButton';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import IconMenu from 'material-ui/IconMenu';
// import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import OwnerDialog from '../projectplan/OwnerDialog';
// import SocialPeople from 'material-ui/svg-icons/social/people';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
// import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
// import Checkbox from 'material-ui/Checkbox';
// import ContentClear from 'material-ui/svg-icons/content/clear';
// import TicketChecklist from '../ticket/TicketChecklist';
// import TicketControlStatus from '../ticket/TicketControlStatus';

// import AppBar from 'material-ui/AppBar';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import Snackbar from 'material-ui/Snackbar';
import { Columns,Column } from 're-bulma';
// import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import moment from 'moment';
export default class TicketSlaRemedy extends Component {
  constructor(props){
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);

    const pending_time = new Date();
    pending_time.setFullYear(pending_time.getFullYear());
    console.log('TicketSlaRemedy',this.props);
    this.state = {worklog:'',
      minDate: minDate,
      autoOk: false,
      disableYearSelection: false,
      value24:pending_time,solution:'',solutionDetail:'',
      openSnackbar:false,messageSnackbar:''
    };
  }
  sendSlaRemedy = () => {
    // Put(Url.)
    console.log(this.props);
    console.log(this.state);
    var that = this;
    var duration_in_milliseconds = this.state.value24;
    var expect_duration = moment(duration_in_milliseconds).format('HH:mm');
    var appointment_date = moment(this.state.minDate).format('YYYY-MM-DD');
    var datetime = appointment_date+' '+expect_duration;
    var formData = new FormData();
    formData.append("ticket_sid",this.props.ticket_sid);
    formData.append("case_status_sid",this.props.status);
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);

    if(this.state.worklog!==""){
      formData.append("worklog",this.state.worklog);
      if(this.props.status===4){
          if(datetime===""){
              this.setState({messageSnackbar:'Required Date time', openSnackbar:true});
          }else{
              formData.append("datetime", datetime);
              this.sendDataToServer(formData);
          }
      }else if(this.props.status===5){
          if(!this.state.solution || !this.state.solutionDetail){
            this.setState({messageSnackbar:'Required solution and solutionDetail', openSnackbar:true});
          }else{
            formData.append("solution",this.state.solution);
            formData.append("solution_detail", this.state.solutionDetail);
            this.sendDataToServer(formData);
          }
      }else{
        this.sendDataToServer(formData);
      }
    }else{
      this.setState({messageSnackbar:'Required worklog', openSnackbar:true});
    }
  }
  sendDataToServer = (formData) => {
      var that = this;
      this.setState({messageSnackbar:'Sending, please wait...', openSnackbar:true});
      console.log(formData);
      Put(Url.changeStatusTicket, formData).then(function(res){
          console.log(res);
          if(!res.error){
            that.setState({messageSnackbar:'Sent', openSnackbar:true});
            that.props.cancelSlaRemedy();
            that.props.loadTicket();
          }else{

          }
      });
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
  };

  handleChangeTimePicker24 = (event, date) => {
    this.setState({value24: date});
  };
  worklog = (e) => {
    this.setState({worklog:e.target.value});
  }
  solution = (e) => {
    this.setState({solution:e.target.value});
  }
  solutionDetail = (e) => {
    this.setState({solutionDetail:e.target.value});
  }
  render(){
    var label = <label style={{color:'#000000'}}>{this.props.statusTxt}</label>
    var worklog = <TextField fullWidth={true} multiLine={true} rows={2} onChange={this.worklog} inputStyle={{color:'#000000'}} hintStyle={{color:'#000000'}} hintText="Worklog กรอกภาษาอังกฤษเท่านั้น" floatingLabelText="Worklog" />;
    var btnSend = <RaisedButton primary={true} label="Send" onTouchTap={this.sendSlaRemedy} style={{margin:4}} />
    var btnCancel = <RaisedButton label="Cancel" onTouchTap={()=>{this.props.cancelSlaRemedy()}} style={{margin:4}} />
    var datePic;
    var timePic;
    var warning = <FlatButton label="กรอกเป็นภาษาอังกฤษเท่านั้น" secondary={true} />
    var solution;
    var solutionDetail;
    if(this.props.status===4){
      datePic  = <DatePicker
              onChange={this.handleChangeMinDate}
              autoOk={this.state.autoOk}
              floatingLabelText="Pending to Date"
              defaultDate={this.state.minDate}
              disableYearSelection={this.state.disableYearSelection}
            />;
      timePic = <TimePicker
          format="24hr"
          hintText="Pending to time"
          value={this.state.value24}
          onChange={this.handleChangeTimePicker24}
        />
    }else if(this.props.status===5){
      var solution = <TextField fullWidth={true} multiLine={true} rows={2} onChange={this.solution} hintText="Solution กรอกเป็นภาษาอังกฤษเท่านั้น" floatingLabelText="Solution" />;
      var solutionDetail = <TextField fullWidth={true} multiLine={true} rows={3} onChange={this.solutionDetail} hintText="Solution Detail กรอกเป็นภาษาอังกฤษเท่านั้น" floatingLabelText="Solution Detail" />;
    }else{

    }
    return(
      <div>
        {label}
        <div>{datePic}</div>
        <div>{timePic}</div>
        <div>{worklog}</div>
        <div>{solution}</div>
        <div>{solutionDetail}</div>
        <div>{warning}</div>
        <div>{btnSend} {btnCancel}</div>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          autoHideDuration={4000}
          onRequestClose={()=>{this.setState({openSnackbar:false})}}
        />
      </div>
    );
  }
}
