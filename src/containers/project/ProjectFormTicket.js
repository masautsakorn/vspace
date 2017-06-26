import React, { Component } from 'react';
import InfoGen from '../../config/InfoGen';
import TextField from 'material-ui/TextField';

class ProjectFormTicket extends Component{
  constructor(props){
    super(props);
    this.state = {subject:'',hour:0}
  }
  changeSubject = (value) => {
    this.setState({subject:value});
  }
  changeHour = (value) => {
    this.setState({hour:value});
  }
  add = () => {
    console.log(this.state.subject);
    console.log(this.state.hour);
  }
  cancel = () => {
    this.setState({
      subject:'',
      hour:0
    });
  }
  render(){
    var styles = {
      body: {
        display:'flex'
      },
      bodyWidth100: {
        width:100,
        textAlign:'left'
      },
      bodyWidth50: {
        width:50
      },
      bodyTwo:{
        flex:2
      },
      bodyOne: {
        flex:1
      },
      bodyWidth100Right: {
        width:120,
        textAlign:'right'
      },
      taskLabel: {
        padding:12, backgroundColor:'rgb(236, 240, 241)',
        color:'#000000',
        borderBottom:'1px solid #fcfcfc',
        marginRight:1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height:40,
        textAlign:'right'
      },
      taskSubject: {
        padding:12, backgroundColor:'rgb(236, 240, 241)',
        color:'#000000',
        borderBottom:'1px solid #fcfcfc',
        marginRight:1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height:40
      },
      taskInput: {
        padding:8, backgroundColor:'rgb(236, 240, 241)',
        color:'#000000',
        borderBottom:'1px solid #fcfcfc',
        marginRight:1,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height:40
      },
      input: {
        width:'100%',
        height:'100%'
      },
      buttonSubmit: {
        padding: '3px',
        borderRadius: '5px',
        width: '50%',
        background: '#00bcd4',
        border: '1px solid #00bcd4',
        color: '#ffffff'
      },
      buttonCancel: {
        padding: '3px',
        borderRadius: '5px',
        width: '50%',
        background: '#ff4081',
        border: '1px solid #ff4081',
        color: '#ffffff',
        marginLeft:'3px'
      },

    }

    return(
      <div>
        <div style={styles.body}>
          <div style={styles.bodyWidth50}>
            <div style={styles.taskSubject}></div>
          </div>
          <div style={styles.bodyWidth100}>
            <div style={styles.taskLabel}>Subject</div>
          </div>
          <div style={styles.bodyTwo}>
            <div style={styles.taskInput}>
              <input placeholder="Subject" type="text" onChange={(e)=>this.changeSubject(e.target.value)} value={this.state.subject} style={styles.input} />
            </div>
          </div>
          <div style={styles.bodyWidth100Right}>
            <div style={styles.taskInput}>
              <input placeholder="Estimate Hour" type="number" min="0" onChange={(e)=>this.changeHour(e.target.value)} value={this.state.hour} style={styles.input} />
            </div>
          </div>
          <div style={styles.bodyWidth100}>
            <div style={styles.taskInput}>
              <button style={styles.buttonSubmit} onTouchTap={()=>{this.add()}}>Add</button>
              <button style={styles.buttonCancel} onTouchTap={()=>{this.cancel()}}>Cancel</button>
            </div>
          </div>
          <div style={styles.bodyOne}>
            <div style={styles.taskInput}></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProjectFormTicket;
