import React, { Component } from 'react';
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
  },
};
class StepperAction extends Component{

  render(){
    return (
      <TextField
      hintText="Input Action here"
      multiLine={true}
      rows={10}
      rowsMax={200}
      style={{'width':'100%'}}
    />
    )
  }
}

export default StepperAction;
