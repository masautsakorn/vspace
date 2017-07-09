import React, { Component } from 'react';
import {PresentData, PresentDataHeader} from '../management/PresentData';
import {END_POINT_PDF} from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put';
import Url from '../../config/url';
import jPost from '../../config/jPost';

import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import Avatar from 'material-ui/Avatar';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import OwnerDialog from '../projectplan/OwnerDialog2';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionSwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import moment from 'moment';

import Appointment from '../appointment/Appointment2';

class ServiceReportDetail extends Component {
  constructor(props){
    super(props);
    // console.log(this.props);
    this.state = {serviceReport:null, tasks_sid:this.props.tasks_sid,
      editMode:false,
      editSid:null,
      editData:{},
      editContact:false,edit:null
    };
  }

  setEditContact = () => {
    var {serviceReport} = this.state;
    this.setState({editContact:!this.state.editContact,
      edit:{
        end_user_contact_name_service_report:serviceReport.end_user_contact_name_service_report,
        end_user_email_service_report:serviceReport.end_user_email_service_report,
        end_user_phone_service_report:serviceReport.end_user_phone_service_report,
        end_user_mobile_service_report:serviceReport.end_user_mobile_service_report,
        end_user_company_name_service_report:serviceReport.end_user_company_name_service_report
      }
    });
  }

  setEditMode = (sid, data) => {

    if(data.appointment){
      var dateRawF = data.appointment.split(" ");
      var dateRaw = dateRawF[0].split("-");
      var minDate = new Date(dateRaw[0], dateRaw[1]-1, dateRaw[2], 0,0,0,0);

      minDate.setHours(0, 0, 0, 0);

      var minHour = dateRawF[1].split(":");
      // console.log(minHour);
      minHour = new Date(dateRaw[0], dateRaw[1]-1, dateRaw[2], minHour[0], minHour[1], 0,0);
      // console.log(minHour);
      data.appointment_date = minDate;
      data.appointment_time = minHour;
    }
    this.setState({editMode:!this.state.editMode, editSid:sid, editData:data});
  }

  handleChangeServiceType = (event, index, value) => {
    var tmp = this.state.editData;
    tmp.service_type = value;
    this.setState({editData:tmp});
  }
  editSubject = (value) => {
    var tmp = this.state.editData;
    tmp.subject_service_report = value;
    this.setState({editData:tmp});
  }
  editAppointmentDate = (event, date) => {
    var tmp = this.state.editData;
    tmp.appointment_date = date;
    this.setState({data:tmp});
  }
  editAppointmentTime = (event, date) => {
    var tmp = this.state.editData;
    tmp.appointment_time = date;
    this.setState({data:tmp});
  }
  editExpectDuration = (value) => {
    var tmp = this.state.editData;
    tmp.expect_duration = value;
    this.setState({data:tmp});
  }
  editContactName = (value) => {
    var tmp = this.state.editData;
    tmp.end_user_contact_name_service_report = value;
    this.setState({data:tmp});
  }
  editContactEmail = (value) => {
    var tmp = this.state.editData;
    tmp.end_user_email_service_report = value;
    this.setState({data:tmp});
  }
  editContactMobile = (value) => {
    var tmp = this.state.editData;
    tmp.end_user_mobile_service_report = value;
    this.setState({data:tmp});
  }
  editContactPhone = (value) => {
    var tmp = this.state.editData;
    tmp.end_user_phone_service_report = value;
    this.setState({data:tmp});
  }
  editContactCompany = (value) => {
    var tmp = this.state.editData;
    tmp.end_user_company_name_service_report = value;
    this.setState({data:tmp});
  }
  handleSelectStaff = (email, pic_employee, thainame, engname) => {
    var tmp = this.state.editData;
    tmp.engineer = email;
    tmp.engineer_name = thainame;
    this.setState({data:tmp});
  }
  handleAddAssocicate = (email, pic_employee, thainame, engname) => {
    var tmp = this.state.editData;
    tmp.associate_engineer.push({
      engineer_name:thainame, engineer:email, engineer_pic: pic_employee,request_taxi:0,status_enineer:0
    });
    this.setState({data:tmp});
  }
  handleRequestDeleteAssociate = (email) => {
    var tmp = this.state.editData;
    var newAssociate = [];
    tmp.associate_engineer.forEach((item,i)=>{
      if(item.engineer!==email){
        newAssociate.push(item);
      }
      if((i+1)===tmp.associate_engineer.length){
        tmp.associate_engineer = newAssociate;
        this.setState({data:tmp});
      }
    });
  }
  toggleTaxi = (value) => {
    console.log(value);
    var tmp = this.state.editData;
    tmp.request_taxi = (parseInt(value)+1)%2;
    this.setState({data:tmp});
  }

  toggleTaxiAssociate = (value, engineer) => {
    console.log(value);
    var tmp = this.state.editData;
    var newAssociate = [];
    tmp.associate_engineer.forEach((item,i)=>{
      if(engineer===item.engineer){
        item.request_taxi = (parseInt(value)+1)%2;
      }
      newAssociate.push(item);
      if((i+1)===tmp.associate_engineer.length){
        tmp.associate_engineer = newAssociate;
        this.setState({data:tmp});
      }
    });
  }
  editServiceReport = () => {
    var tmp = this.state.editData;
    tmp.appointment = moment(tmp.appointment_date).format('YYYY-MM-DD')+' '+moment(tmp.appointment_time).format('HH:mm');
    // console.log('editServiceReport',tmp);
    var data = {authen:{email:InfoGen.email,token:InfoGen.token},data:tmp, tasks_sid:tmp.sid};
    console.log(data);

    var that = this;
    jPost(Url.editServiceReport, data).then((res)=>{
        // console.log(res);
        that.setState({editMode:false,editSid:null,editData:{}});
        that.callData();
    });

    // this.props.socket.emit('editTaskOne',data);
    // this.setState({editMode:false,editSid:null,editData:{}});
  }

  resendEmail = (tasks_sid) => {
    // alert(sid);
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("tasks_sid", tasks_sid);
    Put(Url.resendEmail, formData).then(function(res){
      // console.log(res);
      if(!res.error)
        alert('Sent Email');
    });
  }
  componentDidMount(){
    this.callData();

    // this.props.socket.emit('tasksDetailOne', data);
    // this.props.socket.on('tasksDetailOne_'+this.props.tasks_sid, function(res){
      // console.log(res);
    //   if(res[0]['sid']){
    //     that.setState({serviceReport:res[0], editContact:false});
    //   }else{
    //     that.setState({serviceReport:null, editContact:false});
    //   }
    // })
  }

  callData = () => {
    var that = this;
    var data = {authen:{token:InfoGen.token, email:InfoGen.email}, tasks_sid:this.props.tasks_sid};
    jPost(Url.ws_service_report_detail, data).then((res)=>{
        // console.log(res);
        that.setState({serviceReport:res.data,editContact:false});
    });
  }

  changeCName = (value) => {
    var tmp = this.state.edit;
    tmp.end_user_contact_name_service_report = value;
    this.setState({edit:tmp});
  }
  changeCEmail = (value) => {
    var tmp = this.state.edit;
    tmp.end_user_email_service_report = value;
    this.setState({edit:tmp});
  }
  changeCPhone = (value) => {
    var tmp = this.state.edit;
    tmp.end_user_phone_service_report = value;
    this.setState({edit:tmp});
  }
  changeCMobile = (value) => {
    var tmp = this.state.edit;
    tmp.end_user_mobile_service_report = value;
    this.setState({edit:tmp});
  }
  changeCCompany = (value) => {
    var tmp = this.state.edit;
    tmp.end_user_company_name_service_report = value;
    this.setState({edit:tmp});
  }
  changeContactAfterClose = () => {
    var that = this;
    console.log(this.state.edit);
    var data = {authen:{email:InfoGen.email, token:InfoGen.token}, data: this.state.edit, tasks_sid:this.state.tasks_sid};
    // this.props.socket.emit('editContact', data);
    jPost(Url.editContactAfterClose, data).then((res)=>{
      console.log(res);
      that.callData();
    })
  }
  render(){
    const styles = {
      radioButton: {
        marginTop: 16,
      },
      chip: {margin:2}
    };
    var serviceReport;

    const items = [
      <MenuItem key={1} value={"1"} primaryText="Onsite" />,
      <MenuItem key={2} value={"2"} primaryText="Remote" />,
      <MenuItem key={3} value={"3"} primaryText="Document" />,
      <MenuItem key={4} value={"4"} primaryText="Meeting-Intranal" />,
      <MenuItem key={5} value={"5"} primaryText="Meeting-Extranal" />,
      <MenuItem key={6} value={"6"} primaryText="Pre-Install" />,
      <MenuItem key={7} value={"7"} primaryText="Testing" />,
    ];

    if(this.state.serviceReport!==null){

      var propsServiceReport = this.state.serviceReport;
      var pdfElement;

      if(this.state.editSid===propsServiceReport.sid){
        // console.log(propsServiceReport);

        var associateSelected = [];
        // var confirmStaff = [];
        this.state.editData.associate_engineer.forEach((item,i) => {
            associateSelected.push(
              <Chip style={styles.chip} key={item.engineer}
                onRequestDelete={() => this.handleRequestDeleteAssociate(item.engineer)}>
                <div style={{display:'flex'}}>
                  <div style={{flex:1}}>{item.engineer_name}</div>
                  <div style={{flex:1, marginLeft:0}}>
                    <div className="link" onTouchTap={()=>this.toggleTaxiAssociate(parseInt(item.request_taxi),item.engineer)}>{((parseInt(item.request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</div>
                  </div>
                </div>
              </Chip>
            );
            // confirmStaff.push(<Chip style={{margin:4,backgroundColor:'none'}} key={item.email} ><Avatar src={item.pic_employee} /> {item.name}</Chip>);
        });

        var sectionStaff =
          <div style={{flex:1,flexDirection:'row'}}>
            <OwnerDialog
              onShowMore={()=>{}}
              onSelectItem={this.handleSelectStaff}
              listItem={this.props.listUserCanAddTask} title="" label="Change" icon={<ActionSwapHoriz />}  />
          </div>;

        var addAssociate =
          <div style={{flex:1,flexDirection:'row'}}>
            <OwnerDialog
              onShowMore={()=>{}}
              onSelectItem={this.handleAddAssocicate}
              listItem={this.props.listUserCanAddTask} title="" label="Add" icon={<SocialPersonAdd />}  />
          </div>;

        var primaryText =
        <div>
          <small>
            <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Subject: </span>
              <small><TextField hintText="Subject" onChange={(e)=>this.editSubject(e.target.value)} value={propsServiceReport.subject_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000'}}>
              <SelectField
                value={this.state.editData.service_type}
                onChange={this.handleChangeServiceType}
                floatingLabelText="Service Type"
              >
                {items}
              </SelectField>
            </div>

            <div style={{color:'#000000', marginTop:30}}><span style={{color:lightBlack,marginRight:10}}>Appointment: </span>
              <div style={{display:'flex'}}>
                  <div style={{flex:1}}>
                      <DatePicker
                        onChange={this.editAppointmentDate}
                        autoOk={this.state.autoOk}
                        floatingLabelText="Appointment Date"
                        defaultDate={this.state.editData.appointment_date}
                        disableYearSelection={this.state.disableYearSelection}
                      />
                  </div>
              </div>
              <div style={{display:'flex'}}>
                  <div style={{flex:1}}>
                      <TimePicker
                        format="24hr"
                        floatingLabelText="Appointment Time"
                        hintText="Appointment Time"
                        defaultTime={this.state.editData.appointment_time}
                        onChange={this.editAppointmentTime}
                      />
                  </div>
              </div>
            </div>
            <div style={{color:'#000000'}}>
              <div><span style={{color:lightBlack,marginRight:10}}>Expect Duration: </span></div>
              <div><TextField hintText="Expect Duration" onChange={(e)=>this.editExpectDuration(e.target.value)} value={parseInt(propsServiceReport.expect_duration)} type="number" min={1} /></div>
            </div>

            <div style={{color:'#000000', marginTop:30}}><span style={{color:lightBlack,marginRight:10}}>Contact: </span>
              <small><TextField hintText="Name" onChange={(e)=>this.editContactName(e.target.value)} value={propsServiceReport.end_user_contact_name_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Email: </span>
              <small><TextField hintText="Email" onChange={(e)=>this.editContactEmail(e.target.value)} value={propsServiceReport.end_user_email_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Mobile: </span>
              <small><TextField hintText="Mobile" onChange={(e)=>this.editContactMobile(e.target.value)} value={propsServiceReport.end_user_mobile_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Phone: </span>
              <small><TextField hintText="Phone" onChange={(e)=>this.editContactPhone(e.target.value)} value={propsServiceReport.end_user_phone_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Company: </span>
              <small><TextField hintText="Company" onChange={(e)=>this.editContactCompany(e.target.value)} value={propsServiceReport.end_user_company_name_service_report} fullWidth={true} /></small>
            </div>
            <div style={{color:'#000000', marginTop:30}}>
              <span style={{color:lightBlack}}>Staff:</span>
              <Chip style={styles.chip}>
                <div style={{color:'#000000',marginRight:10, display:'flex'}}>
                  <div style={{flex:1}}>{this.state.editData.engineer_name}</div>
                  <div style={{flex:1, marginLeft:0}}>
                    <div className="link" onTouchTap={()=>this.toggleTaxi(parseInt(this.state.editData.request_taxi))}>{((parseInt(this.state.editData.request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</div>
                  </div>
                </div>
              </Chip>
              {sectionStaff}
            </div>
            <div style={{color:'#000000', marginTop:30}}><span style={{color:lightBlack,marginRight:10}}>Associate Engineer: </span>
                {associateSelected}
                {addAssociate}
            </div>
            <div style={{marginTop:30}}>
              <RaisedButton onTouchTap={()=>{this.editServiceReport()}} primary={true} label="Save" style={{margin:4}} />
              <RaisedButton onTouchTap={()=>{this.setEditMode(null, {})}} label="Cancel" style={{margin:4}} />
            </div>
          </small>
        </div>
        // var secondaryText =
        // <div style={{color:'#000000',marginBottom:10}}>
        //   <div><span style={{color:lightBlack,marginRight:10}}>Appointment: </span><small>{propsServiceReport.appointment}</small></div>
        //   <div><span style={{color:lightBlack,marginRight:10}}>Expect Duration (Hr.): </span>{propsServiceReport.expect_duration}</div>
        //   <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Staff:</span> {propsServiceReport.engineer_name}</div>
        //   {((propsServiceReport.associate_engineer.length>0)?<div style={{color:lightBlack,marginRight:10}}>Associate: {asso}</div>:'')}
        //   {pdfElement}
        // </div>
        serviceReport = (
          <Paper zDepth={2} style={{padding:12,margin:'10px 2px'}}>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>{"Edit "+ propsServiceReport.no_task}</div>
              <div style={{width:30}}>
                <FloatingActionButton mini={true}>
                  <NavigationClose onTouchTap={()=>{this.setEditMode(null, {})}}  />
                </FloatingActionButton>
              </div>
            </div>
            {primaryText}
          </Paper>
        )
      }else{

        if(propsServiceReport.path_service_report){
          pdfElement = <PresentData label={"PDF"} value={<div className="link" style={{color:'#ffffff', fontStyle:'italic'}} target="new" href={END_POINT_PDF+propsServiceReport.path_service_report} >Service Report</div>} />
        }else{
          pdfElement = <PresentData label={"PDF"} value={"-"} />
        }
        var asso = propsServiceReport.associate_engineer.map((item,i)=>{
            return <div style={{}} key={i}>{item.engineer_name}
                    <div className="link" style={{marginLeft:0,fontStyle:'italic'}}>{((parseInt(item.request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</div>
                   </div>
        });

        var controlEditSr;
        if(propsServiceReport.can_edit==1 && propsServiceReport.create_by===InfoGen.email){
          controlEditSr = <div style={{display:'flex'}}>
            <div style={{width:'100%',textAlign:'right'}}>
              <div className="link" onTouchTap={()=>{this.setEditMode(propsServiceReport.sid, propsServiceReport)}}>
                <EditorBorderColor style={{color:'blue',width:14,height:14}} title="Edit" /> แก้ไข
              </div>
            </div>
            <div style={{flex:1}}></div>
          </div>
        }else if(propsServiceReport.can_edit!=1){
          controlEditSr = <div style={{display:'flex'}}>
            <div style={{width:'100%',textAlign:'left'}}>ไม่สามารถแก้ไขได้เนื่องจาก Staff เริ่มงานแล้ว</div>
            <div style={{flex:1}}></div>
          </div>
        }else{
          controlEditSr = <div>ผู้มีสิทธิ์แก้ไข {propsServiceReport.create_by_name}</div>
        }

        var primaryText =
        <div>
            <div style={{marginBottom:10}}>{controlEditSr} </div>
            <PresentData
              label={<div>Subject</div>}
              value={propsServiceReport.subject_service_report} />
            <PresentData label={"No."} value={propsServiceReport.no_task} />
            <PresentData label={"Type"} value={propsServiceReport.service_type_name} />
        </div>
        var engineer = <div>
          {propsServiceReport.engineer_name}
          <div className="link" style={{marginLeft:0,fontStyle:'italic'}}>{((parseInt(propsServiceReport.request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</div>
        </div>

        var styleBtn = {
          borderRadius:4,backgroundColor:'#ff4081',color:'#ffffff', padding:4,
          cursor:'pointer',userSelect:'none',margin:'0px 8px 0px 0px',
        }
        var styleBtnEditContact = {
          borderRadius:4,backgroundColor:'#9C27B0',color:'#ffffff', padding:4,
          cursor:'pointer',margin:'0px 8px 0px 0px',userSelect:'none'
        }
        var styleBtnLink = {
          borderRadius:4,backgroundColor:'green',color:'#ffffff', padding:4,
          cursor:'pointer',margin:'0px 8px 0px 0px',userSelect:'none'
        }
        var actionResendEmail;
        if(propsServiceReport.closed_datetime!="0000-00-00 00:00" && propsServiceReport.customer_signated==0){
            actionResendEmail = <PresentData label={"#"} value={
              <div className="row" style={{marginLeft:0,marginRight:0}}>
                <div style={{marginBottom:5}} onTouchTap={()=>{this.resendEmail(propsServiceReport.sid)}} className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md m-b-15 btn two">Resend Email</div>
                <a className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md m-b-15 btn four" target="_new" style={{marginBottom:5,color:'#ffffff'}} href={"./pages/signaturepad/customer/?task="+propsServiceReport.sid+"&engineer="+InfoGen.email}><div className=" ">
                  Link Sign
                </div></a>
                <div style={{marginBottom:5}} className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md m-b-15 btn five" onTouchTap={()=>{this.setEditContact()}}>{((this.state.editContact)?'ยกเลิกแก้ไข':'แก้ไขผู้เซนต์')}</div>
              </div>
            } />
        }
        var df = {
          display: 'flex'
        }
        var fl = {
          width:'100px',
          textAlign:'right',
          padding:10,
        }
        var fr = {
          flex:1,
          padding:4
        }
        var iw = {
          width: '100%',
          WebkitTextFillColor:'#ffffff'
        }
        var formEditContact;
        var {edit} = this.state;
        if(this.state.editContact){
          var tmpForm = <div>
            <div style={df}>
              <div style={fr}>
              <TextField hintText="Name" inputStyle={iw} style={iw} onChange={(e)=>{this.changeCName(e.target.value)}} value={edit.end_user_contact_name_service_report} />
              </div>
            </div>
            <div style={df}>
              <div style={fr}><TextField inputStyle={iw} hintText="Email" style={iw} onChange={(e)=>{this.changeCEmail(e.target.value)}} value={edit.end_user_email_service_report} /></div>
            </div>
            <div style={df}>
              <div style={fr}><TextField hintText="Phone" inputStyle={iw} style={iw} onChange={(e)=>{this.changeCPhone(e.target.value)}} value={edit.end_user_phone_service_report} /></div>
            </div>
            <div style={df}>
              <div style={fr}><TextField hintText="Mobile" inputStyle={iw} style={iw} onChange={(e)=>{this.changeCMobile(e.target.value)}} value={edit.end_user_mobile_service_report} /></div>
            </div>
            <div style={df}>
              <div style={fr}><TextField hintText="Company" inputStyle={iw} style={iw} onChange={(e)=>{this.changeCCompany(e.target.value)}} value={edit.end_user_company_name_service_report} /></div>
            </div>
            <div style={df}>
              <div style={{marginLeft:0,marginRight:0}} className="row" ><div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md m-b-15 btn five" onTouchTap={this.changeContactAfterClose}>SAVE</div></div>
            </div>
          </div>
          formEditContact = <PresentData label="Edit Contact" value={tmpForm} />
        }

        var secondaryText =
        <div style={{color:'#000000',marginBottom:0}}>
          <PresentData label="Appointment" value={propsServiceReport.appointment} />
          <PresentData label="Expect Duration (Hr.)" value={propsServiceReport.expect_duration} />
          <PresentData label="Staff" value={engineer} />

          {((propsServiceReport.associate_engineer.length>0)?<PresentData label="Associate" value={asso} />:'')}
          <div style={{color:'#000000', marginTop:0}}>
            <PresentData label={"Contact"} value={"Name: "+propsServiceReport.end_user_contact_name_service_report} />
            <PresentData label="" value={"Email: "+propsServiceReport.end_user_email_service_report} />
            <PresentData label="" value={"Mobile: "+propsServiceReport.end_user_mobile_service_report} />
            <PresentData label="" value={"Phone: "+propsServiceReport.end_user_phone_service_report} />
            <PresentData label="" value={"Company: "+propsServiceReport.end_user_company_name_service_report} />
          </div>
          {pdfElement}
          <PresentData label={"Started Datetime"} value={<span>{propsServiceReport.started_datetime}</span>} />
          <PresentData label={"Closed Datetime"} value={<span>{propsServiceReport.closed_datetime}</span>} />
          <PresentData label={"Taxi (Baht)"} value={<span>{propsServiceReport.taxi_fare_total}</span>} />
          {actionResendEmail}
          {formEditContact}
          <PresentData label={"Created"} value={<span>{propsServiceReport.create_by_name} {propsServiceReport.create_datetime}</span>} />
        </div>
        var avatar = <Avatar src={propsServiceReport.staff_pic} />

        serviceReport =
          <div style={{marginTop:10, marginBottom:10}}>
            {primaryText}
            {secondaryText}
            <div style={{backgroundColor:'#222222', height:5}}></div>
          </div>;
      }
    }else{
        serviceReport = <div>Loading...</div>
    }

    return(
      <div>
        <Appointment tasks_sid={this.props.tasks_sid} />
        {serviceReport}
      </div>
    )
  }
}
export default ServiceReportDetail;
