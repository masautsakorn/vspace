import React,{Component} from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import Snackbar from 'material-ui/Snackbar';
import {List, ListItem} from 'material-ui/List';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import { Column,Columns,Card,Content } from 're-bulma';
import OwnerDialog from '../projectplan/OwnerDialog2';
import SocialPeople from 'material-ui/svg-icons/social/people';
import Avatar from 'material-ui/Avatar';
class TicketCreateDrawer extends Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      openSnackbar:false,
      messageSnackbar:'',
      openFormContractInfoManual:false,
      contract_no_list:[],
      not_found_contract:false,
      subject:'',
      contract:'',
      project_name:'',
      endUserCompany:'',
      endUserAddress:'',
      siteArea:'BKK',
      caseType:'Incident',
      urgency:'Normal',
      requester_name:'',
      requester_email:'',
      requester_mobile:'',
      requester_phone:'',
      requester_company:'',
      contact_user_name:'',
      contact_user_email:'',
      contact_user_mobile:'',
      contact_user_phone:'',
      contact_user_company:'',
      staff_email:'',
      staff_pic:'',
      staff_thainame:'',
      staff_engname:''
    };
  }
  ticketCreateToServer(){
    var that = this;
    var dataForCreateCase = {
        contract_no: this.state.contract,
        project_owner_sid: 0,
        subject: this.state.subject,
        detail: this.state.subject,
        case_type: this.state.caseType,
        enduser_case: this.state.endUserCompany,
        enduser_address: this.state.endUserAddress,
        urgency: this.state.urgency,
        requester: {name: this.state.requester_name,email: this.state.requester_email,mobile: this.state.requester_mobile,phone: this.state.requester_phone,company: this.state.requester_company
        },
        enduser: {
            name: this.state.contact_user_name,email: this.state.contact_user_email,mobile: this.state.contact_user_mobile,phone: this.state.contact_user_phone,company: this.state.contact_user_company
        },
        owner: {
            thainame: this.state.staff_thainame,email: this.state.staff_email,mobile: "",pic: this.state.staff_pic
        },
        site_area: this.state.siteArea
    };
    var formData = new FormData();
    formData.append('token', InfoGen.token);
    formData.append('email', InfoGen.email);
    formData.append('storage', JSON.stringify(dataForCreateCase));
    Put(Url.caseCreate, formData).then(function(res) {
        console.log('resCaseCreated', res);
        if(res.data_res.ticket_sid){
          that.setState({openSnackbar:true,messageSnackbar:res.message});
          // location.reload();
          window.location = "";
        }
    });
  }
  handleSelectItemOwner = (email, pic_employee, thainame, engname) => {
    this.setState({staff_email:email, staff_pic:pic_employee, staff_thainame:thainame, staff_engname:engname});
  }
  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex===0){
      if(this.state.subject){
        this.goToNext();
      }
    } else if(stepIndex===1){
      if(this.state.contract && this.state.endUserCompany && this.state.endUserAddress){
        this.goToNext();
      }
    } else if(stepIndex===3){
      if(this.state.staff_email){
        // this.goToNext();
        console.log(this.state);
        this.ticketCreateToServer();
      }
    }else{
      this.goToNext();
    }
  };
  goToNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 3,
    });
  }

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  handleFindContract = () => {
    var that = this;
    if(this.state.contract.length>4){
      this.setState({openSnackbar:true,messageSnackbar:'Finding...'});
      var formData = new FormData();
      formData.append('email', InfoGen.email);
      formData.append('token', InfoGen.token);
      formData.append('contract', this.state.contract.trim());

      get(Url.findContractInfo, formData).then(function(res){
        if(!res.error){
          console.log(res);
          if(res.data.length>0){
            that.setState({not_found_contract:false,contract_no_list:res.data,openSnackbar:false,messageSnackbar:''});
          }else{
            that.setState({not_found_contract:true,contract_no_list:res.data,openSnackbar:false,messageSnackbar:''});
          }
        }
      });
    }else{
      that.setState({openSnackbar:true,messageSnackbar:'Minimun 5 charecters to find contract'});
    }
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;

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
        <RaisedButton
          label={stepIndex === 3 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
      </div>
    );
  }
  subject = (e) => {
    this.setState({subject:e.target.value});
  }
  contract = (e) => {
    this.setState({contract:e.target.value});
  }
  handleSelectProject = (contract_no,project_name,end_user_name, end_user_site) => {
      if(end_user_name && end_user_site){
        this.setState({
          contract:contract_no,
          project_name:project_name,
          endUserCompany:end_user_name,
          endUserAddress:project_name,
          openFormContractInfoManual:false
        });
      }else{
        this.setState({
          contract:contract_no,
          project_name:project_name,
          openFormContractInfoManual:true
        });
      }

  }
  endUserCompany = (e) => {
    this.setState({endUserCompany:e.target.value});
  }
  endUserAddress = (e) => {
    this.setState({endUserAddress:e.target.value});
  }
  siteArea = (e) => {
    // console.log(e.target.value);
    this.setState({siteArea:e.target.value});
  }
  caseType = (e) => {
    this.setState({caseType:e.target.value});
  }
  urgency = (e) => {
    this.setState({urgency:e.target.value});
  }
  requesterName = (e)=>{
    this.setState({requester_name:e.target.value});
  }
  requesterEmail = (e)=>{
    this.setState({requester_email:e.target.value});
  }
  requesterMobile = (e)=>{
    this.setState({requester_mobile:e.target.value});
  }
  requesterPhone = (e)=>{
    this.setState({requester_phone:e.target.value});
  }
  requesterCompany = (e)=>{
    this.setState({requester_company:e.target.value});
  }
  contactUserName = (e)=>{
    this.setState({contact_user_name:e.target.value});
  }
  contactUserEmail = (e)=>{
    this.setState({contact_user_email:e.target.value});
  }
  contactUserMobile = (e)=>{
    this.setState({contact_user_mobile:e.target.value});
  }
  contactUserPhone = (e)=>{
    this.setState({contact_user_phone:e.target.value});
  }
  contactUserCompany = (e)=>{
    this.setState({contact_user_company:e.target.value});
  }
  sameRequester = () => {
    this.setState({
      contact_user_name:this.state.requester_name,
      contact_user_email:this.state.requester_email,
      contact_user_mobile:this.state.requester_mobile,
      contact_user_phone:this.state.requester_phone,
      contact_user_company:this.state.requester_company
    })
  }

  render(){
    var styles = {
      radioButton: {
        marginBottom: 16,
      },
      relative: {'position':'relative'}
    }
    var style = {
      padding:10
    }
    var formContractInfoManual;
    if(this.state.openFormContractInfoManual){
      formContractInfoManual =
      <div>
          <TextField hintText="End User Company" value={this.state.endUserCompany} onChange={this.endUserCompany} fullWidth={true}/>
          <TextField hintText="End User Address" value={this.state.endUserAddress} onChange={this.endUserAddress} fullWidth={true}/>
          <RadioButtonGroup name="siteArea" defaultSelected="BKK" onChange={this.siteArea}>
            <RadioButton
              value="BKK"
              label="กรุงเทพและปริมณฑล"
              style={styles.radioButton}
            />
            <RadioButton
              value="country"
              label="ต่างจังหวัด"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
      </div>
    }
    var contract_no_list;
    if(this.state.not_found_contract){
      contract_no_list = <List key={"not_found_contract"}>
        <FlatButton label="Not Found" secondary={true} />
        <FlatButton label="ยืนยันใช้เลข Contract นี้" onTouchTap={()=>{this.setState({openFormContractInfoManual:!this.state.openFormContractInfoManual}) }} primary={true} />

      </List>
    }else{
        contract_no_list = this.state.contract_no_list.map((item,k) => (
          <List key={k}>
            <ListItem onTouchTap={()=>{this.handleSelectProject(item.CONTRACT_NO,item.PROJECT_NAME, item.ENDUSER_NAME, item.ENDUSER_ADDRESS)}} data-id={item.CONTRACT_NO} data-projectname={item.PROJECT_NAME} data-endusername={item.ENDUSER_NAME} data-enduseraddress={item.ENDUSER_ADDRESS}
              primaryText={item.CONTRACT_NO}
              secondaryText={
                <div>
                  <div>{item.PROJECT_NAME}</div>
                  <div style={{color: darkBlack}}>{item.ENDUSER_NAME}</div>
                  <div>{item.ENDUSER_ADDRESS}</div>
                </div>
              }
              secondaryTextLines={2}
            />
          </List>
        ));
    }

    var subjectInformation;
    subjectInformation = <div>
      <TextField hintText="Subject" value={this.state.subject} onChange={this.subject} fullWidth={true}/>

      <Columns>
        <Column style={style}>
          <Subheader>TYPE</Subheader>
          <RadioButtonGroup name="caseType" defaultSelected="Incident" onChange={this.caseType}>
            <RadioButton
              value="Incident"
              label="Incident"
              style={styles.radioButton}
            />
            <RadioButton
              value="Request"
              label="Request"
              style={styles.radioButton}
            />
            <RadioButton
              value="Question"
              label="Question"
              style={styles.radioButton}
            />
            <RadioButton
              value="Preventive Maintenance"
              label="Preventive Maintenance"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </Column>
        <Column style={style}>
          <Subheader>Urgency</Subheader>
          <RadioButtonGroup name="Urgency" defaultSelected="Normal" onChange={this.urgency}>
            <RadioButton
              value="Normal"
              label="Normal"
              style={styles.radioButton}
            />
            <RadioButton
              value="High"
              label="High"
              style={styles.radioButton}
            />
            <RadioButton
              value="Critical"
              label="Critical"
              style={styles.radioButton}
            />
          </RadioButtonGroup>
        </Column>
      </Columns>
    </div>

    var contractInformation;
    contractInformation = <div>
      <TextField hintText="Contract" value={this.state.contract} onChange={this.contract} />
      <RaisedButton
        label={"Find"}
        disableTouchRipple={true}
        disableFocusRipple={true}
        backgroundColor="#a4c639" labelColor="#FFFFFF"
        style={{marginRight: 12}}
        onTouchTap={this.handleFindContract}
      />
      <div>{contract_no_list}</div>
      <div>{formContractInfoManual}</div>
    </div>

    var requesterContactUser;
    requesterContactUser =
    <Columns>
      <Column style={style}>
        <div>
          <Card style={{margin:'10px', padding:'10px'}}>
            <Content>
              <Subheader>Requester</Subheader>
              <div><TextField hintText="Name" value={this.state.requester_name} onChange={this.requesterName} fullWidth={true}/></div>
              <div><TextField hintText="Email" value={this.state.requester_email} onChange={this.requesterEmail} fullWidth={true}/></div>
              <div><TextField hintText="Mobile" value={this.state.requester_mobile} onChange={this.requesterMobile} fullWidth={true}/></div>
              <div><TextField hintText="Phone" value={this.state.requester_phone} onChange={this.requesterPhone} fullWidth={true}/></div>
              <div><TextField hintText="Company" value={this.state.requester_company} onChange={this.requesterCompany} fullWidth={true}/></div>
            </Content>
          </Card>
        </div>
      </Column>
      <Column style={style}>
        <div color="isSuccess">
          <Card style={{margin:'10px', padding:'10px'}}>
            <Content>
              <Subheader>Contact User</Subheader>
              <div>
                <div><TextField hintText="Name" value={this.state.contact_user_name} onChange={this.contactUserName} fullWidth={true}/></div>
                <div><TextField hintText="Email" value={this.state.contact_user_email} onChange={this.contactUserEmail} fullWidth={true}/></div>
                <div><TextField hintText="Mobile" value={this.state.contact_user_mobile} onChange={this.contactUserMobile} fullWidth={true}/></div>
                <div><TextField hintText="Phone" value={this.state.contact_user_phone} onChange={this.contactUserPhone} fullWidth={true}/></div>
                <div><TextField hintText="Company" value={this.state.contact_user_company} onChange={this.contactUserCompany} fullWidth={true}/></div>
              </div>
            </Content>
          </Card>
          <div style={{margin:'10px', padding:'10px'}}><RaisedButton label="Same Requester" onTouchTap={this.sameRequester} /></div>
        </div>
      </Column>
    </Columns>

    var labelOwnerCase = (this.state.staff_thainame)?(this.state.staff_thainame):'';
    var avatar = (this.state.staff_thainame)?<div style={styles.relative}><Avatar src={this.state.staff_pic} /> <small style={{color:lightBlack,'position':'absolute','top':'5px','left':'45px'}}>{labelOwnerCase}</small></div>:'';
    var ownerTicket;
    // console.log(this.props);
    ownerTicket = <div>{avatar}<OwnerDialog onShowMore={()=>{}} icon={<SocialPeople />} label={"Select Owner"} title={"Select Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.props.listUserCanAddProject} /></div>;

    const {finished, stepIndex} = this.state;
    return(
      <div style={{maxWidth: '80%', margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>SUBJECT INFORMATION</StepLabel>
            <StepContent>
              <div>{subjectInformation}</div>
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>CONTRACT INFORMATION</StepLabel>
            <StepContent>
              <div>{contractInformation}</div>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>REQUESTER & CONTACT USER</StepLabel>
            <StepContent>
                <div>{requesterContactUser}</div>
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>OWNER</StepLabel>
            <StepContent>
                <div>{ownerTicket}</div>
              {this.renderStepActions(3)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <p style={{margin: '20px 0', textAlign: 'center'}}>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> to reset the example.
          </p>
        )}
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          autoHideDuration={4000}
          onRequestClose={()=>{this.setState({open: false,})}}
        />
      </div>
    )
  }
}
export default TicketCreateDrawer;
