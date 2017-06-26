import React, { Component } from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
// import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';
import Card from 'material-ui/Card';
import Put from '../../config/Put.js';
import Url from '../../config/url';
import {lightBlack} from 'material-ui/styles/colors';

class SignupNew extends Component {
  constructor(props){
    super(props);
    // this.state = {...props};
    this.state = {
      finished: false,
      stepIndex: 0,
      email:"",
      password:"",
      name:"",
      mobile:"",
      otp:"",
      labelLastStep:""
    };

  }

  handleNext = () => {
    const {stepIndex} = this.state;
    var that = this;
    if(stepIndex===0){
      if(this.state.email!=="" && this.state.password!=="" && this.state.name !=="" && this.state.mobile !==""){
        var data = {email:this.state.email,password:this.state.password,name:this.state.name,mobile:this.state.mobile,otp:""}
        var formData = new FormData();
        formData.append('data',JSON.stringify(data));
        Put(Url.signup, formData).then(function(res){
          console.log(res);
          if(res.data==="Mail Unavailable"){
            alert(res.data);
          }else{
            that.setState({
              stepIndex: stepIndex + 1,
              finished: stepIndex >= 2,
            });
          }
        });
      }
    }else if(stepIndex===1){
      if(this.state.otp!==""){
        const data = {email:this.state.email,password:this.state.password,name:this.state.name,mobile:this.state.mobile,otp:this.state.otp}
        const formData = new FormData();
        formData.append('data',JSON.stringify(data));
        Put(Url.signupConfirm, formData).then(function(res){
          if(res.message==="Confirm Success!"){
            var signUpSuccess = <div style={{color:lightBlack}}>Sign Up Successfully... <br/> You can Sign In vSpace.</div>
            alert(res.message);
            that.setState({
              labelLastStep:signUpSuccess
            });
            that.setState({
              stepIndex: stepIndex + 1,
              finished: stepIndex >= 2,
            });
          }else{
            alert(res.message);
          }
        });
      }
    }else if(stepIndex===2){
      this.setState({
        stepIndex: stepIndex + 1,
        finished: stepIndex >= 2,
      });
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    const {stepIndex} = this.state;

    var btnNextFinish;
    if(stepIndex===2){
      btnNextFinish = <div></div>
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

  handleEmail = (e) => {
    this.setState({email:e.target.value});
  }
  handlepassword =(e) => {
    this.setState({password:e.target.value})
  }
  handlename = (e) => {
    this.setState({name:e.target.value})
  }
  handlemoblie = (e) => {
    this.setState({mobile:e.target.value})
  }
  handleotp = (e) => {
    this.setState({otp:e.target.value})
  }

  render(){

    const { stepIndex} = this.state;
    var styles = {
        card: {
         width: '90%',
         margin: '0px auto 20px auto',
         textAlign: 'center',
         clear:'both',
        //  overflow:'auto'
       }
    }

    // maxHeight: 400,
    return (
      <Card style={styles.card}>
        <div style={{maxWidth: '80%',  margin: 'auto'}}>
        <div style={{'paddingTop':'20px'}}><span style={{color:lightBlack}}>Sign Up vSpace </span></div>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel><span  >Create Account</span></StepLabel>
              <StepContent>
                <div>
                    <form>
                        <div>
                          <TextField  style={{marginTop: 0}} floatingLabelText="Email" value={this.state.email} onChange={this.handleEmail} />
                        </div>
                        <div>
                          <TextField style={{marginTop: 0}} type="password" floatingLabelText="Password" value={this.state.password} onChange={this.handlepassword} />
                        </div>
                        <div>
                          <TextField style={{marginTop: 0}} floatingLabelText="Name" value={this.state.name} onChange={this.handlename} />
                        </div>
                        <div>
                          <TextField style={{marginTop: 0}} floatingLabelText="Mobile" value={this.state.mobile} onChange={this.handlemoblie} />
                        </div>
                    </form>
                </div>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Confirm OTP</StepLabel>
              <StepContent>
                <div>
                  <TextField style={{marginTop: 0}} floatingLabelText="OTP" value={this.state.otp} onChange={this.handleotp} />
                </div>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Finished</StepLabel>
              <StepContent>
                <div>
                  {this.state.labelLastStep}
                </div>
              </StepContent>
            </Step>
          </Stepper>
        </div>
      </Card>
    );


  }
}

export default SignupNew;
