import React, { Component } from 'react';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import {
  // grey400, darkBlack,
  lightBlack} from 'material-ui/styles/colors';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import OwnerDialog from './OwnerDialog';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put.js';
class ProjectOwner extends Component {
  constructor(props){
    super(props);
    this.state = {...props};
  }
  handleSelectItem = (email, pic_employee, thainame, engname) => {
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("project_sid", this.props.projectInfo.project_sid);
    formData.append("new_staff_email", email);
    var that = this;
    Put(Url.projectAddStaff, formData).then(function(res){
      console.log(res);
      if(res.data){
        var tmp = that.state.projectOwner;
        tmp.push({email:email,pic_full:pic_employee,thainame:thainame,engname:engname});
        that.setState({projectOwner:tmp});
      }
    });
  }
  handleRequestDelete = (email) => {
    var res = (window.confirm("Confirm Delete?"));
    // alert(res);
    if(res){
      this.removeOwner(email);
    }
  }
  removeOwner = (email) => {
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("project_sid", this.props.projectInfo.project_sid);
    formData.append("staff_email", email);
    var that = this;
    Put(Url.projectDeleteStaff, formData).then(function(res){
      console.log(res);
      if(!res.error){
        var tmp = [];
        that.state.projectOwner.forEach((item)=> {
          if(item.email!==email){
            tmp.push(item);
          }
        });
        that.setState({projectOwner:tmp});
      }
    });
  }
  handleShowMore = () => {
    this.props.onShowMore();
  }
  render(){
    var styles = {
        wrapper: {
          display: 'flex',
          flexWrap: 'wrap',
          float:'left'
        },
        chip: {
          margin: 4,
          height:32
        }
    }
    var listOwner = [];
    this.state.projectOwner.forEach((item) => {
        var avatar;
        if(item.pic_full){
          avatar = <Avatar src={item.pic_full} />;
        }else{
          avatar = <Avatar>{item.email.charAt(0).toUpperCase()+item.email.charAt(1).toUpperCase()}</Avatar>;
        }
        listOwner.push(<Chip onRequestDelete={() => this.handleRequestDelete(item.email)} style={styles.chip} key={item.email}>{avatar} {item.engname}</Chip>);
    });
    listOwner.push(
      <OwnerDialog
        onShowMore={this.handleShowMore}
        label={"Add"} icon={<SocialPersonAdd />}
        title={"Add Member"} onSelectItem={this.handleSelectItem}
        listItem={this.state.listUserCanAdd} key={0} />
    );
    // <Chip style={styles.chip} key={0}><Avatar icon={<SocialPersonAdd />} /> Add</Chip>
    return(<div>
      <div style={{textAlign:'left'}}><small style={{color:lightBlack}}>Member</small></div>
      <div style={styles.wrapper}>{listOwner} </div>
    </div>);
  }
}

export default ProjectOwner;
