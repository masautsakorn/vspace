import React, { Component } from 'react';
import ServiceReportContactUser from './ServiceReportContactUser';
import Url from '../../config/url';
// import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
import {
  Step,
  Stepper,
  StepLabel,
  // StepButton,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import {GridList} from 'material-ui/GridList';
import {lightBlack} from 'material-ui/styles/colors';
// import Moment from 'react-moment';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from 'moment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import OwnerDialog from '../projectplan/OwnerDialog2';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
// import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MapsLocalTaxi from 'material-ui/svg-icons/maps/local-taxi';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';
import Paper from 'material-ui/Paper';
// import Divider from 'material-ui/Divider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
class ServiceReportCreate extends Component {
  constructor(props){
    super(props);

    const appointment_date = new Date();
    appointment_date.setFullYear(appointment_date.getFullYear());
    appointment_date.setHours(0, 0, 0, 0);

    const appointment_time = new Date();
    appointment_time.setFullYear(appointment_time.getFullYear());

    this.state = {
      serviceReport:this.props.serviceReport,
      createService:this.props.createService,
      stepIndex: 0,finished: false,
      ticket_sid:this.props.ticket_sid,
      value24: appointment_time, value12: null, openSelectStaff:false,
      staff:[],
      subject:"",detail:"",service_type:"1",service_type_lable:"Onsite",appointment_date:appointment_date,expect_duration:"8",
      end_user_name:"",end_user_email:"",end_user_mobile:"",end_user_phone:"",end_user_company:"",openServiceType:false,
      openSnackbar:false,
      messageSnackbar:'',
      creatingService:true
    };
  }
  componentWillUnmount(){

  }
  handleStatusCreating = () => {
    if(this.state.createService){
      this.setState({creatingService:false});
    }else{
      this.setState({creatingService:true})
    }
  }
  handleContactUser = (name, email, mobile, phone, company) => {
    this.setState({end_user_name:name,end_user_email:email,end_user_mobile:mobile,end_user_phone:phone,end_user_company:company});
  }
  handleSubject = (e) => {
    this.setState({subject:e.currentTarget.value});
  }
  handleDetail = (e) => {
    this.setState({detail:e.currentTarget.value});
  }
  handleAppointment = (event, date) => {
    this.setState({
      appointment_date:date
    });
  }
  handleExpectDuration = (e) => {
    this.setState({expect_duration:e.currentTarget.value});
  }
  handleCreateService = () => {
    // if(this.state.createService){
    //   this.setState({createService:false});
    // }else{
    //   this.setState({createService:true});
    // }
    // this.handleStatusCreating();
    this.props.onStatusCreating();
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    console.log(this.state.staff);
    if(stepIndex===0){
      console.log(this.state.subject);
      if(this.state.subject.trim()!==""){
          this.goToNext();
      }
    }else if(stepIndex===2 && this.state.staff.length<1){
      this.props.listUserCanAddTask.forEach((item,i)=>{
        if(item.email===localStorage.getItem("case_email")){
            var temp = [{name:item.engname, email:item.email, pic_employee:item.pic_employee}];
            this.setState({staff:temp});
        }
      });
    } else if(stepIndex===3 && (this.state.end_user_name==="" || this.state.end_user_email==="")){

    }else{
      this.goToNext();
    }
  };

  goToNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex===2){
      this.setState({end_user_name:'',end_user_email:'',end_user_mobile:'',end_user_phone:'',end_user_company:''});
    }
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 4,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleServiceReportCreate = () => {
    // console.log(this.state);
    this.setState({openSnackbar:true,messageSnackbar:'Appointment Creating...'});

    var that = this;
    var engineer = [];
    this.state.staff.forEach((item) => {
        engineer.push(item.email);
    });
    var duration_in_milliseconds = this.state.value24;
    // 60000
    var expect_duration = moment(duration_in_milliseconds).format('HH:mm'); // April 3rd 2017, 2:41:59 pm
    var appointment_date = moment(this.state.appointment_date).format('YYYY-MM-DD');
    var dataCreateService = {
      end_user:{
        name:this.state.end_user_name,
        email:this.state.end_user_email,
        mobile:this.state.end_user_mobile,
        phone:this.state.end_user_phone,
        company:this.state.end_user_company
      },
      type_sid:this.state.service_type,
      subject:this.state.subject,
      appointment_datetime: appointment_date+' '+expect_duration,
      expect_duration: {
        hours: this.state.expect_duration,
        minutes: "0"
      },
      engineer: engineer,
      staff:this.state.staff
    }
    // console.log(dataCreateService);
    var formData = new FormData();
    formData.append('ticket_sid', this.state.ticket_sid);
    formData.append('email',InfoGen.email);
    formData.append('token',InfoGen.token);
    formData.append('data', JSON.stringify(dataCreateService));
    Put(Url.serviceReportCreate, formData).then(function(res){
        // console.log(res);
        that.props.onCreatedService(res.task);
        that.setState({stepIndex:0,staff:[],openSnackbar:false,messageSnackbar:'Appointment Created'});
        that.props.onCloseDialog();
    });
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;
    var btnNextFinish;
    if(stepIndex===4){
      btnNextFinish = <RaisedButton
        label={'Finish'}
        disableTouchRipple={true}
        disableFocusRipple={true}
        primary={true}
        onTouchTap={this.handleServiceReportCreate}
        style={{marginRight: 12}}
      />
    }else{
      btnNextFinish = <RaisedButton
        label={'Next'}
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
        {btnNextFinish}
      </div>
    );
  }
  handleChangeTimePicker24 = (event, date) => {
    this.setState({value24: date});
  };

  handleChangeTimePicker12 = (event, date) => {
    this.setState({value12: date});
  };

  handleTouchTap = (event) => {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      openSelectStaff: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({
      openSelectStaff: false,
    });
  };
  handleSelectStaff = (email, pic_employee, thainame, engname) => {
    var tmpDet = {
      email:email,
      name:engname,
      pic_employee:pic_employee
    };
    this.addStaff(tmpDet);
    this.setState({
      openSelectStaff: false,
    });
  }
  addStaff = (tmpDet) => {
    var tmp = this.state.staff;
    var newTmp = [];
    tmp.push(tmpDet);

    tmp.forEach((item) => {
      if(item.email!==tmpDet.email){
        newTmp.push(item);
      }
    });
    newTmp.push(tmpDet);
    this.setState({staff:newTmp});
  }
  handleRequestDelete = (email) => {
    var tmp = this.state.staff;
    var newTmp = [];
    tmp.forEach((item) => {
      if(item.email!==email){
          newTmp.push(item);
      }
    });
    this.setState({staff:newTmp});
  };
  handleChangeServiceType = (event, index, value) => {
    // console.log(event.target.innerText);
    this.setState({service_type:value});
    this.setState({service_type_lable:event.target.innerText});
  }

  handleRequestTaxi = (email, e) => {
    var tmp = this.state.staff;
    tmp.forEach((item, i)=>{
      if(item.email===email){
        tmp[i].request_taxi = !e.target.checked;
      }
    });
    this.setState({staff:tmp});
    console.log(this.state.staff);
  }
  handleRequestOT = (email, e) => {
    var tmp = this.state.staff;
    tmp.forEach((item, i)=>{
      if(item.email===email){
        tmp[i].request_ot = !e.target.checked;
      }
    });
    this.setState({staff:tmp});
    console.log(this.state.staff);
  }

  render(){
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
    const {finished, stepIndex} = this.state;
    // console.log(this.props);
    var staffList = this.props.listUserCanAddTask.map((item,k) => {
        return <ListItem key={k}
          leftAvatar={<Avatar src={item.pic_employee} />}
          primaryText={item.thainame}
          onTouchTap={this.handleSelectStaff} data-id={item.emailaddr} data-name={item.engname} data-pic_employee={item.pic_employee}
          secondaryText={
            <p>
              {item.engname} <br/>
              {item.emailaddr}
            </p>
          }
          secondaryTextLines={2}
        />
    });
    var staffSelected = [];
    var confirmStaff = [];
    this.state.staff.forEach((item,i) => {
        staffSelected.push(<Chip data-id={item.email} style={styles.chip} key={item.email} onRequestDelete={() => this.handleRequestDelete(item.email)} ><Avatar src={item.pic_employee} /> {item.email}</Chip>);
        confirmStaff.push(<Chip style={{margin:4,backgroundColor:'none'}} key={item.email} ><Avatar src={item.pic_employee} /> {item.name}</Chip>);
    });

    var sectionStaff = <div style={styles.wrapper}>
      {staffSelected}
      <OwnerDialog onShowMore={()=>{}} onSelectItem={this.handleSelectStaff} listItem={this.props.listUserCanAddTask} title="" label="Add" icon={<SocialPersonAdd />}  />
    </div>;

    var createService;
    var labelAdd = <span>Add</span>
    if(!this.state.createService){
      createService = <RaisedButton onTouchTap={this.handleCreateService} icon={<ContentAdd />}  label={labelAdd} style={{marginTop:'10px'}} />;
    }else{
      const items = [
        <MenuItem key={1} value={"1"} primaryText="Onsite" />,
        <MenuItem key={2} value={"2"} primaryText="Remote" />,
        <MenuItem key={3} value={"3"} primaryText="Document" />,
        <MenuItem key={4} value={"4"} primaryText="Meeting-Intranal" />,
        <MenuItem key={5} value={"5"} primaryText="Meeting-Extranal" />,
        <MenuItem key={6} value={"6"} primaryText="Pre-Install" />,
        <MenuItem key={7} value={"7"} primaryText="Testing" />,
      ];

      var request_benefit;
      var transportationItem = [];
      var iconTaxi = <span><MapsLocalTaxi /> Taxi</span>
      var iconOT = <span><ActionSchedule /> Overtime</span>;

      this.state.staff.forEach((item,i) => {
          transportationItem.push(
            <div key={i} style={{display:'initial'}}>
              <div style={{marginRight:10,display:'flex', width:'40%', overflow:'hidden'}}>
                <Avatar src={item.pic_employee} />
                <div>{item.name}</div>
              </div>
              <div>
                <Checkbox style={{textAlign:'left'}} onTouchTap={(e)=>{this.handleRequestTaxi(item.email,e)}}
                  label={iconTaxi}
                />
              </div>
              <div>
                <Checkbox style={{textAlign:'left'}} onTouchTap={(e)=>{this.handleRequestOT(item.email,e)}}
                  label={iconOT}
                  />
              </div>
            </div>
          );
      });
      request_benefit = <List> {transportationItem}</List>
      createService =
        <div style={{maxWidth: '100%', margin: '12px 12px 30px 12px', paddingTop:'10px'}}>

          <div style={{textAlign:'right'}} onTouchTap={()=>this.props.onCloseDialog()}>
            <FloatingActionButton mini={true}>
              <NavigationClose   />
            </FloatingActionButton>
          </div>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>SUBJECT</StepLabel>
              <StepContent>
                  <GridList
                      cellHeight={180}
                      cols={1} style={{height:180}}
                    >
                    <div>
                        <div><TextField hintText="Subject" onChange={this.handleSubject} style={{width:"90%"}} floatingLabelText="Subject"/></div>
                        <SelectField
                          value={this.state.service_type}
                          onChange={this.handleChangeServiceType}
                          floatingLabelText="Service Type"
                        >
                          {items}
                        </SelectField>
                    </div>

                  </GridList>
                  {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>APPOINTMENT</StepLabel>
              <StepContent>
                    <div >
                      <DatePicker hintText="Date" value={this.state.appointment_date} onChange={this.handleAppointment} />
                    </div>
                    <div >
                      <TimePicker format="24hr" hintText="Time" value={this.state.value24} onChange={this.handleChangeTimePicker24}/>
                    </div>
                    <div>
                      <TextField type="number" min={1} value={this.state.expect_duration} onChange={this.handleExpectDuration} hintText="Expect Duration" floatingLabelText="Expect Duration (Hours.)"/>
                    </div>
                <div>
                </div>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>STAFF</StepLabel>
              <StepContent>
                <div>
                  {sectionStaff}
                </div>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>CONTACT USER</StepLabel>
              <StepContent>
                <div>
                  <ServiceReportContactUser
                  name={this.state.end_user_name}
                  email={this.state.end_user_email}
                  phone={this.state.end_user_phone}
                  mobile={this.state.end_user_mobile}
                  company={this.state.end_user_company}
                  onContactUser={this.handleContactUser}
                  projectContact={this.props.projectContact} />
                </div>
                {console.log(this.state.end_user_name)}
                {
                  ((this.state.end_user_name)?
                  this.renderStepActions(3):
                  <div>เลือกผู้ติดต่อจากรายการ หรือเพิ่มใหม่</div>)
                }
              </StepContent>
            </Step>
            <Step>
              <StepLabel>REQUEST BENEFIT</StepLabel>
              <StepContent>
                <div>
                      {request_benefit}
                </div>
                {this.renderStepActions(4)}
              </StepContent>
            </Step>
          </Stepper>
          <Snackbar
            open={this.state.openSnackbar} autoHideDuration={4000}
            message={this.state.messageSnackbar}
            onRequestClose={()=>{this.setState({openSnackbar:false})}}
          />
        </div>
    }
    return(
      <div >
        <Paper zDepth={2}>
          {createService}
        </Paper>
      </div>
    )
  }
}

export default ServiceReportCreate;
