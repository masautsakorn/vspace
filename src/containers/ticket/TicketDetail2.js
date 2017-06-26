import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
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
import OwnerDialog2 from '../projectplan/OwnerDialog2';

import SocialPeople from 'material-ui/svg-icons/social/people';
// import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TicketChecklist from '../ticket/TicketChecklist';
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
class TicketDetail extends Component {
  constructor(props){
      super(props);

      this.state = {
        ticket_sid:this.props.ticket_sid,
        data: this.props.data,
        openFormSlaRemedy:false,
        toSlaStatus:0,
        openAppointment:false,
        tasks:[],initialTask:false,
        projectContact:[]
      };
      this.onSocket();
      // console.log(this.state);
  }
  handleOpenAppointment = () => {
    // this.setState({openAppointment:true});
    this.props.onOpenAppointment();
  }
  componentWillMount(){
    this.loadTasks();
  }
  componentUnDidMount = () => {
    // this.alert(1);
  }
  loadTasks = () => {
    // var formData = new FormData();
    // formData.append("email", InfoGen.email);
    // formData.append("token",InfoGen.token);
    // formData.append("ticket_sid",this.props.ticket_sid);
    // var that = this;
    // get(Url.tasks,formData).then(function(res){
    //   that.setState({tasks:res.data});
    // });
    var data = {
      authen: {
        token:InfoGen.token,email:InfoGen.email
      },
      data: {
        ticket_sid:this.state.ticket_sid
      }
    }
    this.props.socket.emit('task_detail', data);
    this.props.socket.emit('ticket_sla', data);
    this.props.socket.emit('ticket_contact', data);
  }
  componentDidMount(){

  }

  componentUnDidMount(){
  }
  onSocket = () => {
    var that = this;
    this.props.socket.on('task_detail_'+this.state.ticket_sid, function(res){
        // console.log('task_detail_',res);
        // if(res.length>0){
          that.setState({tasks:res,initialTask:true});
        // }
    });
    this.props.socket.on('ticket_sla_'+this.state.ticket_sid, function(res){
      var item = that.state.data;
      item.sla_remedy_array = res.sla;
      item.worklog = res.worklog;
      that.setState({data:item});
    });
    this.props.socket.on('ticket_contact_'+this.state.ticket_sid, function(res){
      // console.log('projectContact',res);
      that.setState({projectContact:res});
    });
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
    // this.props.data = tmp;
    // var formData = new FormData();
    // formData.append("email", InfoGen.email);
    // formData.append("token", InfoGen.token);
    // formData.append("man_days", newManDay);
    // formData.append("ticket_sid", this.state.ticket_sid);
    //
    // var tmp = this.state.data;
    // tmp.man_days = newManDay;
    that.setState({data:tmp});
    // Put(Url.changeMandaysCase, formData).then(function(res){
    //
    // });
  }

  handleCreatedService = () => {
    this.loadTasks();
  }
  editCaseInfo = (ticket_sid, data) => {
    console.log(ticket_sid);
    console.log(data);
  }
  render(){

    const iconStyles = {
      marginRight: 24,
    };
    const styles = {
      box: {
        'padding':'10px 10px',
        'margin':'0px 4px',
        // 'border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px',
        'background': '#ffffff',
        'borderRadius': '3px',
        fontSize:12
      },
      style: {
        margin: 4,
      },
      owner: {'textAlign':'right'},
      relative: {'position':'relative'},
      title: {
        cursor: 'pointer',
      },
      relative: {'position':'relative'},
      button: {margin:4,padding:4}
    }
    const style = { padding: '10px' };

    if(this.props.data!==null){

      var {data} = this.state;
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
      avatar = <div style={styles.relative}>{picAvatar}<small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

      var changeOwner = <div style={{textAlign:'left'}}>
        <OwnerDialog2 onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.props.listUserCanAddTask} />
      </div>;
      // console.log('data ticket detail',data);
      if(data.status==='5' || data.status===5){
        changeOwner = <div />;
      }
      var owner =
      <div>
        <Card isFullwidth>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>Owner</small>
            </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <small style={{color:lightBlack}}>
              <div style={{'height':'50px'}}>
                {avatar}
              </div>
              {changeOwner}
              </small>
            </Content>
          </CardContent>
        </Card>
      <br/>
      </div>;

      var serial;
      // if(InfoGen.email===this.state.data.create_by){
        serial = <Serial data={this.state.data} ticket_sid={this.state.ticket_sid} socket={this.props.socket} />;
      // }

      var jobData;
      if(!this.state.initialTask){
        jobData = <div>Loading...</div>
      }else{
        jobData = <ServiceReportDialog
          socket={this.props.socket}
          ticket={data}
          onOpenAppointment={this.handleOpenAppointment}
          serviceReport={this.state.tasks}
          onCreatedService={this.handleCreatedService}
          ticket_sid={this.props.ticket_sid}
          projectContact={this.state.projectContact}
          listUserCanAddTask={this.props.listUserCanAddTask}  />
      }
      var control_service_report =
        <div>
          <div>{jobData}</div>
        </div>;

      var manDaysCase = (data.man_days)?data.man_days:'0';
      var textFieldManHours = <TextField type="number" min={1} value={manDaysCase} onChange={this.handleManDaysCase} hintText="Man Hours" />;
      if(data.status==='5' || data.status===5){
        textFieldManHours = <div>{manDaysCase}</div>;
      }
      var control_manday;
        control_manday =
        <div>
            <Card isFullwidth>
              <CardHeader>
                <CardHeaderTitle>
                  <small style={{color:lightBlack}}>Estimate Man-Hours (Hours.)</small>
                </CardHeaderTitle>
              </CardHeader>
              <CardContent>
                <Content>
                <div style={{'textAlign':'left'}}>
                    {textFieldManHours}
                </div>
                </Content>
              </CardContent>
            </Card>
            <br/>
        </div>;

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
          console.log(data.sla_remedy_array);
          if(data.sla_remedy_array.length>0){
            slaRow.push(
              <CardFooter key={-1} style={{marginBottom:'10px', width:'100%'}}>
                <CardFooterItem style={{overflow:'hidden'}}><span style={{color:grey400}}>SLA Name</span></CardFooterItem>
                <CardFooterItem style={{overflow:'hidden'}}><span style={{color:grey400}}>Due Datetime</span></CardFooterItem>
                <CardFooterItem style={{overflow:'hidden'}}><span style={{color:grey400}}>Status</span></CardFooterItem>
              </CardFooter>
            );
          }
        }else{
          <CardFooter key={-1} style={{marginBottom:'10px', width:'100%'}}>
            <div>SLA (CCD) Not Measured</div>
          </CardFooter>
        }
        data.sla_remedy_array.forEach((item,i)=>{
          slaRow.push(
              <CardFooter key={i} style={{marginBottom:'10px', width:'100%'}}>
                <CardFooterItem style={{overflow:'hidden',color:'#000000'}}>{item.name}</CardFooterItem>
                <CardFooterItem style={{overflow:'hidden',color:'#000000'}}>{item.due_datetime}</CardFooterItem>
                <CardFooterItem style={{overflow:'hidden',color:'#000000'}}>{item.status}</CardFooterItem>
              </CardFooter>
          )
        });

        btnActivitySlaRemedy =
        <div>
          <div>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:2, toSlaTxt:'Response'});}} style={styles.button}>Response</RaisedButton>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:7, toSlaTxt:'Onsite'});}} style={styles.button}>Onsite</RaisedButton>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:11, toSlaTxt:'No Onsite'});}} style={styles.button}>No Onsite</RaisedButton>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:3, toSlaTxt:'Workaround'});}} style={styles.button}>Workaround</RaisedButton>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:10, toSlaTxt:'No Workaround'});}} style={styles.button}>No Workaround</RaisedButton>
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:5, toSlaTxt:'Resolve'});}} style={styles.button}>Resolve</RaisedButton>
            <RaisedButton  onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:4, toSlaTxt:'Pending'});}} style={styles.button}>Pending</RaisedButton>
          </div>
        </div>;

        SLA =
        <Card style={{width:'100%'}}>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>SLA (Call Center Department)</small>
            </CardHeaderTitle>
          </CardHeader>
          {slaRow}
        </Card>
      }else{
        SLA = <TicketControlStatus ticket_sid={this.props.ticket_sid} data={this.props.data} />;
      }
      // END SLA

      //WORKLOG ZONE
      var worklog = [];
      // console.log(data.worklog);
      if(data.worklog){
        data.worklog.forEach((item,i)=>{
            worklog.push(<div key={i}><Avatar src={item.create_by_pic} /> {item.worklog} <br/><small style={{fontSize:'70%'}}>Created {item.create_datetime}</small></div>);
        });
      }
      var worklogElement =
      <Card isFullwidth>
        <CardHeader>
          <CardHeaderTitle>
            <small style={{color:lightBlack}}>Worklog</small>
          </CardHeaderTitle>
        </CardHeader>
        <CardContent>
          <Content>
            {worklog}
          </Content>

          <div>{slaRemedy}</div>
          <div>
            {btnActivitySlaRemedy}
            <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton>
          </div>
        </CardContent>
      </Card>

      control_status_ticket =
      <div>
        {SLA}
        <div>{worklogElement}</div>
      </div>;

      return(
        <div >
            <div style={[styles.box,{fontSize:12}]}>
                <Columns>
                  <Column size="isOneThird" style={style}>
                    <Card isFullwidth>
                      <CardHeader>
                          <div style={{display:'flex', width:'100%',color:lightBlack,margin: 'auto 10px'}}>
                            <div style={{flex:1,margin:'auto',color:lightBlack}}>{data.subject}</div>
                            <div style={{width:15, textAlign:'right'}}>
                              <small onTouchTap={()=>{this.editCaseInfo(data.sid, data)}}><EditorBorderColor style={{width:16}} /></small>
                            </div>
                          </div>
                      </CardHeader>
                      <CardContent style={{fontSize:13}}>
                        <Content>
                          <small>
                            <div>
                              <label style={{color:lightBlack}}>No.:</label>
                              <div style={{float:'right',color:'#000'}}>{data.no_ticket}
                                <small style={{color:lightBlack}}>{data.refer_remedy_hd}</small>
                              </div>
                            </div>
                            <div><label style={{color:lightBlack}}>Contract:</label>
                              <div style={{float:'right',color:'#000'}}>{data.contract_no}</div>
                            </div>
                            <div><label style={{color:lightBlack}}>Serial:</label>
                              <div style={{float:'right',color:'#000'}}>{data.serial_no}</div>
                            </div>
                            <div><label style={{color:lightBlack}}>Urgency:</label>
                              <div style={{float:'right',color:'#000'}}>{data.urgency}</div>
                            </div>
                            <div><label style={{color:lightBlack}}>Type:</label>
                              <div style={{float:'right',color:'#000'}}>{data.case_type}</div>
                            </div>
                            <div><label style={{color:lightBlack}}>End User:</label>
                              <div style={{float:'right',color:'#000'}}>{data.end_user}</div>
                            </div>
                            <div><label style={{color:lightBlack}}>Site:</label>
                              <div style={{float:'right',color:'#000'}}>{data.end_user_site}</div>
                            </div>
                            <div style={{clear:'both'}}></div>
                          </small>
                        </Content>
                        <Divider />
                        <Content>
                            <br/>
                            <div>Contact User</div>
                            <div><label style={{color:lightBlack}}>Name:</label> <div style={{float:'right',color:'#000'}}>{data.end_user_contact_name}</div></div>
                            <div><label style={{color:lightBlack}}>Email:</label> <div style={{float:'right',color:'#000'}}>{data.end_user_email}</div></div>
                            <div><label style={{color:lightBlack}}>Mobile:</label> <div style={{float:'right',color:'#000'}}>{data.end_user_mobile}</div></div>
                            <div><label style={{color:lightBlack}}>Phone:</label> <div style={{float:'right',color:'#000'}}>{data.end_user_phone}</div></div>
                            <div><label style={{color:lightBlack}}>Company:</label> <div style={{float:'right',color:'#000'}}>{data.end_user_company_name}</div></div>
                            <div style={{clear:'both'}}></div>
                        </Content>
                      </CardContent>
                    </Card>
                    <br/>
                    {owner}
                    {control_manday}
                  </Column>
                  <Column style={style}>
                    {control_service_report}
                    {serial}
                    {checkList}
                    {control_status_ticket}
                  </Column>
                </Columns>
                <div style={{'textAlign':'right'}}><small>Created {data.create_datetime}</small></div>
            </div>
        </div>
      );
    }else{
      return(<div />);
    }
  }
}
export default TicketDetail;
