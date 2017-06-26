import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import Put from '../../config/Put.js';
import Url from '../../config/url';
import {
  // grey400, darkBlack,
  lightBlack} from 'material-ui/styles/colors';
import Card from 'material-ui/Card';

class ForgotNew extends Component {
  constructor(props){
    super(props);
    this.state = {
      finished: false,
      stepIndex: 0,
      email:"",
      otp:"",
      newpassword:"",
    };
  }

  handleNext = () => {
    const {stepIndex} = this.state;
    var that = this;
    if(stepIndex===0){
      if(this.state.email!==""){
        var formData = new FormData();
        var data = {email:this.state.email};
        formData.append('data',JSON.stringify(data));
        Put(Url.forgotPassword,formData).then(function(res){
            console.log(res);
            if(res.data.active==="1" || res.data.active==="0"){
              that.setState({
                stepIndex: stepIndex + 1,
                finished: stepIndex >= 2,
              });
            }else{
              alert(res.message);
            }
        });
      }
    }else if(stepIndex===1){
      if(this.state.otp!=="" && this.state.newpassword!==""){
        // var formData = new FormData();
        var dataTmp = {email:this.state.email,password:this.state.newpassword,otp:this.state.otp};
        // console.log(data);
        formData.append('data',JSON.stringify(dataTmp));
        Put(Url.confirmForgotPassword,formData).then(function(res){
            console.log(res);
            if(res.error){
              alert(res.message);
            }else{
              // alert(res.message);
              that.setState({
                  stepIndex: stepIndex + 1,
                  finished: stepIndex >= 2,
              });
            }
        });
      }
    }else{
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

  handleEmail = (e) => {
    this.setState({email:e.target.value});
  }
  handleotp = (e) => {
    this.setState({otp:e.target.value});
  }
  handlenewpassword = (e) => {
    this.setState({newpassword:e.target.value});
  }

  renderStepActions(step) {
    const {stepIndex} = this.state;

    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Finish' : 'Next'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <FlatButton
            label="Back"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const { stepIndex} = this.state;
    var styles = {
        card: {
         width: '80%',
         margin: '0px auto 20px auto',
         textAlign: 'center',
         clear:'both',
        //  overflow:'auto'
       }
    }

    return (
      <Card style={styles.card}>
        <div style={{ margin: 'auto'}}>
          <div style={{'paddingTop':'20px'}}><span style={{color:lightBlack}}>Sign up vSpace </span></div>
          <Stepper activeStep={stepIndex} orientation="vertical">
            <Step>
              <StepLabel>Send your Email Address</StepLabel>
              <StepContent>
                <div>
                <TextField type="email" hintText="Email" value={this.state.email} onChange={this.handleEmail}
                   floatingLabelText=""
                   floatingLabelFixed={true} />
                </div>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Reset Password</StepLabel>
              <StepContent>
                <div>
                  <div>
                      <TextField hintText="OTP" value={this.state.otp} onChange={this.handleotp} floatingLabelText="" floatingLabelFixed={true} />
                  </div>
                  <div>
                      <TextField hintText="New Password" type="password" value={this.state.newpassword} onChange={this.handlenewpassword} floatingLabelText="" floatingLabelFixed={true} />
                  </div>
                </div>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepLabel>Finished</StepLabel>
              <StepContent>
                <div style={{color:lightBlack}}>
                  Your password has been changed successfully!
                </div>
              </StepContent>
            </Step>
          </Stepper>

        </div>
      </Card>
    );
  }
}

export default ForgotNew;
