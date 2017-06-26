import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import {List, ListItem} from 'material-ui/List';
// import initReactFastclick from 'react-fastclick';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';
import MenuItem from 'material-ui/MenuItem';
import ContentClear from 'material-ui/svg-icons/content/clear';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';

export default class OwnerDialog2 extends Component {
  constructor(props){
    super(props);
    this.state = {
      listItem:this.props.listItem,
      listItemFilter:this.props.listItem,
      title: this.props.title,
      label:this.props.label,
      icon:this.props.icon,
      open: false,
      dialogOpen: false,
      inviteEmail:"",
      greetingMessage:""
    };
  }
  handleOpen = () => {
    this.setState({open:true});
  }
  handleClose = () => {
    this.setState({open: false});
  };
  handleSelectOwner = (email, pic_employee, thainame, engname) => {
    this.props.onSelectItem(email, pic_employee, thainame, engname);
    this.handleClose();
  }
  changeTxt = (e) => {
    var filter = e.target.value;
    // console.log(filter);
    var tmp = [];
    if(filter!==""){
      this.state.listItem.forEach((item,i)=>{
        var n = item.email.indexOf(filter);
        // console.log(n);
        var nThainame = item.thainame.indexOf(filter);
        // console.log(nThainame);
        if(n>-1 || nThainame>-1){
          tmp.push(item);
        }
      });
      this.setState({listItemFilter:tmp});
    }
  }
  render(){
    const styles = {
      radioButton: {
        marginTop: 16,
      },
      chip: {
        margin: 4
      },
      wrap: {
        marginTop:10
      }
    };
    var listItem = [];
    if(this.state.open){
      this.state.listItemFilter.forEach((item,i)=>{
          // console.log(item);
          var avatar = <Avatar src={item.pic_employee} />;
          listItem.push(<ListItem key={item.email}
            leftAvatar={avatar}
            primaryText={item.thainame}
            onTouchTap={()=>this.handleSelectOwner(item.email, item.pic_employee, item.thainame, item.engname)} data-id={item.email}
            secondaryText={
              <p>
                {item.engname} <br/>
                {item.email}
              </p>
            }
            secondaryTextLines={2}
          />);
      });
    }
    var closeBtn;
    if(this.state.open){
      closeBtn = <div style={{textAlign:'right'}}>
      <TextField hintText="Filter" style={{width:'95%'}} onChange={this.changeTxt} /><ContentClear onTouchTap={this.handleClose} /></div>;
    }
    var chipAvatar;
    if(this.state.src){
      chipAvatar = <Avatar src={this.state.src} />
    }else{
      chipAvatar = <Avatar icon={this.state.icon} />
    }
    var labelControl = <Chip onTouchTap={this.handleOpen} style={styles.chip}>{chipAvatar} {this.state.label}</Chip>
    return(
      <div style={{width:'100%'}}>
        {labelControl}
        {closeBtn}
        <List style={{maxHeight:'200px',overflow:'auto'}}>
          {listItem}
        </List>
      </div>);
  }
}
