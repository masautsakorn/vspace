import React, { Component } from 'react';
import Lists from './Lists';
import HeaderProject from './HeaderProject';
import NewTypeCase from './NewTypeCase';
import get from '../../config/Get.js';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put.js';

import {List, ListItem, makeSelectable} from 'material-ui/List';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

class Column extends Component {
  constructor(props) {
    super(props);
    this.state = {...props};
    this.onAddNew = this.onAddNew.bind(this);
    this.onAdding = this.onAdding.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onEditChange = this.onEditChange.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  onAddNew(sid, data){
    var dLength = this.props.casetype.length;
    var that = this;
    var indexCaseType = 0;
    console.log(this.state.casetype);
    console.log(sid);
    for(var i=0; i<dLength;i++){
        if(sid===this.state.casetype[i].sid){
            if(this.state.casetype[i].case.length>0){
              for(var j=0;j<this.state.casetype[i].case.length;j++){
                  indexCaseType = i;
              }
              // this.sendDataCreateCaseToServer(indexCaseType,data);
            }else{
              this.props.casetype[i].case = [];
              this.sendDataCreateCaseToServer(indexCaseType,data,0);
            }
            //
        }
    }
    this.setState({casetype:this.props.casetype});
  }
  onAdding(sid){
    this.props.onAdding(sid);
  }
  onEdit(fSid, sSid){
    this.props.onEdit(fSid,sSid);
  }
  onEditChange(fSid, sSid, value){
    this.props.onEditChange(fSid, sSid, value);
  }
  onDelete(fSid, sSid){
    this.props.onDelete(fSid, sSid);
  }
  handleAddColumn(data){
    this.props.onAddColumn(data);
  }
  handleChangeStaffCase = (ticketSid,emailNewOwner) => {
    this.props.onChangeStaffCase(ticketSid, emailNewOwner);
  }

  render() {
    var lists = [];
    var that = this;
    this.props.casetype.forEach((item,k) => {
      lists.push(<Lists socket={this.props.socket} info={this.props.info} projectInfo={this.state.projectInfo} onChangeStaffCase={this.handleChangeStaffCase} listUserCanAddTask={this.props.listUserCanAddTask} listUserCanAddProject={this.state.listUserCanAddProject} key={k} sid={item.sid} type={item.type} header={item.type} item={item.case} onAdding={that.onAdding} status={item.status} onEdit={this.onEdit} onEditChange={this.onEditChange} onDelete={this.onDelete} onAddNew={this.onAddNew} />);
    });
    const styles = {
      root: {
        display: '-webkit-box',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: '110px',
        // bottom: 0,
        width:'100%',
        overflow:'auto'
      },
      gridList: {
        display: '-webkit-inline-box',
        flexWrap: 'nowrap',
        width:'300px'
        // overflowX: 'auto',
      },
      titleStyle: {
        color: 'rgb(0, 188, 212)',
      },
    };
    return (
      <div>
        <HeaderProject projectOwner={this.props.projectOwner} projectInfo={this.props.projectInfo} listUserCanAdd={this.props.listUserCanAddProject} />
        <div style={styles.root}>
          <List style={styles.gridList} >
            {lists}
            <NewTypeCase onAddColumn={this.handleAddColumn} listType={this.props.listType}/>
          </List>
        </div>
      </div>
    );
  }
}
export default Column;
