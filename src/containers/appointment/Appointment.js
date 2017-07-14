import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import CircularProgress from 'material-ui/CircularProgress';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import ContentCreate from 'material-ui/svg-icons/content/create';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import {List, ListItem} from 'material-ui/List';
import Snackbar from 'material-ui/Snackbar';
import SignatureCanvas from 'react-signature-canvas'
// import Moment from 'react-moment';
import moment from 'moment';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

class ControlSparePart extends Component {
  constructor(props){
    super(props);
    this.state = {sparepart:this.props.sparepart,
      old_part_number:"",old_part_serial:"",new_part_serial:"",description:"",adding_spare_part:this.props.adding_spare_part,
      openSnackbar:false,messageSnackbar:'',will_delete_part_sid:0,willDeletePart:false,
      is_number_one:this.props.is_number_one,
      new_part_number:''
    };
  }
  handleAddSparePart = () => {
    this.setState({adding_spare_part:!this.state.adding_spare_part});
  }
  updateOldPartNumber = (e) => {
    this.setState({old_part_number:e.target.value});
  }
  updateOldPartSerial = (e) => {
    this.setState({old_part_serial:e.target.value});
  }

  updateNewPartNumber = (e) => {
    this.setState({new_part_number:e.target.value});
  }
  updateNewPartSerial = (e) => {
    this.setState({new_part_serial:e.target.value});
  }

  updateNewPartSerial = (e) => {
    this.setState({new_part_serial:e.target.value});
  }
  updateDescription = (e) => {
    this.setState({description:e.target.value});
  }
  addPart = () => {
    var formData = new FormData();
    this.setState({adding_spare_part:false,openSnackbar:true,messageSnackbar:'Adding...'});
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("part_number_defective",this.state.old_part_number);
    formData.append("part_serial_defective", this.state.old_part_serial);
    formData.append("part_number", this.state.new_part_number);
    formData.append("part_serial", this.state.new_part_serial);
    formData.append("description",this.state.description);
    formData.append("quantity","1");
    formData.append("sparepart_sid",0),
    formData.append("tasks_sid", this.props.tasks_sid);
    var that = this;
    Put(Url.update_spare_part,formData).then(function(res){
      console.log(res);
      var tmp = that.state.sparepart;
      tmp.push({
        sid:res.data,
        part_number_defective:that.state.old_part_number,
        part_serial_defective:that.state.old_part_serial,
        part_serial:that.state.new_part_serial,
        description:that.state.description,

      });
      that.setState({
        sparepart:tmp,
        old_part_number:"",
        old_part_serial:"",
        new_part_serial:"",
        description:"",
        openSnackbar:false
      });
    });
  }
  willDeletePart = (sparepart_sid) => {
    this.setState({will_delete_part_sid:sparepart_sid,willDeletePart:true});
  }
  deletePart = (sparepart_sid) => {
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token", InfoGen.token);
      formData.append("sparepart_sid", sparepart_sid);
      var that = this;
      var tmp = this.state.sparepart;
      Put(Url.delete_spare_part, formData).then(function(res){
        if(!res.error){
          var tmpNew = [];
          tmp.forEach((item,i)=>{
            if(item.sid!==sparepart_sid){
              tmpNew.push(item);
            }
            if((i+1)===that.state.sparepart.length){
              that.setState({sparepart:tmpNew});
            }
          });
        }
      });
  }
  render(){
    const styles = {
      button: {margin: 12},
      checkbox: {
        marginBottom: 16,
      }
    };
    var content;
    var listPart = [];

    this.state.sparepart.forEach((item,i)=>{
      var confirmDeletePart;
      if(item.sid===this.state.will_delete_part_sid && this.state.willDeletePart){
          confirmDeletePart = <div>
            <RaisedButton secondary={true} label="Confirm Delete" onTouchTap={()=>this.deletePart(this.state.will_delete_part_sid)} style={{margin:4}} />
            <RaisedButton label="Close" onTouchTap={()=>{this.setState({will_delete_part_sid:0,willDeletePart:false})}} />
          </div>
      }
      var iconDelete;
      if(this.props.is_number_one){
        iconDelete = <ActionDelete onTouchTap={()=>this.willDeletePart(item.sid)} style={{color:lightBlack}} />;
      }
      listPart.push(
        <List key={item.sid} style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee'}}>
          <div>{"#"+(i+1)}
            <span style={{float:'right'}}>
              {iconDelete}
            </span>
          </div>
          <div><small style={{color:lightBlack}}>Defective Part Number: </small><small>{item.part_number_defective}</small></div>
          <div><small style={{color:lightBlack}}>Defective Part Serial: </small><small>{item.part_serial_defective}</small></div>
          <div><small style={{color:lightBlack}}>New Part Serial: </small><small>{item.part_serial}</small></div>
          <div><small style={{color:lightBlack}}>Description: </small><small>{item.description}</small></div>
          <div>{confirmDeletePart}</div>
        </List>
      )
    });
    if(this.state.adding_spare_part && this.props.is_number_one){
      content =
      <div style={{color:lightBlack}}>
        <div style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee', marginBottom:'10px'}}>
          <div><small>Defective Part (พาร์ทเก่า)</small></div>
          <TextField hintText="Part Number" onChange={this.updateOldPartNumber} value={this.state.old_part_number} floatingLabelText="Part Number" fullWidth={true} />
          <TextField hintText="Part Serial" onChange={this.updateOldPartSerial} value={this.state.old_part_serial} floatingLabelText="Part Serial" fullWidth={true} />
          <br/><br/>
        </div>
        <div style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee'}}>
          <div><small>New Part (พาร์ทใหม่)</small></div>
          <TextField hintText="Part Number" onChange={this.updateNewPartNumber} value={this.state.new_part_number} floatingLabelText="Part Number" fullWidth={true} />
          <TextField hintText="Part Serial" onChange={this.updateNewPartSerial} value={this.state.new_part_serial} floatingLabelText="Part Serial" fullWidth={true} />
          <TextField hintText="Description" onChange={this.updateDescription} value={this.state.description} floatingLabelText="Description" fullWidth={true} />
        </div>
        <RaisedButton label="Add" primary={true} style={styles.button} onTouchTap={this.addPart}/>
        <RaisedButton label="Close" style={styles.button} onTouchTap={this.handleAddSparePart} /><br/>
      </div>;
    }else{
      content = <div onTouchTap={this.handleAddSparePart} style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee', marginBottom:'10px',color:lightBlack}}><small>Add Spare Part . . .</small> <small style={{color:lightBlack}}>หากมีการเปลี่ยน Spare ทำการกรอกในส่วนนี้</small></div>;
    }
    return(
      <div>
        <div>Spare Part<br/><br/></div>
        {listPart}<br/>{content}
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

export default class Appointment extends Component {
  constructor(props){
    super(props);
    const minDate = new Date();
    minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setHours(0, 0, 0, 0);

    this.state = {
      tasks_sid:this.props.tasks_sid, data:{},
      finished: false,
      stepIndex: 0,
      indexFinished:2,
      contact_user_editing:false,
      appointment_editing:false,
      currentData:minDate,
      adding_spare_part:false,
      wait_update_action: false,
      taxi_fare:0,
      openSnackbar:false,
      openSignNow:false,
      trimmedDataURL:'',
      btnSendSignatureToServer:false,
      can_checkpoint: true
    }
    this.styles = {
      row: {padding:10}
    }
  }
  componentDidMount(){
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("tasks_sid", this.props.tasks_sid);
    var that = this;
    get(Url.appointment, formData).then(function(res){
      console.log(res);
      // that.setState({data:res.data});
      if(!res.data){
        that.setState({can_checkpoint:false});
      }else{
        if(res.data.request_taxi==="0"){
          if(res.data.status_from_log==="0" || res.data.status_from_log===0){
            that.setState({data:res.data,stepIndex:0, indexFinished:2});
          }else if(res.data.status_from_log==="100" || res.data.status_from_log===100){
            that.setState({data:res.data,stepIndex:0, indexFinished:2});
          }else if(res.data.status_from_log==="200" || res.data.status_from_log===200){
            that.setState({data:res.data,stepIndex:0, indexFinished:2});
          }else if(res.data.status_from_log==="300" || res.data.status_from_log===300){
            that.setState({data:res.data,stepIndex:1, indexFinished:2});
          }else if(res.data.status_from_log==="400" || res.data.status_from_log===400){
            that.setState({data:res.data,stepIndex:2, indexFinished:2});
          }else if(res.data.status_from_log==="500" || res.data.status_from_log===500){
            that.setState({data:res.data,stepIndex:3, indexFinished:2});
          }else{
            that.setState({data:res.data, stepIndex:3,indexFinished:2});
          }
        }else{
          if(res.data.status_from_log==="0" || res.data.status_from_log===0){
            that.setState({data:res.data,stepIndex:0, indexFinished:4});
          }else if(res.data.status_from_log==="100" || res.data.status_from_log===100){
            that.setState({data:res.data,stepIndex:0, indexFinished:4});
          }else if(res.data.status_from_log==="200" || res.data.status_from_log===200){
            that.setState({data:res.data,stepIndex:1, indexFinished:4});
          }else if(res.data.status_from_log==="300" || res.data.status_from_log===300){
            that.setState({data:res.data,stepIndex:2, indexFinished:4});
          }else if(res.data.status_from_log==="400" || res.data.status_from_log===400){
            that.setState({data:res.data,stepIndex:3, indexFinished:4});
          }else if(res.data.status_from_log==="500" || res.data.status_from_log===500){
            that.setState({data:res.data,stepIndex:4, indexFinished:4});
          }else {
            that.setState({data:res.data, stepIndex:5,indexFinished:5});
          }
        }
      }
    });
  }
  componentWillUnmount(){

  }
  handleNext = () => {
    // alert(nextStatus);
    const {stepIndex} = this.state;
    var tmp = this.state.data;
    if(this.state.data.request_taxi==="0"){
      if(tmp.status_from_log<200){
        tmp.status_from_log = 200;
      }
    }
    var that = this;
    var formData = new FormData();
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("task_status", tmp.status_from_log);
    formData.append("taxi_fare",this.state.taxi_fare);
    formData.append("taxi_fare_stang",'0');
    formData.append("lat",InfoGen.lat);
    formData.append("lng",InfoGen.lng);
    formData.append("signature",this.state.trimmedDataURL);
    Put(Url.checkpoint, formData).then(function(res){
      console.log(res);
      if(res.error){
        alert('Error While Check Point');
      }else{
        tmp.status_from_log = parseInt(res.current_status);
        that.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= that.state.indexFinished,
          data:tmp,
          openSnackbar:true
        });
      }
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  renderStepActions(step) {
    const {stepIndex} = this.state;

    // <RaisedButton
    //   label={stepIndex === this.state.indexFinished ? 'Finish' : 'Next'}
    //   disableTouchRipple={true}
    //   disableFocusRipple={true}
    //   primary={true}
    //   onTouchTap={this.handleNext}
    //   style={{marginRight: 12}}
    // />
    var btnNext;
    if(this.state.data.status_from_log==='500'){
      btnNext =
      <RaisedButton
        label={stepIndex === this.state.indexFinished ? 'Finish' : 'Next'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleNext}
        style={{marginRight: 12}}
      />
    }
    return (
      <div style={{margin: '12px 0'}}>
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
        {btnNext}
      </div>
    );
  }
  handleEditingContactUser = () => {
    this.setState({
      contact_user_editing:!this.state.contact_user_editing,
      appointment_editing:false
    });
  }
  handleEditingAppointment = () => {
    this.setState({
      contact_user_editing:false,
      appointment_editing:!this.state.appointment_editing
    });
  }
  handleChangeEndUserName = (e) => {
    var tmp = this.state.data;
    tmp.end_user_contact_name_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserEmail = (e) => {
    var tmp = this.state.data;
    tmp.end_user_email_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserMobile = (e) => {
    var tmp = this.state.data;
    tmp.end_user_mobile_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserPhone = (e) => {
    var tmp = this.state.data;
    tmp.end_user_phone_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleChangeEndUserCompany = (e) => {
    var tmp = this.state.data;
    tmp.end_user_company_name_service_report = e.target.value;
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("tasks_sid", this.state.tasks_sid);
    formData.append("data", JSON.stringify({
      name:tmp.end_user_contact_name_service_report,email:tmp.end_user_email_service_report,
      mobile:tmp.end_user_mobile_service_report,phone:tmp.end_user_phone_service_report,
      company:tmp.end_user_company_name_service_report
    }));
    Put(Url.changeEndUserJson, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleExpectDuration = (e) => {
    var tmp = this.state.data;
    tmp.expect_duration = e.target.value;

    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("task_sid",this.state.tasks_sid);
    formData.append("datetime",tmp.appointment_YmdHi);
    formData.append("expect_duration",tmp.expect_duration);

    Put(Url.changeAppointment, formData).then(function(res){
      console.log(res);
    });

    this.setState({data:tmp});
  }
  handleAppointmentDate = (event, date) => {
    var tmp = this.state.data;
    tmp.appointment_date = date;
    var appointmentOld = tmp.appointment;
    var appointmentOldArray = appointmentOld.split(" ");
    //
    tmp.appointment = moment(date).format('DD.MM.YYYY')+" "+appointmentOldArray[1];
    tmp.appointment_YmdHi = moment(date).format('YYYY-MM-DD')+" "+appointmentOldArray[1]+":00";
    //
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("task_sid",this.state.tasks_sid);
    formData.append("datetime",tmp.appointment_YmdHi);
    formData.append("expect_duration",tmp.expect_duration);

    Put(Url.changeAppointment, formData).then(function(res){
      console.log(res);
    });

    console.log(tmp.appointment);
    this.setState({data:tmp});
  }
  handleAppointmentTime = (event, date) => {
    var tmp = this.state.data;
    tmp.appointment_time = date;
    ///
    var appointmentOld = tmp.appointment;
    var appointmentOldArray = appointmentOld.split(" ");
    var newTime = moment(date).format('HH:mm');
    ///
    var appointment_YmdHi = tmp.appointment_YmdHi;
    var appointment_YmdHiArray = appointment_YmdHi.split(" ");
    //
    tmp.appointment_YmdHi = appointment_YmdHiArray[0]+" "+newTime+":00";
    tmp.appointment = appointmentOldArray[0]+" "+newTime;

    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("task_sid",this.state.tasks_sid);
    formData.append("datetime",tmp.appointment_YmdHi);
    formData.append("expect_duration",tmp.expect_duration);

    Put(Url.changeAppointment, formData).then(function(res){
      console.log(res);
    });
    this.setState({data:tmp});
  }
  handleUpdateAction = (e) => {
    var tmp = this.state.data;
    tmp.input_action.solution = e.target.value;
    this.setState({data:tmp,wait_update_action:true});

  }
  handleUpdateActionToServer = () => {
    var that = this;
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("task_sid",this.state.tasks_sid);
    formData.append("solution",this.state.data.input_action.solution);
    formData.append("problem","");
    formData.append("recommend","");
    Put(Url.input_action, formData).then(function(res){
      console.log(res);
      if(res.error){
        alert("Error");
      }else{
        that.setState({wait_update_action:false,openSnackbar:true});
      }
    });
  }
  handleUpdateTaxi = (e) => {
    this.setState({taxi_fare:e.target.value});
  }
  openSignNow = () => {
    this.setState({openSignNow:true});
  }

  sigPad = {}
  clear = () => {
    this.sigPad.clear()
    this.setState({btnSendSignatureToServer:false,trimmedDataURL:''})
  }
  trim = () => {
    try{
      if(this.sigPad.getTrimmedCanvas){
        console.log(this.sigPad.getTrimmedCanvas().toDataURL('image/png'));
        var that = this;
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png'),btnSendSignatureToServer:true});
        console.log(this.state);

        // that.handleNext();
      }
    }catch(e){
      console.log(e);
    }
  }
  handleDoSerial = (e, ticket_serial_sid, ticket_sid) => {
    var status = "100";
    if(e.currentTarget.checked){
      status = "-100";
    }
    var formData = new FormData();
    formData.append("ticket_serial_sid", ticket_serial_sid);
    formData.append("status", status);
    formData.append("task_sid", this.state.tasks_sid);
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    var that = this;
    var tmp = this.state.data;
    Put(Url.do_serial_pm, formData).then(function(res){
      console.log(res);
      if(!res.error){
        tmp.serial_in_ticket.forEach((item,i)=>{
            if(item.sid===ticket_serial_sid){
              tmp.serial_in_ticket[i].status=status;
              that.setState({data:tmp});
            }
        });
      }
    });
  }
  render(){
    const styles = {
      button: {margin: 12}
    };
    const {finished, stepIndex} = this.state;

    var contact_user_element;
    if(this.state.contact_user_editing){
      contact_user_element =
      <div>
        <TextField onChange={this.handleChangeEndUserName} value={this.state.data.end_user_contact_name_service_report} hintText="Name" floatingLabelText="Name" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserEmail} value={this.state.data.end_user_email_service_report} hintText="Email" floatingLabelText="Mail" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserMobile} value={this.state.data.end_user_mobile_service_report} hintText="Mobile" floatingLabelText="Mobile" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserPhone} value={this.state.data.end_user_phone_service_report} hintText="Phone" floatingLabelText="Phone" fullWidth={true} floatingLabelFixed={true} />
        <TextField onChange={this.handleChangeEndUserCompany} value={this.state.data.end_user_company_name_service_report} hintText="Company" floatingLabelText="Company" fullWidth={true} floatingLabelFixed={true} />
      </div>
    }else{
      contact_user_element =
      <div>
        {this.state.data.end_user_contact_name_service_report}<br/>
        {this.state.data.end_user_email_service_report}<br/>
        {this.state.data.end_user_mobile_service_report+ " / "+ this.state.data.end_user_phone_service_report}<br/>
        {this.state.data.end_user_company_name_service_report}
      </div>
    }

    var appointment_element;
    if(this.state.appointment_editing){
      var dateRawF = this.state.data.appointment_YmdHi.split(" ");
      var dateRaw = dateRawF[0].split("-");
      var minDate = new Date(dateRaw[0], dateRaw[1]-1, dateRaw[2], 0,0,0,0);
      // minDate.setFullYear(minDate.getFullYear() - 1);
      minDate.setHours(0, 0, 0, 0);

      var minHour = dateRawF[1].split(":");
      console.log(minHour);
      minHour = new Date(dateRaw[0], dateRaw[1]-1, dateRaw[2], minHour[0], minHour[1], minHour[2],0);
      // minHour.setFullYear(minHour.getFullYear()-1);
      console.log(minHour);
      appointment_element = <div>
          <div style={{padding:10}}>
            <div><span>Appointment: <ContentCreate onTouchTap={this.handleEditingAppointment} style={{color:lightBlack}} /></span></div>
            <div>
              <DatePicker
                onChange={this.handleAppointmentDate}
                autoOk={this.state.autoOk}
                floatingLabelText="Appointment Date"
                defaultDate={minDate}
                disableYearSelection={this.state.disableYearSelection}
              />
              <TimePicker
                format="24hr" floatingLabelText="Appointment Time"
                hintText="Appointment Time" defaultTime={minHour}
                value={this.state.value24}
                onChange={this.handleAppointmentTime}
              />
              <div>
                <TextField type="number" min={1} value={this.state.data.expect_duration} onChange={this.handleExpectDuration} hintText="Expect Duration" floatingLabelText="Expect Duration (Hours.)"/>
              </div>
            </div>
          </div>
          <Divider />
        </div>
    }else{
      var editingAppointment;
      if(this.state.data.appointment_type>="2"){

      }else{
        editingAppointment = <ContentCreate onTouchTap={this.handleEditingAppointment} style={{color:lightBlack}} />;
      }
      appointment_element = <div>
        <div style={{padding:10}}><span>Appointment: </span>
        <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.appointment +" ("+this.state.data.expect_duration+")"}</span> {editingAppointment}</div>
        <Divider />
      </div>
    }

    // EACH STEP
    var step_start_the_task =
    <div>
      <div><small style={{color:lightBlack}}>กดปุ่ม Next ระบบจะบันทึกเวลาเริ่มงาน</small></div>
      <RaisedButton label="Next" onTouchTap={this.handleNext} primary={true} style={styles.button} />
    </div>;

    var warningTxt;
    if(!this.state.data.is_number_one){
      warningTxt = <div><small style={{color:lightBlack}}>ขั้นตอนนี้สำหรับผู้ปฎิบัติงานหลัก</small></div>;
    }

    // var signNow;
    var step_end_user_signature;
    if(this.state.openSignNow){
      var btnSendSignatureToServer;
      if(this.state.btnSendSignatureToServer){
        btnSendSignatureToServer = <div><RaisedButton primary={this.state.btnSendSignatureToServer} label="Next" style={{margin:4}} onTouchTap={this.handleNext} /></div>;
      }
      step_end_user_signature =
      <div style={{overflow: 'hidden',borderRight: '1px solid #eaeaea'}}>
        <div><RaisedButton label="Back" onTouchTap={()=>{this.setState({openSignNow:false})}} style={{margin:4}} /></div>
        <SignatureCanvas ref={(ref) => { this.sigPad = ref }} penColor='black'
        clearButton="true" style={{border:'1px solid #eaeaea'}} canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
        <div>
          {btnSendSignatureToServer}
          <RaisedButton label="Save" onTouchTap={this.trim} primary={!this.state.btnSendSignatureToServer} style={{margin:4}} />
          <RaisedButton label="Clear" onTouchTap={this.clear} secondary={true} style={{margin:4}} />
        </div>
      </div>
    }else{
      step_end_user_signature =
       <div>
          <div>{warningTxt}</div>
          <RaisedButton disabled={!this.state.data.is_number_one} label="SIGN NOW" onTouchTap={this.openSignNow} primary={true} style={styles.button} />
          <RaisedButton disabled={!this.state.data.is_number_one} label="VIA EMAIL" onTouchTap={this.handleNext} secondary={true} style={styles.button} />
       </div>;
    }

    // CALL TO CLASS SPARE PART
    var controlSparePart = <ControlSparePart is_number_one={this.state.data.is_number_one} sparepart={this.state.data.sparepart} tasks_sid={this.state.tasks_sid} onAddingSparePart={this.handleAddSparePart} adding_spare_part={this.state.adding_spare_part} />;

    var content;
    if(!this.state.can_checkpoint){
      content = <div>สำหรับ Staff ใน Service Report</div>
    }else if(this.state.data.tasks_sid){
      var btnCloseService;
      if(this.state.data && this.state.data.input_action && this.state.data.input_action.solution && !this.state.wait_update_action){
        btnCloseService = <RaisedButton label="Close Service" onTouchTap={this.handleNext} primary={true} style={styles.button} />
      }

      var serial_in_ticket = [];
      this.state.data.serial_in_ticket.forEach((item,i)=>{
        var checked = false
        if(item.status==="100"){
          checked = true;
        }
        serial_in_ticket.push(
          <div key={i}>
            <Checkbox onTouchTap={(e)=>{this.handleDoSerial(e, item.sid, item.ticket_sid)}}
              checked={checked}
              label={item.serial_detail}
              style={styles.checkbox}
            />
          </div>
        );
      });

      var form_input_action;
        form_input_action =
          <div>
            <div style={{backgroundColor:'#fafbfc',padding:'0px 10px 10px 10px',marginBottom:'10px', border:'1px solid #eeeeee'}}>
              <div><br/>{warningTxt}<br/><small style={{color:lightBlack}}>กรอกสิ่งที่คุณทำในช่อง Action</small></div>
              <span style={{color:lightBlack}}>
                <TextField value={this.state.data.input_action.solution} onChange={this.handleUpdateAction}
                  hintText="Input Action"
                  errorText="This field is required."
                  floatingLabelText="Action"
                  multiLine={true}
                  rows={2} fullWidth={true} disabled={!this.state.data.is_number_one}
                />
                <RaisedButton disabled={!this.state.data.is_number_one} label={"UPDATE ACTION"} primary={this.state.wait_update_action} onTouchTap={this.handleUpdateActionToServer} />
              </span>
            </div>
            <div style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee'}}>
              {controlSparePart}
            </div>
          </div>;

      var step_input_action =
        <div>
          <div>{serial_in_ticket}</div>
          {form_input_action}
          <br/>
          {btnCloseService}
        </div>;
      console.log(757);
      var txtTaxi = <TextField type="number" min={0} value={this.state.taxi_fare} hintText="Taxi (Baht)?" onChange={this.handleUpdateTaxi} floatingLabelText="Taxi (Baht)?" floatingLabelFixed={true} fullWidth={true}/>;
      var step_arrived = <div>
        {txtTaxi}
        <RaisedButton label="Finish" onTouchTap={this.handleNext} primary={true} style={styles.button} />
      </div>;
      console.log(step_arrived);

      var stepper;
      // CHECK CONDITION FOR GEN CHECK POINT 0 is not require taxi
      if(this.state.data.request_taxi==="0"){
        stepper =
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
              <StepLabel>START THE TASK</StepLabel>
              <StepContent>
                {step_start_the_task}
              </StepContent>
          </Step>
          <Step>
            <StepLabel>ACTION</StepLabel>
            <StepContent>
              {step_input_action}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>END USER SIGNATURE</StepLabel>
            <StepContent>
              {step_end_user_signature}
            </StepContent>
          </Step>
        </Stepper>
      }else{
        stepper =
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
              <StepLabel>START THE JOURNEY</StepLabel>
              <StepContent>
                <div>
                  <div><small style={{color:lightBlack}}>กดปุ่ม Next ระบบจะบันทึกเวลาออกเดินทาง</small></div>
                  <RaisedButton label="Next" onTouchTap={this.handleNext} primary={true} style={styles.button} />
                </div>
              </StepContent>
          </Step>
          <Step>
            <StepLabel>START THE TASK</StepLabel>
            <StepContent>
              {txtTaxi}
              {step_start_the_task}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>ACTION & SPARE</StepLabel>
            <StepContent>
              {step_input_action}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>END USER SIGNATURE</StepLabel>
            <StepContent>
              {step_end_user_signature}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>ARRIVED WHEN REACHING DESTINATION</StepLabel>
            <StepContent>
              {step_arrived}
            </StepContent>
          </Step>
        </Stepper>
      }
      if(this.state.data.appointment_type>="2"){
        content =
        <Paper zDepth={2} >
          <div >
            <div style={{padding:10}}><span >Subject: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.no_task+" "+this.state.data.subject_service_report}</span></div>
            <Divider />
            {appointment_element}
          </div>
        </Paper>;

      }else{
        content =
          <Paper zDepth={2} >
            <div >
              <div style={{padding:10}}><span >Subject: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.no_task+" "+this.state.data.subject_service_report}</span></div>
              <Divider />
              <div style={{padding:10}}><span >Type: </span>
                <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.service_type_name}</span></div>
              <Divider />

              <div style={{padding:10}}><span >Task: </span>
                <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.ticket_case_type}</span>
                <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.no_ticket}</span>
                <span style={{color:lightBlack,marginLeft:10}}>{this.state.data.ticket_contract}</span>
              </div>
              <Divider />
              <div style={{padding:10}}><span >Serial: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.ticket_serial}</span></div>
              <Divider />

              <div style={{padding:10}}><span>End User: </span><span style={{color:lightBlack,marginLeft:10}}>{this.state.data.end_user}</span></div>
              <Divider />
              <div style={{padding:10}}>
                <span>Site: </span>
                <span style={{color:lightBlack,marginLeft:10}}>{((this.state.data.service_report_address)?this.state.data.service_report_address:this.state.data.ticket_end_user_site)}</span>
              </div>
              <Divider />
              {appointment_element}
              <div style={{padding:10}}>
                <div><span>Contact User: </span><ContentCreate onTouchTap={this.handleEditingContactUser} style={{color:lightBlack}} /></div>
                <div>
                  <span style={{color:lightBlack,marginLeft:10}}>
                  <div>{contact_user_element}</div>
                  </span>
                </div>
              </div>
              <Divider />
              <div style={{padding:10}}>
                <div><span>Staff: </span><br/>
                <Avatar src={this.state.data.picture_profile} size={40} style={{margin:4}}/>
                {this.state.data.associate_engineer.map((item2,i2)=>{
                  return <Avatar src={item2.picture_profile} size={40} style={{margin:4}} />
                })}
                </div>
              </div>
              <Divider />
              <br />
              <div style={{padding:10}}>
                <div>CHECK POINT</div>
                <div></div>
              </div>
              {stepper}
              <br/>
              {finished && (
                <p style={{margin: '20px 0', textAlign: 'center'}}>
                  This appointment is finished
                </p>
              )}
              <br/>
            </div>
          </Paper>;
      }
    }else{
      content =
      <div style={{textAlign:'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>
    }
    return(
        <div>
          <div style={{margin:10}}>
              {content}
          </div>
          <Snackbar
            open={this.state.openSnackbar}
            message="vSpace Added"
            autoHideDuration={4000} onRequestClose={()=>{this.setState({openSnackbar:false})}}
          />
        </div>
    )
  }
}
// <NavCompoment onChangePage={()=>{this.props.onChangePage()}} info={this.props.info} />
