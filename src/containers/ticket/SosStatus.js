import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
import jPost from '../../config/jPost';
import InfoGen from '../../config/InfoGen';
import Paper from 'material-ui/Paper';
import {PresentDataHead,PresentDataBody,PresentDataForm,PresentDataS,PresentDataSF,PresentData} from '../management/PresentData';
import RaisedButton from 'material-ui/RaisedButton';

const inputWidth = "100%";

export default class SosStatus extends Component {

  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {
      willInProgress:false,
      willResoleved:false,
      reason:'',
      status:'',
      resolution:''
    }
  }
  actionChangeStatus = () => {
    var data = {token:InfoGen.token, email:InfoGen.email,
      status:this.state.status,
      reason:this.state.reason,
      resolution:this.state.resolution,
      ticket_sid:this.props.ticket_sid
    };
    var that = this;
    jPost(Url.sosUpdateStatus, data).then((res)=>{
      that.setState({
        willInProgress:false,
        willResoleved:false,
        reason:'',
        status:'',
        resolution:''
      })
      that.props.loadNew();
    });
  }
  render(){
    var styles = {
      button: {
        margin:'0px 10px 4px 5px',width:'99%',
        // padding:'0px 5px 0px 5px'
      },
      buttonWhite: {
        margin:'0px 10px 4px 5px',width:'99%', color:'#ffffff',
        // padding:'0px 5px 0px 5px'
      }
    }
    var content;
    var confirmInProgress =
      <div>
        <div style={{marginTop:20, marginBottom:10}}>ยืนยันเปลี่ยน Status เป็น In Progress</div>
        <div style={{display:'flex', width:'50%'}}>
            <div style={{flex:1}}>
              <RaisedButton
                onTouchTap={()=>this.actionChangeStatus()}
                primary={true} buttonStyle={{color:'#ffffff'}} style={styles.buttonWhite}>Confirm</RaisedButton></div>
              <div style={{flex:1}}>
              <RaisedButton
                onTouchTap={()=>this.setState({willInProgress:false})} secondary={true}
                buttonStyle={{color:'#ffffff'}} style={styles.buttonWhite}>Cancel
              </RaisedButton>
            </div>
        </div>
      </div>
    var confirmResoled =
      <div>
        <div style={{marginTop:20, marginBottom:10}}>ยืนยันเปลี่ยน Status เป็น Resolved</div>
        <div style={{display:'flex', marginBottom:10}}>
          <div style={{margin:'0px 0px', flex:1}}>
            <select value={this.state.reason} size={10} style={{width:'100%'}} onChange={(e)=>this.setState({reason:e.target.value})}>
              <option>{""}</option>
              <option>Infrastructure Change Created</option>
              <option>Local Site Action Required</option>
              <option>Purchase Order Approval</option>
              <option>Registration Approval</option>
              <option>Supplier Delivery</option>
              <option>Support Contact Hold</option>
              <option>Third Party Vendor Action Reqd</option>
              <option>Client Action Required</option>
              <option>Infrastructure Change</option>
              <option>Request</option>
              <option>Future Enhancement</option>
              <option>Pending Original Incident</option>
              <option>Client Hold</option>
              <option>Monitoring Incident</option>
              <option>Customer Follow-Up Required</option>
              <option>Temporary Corrective Action</option>
              <option>No Further Action Required</option>
              <option>Resolved by Original Incident</option>
              <option>Automated Resolution Reported</option>
              <option>No longer a Causal CI</option>
              <option>Pending Causal Incident Resolution</option>
              <option>Resolved by Causal Incident</option>
            </select>
          </div>
          <div style={{flex:1,marginLeft:'10px'}}>
            <textarea style={{width:'100%', padding:5}} value={this.state.resolution}
              placeholder="Resolution detail ..."
              onChange={(e)=>this.setState({resolution:e.target.value})} rows={10}>
            </textarea>
          </div>
        </div>
        <div style={{display:'flex', width:'50%'}}>
            <div style={{flex:1}}>
              <RaisedButton primary={true}
                onTouchTap={()=>this.actionChangeStatus()}
                buttonStyle={{color:'#ffffff'}}
                style={styles.buttonWhite}>Confirm</RaisedButton></div>
            <div style={{flex:1}}>
              <RaisedButton
              onTouchTap={()=>this.setState({willResoleved:false, resolution:'', reason:''})} secondary={true} buttonStyle={{color:'#ffffff'}}
              style={styles.buttonWhite}>Cancel</RaisedButton></div>
        </div>
      </div>
    if(this.state.willInProgress){
      content = confirmInProgress;
    }
    if(this.state.willResoleved){
      content = confirmResoled;
    }
    var currentStatus = this.props.data.status;
    var currentStatusText;
    if(currentStatus=="1"){
	    		currentStatusText = "Assigned";
    }else if(currentStatus=="2"){
				  currentStatusText = "In Progress";
	  }else if(currentStatus=="4"){
	    		currentStatusText = "Pending";
	  }else if(currentStatus=="5"){
	    		currentStatusText = "Resolved";
	  }else if(currentStatus=="6"){
	    		currentStatusText = "Closed";
	  }else if(currentStatus=="6"){
	    		currentStatusText = "Cancelled";
	  }
    return(
      <div>
        <PresentData label={"Status"} value={
          currentStatusText
        }/>
        <PresentDataForm label={""} value={
          <div>
            <div style={{display:'flex'}}>
              <div style={{flex:1}}>
                <RaisedButton onTouchTap={()=>{this.setState({willInProgress:true,willResoleved:false,status:'In Progress'})}} style={styles.button}>In Progress</RaisedButton>
              </div>
              <div style={{flex:1}}>
                <RaisedButton
                onTouchTap={()=>{this.setState({willResoleved:true,willInProgress:false, status:'Resolved'})}} style={styles.button}>
                Resolved</RaisedButton>
              </div>
            </div>
            <div>
              {content}
            </div>
          </div>
          } />
      </div>
    )
  }
}
