import React from 'react';
import CallService from '../../../config/CallService';
import InfoGen from '../../../config/InfoGen';
import url from '../../../config/url';
import Put from '../../../config/Put';
import jPost from '../../../config/jPost';
import {PresentDataS,PresentDataSF} from '../../management/PresentData';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';

export default class OraclePart extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            ticket_sid:this.props.ticket_sid,
            data:[],
            adding:false,
            initial:true,
            modeAdding:false,
            oracle_sr:'',
            oracle_sr_type:'Escalate',
            oracle_create_date: null,
            task:'',
            pn:'',
            part_description:'',
            request_spare_part_date:null,
            delivery_due_date:null,
            receive_spare_part_date:null,
            return_spare_part_date:null,
            spare_part_return_type:'',
            edit_ticket_spare_sid:null
        }
    }
    handleChangeDate = (event, date) => {
        this.setState({
            oracle_create_date: date,
        });
    };
    handleChange_request_spare_part_date = (event ,date) => {
        this.setState({
            request_spare_part_date:date
        })
    }
    handleChange_delivery_due_date = (event ,date) => {
        this.setState({
            delivery_due_date:date
        })
    }
    handleChange_receive_spare_part_date = (event ,date) => {
        this.setState({
            receive_spare_part_date:date
        })
    }
    handleChange_return_spare_part_date = (event ,date) => {
        this.setState({
            return_spare_part_date:date
        })
    }
    componentWillMount(){
        this.callData();
    }
    callData = () => {
        var that = this;
        var data = {
            token:InfoGen.token,
            email:InfoGen.email,
            start:'',
            end:'',
            ticket_sid:this.props.ticket_sid
        };
        jPost(url.oraclePart, data).then(function(res){
            that.setState({data:res.data,initial:false,edit_ticket_spare_sid:null});
        });
    }
    addPart = () => {
        var that = this;
        // console.log(this.state);
        var data = {
            token:InfoGen.token, email:InfoGen.email,
            oracle_sr:this.state.oracle_sr,
            oracle_sr_type:this.state.oracle_sr_type,
            oracle_create_date:moment(this.state.oracle_create_date).format('YYYY-MM-DD'),
            task:this.state.task,
            pn:this.state.pn,
            part_description:this.state.part_description,
            request_spare_part_date:moment(this.state.request_spare_part_date).format('YYYY-MM-DD'),
            delivery_due_date:moment(this.state.delivery_due_date).format('YYYY-MM-DD'),
            receive_spare_part_date:moment(this.state.receive_spare_part_date).format('YYYY-MM-DD'),
            return_spare_part_date:moment(this.state.return_spare_part_date).format('YYYY-MM-DD'),
            spare_part_return_type:this.state.spare_part_return_type,
            edit_ticket_spare_sid:null,
            ticket_sid:this.props.ticket_sid
        }
        if(!this.state.adding){
            that.setState({adding:true});
            jPost(url.addOracleBackline, data).then(function(res){
                console.log(res);
                that.setState({
                    adding:false,
                    data:res.data,
                    initial:false,
                    oracle_sr:'',
                    oracle_sr_type:'Escalate',
                    oracle_create_date: null,
                    task:'',
                    pn:'',
                    part_description:'',
                    request_spare_part_date:null,
                    delivery_due_date:null,
                    receive_spare_part_date:null,
                    return_spare_part_date:null,
                    spare_part_return_type:''
                });
            });
        }
    }
    editOracleBackline = (ticket_spare_sid) => {
        // console.log(ticket_spare_sid);
        this.setState({edit_ticket_spare_sid:ticket_spare_sid});
    }
    cancelEditOracleBackline = () => {
        this.setState({edit_ticket_spare_sid:null});
    }
    addingPart = () => {
        this.setState({modeAdding:!this.state.modeAdding});
    }
    editPart = (data) => {
        // console.log('editPart', data, data.oracle_task, data.part_description);
        var that = this;
        var dataEdit = {
          token:InfoGen.token, email:InfoGen.email,
          oracle_sr:data.oracle_sr,
          oracle_sr_type:data.oracle_sr_type,
          oracle_create_date:moment(data.oracle_create_date).format('YYYY-MM-DD'),
          task:data.oracle_task,
          pn:data.pn,
          part_description:data.part_description,
          request_spare_part_date:moment(data.request_spare_part_date).format('YYYY-MM-DD'),
          delivery_due_date:moment(data.delivery_due_date).format('YYYY-MM-DD'),
          receive_spare_part_date:moment(data.receive_spare_part_date).format('YYYY-MM-DD'),
          return_spare_part_date:moment(data.return_spare_part_date).format('YYYY-MM-DD'),
          spare_part_return_type:data.spare_part_return_type,
          ticket_spare_sid:data.ticket_spare_sid,
          ticket_spare_task_sid:data.ticket_spare_task_sid,
          ticket_spare_part_sid:data.ticket_spare_part_sid,
          ticket_sid:this.state.ticket_sid
        };
        jPost(url.editOracleBackline, dataEdit).then(function(res){
                that.setState({
                    adding:false,data:res.data,
                    initial:false,
                    oracle_sr:'',
                    oracle_sr_type:'Escalate',
                    oracle_create_date: null,
                    task:'',
                    pn:'',
                    part_description:'',
                    request_spare_part_date:null,
                    delivery_due_date:null,
                    receive_spare_part_date:null,
                    return_spare_part_date:null,
                    spare_part_return_type:'',
                    edit_ticket_spare_sid:null
                });
        });
    }
    deletePart = (data) => {
        var that = this;
        if(window.confirm("Confirm Delete?")){
            var dataDelete = {
                token:InfoGen.token, email:InfoGen.email,
                ticket_sid:this.state.ticket_sid,
                ticket_spare_sid:data.ticket_spare_sid,
                ticket_spare_task_sid:data.ticket_spare_task_sid,
                ticket_spare_part_sid:data.ticket_spare_part_sid
            }
            jPost(url.deleteOracleBackline, dataDelete).then(function(res){
                that.setState({
                    adding:false,data:res.data,
                    initial:false,
                    oracle_sr:'',
                    oracle_sr_type:'Escalate',
                    oracle_create_date: null,
                    task:'',
                    pn:'',
                    part_description:'',
                    request_spare_part_date:null,
                    delivery_due_date:null,
                    receive_spare_part_date:null,
                    return_spare_part_date:null,
                    spare_part_return_type:'',
                    edit_ticket_spare_sid:null
                });
            });
        }
    }
    onSendEmailPart = (data) => {
        // console.log('onSendEmailPart',data);
        var that = this;
        var formData = new FormData();
        formData.append("address", data.address);
        formData.append("cc", data.cc);
        formData.append("contactNumber", data.contactNumber);
        formData.append("partCollectionDate", data.partCollectionDate);
        formData.append("person", data.person);
        formData.append("ticket_spare_part_sid", data.ticket_spare_part_sid);

        formData.append("email", InfoGen.email);
        formData.append("token",InfoGen.token);

        Put(url.sendToDHL, formData).then(function(res){
            alert('Send Mail');
            that.callData();
        });
    }
    render(){
        var {data} = this.state;
        console.log(data);
        var content;
        if(this.state.initial){
            content = <div>Loading...</div>
        }else{
            content = data.map((item,i)=>{
                if(item.ticket_spare_sid===this.state.edit_ticket_spare_sid){
                    return (
                        <EditData onDelete={this.deletePart} onEdit={this.editPart} key={i} cancelEditOracleBackline={this.cancelEditOracleBackline} i={i} item={item} />
                    )
                }else{
                    return (
                        <ShowData onSendEmailPart={this.onSendEmailPart} info={this.props.info} key={i} editOracleBackline={this.editOracleBackline} i={i} item={item} />
                    );
                }
            });
        }
        var add;
        if(!this.state.edit_ticket_spare_sid){
            add =
            <div style={{marginBottom:10,borderBottom:'1px solid #ffffff'}}>
                {
                    (this.state.modeAdding)?
                    <div>
                        <div style={{display:'flex',marginBottom:4}}>
                            <div style={{flex:1}}>
                                <div><PresentDataSF label="*SR No.:" value={<input value={this.state.oracle_sr} onChange={(e)=>this.setState({oracle_sr:e.target.value})} />} /></div>
                                <div><PresentDataSF label="*Type:" value={<select value={this.state.oracle_sr_type} onChange={(e)=>this.setState({'oracle_sr_type':e.target.value})} style={{width:120}}><option value="Escalate">Escalate</option><option value="Part Only">Part Only</option></select>} /></div>
                                <div><PresentDataSF label="*Created:" value={
                                    <DatePicker style={{width:120, height:36}} textFieldStyle={{fontSize:10,width:120, height:36}}
                                        hintText="Create date"
                                        value={this.state.oracle_create_date}
                                        onChange={this.handleChangeDate}
                                    />
                                    } /></div>
                                <div><PresentDataSF label="Task No.:" value={<input value={this.state.task} onChange={(e)=>this.setState({task:e.target.value})} />} /></div>
                            </div>
                            <div style={{flex:1}}>
                                <div><PresentDataSF label="Part No.:" value={<input style={{width:'100%'}} value={this.state.pn} onChange={(e)=>this.setState({pn:e.target.value})} />} /></div>
                                <div><PresentDataSF label="Description:" value={<input style={{width:'100%'}} value={this.state.part_description} onChange={(e)=>this.setState({part_description:e.target.value})} />} /></div>
                                <div><PresentDataSF label="Request date:" value={
                                    <DatePicker style={{width:120, height:36}} textFieldStyle={{fontSize:10,width:120, height:36}}
                                        hintText="Request date"
                                        value={this.state.request_spare_part_date}
                                        onChange={this.handleChange_request_spare_part_date}
                                    />
                                    } /></div>
                                <div><PresentDataSF label="Delivery due:" value={
                                    <DatePicker style={{width:120, height:36}} textFieldStyle={{fontSize:10,width:120, height:36}}
                                        hintText="Delivery due date"
                                        value={this.state.delivery_due_date}
                                        onChange={this.handleChange_delivery_due_date}
                                    />
                                    } /></div>
                                <div><PresentDataSF label="Receive date:" value={
                                    <DatePicker style={{width:120, height:36}} textFieldStyle={{fontSize:10,width:120, height:36}}
                                        hintText="Receive date"
                                        value={this.state.receive_spare_part_date}
                                        onChange={this.handleChange_receive_spare_part_date}
                                    />
                                    } /></div>
                                <div><PresentDataSF label="Return date:" value={
                                    <DatePicker style={{width:120, height:36}} textFieldStyle={{fontSize:10,width:120, height:36}}
                                        hintText="Create date"
                                        value={this.state.return_spare_part_date}
                                        onChange={this.handleChange_return_spare_part_date}
                                    />
                                    } /></div>
                                <div><PresentDataSF label="Return type:" value={
                                    <select onChange={(e)=>{this.setState({spare_part_return_type:e.target.value})}}>
                                        <option value=''></option>
                                        <option value='Part return'>Part return</option>
                                        <option value='Good return'>Good return</option>
                                        <option value='Logistics DOA'>Logistics DOA</option>
                                        <option value='MFG/New install DOA'>MFG/New install DOA</option>
                                        <option value='CPAS Request Label'>CPAS Request Label</option>
                                        <option value='FCO Return (Field Change Order)'>FCO Return (Field Change Order)</option>
                                        <option value='Return for Repair ESD static sensitive device'>Return for Repair ESD static sensitive device</option>
                                    </select>
                                    } />
                                </div>
                            </div>
                        </div>
                        <div style={{display:'flex', marginBottom:20}}>
                            <div style={{flex:1}}>
                                <div>
                                    <span onTouchTap={()=>this.addPart()} className="btn one">SAVE</span>
                                    <span onTouchTap={()=>this.addingPart()} className="btn two">CANCEL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div style={{display:'flex', marginBottom:20}}>
                        <div style={{flex:1}}>
                            <div><span onTouchTap={()=>this.addingPart()} className="btn one">ADD NEW ORACLE BACKLINE</span></div>
                        </div>
                    </div>
                }
            </div>
        }else{
            add =
            <div style={{marginBottom:10,borderBottom:'1px solid #ffffff'}}>
                <div style={{display:'flex',marginBottom:4}}>
                    <div style={{flex:1}}></div>
                    <div style={{flex:1}}></div>
                    <div style={{flex:1}}></div>
                </div>
                <div style={{display:'flex', marginBottom:20}}>
                    <div style={{flex:1}}></div>
                </div>
            </div>
        }
        return(
            <div>
                <div>{content}</div>
                <div>{add}</div>
            </div>
        );
    }
}

class ShowData extends React.Component {
    editOracleBackline = (ticket_spare_sid) => {
        console.log(ticket_spare_sid);
        this.props.editOracleBackline(ticket_spare_sid);
    }
    render(){
        var {i,item} = this.props;
        return(
            <div key={i} style={{marginBottom:30,borderBottom:'1px solid #ffffff'}}>
                <div style={{display:'flex', marginBottom:20}}>
                    <div style={{width:30}}>No. {i+1}</div>
                    {
                        (!parseInt(item.is_return))?
                        <div style={{flex:1, textAlign:'right'}}>
                            <span className="btn two" onTouchTap={()=>{this.editOracleBackline(item.ticket_spare_sid)}}>EDIT</span>
                        </div>:
                        null
                    }
                </div>
                <div style={{display:'flex'}}>
                        <div style={{flex:1}}>
                            <div><PresentDataS label="SR No.:" value={item.oracle_sr} /></div>
                            <div><PresentDataS label="Type:" value={item.oracle_sr_type}/></div>
                            <div><PresentDataS label="Created:" value={item.oracle_create_date}/></div>
                            <div><PresentDataS label="Task No.:" value={item.oracle_task} /></div>
                        </div>
                        <div style={{flex:1}}>
                            <div><PresentDataS label="Part No.:" value={item.pn} /></div>
                            <div><PresentDataS label="Description:" value={item.part_description} /></div>
                            <div><PresentDataS label="Request date:" value={item.request_spare_part_date} /></div>
                            <div><PresentDataS label="Delivery due:" value={item.delivery_due_date}/></div>
                            <div><PresentDataS label="Receive date:" value={item.receive_spare_part_date}/></div>
                            <div><PresentDataS label="Return date:" value={item.return_spare_part_date}/></div>
                            <div><PresentDataS label="Return type:" value={item.spare_part_return_type}/></div>
                            <div><PresentDataS label="Is return:" value={(parseInt(item.is_return))?"Yes":"No"}/></div>
                            {
                                (parseInt(item.can_send_mail_return))?
                                <div><FormSendEmailPart onSendEmailPart={this.props.onSendEmailPart} info={this.props.info} item={item} /></div>:
                                null
                            }

                        </div>
                </div>
            </div>
        )
    }
}
class EditData extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props.item);
        console.log(moment(this.props.item.oracle_create_date));
        this.state = {
            item:this.props.item,
            i:this.props.i,
            oracle_sr:(this.props.item.oracle_sr)?this.props.item.oracle_sr:'',
            oracle_sr_type:(this.props.item.oracle_sr_type)?this.props.item.oracle_sr_type:'',
            oracle_create_date:(this.props.item.oracle_create_date)?new Date(moment(this.props.item.oracle_create_date)):null,
            oracle_task:(this.props.item.oracle_task)?this.props.item.oracle_task:'',
            pn:(this.props.item.pn)?this.props.item.pn:'',
            part_description:(this.props.item.part_description)?this.props.item.part_description:'',
            request_spare_part_date:(this.props.item.request_spare_part_date)?new Date(moment(this.props.item.request_spare_part_date)):null,
            delivery_due_date:(this.props.item.delivery_due_date)?new Date(moment(this.props.item.delivery_due_date)):null,
            receive_spare_part_date:(this.props.item.receive_spare_part_date)?new Date(moment(this.props.item.receive_spare_part_date)):null,
            return_spare_part_date:(this.props.item.return_spare_part_date)?new Date(moment(this.props.item.return_spare_part_date)):null,
            spare_part_return_type:(this.props.item.spare_part_return_type)?this.props.item.spare_part_return_type:'',
            ticket_spare_sid:this.props.item.ticket_spare_sid,
            ticket_spare_task_sid:this.props.item.ticket_spare_task_sid,
            ticket_spare_part_sid:this.props.item.ticket_spare_part_sid
        };
        console.log(this.state);
    }
    saveOracleBackline = () => {
        // console.log(this.state);
        this.props.onEdit(this.state);
    }
    deleteOracleBackline = () => {
        this.props.onDelete(this.state.item);
    }
    handleChange_oracle_create_date = (event,date) => {
        this.setState({oracle_create_date:date});
    }
    handleChange_request_spare_part_date = (event,date) => {
        this.setState({request_spare_part_date:date});
    }
    handleChange_delivery_due_date = (event,date) => {
        this.setState({delivery_due_date:date});
    }
    handleChange_receive_spare_part_date = (event,date) => {
        this.setState({receive_spare_part_date:date});
    }
    handleChange_return_spare_part_date = (event,date) => {
        this.setState({return_spare_part_date:date});
    }
    cancelEditOracleBackline = () => {
        this.props.cancelEditOracleBackline();
    }
    render(){
        var {i,item} = this.state;
        var {oracle_sr,oracle_sr_type,oracle_create_date,oracle_task,pn,
          part_description,request_spare_part_date,delivery_due_date,
          receive_spare_part_date,return_spare_part_date,spare_part_return_type} = this.state;
        return(
            <div key={i} style={{marginBottom:30,borderBottom:'1px solid #ffffff'}}>
                <div style={{display:'flex', marginBottom:20}}>
                    <div style={{width:30}}>No. {i+1}</div>
                    {
                        (!parseInt(item.is_return))?
                        <div style={{flex:1, textAlign:'right'}}>
                            <span className="btn one" onTouchTap={()=>{this.saveOracleBackline()}}>SAVE</span>
                            <span className="btn five" onTouchTap={()=>this.deleteOracleBackline()}>DELETE</span>
                            <span className="btn two" onTouchTap={()=>{this.cancelEditOracleBackline()}}>CANCEL EDIT</span>
                        </div>:
                        null
                    }
                </div>
                <div style={{display:'flex'}}>
                        <div style={{flex:1}}>
                            <div><PresentDataS label="SR No.:" value={
                                <input style={{width:'100%'}} onChange={(e)=>this.setState({oracle_sr:e.target.value})} value={oracle_sr} />
                                } />
                            </div>
                            <div><PresentDataS label="Type:" value={
                                <select style={{width:'100%'}} value={oracle_sr_type} onChange={(e)=>this.setState({oracle_sr_type:e.target.value})}>
                                    <option value='Escalate'>Escalate</option>
                                    <option value='Part Only'>Part Only</option>
                                </select>
                                }/></div>
                            <div><PresentDataS label="Created:" value={
                                <DatePicker style={{width:'100%', height:36, backgroundColor:'#ffffff',borderRadius:'4px', padding:'0px 4px'}}
                                    textFieldStyle={{fontSize:10,width:120, height:36}}
                                    hintText="Create date"
                                    value={oracle_create_date}
                                    onChange={this.handleChange_oracle_create_date}
                                />
                                }/>
                            </div>
                            <div><PresentDataS label="Task No.:" value={<input style={{width:'100%'}} onChange={(e)=>this.setState({oracle_task:e.target.value})} value={oracle_task} />} /></div>
                        </div>
                        <div style={{flex:1}}>
                            <div><PresentDataS label="Part No.:" value={<input style={{width:'100%'}} onChange={(e)=>this.setState({pn:e.target.value})} value={pn} /> } /></div>
                            <div><PresentDataS label="Description:" value={<input style={{width:'100%'}} onChange={(e)=>{this.setState({part_description:e.target.value})}} value={part_description} />} /></div>
                            <div><PresentDataS label="Request date:" value={
                                <DatePicker style={{width:'100%', height:36,backgroundColor:'#ffffff',borderRadius:'4px', padding:'0px 4px'}}
                                    textFieldStyle={{fontSize:10,width:120, height:36}}
                                    hintText="Request date"
                                    value={request_spare_part_date}
                                    onChange={this.handleChange_request_spare_part_date}
                                />
                                } />
                            </div>
                            <div><PresentDataS label="Delivery due:" value={

                                <DatePicker style={{width:'100%', height:36,backgroundColor:'#ffffff',borderRadius:'4px', padding:'0px 4px'}}
                                    textFieldStyle={{fontSize:10,width:120, height:36}}
                                    hintText="Delivery due date"
                                    value={delivery_due_date}
                                    onChange={this.handleChange_delivery_due_date}
                                />
                                }/></div>
                            <div><PresentDataS label="Receive date:" value={
                                <DatePicker style={{width:'100%', height:36,backgroundColor:'#ffffff',borderRadius:'4px', padding:'0px 4px'}}
                                    textFieldStyle={{fontSize:10,width:120, height:36}}
                                    hintText="Receive date"
                                    value={receive_spare_part_date}
                                    onChange={this.handleChange_receive_spare_part_date}
                                />
                                }/></div>
                            <div><PresentDataS label="Return date:" value={
                                <DatePicker style={{width:'100%', height:36,backgroundColor:'#ffffff', borderRadius:'4px', padding:'0px 4px'}}
                                    textFieldStyle={{fontSize:10,width:120, height:36}}
                                    hintText="Return date"
                                    value={return_spare_part_date}
                                    onChange={this.handleChange_return_spare_part_date}
                                />
                                } /></div>
                            <div><PresentDataS label="Return type:" value={
                                <select style={{width:'100%'}} value={spare_part_return_type} onChange={(e)=>{this.setState({spare_part_return_type:e.target.value})}}>
                                    <option value=''></option>
                                    <option value='Part return'>Part return</option>
                                    <option value='Good return'>Good return</option>
                                    <option value='Logistics DOA'>Logistics DOA</option>
                                    <option value='MFG/New install DOA'>MFG/New install DOA</option>
                                    <option value='CPAS Request Label'>CPAS Request Label</option>
                                    <option value='FCO Return (Field Change Order)'>FCO Return (Field Change Order)</option>
                                    <option value='Return for Repair ESD static sensitive device'>Return for Repair ESD static sensitive device</option>
                                </select>
                                }
                                />
                            </div>
                        </div>
                </div>
            </div>
        )
    }
}

class FormSendEmailPart extends React.Component{
    constructor(props){
        super(props);
        this.state = {open:false,ticket_spare_part_sid:this.props.item.ticket_spare_part_sid, item:this.props.item,
            three:1,
            partCollectionDate:'',
            person:this.props.info.name,
            contactNumber:this.props.info.mobile,
            address:'202, 10th Fl. CDG House Nanglinchi Rd. Chongnonsee, Yannawa, Bangkok, Thailand 10120',
            cc:'',
        }
    }
    sendMail = () => {
        // console.log(this.state);
        this.props.onSendEmailPart(this.state);
    }
    render(){
        var {item} = this.state;

        var btn;
        if(item.can_send_mail_return){
            btn = <PresentDataSF label="#" value={<div style={{margin:'10px 0px'}}><span onTouchTap={()=>this.setState({open:!this.state.open})} className="btn four">Send Email To DHL</span></div>} />
        }
        var form;
        if(this.state.open){
            form =
            <div>
                <PresentDataS label="Case ID" value={item.oracle_sr} />
                <PresentDataS label="Task ID" value={item.oracle_task} />
                <PresentDataS label=""
                    value={
                        <div>
                            <div>Requested Past Collection date & time (local country time) (Please accordingly)</div>
                            <div><input type="radio" name="three"  onChange={()=>this.setState({three:1})} /> Next calendar day between 0900hrs-1700hrs</div>
                            <div><input type="radio" name="three" onChange={()=>this.setState({three:2})} />Spacific date & time</div>
                            <div>
                                <div>Example 07-Fab-2017 (15:00hrs)</div>
                                <input style={{width:'100%'}} onChange={(e)=>this.setState({partCollectionDate:e.target.value})} value={this.state.partCollectionDate} />
                            </div>
                        </div>
                        } />
                <PresentDataS label="Site Contact Person" value={
                    <input style={{width:'100%'}} onChange={(e)=>this.setState({person:e.target.value})} value={this.state.person} />
                } />
                <PresentDataS label="Site Contact Number(s)" value={
                    <input style={{width:'100%'}} onChange={(e)=>this.setState({contactNumber:e.target.value})} value={this.state.contactNumber} />
                } />
                <PresentDataS label="Colloction Address" value={
                    <textarea style={{width:'100%'}} onChange={(e)=>this.setState({address:e.target.value})} value={this.state.address}></textarea>
                } />
                <PresentDataS label="Parts information" value={
                    <div>
                        <div>{item.pn}</div><div>{item.spare_part_return_type}</div>
                    </div>
                } />
                <PresentDataS label="Add CC Mail" value={
                    <div>
                        <input value={this.state.cc} style={{width:'100%'}} onChange={(e)=>this.setState({cc:e.target.value})}  />
                    </div>
                } />
                <PresentDataSF label="" value={
                    <div style={{margin:'10px 0px'}}>
                        <span onTouchTap={()=>this.sendMail()} className="btn one">Send</span>
                    </div>
                } />
            </div>
        }
        return(
            <div>
                {btn}
                <div>
                    {form}
                </div>
            </div>
        )
    }
}
