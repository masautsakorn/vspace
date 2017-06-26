import React, { Component } from 'react';
// import MyApp from './MyApp';
// import get from '../../config/Get.js';
import Url from '../../config/url';
import jPost from '../../config/jPost';

import InfoGen from '../../config/InfoGen';
// import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ServiceReportCreate from './ServiceReportCreate';
import {lightBlack} from 'material-ui/styles/colors';
// import {List, ListItem} from 'material-ui/List';
// import Subheader from 'material-ui/Subheader';
// import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialMood from 'material-ui/svg-icons/social/mood';
import Drawer from 'material-ui/Drawer';
// import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import {END_POINT_PDF} from '../../config/url';
// import ActionPageview from 'material-ui/svg-icons/action/pageview';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import DatePicker from 'material-ui/DatePicker';
import TimePicker from 'material-ui/TimePicker';
import OwnerDialog from '../projectplan/OwnerDialog2';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import ActionSwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import moment from 'moment';
import {PresentData, PresentDataHeader} from '../management/PresentData';

class ServiceReportDialog extends Component {
  constructor(props){
    super(props);
    // console.log('ServiceReportDialog', this.props);
    this.state = {
      open: false,staff:this.props.listUserCanAddTask,
      serviceReport:this.props.serviceReport,
      projectContact:this.props.projectContact,
      creatingService:false,openSnackbar:false,messageSnackbar:'',
      editMode:false,editSid:null,editData:{}
    };
  }
  handleOpen = () => {
    this.setState({open: true});
  };
  handleOpenCreatingService = () => {
    this.props.loadNew();
    this.setState({creatingService:!this.state.creatingService});
  }
  handleClose = () => {
    this.setState({open: false});
  };
  handleStatusCreating = () => {
    if(this.state.createService){
      this.setState({creatingService:false});
    }else{
      this.setState({creatingService:true})
    }
  }
  componentWillUnmount(){
    this.setState({open:false});
  }
  handleCreatedService = (task) => {
    // console.log(task);
    // this.props.onCreatedService();
    // var serviceReport = this.state.serviceReport;
    // serviceReport.push({
    //   sid:1,
    //   subject_service_report:"TEST",
    //   service_type_name:"",
    //   appointment:""
    // });
    this.props.onCreatedService();
    this.setState({openSnackbar:true,messageSnackbar:'Appointment Created'});
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
    var tmp = this.state.editData;
    tmp.request_taxi = (parseInt(value)+1)%2;
    this.setState({data:tmp});
  }

  toggleTaxiAssociate = (value, engineer) => {
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
    var data = {authen:{email:InfoGen.email,token:InfoGen.token},data:tmp, ticket_sid:tmp.ticket_sid};
    console.log(data);
    var that = this;
    jPost(Url.editServiceReport, data).then((res)=>{
        console.log(res);
        that.setState({editMode:false,editSid:null,editData:{}});
        that.props.loadNew();
    });
    // this.props.socket.emit('edit_task',data);
    // this.setState({editMode:false,editSid:null,editData:{}});
  }
  render(){
    const styles = {
      radioButton: {
        marginTop: 16,
      },
      chip: {margin:2}
    };
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleClose}
      />,
    ];

    var propsServiceReport = this.props.serviceReport;
    var serviceReport = [];
    // var listServiceReport;
    var chipServiceReport = [];

    var btnCreateServiceReport;
    // console.log(this.props.ticket);
    if(this.props.ticket.status=='5' || this.props.ticket.status==5){

    }else{
      if(this.state.editSid==null){
        btnCreateServiceReport =
        <span className="btn two" key={-1} onTouchTap={this.handleOpenCreatingService}>Create New Service Report</span>;
        // btnCreateServiceReport = (<Chip key={-1} onTouchTap={this.handleOpenCreatingService} style={styles.chip}>
        //   <Avatar color="#fff" icon={<ContentAdd />} />Create New Service Report</Chip>);
      }
    }

    for (let i = 0; i < propsServiceReport.length; i++) {

        var iconStatusService;
        if(propsServiceReport[i].last_status>400){
          iconStatusService = <SocialMood />
        }else{
          iconStatusService = <SocialSentimentNeutral/>
        }
        chipServiceReport.push(
          <Chip style={{margin:2,overflow: 'auto',maxWidth: '270px'}} key={i}>
          <Avatar icon={iconStatusService} />{propsServiceReport[i].subject_service_report}</Chip>
        );

        const items = [
          <MenuItem key={1} value={"1"} primaryText="Onsite" />,
          <MenuItem key={2} value={"2"} primaryText="Remote" />,
          <MenuItem key={3} value={"3"} primaryText="Document" />,
          <MenuItem key={4} value={"4"} primaryText="Meeting-Intranal" />,
          <MenuItem key={5} value={"5"} primaryText="Meeting-Extranal" />,
          <MenuItem key={6} value={"6"} primaryText="Pre-Install" />,
          <MenuItem key={7} value={"7"} primaryText="Testing" />,
        ];
        // console.log(this.state.editData);

        if(this.state.editSid==propsServiceReport[i].sid){
          // console.log(propsServiceReport[i]);

          var associateSelected = [];
          // var confirmStaff = [];
          this.state.editData.associate_engineer.forEach((item,i) => {

              associateSelected.push(
                <Chip style={styles.chip} key={item.engineer}
                  onRequestDelete={() => this.handleRequestDeleteAssociate(item.engineer)}>
                  <div style={{display:'flex'}}>
                    <div style={{flex:1}}>{item.engineer_name}</div>
                    <div style={{flex:1, marginLeft:15}}>
                      <a className="link" onTouchTap={()=>this.toggleTaxiAssociate(parseInt(item.request_taxi),item.engineer)}>{((parseInt(item.request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</a>
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
                <small><TextField hintText="Subject" onChange={(e)=>this.editSubject(e.target.value)} value={propsServiceReport[i].subject_service_report} fullWidth={true} /></small>
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
                <div><TextField hintText="Expect Duration" onChange={(e)=>this.editExpectDuration(e.target.value)} value={parseInt(propsServiceReport[i].expect_duration)} type="number" min={1} /></div>
              </div>

              <div style={{color:'#000000', marginTop:30}}><span style={{color:lightBlack,marginRight:10}}>Contact: </span>
                <small><TextField hintText="Name" onChange={(e)=>this.editContactName(e.target.value)} value={propsServiceReport[i].end_user_contact_name_service_report} fullWidth={true} /></small>
              </div>
              <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Email: </span>
                <small><TextField hintText="Email" onChange={(e)=>this.editContactEmail(e.target.value)} value={propsServiceReport[i].end_user_email_service_report} fullWidth={true} /></small>
              </div>
              <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Mobile: </span>
                <small><TextField hintText="Mobile" onChange={(e)=>this.editContactMobile(e.target.value)} value={propsServiceReport[i].end_user_mobile_service_report} fullWidth={true} /></small>
              </div>
              <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Phone: </span>
                <small><TextField hintText="Phone" onChange={(e)=>this.editContactPhone(e.target.value)} value={propsServiceReport[i].end_user_phone_service_report} fullWidth={true} /></small>
              </div>
              <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Company: </span>
                <small><TextField hintText="Company" onChange={(e)=>this.editContactCompany(e.target.value)} value={propsServiceReport[i].end_user_company_name_service_report} fullWidth={true} /></small>
              </div>
              <div style={{color:'#000000', marginTop:30}}>
                <span style={{color:lightBlack}}>Staff:</span>
                <Chip style={styles.chip}>
                  <div style={{color:'#000000',marginRight:10, display:'flex'}}>
                    <div style={{flex:1}}>{this.state.editData.engineer_name}</div>
                    <div style={{flex:1, marginLeft:15}}>
                      <a className="link" onTouchTap={()=>this.toggleTaxi(parseInt(this.state.editData.request_taxi))}>{(parseInt(this.state.editData.request_taxi)?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</a>
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
          //   <div><span style={{color:lightBlack,marginRight:10}}>Appointment: </span><small>{propsServiceReport[i].appointment}</small></div>
          //   <div><span style={{color:lightBlack,marginRight:10}}>Expect Duration (Hr.): </span>{propsServiceReport[i].expect_duration}</div>
          //   <div style={{color:'#000000'}}><span style={{color:lightBlack,marginRight:10}}>Staff:</span> {propsServiceReport[i].engineer_name}</div>
          //   {((propsServiceReport[i].associate_engineer.length>0)?<div style={{color:lightBlack,marginRight:10}}>Associate: {asso}</div>:'')}
          //   {pdfElement}
          // </div>
          serviceReport.push(
            <Paper zDepth={2} key={i} style={{padding:12,margin:12}}>
              <div style={{display:'flex'}}>
                <div style={{flex:1}}>{"Edit "+ propsServiceReport[i].no_task}</div>
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
          var pdfElement;
          if(propsServiceReport[i].path_service_report){
            pdfElement = <PresentData label={"PDF"} value={<a className="link" style={{fontStyle:'italic'}} target="new" href={END_POINT_PDF+propsServiceReport[i].path_service_report} >Service Report</a>} />
          }else{
            pdfElement = <PresentData label={"PDF"} value={"-"} />
          }
          var asso = propsServiceReport[i].associate_engineer.map((item,i)=>{
              return <div style={{}} key={i}>{item.engineer_name}
                      <a className="link" style={{marginLeft:15,fontStyle:'italic'}}>{(parseInt(item.request_taxi)?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</a>
                     </div>
          });

          var controlEditSr;
          if(propsServiceReport[i].can_edit==1 && propsServiceReport[i].create_by===InfoGen.email){
            controlEditSr = <div style={{display:'flex'}}>
              <div style={{width:60,textAlign:'right'}}><a className="link" onTouchTap={()=>{this.setEditMode(propsServiceReport[i].sid, propsServiceReport[i])}}><EditorBorderColor style={{color:'blue',width:14,height:14}} title="Edit" /> แก้ไข</a></div>
              <div style={{flex:1}}></div>
            </div>
          }else if(propsServiceReport[i].can_edit!=1){
            controlEditSr = <div style={{display:'flex'}}>
              <div style={{width:300,textAlign:'left'}}>ไม่สามารถแก้ไขได้เนื่องจาก Staff ทำการเริ่มงานแล้ว</div>
              <div style={{flex:1}}></div>
            </div>
          }else{
            controlEditSr = <div>ผู้มีสิทธิ์แก้ไข {propsServiceReport[i].create_by_name}</div>
          }

          var primaryText =
          <div>
              <PresentDataHeader label={controlEditSr} />
              <PresentData
                label={<div>Subject</div>}
                value={propsServiceReport[i].subject_service_report} />
              <PresentData label={"No."} value={propsServiceReport[i].no_task} />
              <PresentData label={"Type"} value={propsServiceReport[i].service_type_name} />
          </div>

          var engineer = <div>
            {propsServiceReport[i].engineer_name}
            <a className="link" style={{marginLeft:15,fontStyle:'italic'}}>{((parseInt(propsServiceReport[i].request_taxi))?"เบิกค่าเดินทาง":"ไม่เบิกค่าเดินทาง")}</a>
          </div>
          var secondaryText =
          <div style={{color:'#000000',marginBottom:0}}>
            <PresentData label="Appointment" value={propsServiceReport[i].appointment} />
            <PresentData label="Expect Duration (Hr.)" value={propsServiceReport[i].expect_duration} />
            <PresentData label="Staff" value={engineer} />

            {((propsServiceReport[i].associate_engineer.length>0)?<PresentData label="Associate" value={asso} />:'')}
            <div style={{color:'#000000', marginTop:0}}>
              <PresentData label={"Contact"} value={"Name: "+propsServiceReport[i].end_user_contact_name_service_report} />
              <PresentData label="" value={"Email: "+propsServiceReport[i].end_user_email_service_report} />
              <PresentData label="" value={"Mobile: "+propsServiceReport[i].end_user_mobile_service_report} />
              <PresentData label="" value={"Phone: "+propsServiceReport[i].end_user_phone_service_report} />
              <PresentData label="" value={"Company: "+propsServiceReport[i].end_user_company_name_service_report} />
            </div>
            {pdfElement}
            <PresentData label={"Taxi (Baht)"} value={<span>{propsServiceReport[i].taxi_fare_total}</span>} />
            <PresentData label={"Created"} value={<span>{propsServiceReport[i].create_by_name} {propsServiceReport[i].create_datetime}</span>} />
          </div>
          var avatar = <Avatar src={propsServiceReport[i].staff_pic} />
          serviceReport.push(
            <div key={i} style={{marginTop:20}}>
              {primaryText}
              {secondaryText}
              <div style={{backgroundColor:'#222222', height:5}}></div>
            </div>
          );
        }
    }

    var label;
    if(!this.state.open){
      label = <div style={{textAlign:'right'}}>
      <div style={{display:'flex',flexWrap:'wrap',float:'left'}}>{chipServiceReport}</div><div style={{clear:'both'}}></div></div>;
    }else{
      label = serviceReport;
    }
    var viewAppointment =
      <span style={{color:'#ffffff',marginLeft:10}}>
        <a className="link" style={{cursor:'pointer',marginLeft:5}} onTouchTap={()=>{this.setState({open:!this.state.open}) }} >
        ({this.props.serviceReport.length})
        View Detail</a>
        {btnCreateServiceReport}
      </span>

    var createAppointment;
    if(this.state.creatingService && this.state.editSid===null){
        createAppointment =
          <div>
              <ServiceReportCreate
                  createService={this.state.creatingService}
                  onCloseDialog={this.handleOpenCreatingService}
                  onCreatedService={this.handleCreatedService}
                  onStatusCreating={this.handleStatusCreating}
                  ticket_sid={this.props.ticket_sid}
                  projectContact={this.props.projectContact}
                  serviceReport={this.props.serviceReport}
                  listUserCanAddTask={this.props.listUserCanAddTask} />
          </div>
    }

    // <CardHeader>
    //   <CardHeaderTitle>
    //     <small style={{color:lightBlack}}>Service Report</small> <small>{viewAppointment}</small>
    //   </CardHeaderTitle>
    // </CardHeader>
    // <CardContent>
    //   <Content>
    //     <div>{createAppointment}</div>
    //     <div style={{maxHeight:450,overflow:'scroll'}}>{label}</div>
    //   </Content>
    // </CardContent>
    return (
      <div >
        <div>
            <PresentData label={"Service Report"} value={viewAppointment}  />
            <PresentDataHeader label={label} value={label}  />
            <PresentDataHeader label={createAppointment} value={createAppointment} />
        </div>
        <br/>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          onRequestClose={()=>{this.setState({openSnackbar:false})}}
        />
      </div>
    );
  }
}
// <Drawer openSecondary={true} width={'90%'} open={this.state.open} docked={false} onRequestChange={(open) => this.setState({open})}>
//     <div style={{minHeight:'200px'}}>
//       {listServiceReport}
//     </div>
// </Drawer>
// <Dialog contentStyle={{width:'90%','maxWidth':'none'}}
//   title="Service Report"
//   actions={actions}
//   modal={false}
//   open={this.state.open}
//   onRequestClose={this.handleClose}
//   autoScrollBodyContent={true}
// >
// </Dialog>
export default ServiceReportDialog;
