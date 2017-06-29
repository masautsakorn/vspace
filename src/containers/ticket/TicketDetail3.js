import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import jPost from '../../config/jPost';
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
import CircularProgress from 'material-ui/CircularProgress';

import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import OwnerDialog from '../projectplan/OwnerDialog';
import OwnerDialog2 from '../projectplan/OwnerDialog2';

import SocialPeople from 'material-ui/svg-icons/social/people';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
// import TicketChecklist from '../ticket/TicketChecklist';
import TicketControlStatus from '../ticket/TicketControlStatus';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';

import { Columns,Column } from 're-bulma';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';

import ServiceReportDialog from '../projectplan/ServiceReportDialog2';
import TicketSlaRemedy from '../ticket/TicketSlaRemedy';
import Serial from '../ticket/Serial';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import {PresentData, PresentDataHeader,PresentDataBody} from '../management/PresentData';

import OraclePart from '../components/OraclePart';

import SosStatus from '../ticket/SosStatus';
import SosCiInformation from '../ticket/SosCiInformation';

class TicketDetail extends Component {
  constructor(props){
      super(props);

      this.state = {
        ticket_sid:this.props.ticket_sid,
        // data: this.props.data,
        data:{},
        openFormSlaRemedy:false,
        toSlaStatus:0,
        openAppointment:false,
        tasks:[],
        initialTask:false,
        projectContact:[],
        editManHours:false,new_man_hours:0,
        editEndUser:false,
        end_user_company_name:'',
        end_user_contact_name:'',
        end_user_email:'',
        end_user_mobile:'',
        end_user_phone:'',
      };
      // console.log(this.state);
  }
  handleOpenAppointment = () => {
    // this.setState({openAppointment:true});
    this.props.onOpenAppointment();
  }
  componentWillMount(){
    // console.log('componentWillMount',this.props);
    // this.props.emptyData();
    // this.props.caseDetail(this.props.ticket_sid);
    this.loadTicket();
    this.loadTasks();
  }
  componentUnDidMount = () => {

  }
  loadTicket = () => {
    var that = this;
    var data = {
      token:InfoGen.token,email:InfoGen.email,
      ticket_sid:this.state.ticket_sid
    }
    jPost(Url.ws_ticketDetail, data).then((res)=>{
      that.setState({data:res.data,tasks:res.tasks,initialTask:true});
    });
  }
  loadTasks = () => {
    var data = {
      authen: {
        token:InfoGen.token,email:InfoGen.email
      },
      data: {
        ticket_sid:this.state.ticket_sid
      }
    }
  }

  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {
    var tmp = this.state.data;
    tmp.owner_thainame = thainame;
    tmp.pic_full = pic_employee;

    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('ticket_sid', this.state.ticket_sid);
    formData.append('new_owner', email);
    var that = this;
    get(Url.editOwnerCase,formData).then(function(res){
      that.setState({open:false,data:tmp});
    });
  }

  handleManDaysCase = (e) => {
    var that = this;
    var newManDay = e.currentTarget.value;
    var tmp = this.props.data;
    tmp.man_days = newManDay;
    var data = {authen:{email:InfoGen.email, token:InfoGen.token},data:tmp,ticket_sid:this.state.ticket_sid};
    this.props.socket.emit('update_ticket', data);
    that.setState({data:tmp});
  }

  handleCreatedService = () => {
    this.loadTasks();
  }
  cManHours = (sid, new_man_hours)=>{
      var that = this;
      var data = {token:InfoGen.token,email:InfoGen.email,ticket_sid:sid,new_man_hours:new_man_hours};
      jPost(Url.cManHours, data).then((res)=>{
          that.setState({data:res.data,tasks:res.tasks,initialTask:true,editManHours:false});
      });
  }
  cEndUser = (sid, name, email, mobile, phone, company)=>{
      var that = this;
      var data = {token:InfoGen.token,email:InfoGen.email,ticket_sid:sid,eu_name:name,eu_email:email, eu_mobile:mobile, eu_phone:phone,eu_company:company};
      jPost(Url.cEndUser,data).then((res)=>{
        that.setState({data:res.data,tasks:res.tasks,initialTask:true,
          editManHours:false,editEndUser:!this.state.editEndUser});
      });
  }
  editCaseInfo = (ticket_sid, data) => {
    console.log(ticket_sid);
    console.log(data);
  }
  render(){

    const iconStyles = {
      marginRight: 24,
    };
    const style = { padding: '10px' };

    var data = this.state.data;
    var tasks = this.state.tasks;
    if(data.sid == this.props.ticket_sid){
      // console.log(this.props.caseState);
      // var data = this.props.caseState.data;
      // var tasks = this.props.caseState.tasks;
      // console.log(data);
      var avatar;
      var labelOwnerCase = (data.owner_thainame)?(data.owner_thainame):'Owner?';
      var picAvatar;
      // console.log(data);
      if(data.owner_picture_profile){
        picAvatar = <Avatar src={data.owner_picture_profile} />
      } else if(data.owner){
        picAvatar = <Avatar>{data.owner.toUpperCase().charAt(0)+''+data.owner.toUpperCase().charAt(1)}</Avatar>
      } else{
        picAvatar = <Avatar src={this.props.info.pic_full} />
        labelOwnerCase = (this.props.info.thainame)?(this.props.info.thainame):'Owner?';
      }

      var changeOwner = <div style={{textAlign:'left'}}>
        <OwnerDialog2 onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.props.listUserCanAddTask} />
      </div>;
      // console.log('data ticket detail',data);
      if(data.status==='5' || data.status===5){
        changeOwner = <div />;
      }
      // <div style={{}}>{picAvatar}</div>
      avatar = <div style={{display:'flex'}}>
        <div style={{}}>{labelOwnerCase} </div>
      </div>;

      var owner = <PresentData label={"Owner"} value={avatar} optional={changeOwner} />

      var serial;
      if(InfoGen.email===this.state.data.create_by && InfoGen.add_serial){
        serial = <Serial data={this.state.data} ticket_sid={this.state.ticket_sid} socket={this.props.socket} />;
      }

      var jobData;
      // if(!this.state.initialTask){
        // jobData = <PresentData label={"Loading..."} />
      // }else{
        jobData = <ServiceReportDialog
          loadNew={this.loadTicket}
          ticket={data}
          onOpenAppointment={this.handleOpenAppointment}
          serviceReport={tasks}
          onCreatedService={this.handleCreatedService}
          ticket_sid={this.props.ticket_sid}
          projectContact={this.state.projectContact}
          listUserCanAddTask={this.props.listUserCanAddTask}  />
      // }
      var control_service_report =
        <div>
          <div>{jobData}</div>
        </div>;

      var manDaysCase = (data.man_days)?data.man_days:'0';
      var editManHours = null;
      if(this.state.editManHours){
          editManHours = <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <div style={{marginTop:5}}>New Man Hours</div>
            </div>
            <div style={{flex:1}}>
              <input type="number" style={{width:'50px'}}
                min={1} value={this.state.new_man_hours} onChange={(e)=>this.setState({new_man_hours:e.target.value})}  />
            </div>
            <div style={{flex:2}}>
              <div style={{display:'flex'}}>
                <div style={{textAlign:'center', margin:'1px 0px 1px 5px', flex:1}}
                  onTouchTap={()=>this.cManHours(this.props.ticket_sid, this.state.new_man_hours)} className="btn four">SAVE
                </div>
                <div style={{textAlign:'center', margin:'1px 0px 1px 5px',flex:1}}
                  onTouchTap={()=>this.setState({editManHours:!this.state.editManHours}) } className="btn five">CANCEL
                </div>
              </div>
            </div>
          </div>
      }
      // this.props.cManHours(this.props.ticket_sid,e.target.value
      var textFieldManHours =
        <div>
          <div style={{display:'flex'}}>
            <div style={{width:'90%'}}>{manDaysCase}</div>
            <div style={{flex:1,textAlign:'right'}} onTouchTap={()=>this.setState({editManHours:!this.state.editManHours})}><EditorBorderColor style={{width:12}} /></div>
          </div>
          {editManHours}
        </div>;

      if(data.status==='5' || data.status===5){
        textFieldManHours = <div>{manDaysCase}</div>;
      }
      var control_manday;
      control_manday = <PresentData label={<div>Estimate Man-Hours (Hours.) </div>} value={textFieldManHours} />

      var checkList;// = <TicketChecklist sid={data.sid} item={data} />;

      var slaRemedy;
      if(this.state.openFormSlaRemedy){
        slaRemedy = <CardContent style={{border:'1px solid #dedede'}}><TicketSlaRemedy ticket_sid={this.state.ticket_sid} cancelSlaRemedy={()=>{this.setState({openFormSlaRemedy:false}) }} status={this.state.toSlaStatus} statusTxt={this.state.toSlaTxt} /></CardContent>;
      }

      //SLA
      var SLA;
      var control_status_ticket;
      var slaRow = [];
      var btnActivitySlaRemedy;
      if(typeof(data.sla_remedy_array) !=='undefined' && data.sla_remedy_array && data.sla_remedy_array.length>0){
        if(data.refer_remedy_hd){
          // console.log(data.sla_remedy_array);
          if(data.sla_remedy_array.length>0){
            slaRow.push(
              <div key={-1} style={{display:'flex', marginBottom:'10px', width:'100%'}}>
                <div style={{flex:1,overflow:'hidden'}}><span >SLA Name</span></div>
                <div style={{flex:1,overflow:'hidden'}}><span >Due Datetime</span></div>
                <div style={{flex:1,overflow:'hidden'}}><span >Status</span></div>
              </div>
            );
          }
        }else{
          <CardFooter key={-1} style={{marginBottom:'10px', width:'100%'}}>
            <div>SLA (CCD) Not Measured</div>
          </CardFooter>
        }
        data.sla_remedy_array.forEach((item,i)=>{
          slaRow.push(
              <div key={i} style={{display:'flex',marginBottom:'10px', width:'100%'}}>
                <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.name}</div>
                <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.due_datetime}</div>
                <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.status}</div>
              </div>
          );
          if(data.sla_remedy_array.length===(i+1)){
            console.log(data.expect_pending);
            if(data.expect_pending){
              slaRow.push(
                <div key={data.sid} style={{display:'flex',marginBottom:'10px', width:'100%', backgroundColor:'#ff4081', padding:4}}>
                  <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{"Expect Pending"}</div>
                  <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{data.expect_pending}</div>
                  <div style={{flex:1}}></div>
                </div>
              );
            }
          }
        });
        // console.log(data.expect_pending);
        btnActivitySlaRemedy =
        <div>
          <div>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:2, toSlaTxt:'Response'});}} style={styles.button}>Response</RaisedButton></div>
              <div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton></div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:7, toSlaTxt:'Onsite'});}} style={styles.button}>Onsite</RaisedButton>
              </div>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:11, toSlaTxt:'No Onsite'});}} style={styles.button}>No Onsite</RaisedButton>
              </div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:3, toSlaTxt:'Workaround'});}} style={styles.button}>Workaround</RaisedButton>
              </div>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:10, toSlaTxt:'No Workaround'});}} style={styles.button}>No Workaround</RaisedButton>
              </div>
            </div>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <RaisedButton  onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:4, toSlaTxt:'Pending'});}} style={styles.button}>Pending</RaisedButton>
              </div>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:5, toSlaTxt:'Resolve'});}} style={styles.button}>Resolve</RaisedButton>
              </div>
            </div>
          </div>
        </div>;

        // Call Center Department
        SLA =
        <div style={{width:'100%'}}>
          <PresentData label="SLA"
            value={slaRow} />
        </div>
      }else{
        btnActivitySlaRemedy = <div style={{display:'flex'}}><div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton></div><div style={{flex:1}}></div></div>
        SLA = <TicketControlStatus loadNew={this.loadTicket} ticket_sid={this.props.ticket_sid} data={this.state.data} />;
      }
      // END SLA

      //WORKLOG ZONE
      var worklog = [];
      // console.log(data.worklog);
      if(data.worklog){
        data.worklog.forEach((item,i)=>{
            worklog.push(
              <div key={i} style={{display:'flex', marginBottom:10, borderBottom:'1px solid #ffffff'}}>
                <div style={{width:'60px'}}><Avatar src={item.create_by_pic} /></div>
                <div style={{flex:1}}>
                  {item.worklog}<br/>
                  <small style={{fontSize:'70%'}}>Created {item.create_datetime}</small>
                </div>
              </div>
            );
        });
      }

      var contetnSlaRemedy = <div>
          <div style={{marginBottom:10}}>{slaRemedy}</div>
          <div>
            {btnActivitySlaRemedy}
          </div>
      </div>;

      var worklogElement =
      <div>
        <PresentDataBody label={""} value={contetnSlaRemedy} />
        <PresentDataBody label={"Worklog"} value={worklog} />
      </div>

      control_status_ticket =
      <div style={{marginBottom:10}}>
        {SLA}
        <div>{worklogElement}</div>
      </div>;

      var addOraclePart;
      if(this.props.info.aop==="1"){
        addOraclePart = <div ><PresentDataBody label={"Oracle Backline"} value={<OraclePart info={this.props.info} ticket_sid={this.props.ticket_sid} />} /></div>
      }

      var sosCiInformation;
      if(this.props.info.sos_ci_information==="1"){
        sosCiInformation = <div style={{marginTop:25}}><PresentDataBody label={"CI Information"} value={<SosCiInformation info={this.props.info} ticket_sid={this.props.ticket_sid} />} /></div>
      }
      return(
        <div >
            <div style={[styles.box,{fontSize:12}]}>
                <div className="row">
                  <div className="col-xs-12 col-sm-5 col-md-5 col-lg-5 col-md m-b-15">
                    <div >
                      {
                        // <CardHeader>
                        //     <div style={{display:'flex', width:'100%',color:lightBlack,margin: 'auto 10px'}}>
                        //       <div style={{flex:1,margin:'auto',color:lightBlack}}>{data.subject}</div>
                        //       <div style={{width:15, textAlign:'right'}}>
                        //         <small onTouchTap={()=>{this.editCaseInfo(data.sid, data)}}><EditorBorderColor style={{width:16}} /></small>
                        //       </div>
                        //     </div>
                        // </CardHeader>
                      }
                      <div style={{fontSize:13}}>
                        <div style={{marginBottom:15}}>
                            <PresentData label={"Subject"} value={data.subject}  />
                            <PresentData label={"No."} value={data.no_ticket+ ((data.refer_remedy_hd)?" ("+data.refer_remedy_hd+")":"")} />
                            <PresentData label={"Contract"} value={data.contract_no} />
                            <PresentData label={"Serial"} value={data.serial_no} />
                            <PresentData label={"Urgency"} value={data.urgency} />
                            <PresentData label={"Type"} value={data.case_type} />
                            <PresentData label={"End user"} value={data.end_user} />
                            <PresentData label={"Site"} value={data.end_user_site} />
                            <PresentData label={"Description"} value={data.description} />
                            <div style={{clear:'both'}}></div>
                        </div>

                        <div style={{marginTop:10}}>
                          {owner}
                        </div>
                        <div>
                          {control_manday}
                        </div>
                        <div>
                          <PresentData label={"Created"} value={((data.created_name)?data.created_name:data.report_by_name)+' '+data.create_datetime} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-xs-12 col-sm-7 col-md-7 col-lg-7 col-md m-b-15">
                    <div style={{fontSize:12}}>
                      {control_service_report}
                      {serial}
                      {checkList}
                      {
                        (this.props.info.sos_status==1)?
                        <SosStatus data={data} info={this.props.info} ticket_sid={this.props.ticket_sid} loadNew={this.loadTicket} />:
                        control_status_ticket
                      }
                      {addOraclePart}

                      <div style={{marginTop:25}}>
                          <PresentDataHeader label={
                            <div style={{display:'flex'}}>
                              <div style={{flex:1}}>Contact User</div>
                              <div style={{flex:1,textAlign:'right'}}>
                                <EditorBorderColor onTouchTap={
                                  ()=>this.setState({
                                    editEndUser:!this.state.editEndUser,
                                    end_user_company_name:data.end_user_company_name,
                                    end_user_contact_name:data.end_user_contact_name,
                                    end_user_email:data.end_user_email,
                                    end_user_mobile:data.end_user_mobile,
                                    end_user_phone:data.end_user_phone
                                  })
                                } style={{width:12}} />
                              </div>
                            </div>
                          }  />
                          {
                            (this.state.editEndUser)?
                              <div>
                                  <PresentData label={"Name"} value={
                                    <input style={{width:'100%'}} onChange={(e)=>this.setState({end_user_contact_name:e.target.value})} value={this.state.end_user_contact_name} />
                                  } />
                                  <PresentData label={"Email"} value={
                                    <input style={{width:'100%'}} onChange={(e)=>this.setState({end_user_email:e.target.value})} value={this.state.end_user_email} />
                                  } />
                                  <PresentData label={"Mobile"} value={
                                    <input style={{width:'100%'}} onChange={(e)=>this.setState({end_user_mobile:e.target.value})} value={this.state.end_user_mobile} />
                                  } />
                                  <PresentData label={"Phone"} value={
                                    <input style={{width:'100%'}} onChange={(e)=>this.setState({end_user_phone:e.target.value})} value={this.state.end_user_phone} />
                                  } />
                                  <PresentData label={"Company"} value={
                                    <input style={{width:'100%'}} onChange={(e)=>this.setState({end_user_company_name:e.target.value})} value={this.state.end_user_company_name} />
                                  } />
                                  <PresentData label={""} value={
                                    <div>
                                      <span className="btn four" onTouchTap={
                                        ()=>{
                                            this.cEndUser(
                                            this.state.ticket_sid,
                                            this.state.end_user_contact_name,
                                            this.state.end_user_email,
                                            this.state.end_user_mobile,
                                            this.state.end_user_phone,
                                            this.state.end_user_company_name);
                                            // this.setState({editEndUser:!this.state.editEndUser});
                                        }
                                      }>SAVE</span>
                                      <span className="btn five" onTouchTap={()=>this.setState({editEndUser:!this.state.editEndUser})}>CANCEL</span>
                                    </div>
                                  } />
                              </div>
                            :
                              <div>
                                <PresentData label={"Name"} value={data.end_user_contact_name} />
                                <PresentData label={"Email"} value={data.end_user_email} />
                                <PresentData label={"Mobile"} value={data.end_user_mobile} />
                                <PresentData label={"Phone"} value={data.end_user_phone} />
                                <PresentData label={"Company"} value={data.end_user_company_name} />
                              </div>
                          }

                          <div style={{clear:'both'}}></div>
                      </div>

                      {sosCiInformation}
                    </div>
                  </div>

                </div>
            </div>
        </div>
      );
    }else{
      return(<div><CircularProgress /></div>);
    }
  }
}
var styles = {
  button: {
    margin:'0px 4px 4px 0px',width:'99%'
  },
  header: {
    display:'flex',
    // padding:'10px 0px'
  },
  headerLeft: {
    flex:1,
    display:'flex'
  },
  headerRight: {
    flex:1,
    display:'flex'
  },
  body: {
    display:'flex',
    // padding:'10px 0px'
  },
  bodyTwo:{
    flex:2
  },
  bodyThree: {
    flex:3
  },
  bodyOne: {
    flex:1
  },
  bodyWidth100Right: {
    width:120,
    textAlign:'right'
  },
  bodyWidth100: {
    width:100,
    textAlign:'left'
  },
  label:{
    padding:10, backgroundColor:'rgb(236, 240, 241)', color:'#000000',width:'100%',borderBottom:'1px solid #fcfcfc', height:'100%'
  },
  value:{
    padding:10, backgroundColor:'#00bcd4', color:'#ffffff',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc',height:'100%'
  },
  taskSubject: {
    padding:12, backgroundColor:'rgb(236, 240, 241)', color:'#000000',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskHeader: {
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskFooter: {
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc',
    // marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    height:40
  },
  btnStyle: {
    backgroundColor:'rgb(52, 152, 219)',
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  },
  btnStyleCancel: {
    backgroundColor:'rgb(243, 156, 18)',
    marginLeft:5,
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  }
}

// import {SET_DATA,SET_DATA_DETAIL,EMPTY_DATE,SET_MAN_HOURS,CHANGE_END_USER} from '../actions/case/CaseAction';
//
// const mapStatetoProps = (state) => {
//     return {
//       caseState: state.CaseReducer,
//     }
// }
// const mapDispatchtoProps = (dispatch) => {
//   console.log(dispatch);
//   return {
//     caseDetail: (sid)=> {
//       dispatch(CASE_DETAIL(sid,Url.ws_ticketDetail, {token:InfoGen.token,email:InfoGen.email,ticket_sid:sid})).then((res)=>{
//         // console.log(res);
//         dispatch(SET_DATA_DETAIL(res.payload));
//       });
//     },
//     emptyData: ()=>{
//       dispatch(EMPTY_DATE());
//     },
//     cManHours: (sid,new_man_hours)=>{
//       var data = {token:InfoGen.token,email:InfoGen.email,ticket_sid:sid,new_man_hours:new_man_hours};
//       dispatch(SET_MAN_HOURS(sid,Url.cManHours,data)).then((res)=>{
//         dispatch(SET_DATA(res.payload));
//       });
//     },
//     cEndUser: (sid, name, email, mobile, phone, company)=>{
//       var data = {token:InfoGen.token,email:InfoGen.email,
//         ticket_sid:sid,eu_name:name,eu_email:email, eu_mobile:mobile, eu_phone:phone,eu_company:company};
//       dispatch(CHANGE_END_USER(sid,Url.cEndUser,data)).then((res)=>{
//         dispatch(SET_DATA(res.payload));
//       });
//     }
//   }
// }

export default TicketDetail;
