import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import ServiceReportDialog from '../projectplan/ServiceReportDialog';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import FlatButton from 'material-ui/FlatButton';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import OwnerDialog from '../projectplan/OwnerDialog';
import SocialPeople from 'material-ui/svg-icons/social/people';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TicketChecklist from '../ticket/TicketChecklist';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { Columns,Column } from 're-bulma';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import Snackbar from 'material-ui/Snackbar';
import {PresentData, PresentDataHeader, PresentDataBody} from '../management/PresentData';
class TicketControlStatus extends Component {
  constructor(props){
      super(props);
      // console.log(TicketControlStatus, this.props);
      this.state = {
        ticket_sid:this.props.ticket_sid,
        data: this.props.data,
        formStatus:false,statusTxt:'',
        status_message:'',
        status_sid:0,openSnackbar:false,messageSnackbar:''
      };
  }
  openFormStatus = (status, status_sid) => {
    this.setState({formStatus:true, statusTxt:status,status_sid:status_sid});
  }
  changeStatusMessage = (e) => {
    this.setState({status_message:e.target.value});
  }
  sendDataToServer = () => {
    // this.setState({openSnackbar:true,messageSnackbar:'Updating...'});
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("ticket_sid", this.props.ticket_sid);
    formData.append("worklog", this.state.status_message);
    formData.append("case_status_sid", this.state.status_sid);
    var that = this;
    var tmp = this.state.data;
    tmp.status = this.state.status_sid;
    Put(Url.changeStatusTicket, formData).then(function(res){
        console.log(res);
        if(!res.error){
          that.setState({data:tmp,formStatus:false,statusTxt:'',status_sid:0,openSnackbar:true,messageSnackbar:'Updated'});
          that.props.loadNew();
        }else{
          that.setState({openSnackbar:true,messageSnackbar:'Failed Required Message'});
        }
    });
  }
  render(){
    var data = this.props.data;
    var is_can_change_status = false;
    if(data.owner===InfoGen.email || data.create_by===InfoGen.email){
      is_can_change_status = true;
    }
    console.log('data status', data.status);
    var status = {new:false,doing:false,done:false};
    if(this.state.statusTxt){
      status = {new:false,doing:false,done:false};
    }else{
      if(data.status=="1"){
        status.new = true;
      }else if(data.status=="5"){
        status.done = true;
      }else{
        status.doing = true;
      }
    }
    var formStatus;
    if(this.state.formStatus){
        formStatus = <div>
          <TextField
              hintText="Message" floatingLabelFixed={true}
              floatingLabelText={this.state.statusTxt+" status message"}
              multiLine={true} onChange={this.changeStatusMessage}
              rows={2}
            />
            <RaisedButton onTouchTap={this.sendDataToServer} label="Send" primary={true} style={{margin:4}} />
            <RaisedButton onTouchTap={()=>this.setState({formStatus:false,statusTxt:''})} label="Cancel" secondary={true} style={{margin:4}} />
        </div>
    }
    var controlBtn = <div>
      <RaisedButton onTouchTap={()=>this.openFormStatus('New','1')} primary={status.new} label="New" style={{margin: 4}} />
      <RaisedButton onTouchTap={()=>this.openFormStatus('Doing','2')} primary={status.doing} label="Doing"  style={{margin: 4}} />
      <RaisedButton onTouchTap={()=>this.openFormStatus('Done','5')} primary={status.done} label="Done" style={{margin: 4}} />
      {formStatus}
    </div>
    var control_status_ticket =
          <div>
            <div >
              <PresentDataBody label={"Status"} value={controlBtn}  />
            </div>
            <br/>
          </div>;

    return(
      <div>
        {control_status_ticket}
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
export default TicketControlStatus;
