import React, { Component } from 'react';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import TicketDrawer from '../ticket/TicketDrawer';
import TicketDetail from '../ticket/TicketDetail3';
import { Columns,Column } from 're-bulma';
import Drawer from 'material-ui/Drawer';
import FlatButton from 'material-ui/FlatButton';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ServiceReportCreate from '../projectplan/ServiceReportCreate';

class TicketItem extends Component {
  constructor(props){
    super(props);
    // console.log(this.props.item);
    this.state = {item:this.props.item,openTicketDrawer:false,data_ticket_detail:null,
      listUserCanAddProject:this.props.listUserCanAddProject,
      listUserCanAddTask:this.props.listUserCanAddTask,
      openAppointment:false,ticket_sid:this.props.item.sid
    };
  }
  componentDidMount(){
    // this.callDataTicket(this.state.item.sid);
  }
  handleOpenTicketDrawer = () => {
    var that = this;
    // this.callDataTicket(this.state.item.sid);
    that.setState({ticket_sid:that.state.item.sid, data_ticket_detail:that.state.item,openTicketDrawer:true});

    // this.setState({openTicketDrawer:true});
    // console.log(this.state);
  }

  callDataTicket(ticket_sid){
    if(this.props.ticket_sid!==null){
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token", InfoGen.token);
      formData.append("ticket_sid", ticket_sid);
      var that = this;
      // get(Url.ticketDetail,formData).then(function(res){
        // console.log(res);
        that.setState({ticket_sid:ticket_sid, data_ticket_detail:that.state.item,
          // listUserCanAddProject:res.canAssignTo
        });
        that.setState({openTicketDrawer:true});
      // });
    }
  }
  handleOpenAppointment = () => {
    this.setState({openAppointment:true});
  }
  handleCreatedService = (task) => {
    console.log(task);
    var tmp = this.state.item;
    tmp.task = task;
    this.setState({item:tmp});
  }
  render(){
    const styles = {
      styleBorder: {
        border: '1px solid #fafbf9',
        height:180,
        borderRadius: '3px',
        // margin:'10px 10px 0px 10px'
        backgroundColor: '#fafbfc'
      },
      title: {
        cursor: 'pointer',
      },
    }
    var item = this.state.item;

    var ticketDetail;
    if(this.state.data_ticket_detail){
      ticketDetail =
      <Drawer docked={true} width={"100%"} onRequestChange={(openTicketDrawer) => this.setState({openTicketDrawer})}
      openSecondary={true}  open={this.state.openTicketDrawer} >
        <div>
          <AppBar style={{marginBottom:10}}
            title={<span style={styles.title}>{this.state.item.subject}</span>}
            iconElementLeft={<IconButton onTouchTap={()=>{ this.setState({openTicketDrawer:false}) }}><NavigationClose /></IconButton>}
          />
          <div style={{margin:10, flex:1}} className="boxSizing">
            <TicketDetail info={this.props.info} onOpenAppointment={this.handleOpenAppointment} listUserCanAddProject={this.state.listUserCanAddProject}
            listUserCanAddTask={this.props.listUserCanAddTask} socket={this.props.socket}
            projectContact={this.state.item.contactPeople}
             ticket_sid={this.state.item.sid} data={this.state.item} />
          </div>
        </div>
      </Drawer>
    }

    var avatarCreated = <Avatar src={item.owner_picture_profile} />;

    var avatarOwner;
    if(item.owner_picture_profile){
      avatarOwner = <Avatar style={{width:'90%', height:'initial'}} src={item.owner_picture_profile} />;
    }else{
      avatarOwner = <Avatar>{item.owner.toUpperCase().charAt(0)+''+item.owner.toUpperCase().charAt(1)}</Avatar>
    }
    var status;
    if(item.status==="1"){
      status = <div><small style={{color:lightBlack}}>Status: <span >New</span></small></div>;
    }else if(item.status==="5"){
      status = <div><small style={{color:lightBlack}}>Status: <span style={{color:lightBlack}}>Done</span></small></div>;
    }else if(item.status==="4"){
      status = <div><small style={{color:lightBlack}}>Status: <span>Pending</span></small></div>
    }else{
      status = <div><small style={{color:lightBlack}}>Status: <span style={{color:lightBlack}}>Doing</span></small></div>;
    }

    // var createAppointment;
    // console.log(this.state.openAppointment);
    // <Drawer openSecondary={true} width={'100%'} open={this.state.openAppointment} docked={false} onRequestChange={(openAppointment) => this.setState({openAppointment})}>
    // if(this.state.openAppointment){
    //     createAppointment =
    //       <div>
    //           <ServiceReportCreate createService={true} onCloseDialog={()=>this.setState({openAppointment:false})}
    //               onCreatedService={this.handleCreatedService} onStatusCreating={this.handleStatusCreating}
    //               caseSid={this.state.ticket_sid} projectContact={this.state.item.contactPeople} serviceReport={this.props.serviceReport}
    //               listUserCanAddProject={this.props.listUserCanAddProject} />
    //       </div>
    // }
    // </Drawer>

    return(
      <div style={styles.styleBorder}>
        <Paper onTouchTap={this.handleOpenTicketDrawer} zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
          <Column style={{width:'30%',float: 'left',marginTop: 0,paddingTop: 0}}>
            {avatarOwner}
          </Column>
          <Column style={{textAlign:'right'}}>
            <div style={{overflow:'hidden',height:'80px'}}><small>{item.no_ticket} {item.subject}</small></div>
            <div style={{color:lightBlack,height:16,overflow:"hidden"}}><small>{item.contract_no} {item.case_type}</small></div>
            <div style={{color: lightBlack, height:16, overflow:'hidden'}}><small>{item.end_user}</small></div>
            <div>{status}</div>
            <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:20,bottom:8}}>
              <small style={{fontSize:'9px'}}>Created {item.create_datetime}</small>
            </div>
          </Column>
        </Paper>
        {ticketDetail}
      </div>
    );
  }
}

export default TicketItem;
