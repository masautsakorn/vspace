import React, { Component } from 'react';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
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
import TicketDetail from '../ticket/TicketDetail';
import IconButton from 'material-ui/IconButton';

import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TicketCreateDrawer from '../ticket/TicketCreateDrawer';

class TicketCreate extends Component {
  constructor(props){
    super(props);
    this.state = {openTicketDrawer:false,listUserCanAddProject:this.props.listUserCanAddProject};
  }
  componentDidMount(){
    // this.callDataTicket(this.state.item.sid);
  }
  handleOpenTicketDrawer = () => {
    // this.callDataTicket(this.state.item.sid);

    this.setState({openTicketDrawer:true});
    // console.log(this.state);
  }
  // callDataTicket(ticket_sid){
  //   if(this.props.ticket_sid!==null){
  //     var formData = new FormData();
  //     formData.append("email", InfoGen.email);
  //     formData.append("token", InfoGen.token);
  //     formData.append("ticket_sid", ticket_sid);
  //     var that = this;
  //     get(Url.ticketDetail,formData).then(function(res){
  //       // console.log(res);
  //       that.setState({ticket_sid:ticket_sid, data_ticket_detail:res.data,
  //         // listUserCanAddProject:res.canAssignTo
  //       });
  //       that.setState({openTicketDrawer:true});
  //     });
  //   }
  // }
  render(){
    const styles = {
      styleBorder: {
        border: '1px solid #fafbf9',
        height:180,
        borderRadius: '3px',
        // margin:'10px 10px 0px 10px'
        backgroundColor: '#fafbfc'
      },
      styleBorderNew: {
        border: '1px dashed #838383',
        height:180,
        borderRadius: '3px',
        backgroundColor:'#fff'
      }
    }

    var ticketDetail;
      ticketDetail =
      <Drawer width={"100%"} onRequestChange={(openTicketDrawer) => this.setState({openTicketDrawer})} openSecondary={true} docked={false} open={this.state.openTicketDrawer} >
          <AppBar
            title={<span style={styles.title}>{"Create New Task"}</span>}
            iconElementLeft={<IconButton onTouchTap={()=>{this.setState({openTicketDrawer:false})} }><NavigationClose /></IconButton>}
            />
            <div>
                <TicketCreateDrawer listUserCanAddProject={this.props.listUserCanAddProject}/>
            </div>
      </Drawer>
    return(
      <div style={styles.styleBorderNew}>
        <Paper onTouchTap={this.handleOpenTicketDrawer} zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
          <div style={{padding:'0px',display:'flex'}}>
            <ContentAddCircle style={{marginTop:'6px', color:lightBlack}} /> <span style={{marginTop:'10px'}}>Create New Task</span>
          </div>
          <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:4,bottom:22}}><small></small></div>
        </Paper>
        {ticketDetail}
      </div>
    );
  }
}

export default TicketCreate;
