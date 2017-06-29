import React, {Component} from 'react';
import TicketControlStatus from './TicketControlStatus';
import TicketSlaRemedy from './TicketSlaRemedy';
import {CardFooter,CardContent} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {PresentData,PresentDataBody} from '../management/PresentData';

export default class TicketStatus extends Component {

  constructor(props){
    super(props);
    this.state = {openFormSlaRemedy:false,toSlaStatus:0,toSlaTxt:''}
  }
  loadTicket = () => {
    this.props.loadTicket();
  }
  render(){
    var styles = {
      button: {
        margin:'0px 4px 4px 0px',width:'99%'
      }
    }
    var {data} = this.props;
    
    console.log(data);
    var slaRemedy;
    if(this.state.openFormSlaRemedy){
      slaRemedy = <CardContent style={{border:'1px solid #dedede'}}>
      <TicketSlaRemedy ticket_sid={data.sid} cancelSlaRemedy={()=>{this.setState({openFormSlaRemedy:false}) }} status={this.state.toSlaStatus} statusTxt={this.state.toSlaTxt} /></CardContent>;
    }

    var SLA;
    var control_status_ticket;
    var slaRow = [];
    var btnActivitySlaRemedy;
    if(typeof(data.sla_remedy_array) !=='undefined' && data.sla_remedy_array && data.sla_remedy_array.length>0){
      if(data.refer_remedy_hd){
        // console.log(data.sla_remedy_array);
        if(data.sla_remedy_array.length>0){
          slaRow.push(
            <div key={-1} style={{display:'flex', marginBottom:'10px', width:'100%'}}>
              <div style={{flex:1,overflow:'hidden'}}><span >SLA Name</span></div>
              <div style={{flex:1,overflow:'hidden'}}><span >Due Datetime</span></div>
              <div style={{flex:1,overflow:'hidden'}}><span >Status</span></div>
            </div>
          );
        }
      }else{
        <CardFooter key={-1} style={{marginBottom:'10px', width:'100%'}}>
          <div>SLA (CCD) Not Measured</div>
        </CardFooter>
      }
      data.sla_remedy_array.forEach((item,i)=>{
        slaRow.push(
            <div key={i} style={{display:'flex',marginBottom:'10px', width:'100%'}}>
              <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.name}</div>
              <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.due_datetime}</div>
              <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{item.status}</div>
            </div>
        );
        if(data.sla_remedy_array.length===(i+1)){
          console.log(data.expect_pending);
          if(data.expect_pending){
            slaRow.push(
              <div key={data.sid} style={{display:'flex',marginBottom:'10px', width:'100%', backgroundColor:'#ff4081', padding:4}}>
                <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{"Expect Pending"}</div>
                <div style={{flex:1,overflow:'hidden',color:'#ffffff'}}>{data.expect_pending}</div>
                <div style={{flex:1}}></div>
              </div>
            );
          }
        }
      });
      // console.log(data.expect_pending);
      btnActivitySlaRemedy =
      <div>
        <div>
          <div style={{display:'flex'}}>
            <div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:2, toSlaTxt:'Response'});}} style={styles.button}>Response</RaisedButton></div>
            <div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton></div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:7, toSlaTxt:'Onsite'});}} style={styles.button}>Onsite</RaisedButton>
            </div>
            <div style={{flex:1}}>
              <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:11, toSlaTxt:'No Onsite'});}} style={styles.button}>No Onsite</RaisedButton>
            </div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:3, toSlaTxt:'Workaround'});}} style={styles.button}>Workaround</RaisedButton>
            </div>
            <div style={{flex:1}}>
              <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:10, toSlaTxt:'No Workaround'});}} style={styles.button}>No Workaround</RaisedButton>
            </div>
          </div>
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>
              <RaisedButton  onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:4, toSlaTxt:'Pending'});}} style={styles.button}>Pending</RaisedButton>
            </div>
            <div style={{flex:1}}>
              <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:5, toSlaTxt:'Resolve'});}} style={styles.button}>Resolve</RaisedButton>
            </div>
          </div>
        </div>
      </div>;

      // Call Center Department
      SLA =
      <div style={{width:'100%'}}>
        <PresentData label="SLA"
          value={slaRow} />
      </div>
    }else{
      btnActivitySlaRemedy = <div style={{display:'flex'}}><div style={{flex:1}}><RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton></div><div style={{flex:1}}></div></div>
      SLA = <TicketControlStatus loadNew={this.loadTicket} ticket_sid={data.sid} data={data} />;
    }
    // END SLA

    //WORKLOG ZONE
    var worklog = [];
    // console.log(data.worklog);
    if(data.worklog){
      data.worklog.forEach((item,i)=>{
          worklog.push(
            <div key={i} style={{display:'flex', marginBottom:10, borderBottom:'1px solid #ffffff'}}>
              <div style={{width:'60px'}}><Avatar src={item.create_by_pic} /></div>
              <div style={{flex:1}}>
                {item.worklog}<br/>
                <small style={{fontSize:'70%'}}>Created {item.create_datetime}</small>
              </div>
            </div>
          );
      });
    }

    var contetnSlaRemedy = <div>
        <div style={{marginBottom:10}}>{slaRemedy}</div>
        <div>
          {btnActivitySlaRemedy}
        </div>
    </div>;

    var worklogElement =
    <div>
      <PresentDataBody label={""} value={contetnSlaRemedy} />
      <PresentDataBody label={"Worklog"} value={worklog} />
    </div>

    control_status_ticket =
    <div style={{marginBottom:10}}>
      {SLA}
      <div>{worklogElement}</div>
    </div>;


    return (<div>
        {control_status_ticket}
      </div>
    )
  }
}
