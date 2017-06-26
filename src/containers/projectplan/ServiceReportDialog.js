import React, { Component } from 'react';
import MyApp from './MyApp';
import get from '../../config/Get.js';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import ServiceReportCreate from './ServiceReportCreate';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Avatar from 'material-ui/Avatar';
import SocialSentimentNeutral from 'material-ui/svg-icons/social/sentiment-neutral';
import SocialMood from 'material-ui/svg-icons/social/mood';
import Drawer from 'material-ui/Drawer';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import {END_POINT_PDF} from '../../config/url';
import ActionPageview from 'material-ui/svg-icons/action/pageview';
// import ContentAdd from 'material-ui/svg-icons/content/add';
import Snackbar from 'material-ui/Snackbar';

class ServiceReportDialog extends Component {
  constructor(props){
    super(props);
    // console.log('ServiceReportDialog', this.props.serviceReport);
    this.state = {
      open: false,
      serviceReport:this.props.serviceReport,
      projectContact:this.props.projectContact,
      creatingService:false,openSnackbar:false,messageSnackbar:''
    };
  }
  handleOpen = () => {
    // this.props.onOpenAppointment();
    this.setState({open: true});
  };
  handleOpenCreatingService = () => {
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
    console.log(task);
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
      for (let i = 0; i < propsServiceReport.length; i++) {
        // console.log(propsServiceReport[i]);
        // serviceReport.push(
        //   <div key={i}>
        //     <span>{i+1} {this.state.serviceReport[i].subject_service_report} {this.state.serviceReport[i].engineer}</span>
        //   </div>
        // );
        var iconStatusService;
        if(propsServiceReport[i].last_status>400){
          iconStatusService = <SocialMood />
        }else{
          iconStatusService = <SocialSentimentNeutral/>
        }
        chipServiceReport.push(
          <Chip style={{margin:2,overflow: 'auto',maxWidth: '270px'}} key={i}><Avatar icon={iconStatusService} />{propsServiceReport[i].subject_service_report}</Chip>
        );
        var pdfElement;
        if(propsServiceReport[i].path_service_report){
          pdfElement = <div style={{color:lightBlack}}>PDF: <a target="new" href={END_POINT_PDF+propsServiceReport[i].path_service_report} >Service Report</a></div>
        }else{
          pdfElement = <div style={{color:lightBlack}}>PDF: - </div>
        }

        var primaryText =
        <div>
          <small>
            <div>{propsServiceReport[i].no_task+" "+propsServiceReport[i].subject_service_report}</div>
            <div style={{color:lightBlack}}><small>Type: </small><small>{propsServiceReport[i].service_type_name}</small></div>
            <div style={{color:lightBlack}}>Staff: {propsServiceReport[i].staff_name}</div>
            {pdfElement}
          </small>
        </div>

        var secondaryText =
        <div style={{color:lightBlack}}>
          <small>Appointment: </small><small>{propsServiceReport[i].appointment}
          <br/>Expect Duration (Hr.): {propsServiceReport[i].expect_duration}</small>
        </div>
        var avatar = <Avatar src={propsServiceReport[i].staff_pic} />
        serviceReport.push(
          <ListItem key={i} leftAvatar={avatar}
          primaryText={primaryText} secondaryTextLines={2}
          secondaryText={secondaryText}>
          </ListItem>
        );
      }


    // var listServiceReport;
    // if(!this.state.creatingService){
    //     listServiceReport =
    //       <div style={{padding:10}}>
    //         <br/>
    //         <RaisedButton onTouchTap={()=>{this.setState({creatingService:true}); }} icon={<ContentAdd />} label={"ADD"} />
    //         <List>
    //           <Subheader>Appointment List ({this.state.serviceReport.length})</Subheader>
    //           {serviceReport}
    //         </List>
    //       </div>;
    // }else{
    //   listServiceReport =
    //   <div style={{padding:10}}>
    //     <br/>
    //     <RaisedButton onTouchTap={()=>{this.setState({creatingService:false}); }} label={"Appointment List"} />
    //     <ServiceReportCreate createService={this.state.creatingService} onCloseDialog={this.handleClose}
    //       onCreatedService={this.handleCreatedService} onStatusCreating={this.handleStatusCreating}
    //       caseSid={this.props.caseSid} projectContact={this.props.projectContact} serviceReport={this.props.serviceReport}
    //       listUserCanAddProject={this.props.listUserCanAddProject} />
    //   </div>
    // }

    console.log(this.props.ticket);
    if(this.props.ticket.status==='5' || this.props.ticket.status===5){

    }else{
      chipServiceReport.push(<Chip key={-1} onTouchTap={this.handleOpenCreatingService} style={styles.chip}><Avatar color="#fff" icon={<ContentAdd />} />Add</Chip>);
      serviceReport.push(<Chip key={-1} onTouchTap={this.handleOpenCreatingService} style={styles.chip}><Avatar color="#fff" icon={<ContentAdd />} />Add</Chip>);
    }

    var label;
    if(!this.state.open){
      label = <div style={{textAlign:'right'}}><div style={{display:'flex',flexWrap:'wrap',float:'left'}}>{chipServiceReport}</div><div style={{clear:'both'}}></div></div>;
    }else{
      label = serviceReport;
    }
    var viewAppointment = <span onTouchTap={()=>{this.setState({open:!this.state.open}) }}>({this.props.serviceReport.length}) <ActionPageview style={{color:lightBlack}} /></span>

    var createAppointment;
    if(this.state.creatingService){
        createAppointment =
          <div>
              <ServiceReportCreate createService={this.state.creatingService} onCloseDialog={this.handleOpenCreatingService}
                  onCreatedService={this.handleCreatedService} onStatusCreating={this.handleStatusCreating}
                  ticket_sid={this.props.ticket_sid} projectContact={this.props.projectContact}
                  serviceReport={this.props.serviceReport}
                  listUserCanAddTask={this.props.listUserCanAddTask} />
          </div>
    }

    return (
      <div>
        <Card isFullwidth>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>Appointment {viewAppointment}</small>
            </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <div>{label}</div>
              <div>{createAppointment}</div>
            </Content>
          </CardContent>
        </Card>
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
