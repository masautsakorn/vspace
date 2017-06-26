import React, { Component } from 'react';
import Column from './Column';
import get from '../../config/Get.js';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put.js';

class MyApp extends Component{
  constructor(props) {
    super(props);
    // this.state = {...props};
    this.state = {
      toggleUpdate:this.props.toggleUpdate,
      casetype:this.props.casetype,
      projectInfo:this.props.projectInfo,
      listType:this.props.listType,
      listUserCanAddProject:this.props.listUserCanAddProject
    }
    this.onAdding = this.onAdding.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onAddNew = this.onAddNew.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  onAddNew(sid, data){
    // var dLength = this.props.casetype.length;
    // var that = this;
    // var indexCaseType = 0;
    // console.log(sid);
    //
    //   for(var i=0; i<dLength;i++){
    //       if(sid===this.props.casetype[i].sid){
    //         // var maxSid = 0;
    //         if(this.props.casetype[i].case.length>0){
    //           for(var j=0;j<this.props.casetype[i].case.length;j++){
    //             // if(this.props.casetype[i].case[j].sid>maxSid){
    //               // maxSid = this.props.casetype[i].case[j].sid;
    //               // this.props.casetype[i].case = new Array()
    //               indexCaseType = i;
    //             // }
    //           }
    //           this.sendDataCreateCaseToServer(indexCaseType,data);
    //         }else{
    //           this.props.casetype[i].case = [];
    //           this.sendDataCreateCaseToServer(indexCaseType,data);
    //         }
    //         //
    //       }
    //   }
  }

  onAdding(sid){
    var dLength = this.props.casetype.length;
    for(var i=0;i<dLength;i++){
      if(sid===this.props.casetype[i].sid){
        this.props.casetype[i].status = "Adding";
      }else{
        this.props.casetype[i].status = "Normal";
      }
      for(var j=0;j<this.props.casetype[i].case.length;j++){
          this.props.casetype[i].case[j].status = "Normal";
      }
    }
    this.setState({casetype:this.props.casetype});
  }
  onEdit(fSid, sSid){
    var dLength = this.props.casetype.length;
    for(var i=0; i<dLength;i++){
      if(fSid===this.props.casetype[i].sid){
        for(var j=0;j<this.props.casetype[i].case.length;j++){
            if(this.props.casetype[i].case[j].sid===sSid){
               this.props.casetype[i].case[j].status = "Editing";
            }else{
              this.props.casetype[i].case[j].status = "Normal";
            }
        }
      }else{
        for(var j2=0;j2<this.props.casetype[i].case.length;j2++){
          this.props.casetype[i].case[j2].status = "Normal";
        }
      }
      this.props.casetype[i].status = "Normal";
    }
    this.setState({casetype:this.props.casetype});
  }
  onEditChange(fSid, sSid, value){
    // var dLength = this.props.casetype.length;
    // for(var i=0; i<dLength;i++){
    //     if(fSid===this.props.casetype[i].sid){
    //         for(var j=0;j<this.props.casetype[i].case.length;j++){
    //             if(this.props.casetype[i].case[j].sid===sSid){
    //                 this.props.casetype[i].case[j].subject = value;
    //                 var formData = new FormData();
    //                 formData.append('token',InfoGen.token);
    //                 formData.append('email',InfoGen.email);
    //                 formData.append('ticket_sid', sSid);
    //                 formData.append('new_subject', value);
    //                 get(Url.casemodifySubject,formData).then(function(res){
    //                   console.log(res);
    //                 });
    //             }
    //         }
    //     }
    // }
    // this.setState({casetype:this.props.casetype});
  }
  onDelete(fSid, sSid){
      // var dLength = this.props.casetype.length;
      // var index = -1;
      // console.log(fSid, sSid);
      // console.log(this.props.casetype);
      // for(var i=0; i<dLength;i++){
      //   if(fSid===this.props.casetype[i].sid){
      //       for(var j=0;j<this.props.casetype[i].case.length;j++){
      //           if(this.props.casetype[i].case[j].sid===sSid){
      //               index = j;
      //               break;
      //           }
      //       }
      //       console.log('index', index);
      //       this.props.casetype[i].case.splice(0, 1);
      //       this.setState( {casetype: this.props.casetype} );
      //   }
      // }
      // var formData = new FormData();
      // formData.append('token',InfoGen.token);
      // formData.append('email',InfoGen.email);
      // formData.append('ticket_sid', sSid);
      // Put(Url.caseRemove, formData).then(function(res){
      //     console.log(res);
      //     if(res.message){
      //       alert(res.message);
      //     }
      // });
  }
  handleAddColumn(newColumn){
    this.props.casetype.push({
      sid:(this.props.casetype.length+1),
      type:newColumn,
      status:"Normal",
      case:[]
    });
    this.setState( {casetype: this.props.casetype} );
  }
  handleChangeStaffCase = (ticketSid, emailNewOwner) => {
    this.props.onChangeStaffCase(ticketSid, emailNewOwner);
  }
  render(){
    return(
      <div id="">
        <Column
        socket={this.props.socket}
        listUserCanAddTask={this.props.listUserCanAddTask} info={this.props.info} projectOwner={this.props.projectOwner} projectInfo={this.state.projectInfo} toggleUpdate={this.state.toggleUpdate} onChangeStaffCase={this.handleChangeStaffCase} listUserCanAddProject={this.state.listUserCanAddProject} onDelete={this.onDelete} onAdding={this.onAdding} casetype={this.state.casetype} onEdit={this.onEdit} onEditChange={this.onEditChange} onAddNew={this.onAddNew} listType={this.props.listType} projectInfo={this.props.projectInfo} onAddColumn={this.handleAddColumn} />
      </div>
      );
  }
}

export default MyApp;
