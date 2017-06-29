import React, {Component} from 'react';
import {PresentData} from '../management/PresentData';
import InfoGen from '../../config/InfoGen';

export default class TicketOwner extends Component{
  constructor(props){
    super(props);
    this.state = {info:InfoGen.info};
  }
  render(){
    var {data} = this.props;

    var avatar;
    var labelOwnerCase = (data.owner_thainame)?(data.owner_thainame):'Owner?';
    var picAvatar;
    // console.log(data);
    if(data.owner_picture_profile){
      // picAvatar = <Avatar src={data.owner_picture_profile} />
    } else if(data.owner){
      // picAvatar = <Avatar>{data.owner.toUpperCase().charAt(0)+''+data.owner.toUpperCase().charAt(1)}</Avatar>
    } else{
      // picAvatar = <Avatar src={this.props.info.pic_full} />
      // labelOwnerCase = (this.props.info.thainame)?(this.props.info.thainame):'Owner?';
    }
    var changeOwner;
    // var changeOwner = <div style={{textAlign:'left'}}>
    //   <OwnerDialog2 onShowMore={()=>{}} icon={<SocialPeople />} label={"Change"} title={"Change Owner"} onSelectItem={this.handleSelectItemOwner} listItem={this.props.listUserCanAddTask} />
    // </div>;
    // console.log('data ticket detail',data);
    if(data.status==='5' || data.status===5){
      // changeOwner = <div />;
    }
    // <div style={{}}>{picAvatar}</div>
    avatar = <div style={{display:'flex'}}>
      <div style={{}}>{labelOwnerCase} </div>
    </div>;

    var owner = <PresentData label={"Owner"} value={avatar} optional={changeOwner} />
    return owner;
  }
}
