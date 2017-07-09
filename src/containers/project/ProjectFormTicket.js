import React, { Component } from 'react';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put';
import Url from '../../config/url';
import TextField from 'material-ui/TextField';

class ProjectFormTicket extends Component{
  constructor(props){
    super(props);
    this.state = {subject:'',hour:0,listUserCanAddTask:InfoGen.listUserCanAddTask,owner:'',contract_no:this.props.contract_no}
  }
  changeSubject = (value) => {
    this.setState({subject:value});
  }
  changeHour = (value) => {
    this.setState({hour:value});
  }
  // add = () => {
  //   console.log(this.state.subject);
  //   console.log(this.state.hour);
  // }
  cancel = () => {
    this.setState({
      subject:'',
      hour:0
    });
  }
  createNewCase = () => {
    // var dataTmp = {subject:this.state.subject,hour:this.state.hour,owner:this.state.owner,
    //   contract_no:this.state.contract_no,project_sid:this.props.project_sid};
      if(this.state.subject==""){
        alert('Required Subject');
        return 0;
      }
      var owner = InfoGen.email;
      if(this.state.owner!=''){
        owner = this.state.owner;
      }
      var that = this;
      var dataForCreateCase = {
          project_sid:this.props.project_sid,
          contract_no: this.props.contract_no,
          project_owner_sid: null,
          subject: this.state.subject,
          detail: this.state.subject,
          case_type: 'Implement',
          enduser_case: '',
          enduser_address: '',
          urgency: "Normal",
          requester: {name: "",email: "",mobile: "",phone: "",company: ""
          },
          enduser: {
              name: "",email: "",mobile: "",phone: "",company: ""
          },
          owner: {
              thainame: "",email: owner,mobile: "",pic: ""
          },
          man_hours:this.state.hour
      };
      var formData = new FormData();
      formData.append('token', InfoGen.token);
      formData.append('email', InfoGen.email);
      formData.append('storage', JSON.stringify(dataForCreateCase));

      Put(Url.caseCreate, formData).then(function(res) {
        that.setState({subject:''});
        that.props.loadNew();
      });

  }
  renderDevice = () => {
    return InfoGen.isMobile?this.renderMobile():this.renderWeb()
  }
  renderMobile = () => {
    var {owner} = this.state;
    return <div style={{marginTop:30}}>
      <div><TextField hintText="Subject" type="text" floatingLabelText="Subject"
        onChange={(e)=>this.changeSubject(e.target.value)} value={this.state.subject} style={{width:'100%'}} /></div>
      <div style={{marginTop:20}}>
        <div onTouchTap={()=>this.createNewCase()} className="btn three" style={{padding:0, width:'100%',height:'28px',textAlign:'-webkit-center'}}>Add</div>
      </div>
    </div>
  }
  renderWeb = () => {
    var {owner} = this.state;
    return <div>
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
        <div style={styles.bodyWidth100Right}>
          <div style={styles.taskInput}></div>
        </div>
        <div style={styles.bodyOne}>
          <div style={styles.taskInput}>
            <select value={owner} style={{width:'100%'}} onChange={(e)=>this.setState({owner:e.target.value})}>
              <option value={""}>-เลือก Owner-</option>
              {
                this.state.listUserCanAddTask.map((item,i)=>{
                  return <option value={item.email} key={i}>{item.thainame}</option>
                })
              }
            </select>
          </div>
        </div>
        <div style={styles.bodyWidth100}>
          <div style={styles.taskInput}>
            <div onTouchTap={()=>this.createNewCase()} className="btn three" style={{padding:0, width:'100%',height:'28px',textAlign:'-webkit-center'}}>Add</div>
            {//<button style={styles.buttonCancel} onTouchTap={()=>{this.cancel()}}>Cancel</button>
            }
          </div>
        </div>
      </div>
    </div>
  }
  render(){

    return(
      this.renderDevice()
    );
  }
}
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
export default ProjectFormTicket;
