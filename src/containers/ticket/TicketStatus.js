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
    console.log(data.sid);
    var slaRemedy;
    if(this.state.openFormSlaRemedy){
      slaRemedy =
        <TicketSlaRemedy ticket_sid={data.sid} loadTicket={this.loadTicket}
        cancelSlaRemedy={()=>{this.setState({openFormSlaRemedy:false}) }}
        status={this.state.toSlaStatus} statusTxt={this.state.toSlaTxt} />
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
              <div style={{flex:3,overflow:'hidden',color:'#ffffff'}}><span >SLA Due Datetime</span></div>
              <div style={{flex:2,overflow:'hidden',color:'#ffffff',textAlign:'center'}}><span >Status</span></div>
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
              <div style={{flex:3,overflow:'hidden',color:'#ffffff'}}><div>{item.name}</div><div>{item.due_datetime}</div></div>
              <div style={{flex:2,overflow:'hidden',color:'#ffffff',textAlign:'center'}}>{item.status}</div>
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
      <div style={{padding:10, backgroundColor:'#1b90a1'}}>
        <div style={{color:'#ffffff',textAlign:'center'}}>SLA Table</div>
        {slaRow}
      </div>
    }else{
      btnActivitySlaRemedy = <div style={{display:'flex'}}>
        <div style={{flex:1}}>
          <RaisedButton onTouchTap={()=>{this.setState({openFormSlaRemedy:true,toSlaStatus:8, toSlaTxt:'Worklog'});}} style={styles.button}>Worklog</RaisedButton>
        </div>
        <div style={{flex:1}}></div>
      </div>
      SLA = <TicketControlStatus loadNew={this.loadTicket} ticket_sid={data.sid} data={data} />;
    }
    // END SLA

    //WORKLOG ZONE
    var worklog = [];
    console.log('worklog',data.worklog);
    if(data.worklog){
      data.worklog.forEach((item,i)=>{
          worklog.push(
            <div key={i} style={{display:'flex', marginBottom:10, borderBottom:'1px solid #ffffff'}}>
              <div style={{flex:1,color:'#ffffff', padding:10}}>
                {item.worklog}<br/>
                <small style={{}}>Created {((item.created_name)?item.created_name:item.create_by)}</small><br/>
                <small style={{}}>{item.create_datetime}</small>
              </div>
            </div>
          );
      });
    }

    var contentSlaRemedy = <div>
        <div style={{margin:'10px 0px'}}>
          {btnActivitySlaRemedy}
        </div>
        <div>
          {slaRemedy}
        </div>
    </div>;

    var worklogElement =
    <div>
      <div>{contentSlaRemedy}</div>
      <div style={{marginTop:25,adding:10,backgroundColor:'#1b90a1'}}>
        <div style={{textAlign:'center', color:'#ffffff',borderBottom:'1px solid #ffffff'}}>Worklog</div>
        <div>{worklog}</div>
      </div>
    </div>

    control_status_ticket =
    <div style={{marginBottom:10}}>
      {SLA}
      <div>{worklogElement}</div>
    </div>;


    return (<div style={{marginTop:25}}>
        {control_status_ticket}
      </div>
    )
  }
}
