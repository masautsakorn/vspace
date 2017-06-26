import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Columns,Column } from 're-bulma';
import { Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InfoGen from '../../config/InfoGen';
import ContentRemoveCircleOutline from 'material-ui/svg-icons/content/remove-circle-outline'
import {PresentData, PresentDataHeader} from '../management/PresentData';

export default class Serial extends Component {
  constructor(props){
    super(props);
    this.state = {ticket_sid:this.props.ticket_sid, serial:[],data:this.props.data}
    var that = this;
    this.props.socket.on('ticket_serial_'+this.props.ticket_sid,function(res){
      console.log(res);
      that.setState({serial:res,txtSerial:''});
    });
  }
  componentWillMount(){
    this.props.socket.emit('ticket_serial', {token:InfoGen.token,email:InfoGen.email, ticket_sid:this.state.ticket_sid});
  }
  openAdd = () => {
    this.setState({openAdd:!this.state.openAdd});
  }
  addSerial = () => {
    var data = {
      authen: {
        token:InfoGen.token,email:InfoGen.email
      },
      data: {
        ticket_sid:this.state.ticket_sid,serial: this.state.txtSerial
      }
    }
    // console.log(data);
    this.props.socket.emit('ticket_serial_add', data);
  }
  removeItem = (sid) => {
    // alert(sid);
    var data = {
      authen: {
        token:InfoGen.token,email:InfoGen.email
      },
      data: {
        ticket_sid:this.state.ticket_sid,serial: this.state.txtSerial, sid: sid
      }
    }
    if(window.confirm('Delete Item?')){
      this.props.socket.emit('ticket_serial_delete', data);
    }
  }
  changeTxtSerial = (value) => {this.setState({txtSerial:value})}
  render(){
    var serial = this.state.serial.map((item,i)=>{
      return(<div key={i}>{item.serial_detail} {<ContentRemoveCircleOutline style={{color:'#ffffff'}} onTouchTap={()=>this.removeItem(item.sid)} />}</div>);
    });
    var add;
    if(this.state.openAdd){
      add =
        <div>
          <TextField hintStyle={{color:'#ffffff', fontSize:13}} inputStyle={{color:'#ffffff'}} hintText="Serial" value={this.state.txtSerial} onChange={(e)=>this.changeTxtSerial(e.target.value)} />
          <RaisedButton onTouchTap={()=>this.addSerial()} style={{margin:4}} label="Add" />
        </div>
    }
    var controlS =
    <div>
        {add}
        <div style={{marginTop:10}}>
          {((InfoGen.email===this.state.data.create_by||1)?
          <RaisedButton onTouchTap={()=>this.openAdd()} label={(this.state.openAdd)?"Cancel":"New"} />
          :'')
          }
        </div>
    </div>;
    console.log(this.state.data.status);
    return(
      <div>
        {((this.state.serial.length>0)?
        <div>
          <PresentData label={"Serial"} value={serial} />
        </div>
        :'')}
        {(this.state.data.status==="5" || this.state.data.status===5 ||this.state.data.status===6||this.state.data.status==="6")?<div/>:<PresentData label="Add Serial" value={controlS} />}
      </div>
    )
  }
}
