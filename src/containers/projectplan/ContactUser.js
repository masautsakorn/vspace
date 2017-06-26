import React, { Component } from 'react';
// import {GridList, GridTile} from 'material-ui/GridList';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import Put from '../../config/Put.js';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
// import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import {List, ListItem} from 'material-ui/List';
import {
  // grey400,
  darkBlack, lightBlack} from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
// import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';

class ContactUser extends Component {
    constructor(props){
        super(props);
        this.state = {
          projectContact:this.props.projectContact,
          open: false,
          addingContact:true,stepIndex: 0,finished: false,
          name:"",email:"",phone:"",mobile:"",company:""
        };
    }
    handleAddContact = () => {
      if(this.state.addingContact){
        this.setState({addingContact:false});
      }else{
        this.setState({addingContact:true});
      }
    }

    handleOpen = () => {
      this.setState({open: true});
    };

    handleClose = () => {
      this.setState({open: false});
    };

    handleNext = () => {
      const {stepIndex} = this.state;
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 1,
      });
    };

    handlePrev = () => {
      const {stepIndex} = this.state;
      if (stepIndex > 0) {
        this.setState({stepIndex: stepIndex - 1});
      }
    };
    handleName = (e) => {
      this.setState({name:e.target.value});
    }
    handleEmail = (e) => {
      this.setState({email:e.target.value});
    }
    handleMobile = (e) => {
      this.setState({mobile:e.target.value});
    }
    handlePhone = (e) => {
      this.setState({phone:e.target.value});
    }
    handleCompany = (e) => {
      this.setState({company:e.target.value});
    }
    addContactUser = () => {
      var formData = new FormData();
      formData.append("email",InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("project_sid",this.props.projectInfo.project_sid);
      formData.append("end_user_name",this.state.name);
      formData.append("end_user_email",this.state.email);
      formData.append("end_user_mobile",this.state.mobile);
      formData.append("end_user_phone",this.state.phone);
      formData.append("end_user_company",this.state.company);
      // console.log(this.props.projectInfo);
      // console.log(formData);
      // formData.append("")
      var that = this;
      Put(Url.addProjectContact, formData).then(function(res){
        that.handleClose();
        console.log(res);
        if(!res.error){
          that.props.onUpdateData();
          that.setState({addingContact:false});
          that.setState({stepIndex:0});
          that.setState({finished:false});
          that.setState({name:''});
          that.setState({mobile:''});
          that.setState({phone:''});
          that.setState({email:''});
          that.setState({company:''});
        }
      });
    }
    renderStepActions(step) {
      const {stepIndex} = this.state;

      var btnFinishNext;
      if(stepIndex===1){
        btnFinishNext = <RaisedButton
          onClick={this.addContactUser}
          label={stepIndex === 1 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
      }else{
        btnFinishNext = <RaisedButton
          label={stepIndex === 1 ? 'Finish' : 'Next'}
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
          {btnFinishNext}
        </div>
      );
    }

    render(){

        var styles = {
          style: {
            textTransform:'inherit'
          },
          box: {
            margin:'0%'
          },
          chip: {
            margin: 2,
          }
        }

        if(window.innerWidth<376){
          styles.wrapper = {
            display: 'initial',
            // flexWrap: 'wrap',
            float:'left'
          }
        }else{
          styles.wrapper = {
            display: 'flex',
            flexWrap: 'wrap',
            float:'left'
          }
        }

        var contact_user_list = <RaisedButton onClick={this.handleAddContact} style={styles.style} label="List Contact" />;
        var listContact = [];
        var listContactChip = [];
        // listContactChip.push(<div style={styles.chip} key={0} labelColor={lightBlack}>Contact</div>);
        if(this.state.projectContact.length>0){
          this.state.projectContact.forEach((item,k) => {
            var tmp =
                  <ListItem key={k}
                    primaryText={item.name}
                    secondaryText={
                      <p>
                        <span style={{color: darkBlack}}></span>
                        {item.email}, {item.mobile}, {item.phone} {item.company}
                      </p>
                    }
                    secondaryTextLines={2}
                  />
                ;

            listContact.push(tmp);
            listContactChip.push(<Chip key={item.email} style={styles.chip} ><Avatar>{item.name.charAt(0)}</Avatar>{item.name}</Chip>);
          });
        }
        listContactChip.push(<Chip onTouchTap={this.handleOpen} style={styles.chip} key={0}><Avatar icon={<SocialPersonAdd />} /> Add</Chip>);

        // var showCheckBox = false;
        var table = <List style={{margin:'0px -16px'}}>{listContact}</List>;

        var btnAddContact;
        var stepAdd;
        if(this.state.addingContact){
            const {
              // finished,
               stepIndex} = this.state;

            stepAdd = <div style={{maxWidth: '100%', maxHeight: 400, margin: 'auto'}}>
                  <br/>
                  <div>{contact_user_list}</div>
                  <Stepper
                    activeStep={stepIndex}
                    linear={false}
                    orientation="vertical"
                  >
                    <Step>
                      <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                        Input Contact Information
                      </StepButton>
                      <StepContent>
                        <div>
                          <TextField hintText="Full Name" style={{marginRight:'10px'}} value={this.state.name} onChange={this.handleName} floatingLabelText="Full Name" />
                          <TextField hintText="Email" value={this.state.email} onChange={this.handleEmail} floatingLabelText="Email" />
                        </div>
                        <div>
                          <TextField hintText="Mobile" style={{marginRight:'10px'}} value={this.state.mobile} onChange={this.handleMobile} floatingLabelText="Mobile" />
                          <TextField hintText="Phone" value={this.state.phone} onChange={this.handlePhone} floatingLabelText="Phone" />
                        </div>
                        <div>
                          <TextField hintText="Company" value={this.state.company} onChange={this.handleCompany} floatingLabelText="Company" />
                        </div>
                        {this.renderStepActions(0)}
                      </StepContent>
                    </Step>
                    <Step>
                      <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                        Comfirmation
                      </StepButton>
                      <StepContent>
                        <div>
                          <div>{this.state.name}</div>
                          <div>{this.state.email}</div>
                          <div>{this.state.mobile}</div>
                          <div>{this.state.phone}</div>
                          <div>{this.state.company}</div>
                        </div>
                        {this.renderStepActions(1)}
                      </StepContent>
                    </Step>
                  </Stepper>
                </div>
        }else{

            btnAddContact =
            <div>
              <div>
                  {table}
                  <RaisedButton onClick={this.handleAddContact} style={styles.style} label="Add Contact" />
              </div>
            </div>
        }
        var formAddContact = <div>{btnAddContact} {stepAdd}</div>
        const actions = [
          <FlatButton
            label="Close"
            primary={true}
            onTouchTap={this.handleClose}
          />,
        ];

        var labelTitle = <div>
            <div>
              <div><small style={{color:lightBlack}}>Contact</small></div>
              <div style={styles.wrapper}>{listContactChip}</div>
            </div>
        </div>
        var dialog =
          <div>
            <div style={{cursor:'pointer'}} >{labelTitle}</div>
            <Dialog
              title="Contact User"
              actions={actions}
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
              autoScrollBodyContent={true}
            >
              <div style={styles.box}>{formAddContact}</div>
            </Dialog>
          </div>;

        return(
          <div>
            <div>
              {dialog}
            </div>
          </div>
        )
    }
}

export default ContactUser;
