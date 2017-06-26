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

// initReactFastclick();

class OwnerDialog extends Component {
    constructor(props){
      super(props);
      this.state = {
        listItem:this.props.listItem,
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
      this.setState({open: true});
      this.props.onShowMore();
    };

    handleClose = () => {
      this.setState({open: false});
    };
    handleSelectOwner = (email, pic_employee, thainame, engname) => {
      this.props.onSelectItem(email, pic_employee, thainame, engname);
      this.handleClose();
    }
    handleNewMember = (e) => {
      this.setState({inviteEmail: e,dialogOpen:true});
    }
    handleCloseDialog = () => {
      this.setState({dialogOpen:false});
    }
    handleGreetingMessage = (event) => {
      this.setState({greetingMessage:event.currentTarget.value});

    }
    sendInvite = () => {
      var that = this;;
      var formData = new FormData();
      formData.append("email", InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("invite_email",this.state.inviteEmail);
      formData.append("message",this.state.greetingMessage);
      Put(Url.inviteEmail,formData).then(function(res){

        that.handleSelectOwner(that.state.inviteEmail, "", that.state.inviteEmail, that.state.inviteEmail);
        that.setState({dialogOpen:false});
      });
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
      const actions = [
        <FlatButton
          label="Cancel"
          primary={true}
          onTouchTap={this.handleCloseDialog}
        />,
      ];
      // <FlatButton
      //   label="Submit"
      //   primary={true}
      //   keyboardFocused={true}
      //   onTouchTap={this.handleClose}
      // />,
      var listItem = [];
      const dataSource1 = [];
      this.state.listItem.forEach((item) => {
          console.log(item);
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
          dataSource1.push({
            text: item.email,
            value: (
              <MenuItem onTouchTap={()=>this.handleSelectOwner(item.email, item.pic_employee, item.thainame, item.engname)}>
                <Chip onTouchTap={()=>this.handleSelectOwner(item.email, item.pic_employee, item.thainame, item.engname)} style={{backgroundColor:'#FFF'}}>{avatar} {item.email}</Chip>
              </MenuItem >
            ),
          });
      });
      // const dataSource1 = [
      //   {
      //     text: 'text-value1',
      //     value: (
      //       <MenuItem
      //         primaryText="text-value1"
      //         secondaryText="&#9786;"
      //       />
      //     ),
      //   },
      //   {
      //     text: 'text-value2',
      //     value: (
      //       <MenuItem
      //         primaryText="text-value2"
      //         secondaryText="&#9786;"
      //       />
      //     ),
      //   },
      // ];

      // <Dialog
      //   title={this.state.title}
      //   actions={actions}
      //   modal={false}
      //   open={this.state.open}
      //   onRequestClose={this.handleClose}
      //   autoScrollBodyContent={true}
      // >
      //   <div>
      //       <AutoComplete
      //         floatingLabelText="Type 'r', case insensitive"
      //         filter={AutoComplete.caseInsensitiveFilter}
      //         dataSource={dataSource1}
      //       />
      //   </div>
      //   <div>
      //     <TextField hintText="Hint Text" floatingLabelText="Floating Label Text"/>
      //   </div>
      // </Dialog>
      var dialog =
      <Dialog
        title="Invite Your Friend"
        actions={actions}
        modal={false}
        open={this.state.dialogOpen}
        onRequestClose={this.handleCloseDialog}
        autoScrollBodyContent={true}
      >
        <div style={styles.wrap}>
          <div>
            <small style={{color:grey400}}>Invite Email:</small> {this.state.inviteEmail}
          </div>
          <div>
            <TextField onChange={this.handleGreetingMessage} hintText="Greeting Message" floatingLabelText="Greeting Message"/>
          </div>
          <div>
            <RaisedButton onTouchTap={this.sendInvite} label="Send Invite" primary={true} />
          </div>
        </div>
      </Dialog>;
                // {dialog}
      var labelControl;
      if(this.state.open){
        labelControl = <div><AutoComplete onNewRequest={this.handleNewMember} hintText="Find by Email" openOnFocus={true} filter={AutoComplete.caseInsensitiveFilter} dataSource={dataSource1} /><ContentClear onTouchTap={this.handleClose} style={styles.chip} /></div>
      }else{
        var chipAvatar;
        if(this.state.src){
          chipAvatar = <Avatar src={this.state.src} />
        }else{
          chipAvatar = <Avatar icon={this.state.icon} />
        }
        labelControl = <Chip onTouchTap={this.handleOpen} style={styles.chip}>{chipAvatar} {this.state.label}</Chip>
      }
      return(
        <div >
          {labelControl}

        </div>
      );
    }
}

export default OwnerDialog;
