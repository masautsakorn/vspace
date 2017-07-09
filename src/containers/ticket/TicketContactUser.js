import React, {Component} from 'react';
import TextField from 'material-ui/TextField';

import InfoGen from '../../config/InfoGen';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import {PresentData, PresentDataHeader,PresentDataBody} from '../management/PresentData';

export default class TicketContactUser extends Component {
  constructor(props){
    super(props);

    this.state = {data:this.props.data,editEndUser:false,end_user_company_name:'',end_user_contact_name:'',end_user_email:'',end_user_mobile:'',end_user_phone:''}
  }
  cEndUser = (sid, name, email, mobile, phone, company)=>{
      var data = {token:InfoGen.token,email:InfoGen.email,ticket_sid:sid,eu_name:name,eu_email:email, eu_mobile:mobile, eu_phone:phone,eu_company:company};
      this.props.cEndUser(data);
  }
  render(){
    var txtStyle = {WebkitTextFillColor:'#ffffff',color:'#ffffff'};
    var {data} = this.props;
    console.log(data);
    return <div style={{marginTop:5}}>
        <PresentDataHeader label={
          <div style={{display:'flex'}}>
            <div style={{flex:1}}>Contact User</div>
            <div style={{flex:1,textAlign:'right'}}>
              <EditorBorderColor onTouchTap={
                ()=>this.setState({
                  editEndUser:!this.state.editEndUser,
                  end_user_company_name:data.end_user_company_name,
                  end_user_contact_name:data.end_user_contact_name,
                  end_user_email:data.end_user_email,
                  end_user_mobile:data.end_user_mobile,
                  end_user_phone:data.end_user_phone
                })
              } style={{width:12}} />
            </div>
          </div>
        }  />
        {
          (this.state.editEndUser)?
            <div>
                <PresentData label={"Name"} value={
                  <TextField hintStyle={txtStyle} inputStyle={txtStyle} style={txtStyle} hintText="Name" style={{width:'100%'}} onChange={(e)=>this.setState({end_user_contact_name:e.target.value})} value={this.state.end_user_contact_name} />
                } />
                <PresentData label={"Email"} value={
                  <TextField hintStyle={txtStyle} inputStyle={txtStyle} style={txtStyle} hintText="Email" style={{width:'100%'}} onChange={(e)=>this.setState({end_user_email:e.target.value})} value={this.state.end_user_email} />
                } />
                <PresentData label={"Mobile"} value={
                  <TextField hintStyle={txtStyle} inputStyle={txtStyle} style={txtStyle} hintText="Mobile" style={{width:'100%'}} onChange={(e)=>this.setState({end_user_mobile:e.target.value})} value={this.state.end_user_mobile} />
                } />
                <PresentData label={"Phone"} value={
                  <TextField hintStyle={txtStyle} inputStyle={txtStyle} style={txtStyle} hintText="Phone" style={{width:'100%'}} onChange={(e)=>this.setState({end_user_phone:e.target.value})} value={this.state.end_user_phone} />
                } />
                <PresentData label={"Company"} value={
                  <TextField hintStyle={txtStyle} inputStyle={txtStyle} style={txtStyle} hintText="Company" style={{width:'100%'}} onChange={(e)=>this.setState({end_user_company_name:e.target.value})} value={this.state.end_user_company_name} />
                } />
                <PresentData label={""} value={
                  <div style={{display:'flex'}}>
                    <div className="btn four" style={{maxWidth:'120px',width:'100%'}} onTouchTap={
                      ()=>{
                          this.cEndUser(
                          data.sid,
                          this.state.end_user_contact_name,
                          this.state.end_user_email,
                          this.state.end_user_mobile,
                          this.state.end_user_phone,
                          this.state.end_user_company_name);
                          // this.setState({editEndUser:!this.state.editEndUser});
                      }
                    }>SAVE</div>
                    <div className="btn five" style={{maxWidth:'120px',width:'100%'}} onTouchTap={()=>this.setState({editEndUser:!this.state.editEndUser})}>CANCEL</div>
                  </div>
                } />
            </div>
          :
            <div>
              <PresentData label={"Name"} value={data.end_user_contact_name} />
              <PresentData styleRight={{flex:1,overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} label={"Email"} value={data.end_user_email} />
              <PresentData label={"Mobile"} value={data.end_user_mobile} />
              <PresentData styleRight={{flex:1,overflow: 'hidden',textOverflow: 'ellipsis',whiteSpace: 'nowrap'}} label={"Phone"} value={data.end_user_phone} />
              <PresentData label={"Company"} value={data.end_user_company_name} />
            </div>
        }

        <div style={{clear:'both'}}></div>
    </div>
  }
}
