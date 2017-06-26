import React, { Component } from 'react';

import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import ExpandTransition from 'material-ui/internal/ExpandTransition';
import TextField from 'material-ui/TextField';

class Signup extends React.Component {

  state = {
    loading: false,
    finished: false,
    stepIndex: 0,
    email:"",
    password:"",
    name:"",
    mobile:"",
    otp:""
  };

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


  dummyAsync = (cb) => {
    this.setState({loading: true}, () => {
      this.asyncTimer = setTimeout(cb, 500);
    });
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if(stepIndex===0){
       if(this.state.email!=="" && this.state.password!=="" && this.state.name!=="" && this.state.mobile!==""){
         this.setState({
           stepIndex: stepIndex + 1,
           finished: stepIndex >= 2,
         });
       }
    } else if(stepIndex===1){
      if(this.state.otp!==""){
        this.setState({
          stepIndex: stepIndex + 1,
          finished: stepIndex >= 2,
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
    if (!this.state.loading) {
      this.dummyAsync(() => this.setState({
        loading: false,
        stepIndex: stepIndex - 1,
      }));
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div>
          <form>
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Email" value={this.state.email} onChange={this.handleEmail} />
          </div>
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Password" value={this.state.password} onChange={this.handlepassword} />
          </div>
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Name" value={this.state.name} onChange={this.handlename} />
          </div>
          <div>
            <TextField style={{marginTop: 0}} floatingLabelText="Mobile" value={this.state.mobile} onChange={this.handlemoblie} />
          </div>
          </form>

          </div>

        );
      case 1:
        return (
          <div>
              <form>
                  <div>
                    <TextField style={{marginTop: 0}} floatingLabelText="OTP" value={this.state.otp} onChange={this.handleotp} />
                  </div>
              </form>
          </div>

        );
      case 2:
        return (
          <div>
            <h3>finished</h3>
          </div>
        );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  renderContent() {
    const {finished, stepIndex} = this.state;
    const contentStyle = {margin: '21px 230px', overflow: 'hidden'};
    var styleBtnBack = {
    }
    if(stepIndex===0){
      styleBtnBack = {
        visibility: 'hidden'
      }
    }
    if (finished) {
      return (
        <div style={contentStyle}>
          <p>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              Click here
            </a> goto App
          </p>
        </div>
      );
    }

    return (
      <div style={contentStyle}>
        <div>{this.getStepContent(stepIndex)}</div>
        <div style={{marginTop: 24, marginBottom: 12}}>
        <FlatButton
          label="Back"
          disabled={stepIndex === 0}
          onTouchTap={this.handlePrev}
          style={styleBtnBack}
        />
          <RaisedButton
            label={stepIndex === 2 ? 'Finish' : 'Next'}
            primary={true}
            onTouchTap={this.handleNext}
          />
        </div>
      </div>
    );
  }

  render() {
    const {loading, stepIndex} = this.state;

    return (
      <div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
        <Stepper activeStep={stepIndex}>

          <Step>
            <StepLabel>Create account</StepLabel>
          </Step>
          <Step>
            <StepLabel>OTP</StepLabel>
          </Step>
          <Step>
            <StepLabel>Finished</StepLabel>
          </Step>
        </Stepper>
        <ExpandTransition loading={loading} open={true}>
          {this.renderContent()}
        </ExpandTransition>
      </div>
    );
  }
}


export default Signup;
