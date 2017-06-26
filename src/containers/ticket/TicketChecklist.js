import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import ServiceReportDialog from '../projectplan/ServiceReportDialog';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
import FlatButton from 'material-ui/FlatButton';
// import ActionGrade from 'material-ui/svg-icons/action/grade';
// import FontIcon from 'material-ui/FontIcon';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
// import DropDownMenu from 'material-ui/DropDownMenu';
// import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import {List, ListItem} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import OwnerDialog from '../projectplan/OwnerDialog';
import SocialPeople from 'material-ui/svg-icons/social/people';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import Checkbox from 'material-ui/Checkbox';
import ContentClear from 'material-ui/svg-icons/content/clear';
import { Columns,Column,Card,CardHeader,CardHeaderTitle,CardContent,Content, CardFooter,CardFooterItem } from 're-bulma';
import Snackbar from 'material-ui/Snackbar';

class TicketChecklist extends Component {
  constructor(props){
    super(props);
    this.state = {
      item:this.props.item,
      sid: this.props.sid,
      openAddChecklist:false,
      newItemChecklist:'',
      newItemWithIn:'',
      unitTime:'Minute',
      status:'Normal',
      editing_sid:'',
      editing_name:'',
      openSnackbar:false,
      messageSnackbar:''
    };
  }
  handleAddNewItem = (e) => {
    var that = this;
    if(!this.state.newItemChecklist.trim()){
      that.setState({
        messageSnackbar:"Name Can not be null..", openSnackbar:true
      });
    }else{
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("new_checklist", this.state.newItemChecklist);
      formData.append("ticket_sid", this.state.sid);
      formData.append("unit", this.state.unitTime);
      formData.append("within", this.state.newItemWithIn);

      var item = this.state.item;

      Put(Url.addChecklist, formData).then(function(res){
        if(res.checklist.result){
          item.need_checklist = res.checklist.data;
          that.setState({item:item,
            newItemChecklist:"",
            newItemWithIn:'',
            unitTime:'Minute',
            messageSnackbar:res.checklist.message, openSnackbar:true
          });
        }else{
          that.setState({
            messageSnackbar:res.checklist.message, openSnackbar:true
          });
        }
      });
    }
    e.preventDefault();
  }
  onChangeNewItemChecklist = (e) => {
    this.setState({newItemChecklist:e.target.value});
  }
  handleDoChecklist = (e, k, v) => {
    e.preventDefault();
    var value;
    if(e.target.checked){
      value = 0;
    }else{
      value = 1;
    }
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("checklist_sid", e.target.value);
    formData.append("value",value);
    var that = this;
    Put(Url.doChecklist, formData).then(function(res){
      console.log(res);
      that.setState({messageSnackbar:res.data.result.message, openSnackbar:true});
    });
  }
  handleChangeEditItem = (e) => {
    this.setState({editing_name:e.target.value});
  }
  handleTouchItem = (sid,name, within, unit) => {
    this.setState({
      editing_sid:sid,editing_name:name, status:"Editng",openAddChecklist:false,
      unitTime:unit,newItemWithIn:within
    });
  }
  handleUpdateEdit = () => {
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("new_checklist", this.state.editing_name);
      formData.append("checklist_sid", this.state.editing_sid);
      formData.append("ticket_sid",this.state.sid);
      formData.append("unit", this.state.unitTime);
      formData.append("within", this.state.newItemWithIn);

      var item = this.state.item;
      var that = this;
      Put(Url.updateChecklist, formData).then(function(res){
        console.log(res);
        if(res.checklist.result){
            item.need_checklist = res.checklist.data;
            that.setState({
              item:item, newItemChecklist:"",newItemWithIn:'',
              unitTime:'Minute',editing_sid:'',editing_name:'',
              messageSnackbar:res.checklist.message, openSnackbar:true
            });
        }else{
          that.setState({
            messageSnackbar:res.checklist.message, openSnackbar:true
          });
        }
      });
  }
  handleDeleteItem = () => {
    if(window.confirm("Delete item?")){
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("checklist_sid", this.state.editing_sid);
      formData.append("ticket_sid",this.state.sid);
      var item = this.state.item;
      var that = this;
      Put(Url.removeChecklist, formData).then(function(res){
        console.log(res);
        if(res.checklist.result){
          item.need_checklist = res.checklist.data;
          that.setState({item:item, newItemChecklist:"",messageSnackbar:res.checklist.message, openSnackbar:true});
        }else{
          that.setState({
            messageSnackbar:res.checklist.message, openSnackbar:true
          });
        }
      });
    }
  }
  onChangeNewItemWithIn = (e) => {
    this.setState({newItemWithIn:e.target.value});
  }
  render(){
    var unitControl;

    unitControl =
      <span>
        <CardFooter style={{marginBottom:'10px', maxWidth:'300px'}}>
          <CardFooterItem><span style={{margin:'0px 10px'}}>Unit: </span></CardFooterItem>
          <CardFooterItem><RaisedButton label={"Minute"} onTouchTap={ ()=>{this.setState({unitTime:"Minute"})} } primary={(this.state.unitTime==="Minute")?true:false} /></CardFooterItem>
          <CardFooterItem><RaisedButton label={"Hour"} onTouchTap={ ()=>{this.setState({unitTime:"Hour"})} } primary={(this.state.unitTime==="Hour")?true:false} /></CardFooterItem>
          <CardFooterItem><RaisedButton label={"Day"} onTouchTap={ ()=>{this.setState({unitTime:"Day"})} } primary={(this.state.unitTime==="Day")?true:false} /></CardFooterItem>
        </CardFooter>
      </span>;

    var addAnItemChecklist;
    if(this.state.openAddChecklist){
      addAnItemChecklist =
        <div>
          <form onSubmit={this.handleAddNewItem}>
            <Columns>
              <Column>
                <div>
                  <TextField floatingLabelText="Checklist Name" onChange={this.onChangeNewItemChecklist} hintText="Add an item..." value={this.state.newItemChecklist}  />
                </div>
              </Column>
              <Column>
                <div>
                  <TextField fullWidth={true} floatingLabelText="Target Datetime" type="number" min="0" onChange={this.onChangeNewItemWithIn} hintText="Optional: ... from create task" value={this.state.newItemWithIn}  />
                    {unitControl}
                </div>
              </Column>
            </Columns>
            <div>
              <RaisedButton onTouchTap={this.handleAddNewItem} primary={true} label='Sumbit' />
              <FlatButton onTouchTap={()=>{this.setState({openAddChecklist:!this.state.openAddChecklist})} }  label={<ContentClear />}  />
            </div>
          </form>
        </div>
    }else{
      if(this.props.item.status==='5' || this.props.item.status===5){

      }else{
        addAnItemChecklist = <div onTouchTap={()=>{this.setState({openAddChecklist:true,editing_sid:''})} }><small style={{color:grey400}}>Add an item...</small></div>
      }
    }

    var checkListItem = [];

    this.state.item.need_checklist.forEach((item,i)=>{
        var defaultChecked = false;
        if(item.result==="1"){
          defaultChecked = true;
        }
        if(this.state.editing_sid===item.sid && (this.props.item.status!=='5')){
            checkListItem.push(
              <div style={{padding:0,marginTop:5}} key={i}>
              <Columns>
                <Column>
                    <div  >
                      <div style={{color:lightBlack}}>
                        <Checkbox  onTouchTap={this.handleDoChecklist} defaultChecked={defaultChecked}
                          label={""} value={item.sid}
                          style={{color: lightBlack, width:'initial'}}
                        />
                          <TextField onChange={this.handleChangeEditItem} hintText="Edit item..." value={this.state.editing_name} />
                          <FlatButton secondary={true} onTouchTap={this.handleDeleteItem} >Delete</FlatButton>
                      </div>
                    </div>
                </Column>
                <Column>
                    <div>
                      <div>
                        <div>
                            <TextField type="number" min="0" onChange={this.onChangeNewItemWithIn} hintText="within ... from create task" value={this.state.newItemWithIn}  />
                            <span style={{margin:'0px 10px'}}>Unit: </span>
                              {unitControl}
                        </div>
                      </div>
                    </div>
                </Column>
              </Columns>
                    <div style={{marginLeft:40}}>
                      <RaisedButton onTouchTap={this.handleUpdateEdit} primary={true} label='Sumbit' />
                      <FlatButton onTouchTap={()=>{this.setState({openAddChecklist:false,editing_sid:''})} }  label={<ContentClear />}  />
                    </div>
              </div>
            )
        }else{
            var withinShow;
            if(item.within>0){
              withinShow = <span style={{marginLeft:15}}>({item.within} {item.unit}) <small style={{marginLeft:15,float:'right'}}>Target {item.target_datetime}</small></span>;
            }
            var disabledCheckbox = false;
            if(this.props.item.status==='5' || this.props.item.status===5){
              disabledCheckbox = true;
            }
            checkListItem.push(
                <div style={{padding:0,marginTop:5}} key={i} >
                  <div style={{display:'flex'}} >
                    <Checkbox onTouchTap={this.handleDoChecklist} defaultChecked={defaultChecked}
                      label={""} value={item.sid} disabled={disabledCheckbox}
                      style={{color: lightBlack, width:'initial'}}
                    />
                    <div style={{color:lightBlack}} onTouchTap={()=>this.handleTouchItem(item.sid, item.name, item.within, item.unit)}><span>{item.name}</span> {withinShow}</div>
                  </div>
                </div>
            )
        }
    });
    return(
      <div>
        <Card isFullwidth>
          <CardHeader>
            <CardHeaderTitle>
              <small style={{color:lightBlack}}>Check List</small>
            </CardHeaderTitle>
          </CardHeader>
          <CardContent>
            <Content>
              <List>
                {checkListItem}
              </List>
              <div >{addAnItemChecklist}</div>
            </Content>
          </CardContent>
        </Card>
        <br/>
        <Snackbar
          open={this.state.openSnackbar}
          message={this.state.messageSnackbar}
          autoHideDuration={4000}
          onRequestClose={() => {this.setState({openSnackbar: false,})} }
        />
      </div>
    )
  }
}
// style={{backgroundColor:'#fafbfc',padding:'10px',border:'1px solid #eeeeee'}}

export default TicketChecklist;
