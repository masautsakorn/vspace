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
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
import TicketChecklist from '../ticket/TicketChecklist';

import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import { Columns } from 're-bulma';
import { Column } from 're-bulma';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';

class TicketDrawer extends Component {
  constructor(props){
      super(props);
      this.state = {
        item:this.props.case,
        editing:false,
        sid:this.props.sid,
        name:this.props.name,
        projectContact: this.props.projectContact,
        owner_value:this.props.owner_value,
        listUserCanAddProject:this.props.listUserCanAddProject,
        open: false,
        status: this.props.status,
        mandaysCase: this.props.mandaysCase,
        projectInfo:this.props.projectInfo,
        openAddChecklist:false,
        newItemChecklist:""
      };
  }

  handleManDaysCase = (e) => {
    var that = this;
    var newManDay = e.currentTarget.value;
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("man_days", newManDay);
    formData.append("ticket_sid", this.state.sid);

    Put(Url.changeMandaysCase, formData).then(function(res){
      that.setState({mandaysCase:newManDay});
    });
  }

  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {

    this.setState({open:false});
    this.props.onChangeStaffCase(this.state.sid, email);
  }
  handleTxtChange = (e) => {
    var value = e.target.value;
    var that = this;

    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('ticket_sid', this.state.sid);
    formData.append('new_subject', value);
    get(Url.casemodifySubject,formData).then(function(res){
      console.log(res);
      that.setState({name:value});
      that.props.onChangeSubject(value);
    });

  }

  render(){
    const style = { padding: '10px' };
    const iconStyles = {
      marginRight: 24,
    };
    const styles = {
      box: {
        'padding':'10px 10px','margin':'0px 4px',
        // 'border': '1px solid rgb(217, 217, 217)',
        'marginBottom':'10px','background': '#ffffff', 'borderRadius': '3px'
      },
      style: {
        margin: 4,
      },
      title: {
        cursor: 'pointer',
      },
      owner: {'textAlign':'right'},
      relative: {'position':'relative'}
    }
    // if(this.state.status){
    //   console.log(this.state.status);
    // }
    var labelOwnerCase = (this.state.item.owner_thainame)?(this.state.item.owner_thainame):'Owner?';
    var avatar = <div style={styles.relative}><Avatar src={this.state.item.pic_full} /> <small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>;

    var jobData;
    if(this.state.item.task){
      jobData = <ServiceReportDialog onCreatedService={this.handleCreatedService} caseSid={this.state.sid} projectContact={this.props.projectContact} listUserCanAddProject={this.props.listUserCanAddProject} serviceReport={this.state.item.task} />
    }else{
      jobData = <span></span>
    }

    var checkList = <TicketChecklist sid={this.state.sid} item={this.state.item} />;


    var removing;
    if(this.state.item.task && this.state.item.task.length>0){
      removing = <span></span>
    }else{
      removing = <div><RaisedButton label="Remove" onTouchTap={this.handleDelete} secondary={true} style={styles.style} /><br/><br/><Divider /><br/></div>
    }

      // var staffList = this.props.listUserCanAddProject.map((item,k) => {
      //     return  <ListItem key={k}
      //       leftAvatar={<Avatar src={item.pic_employee} />}
      //       primaryText={item.thainame}
      //       onTouchTap={this.handleSelectOwner} data-id={item.emailaddr}
      //       secondaryText={
      //         <p>
      //           {item.engname} <br/>
      //           {item.emailaddr}
      //         </p>
      //       }
      //       secondaryTextLines={2}
      //     />
      // });

      var manDaysCase = (this.state.mandaysCase)?this.state.mandaysCase:'0';
      // CONTROL MANDAYS
      var control_manday;
      var control_service_report;

        control_manday =
        <div><Card isFullwidth>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>Estimate Man-Hours (Hours.)</small>
            </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <div style={{'textAlign':'left'}}>
                  <TextField type="number" min={1} value={manDaysCase} onChange={this.handleManDaysCase} hintText="Man Hours" />
              </div>
            </Content>
          </CardContent>
        </Card><br/></div>;


        control_service_report =
        <div>
          <div>{jobData}</div>
        </div>;


        var subjectControl =
        <div>
          <Card isFullwidth>
            <CardHeader>
              <CardHeaderTitle>
                <small style={{color:lightBlack}}>Subject</small>
              </CardHeaderTitle>
            </CardHeader>
            <CardContent>
              <Content>
                <form onSubmit={this.handleSubmit}>
                <TextField fullWidth={true}  hintText="Subject" value={this.state.name} onChange={this.handleTxtChange} />
                </form>
              </Content>
            </CardContent>
          </Card>
          <br/>
        </div>;


      var ownerControl =
      <div>
        <Card isFullwidth>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>Owner</small>
            </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <div style={{'height':'50px'}}>
                {avatar}
              </div>
              <div style={{textAlign:'left'}}>
                <OwnerDialog onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.state.listUserCanAddProject} />
              </div>
            </Content>
          </CardContent>
        </Card>
      </div>
      return(
        <div >
        <AppBar
          title={<span style={styles.title}>{this.state.name}</span>}
          iconElementLeft={<IconButton onTouchTap={()=>{this.props.onOpenTicketDrawer()}}><NavigationClose /></IconButton>}
          />
            <div style={styles.box}>

            <Columns>
              <Column size="isOneThird" style={style}>
                  {subjectControl}

                  {ownerControl}

              </Column>
              <Column style={style}>

                  {control_service_report}

                  {control_manday}

                  {checkList}
                  <div style={{'textAlign':'right'}}>
                    {removing}
                  </div>
                  <div style={{'textAlign':'right'}}><small>Created {this.state.item.create_datetime}</small></div>

              </Column>
            </Columns>

            </div>
        </div>
      );
                    // <RaisedButton label="Close" onTouchTap={this.handleTextareaClose}  style={styles.style} />
  }
}

export default TicketDrawer;
