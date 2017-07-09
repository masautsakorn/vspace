import React, { Component } from 'react';
import {LoadProjectDetail,AddOwnerProject,RemoveOwnerProject} from '../../actions/ActionProject';
import InfoGen from '../../config/InfoGen';

export default class ProjectOwner extends Component {
  constructor(props){
    super(props);
    this.state = {newOwner:'',delEmail:'',delName:'',
    project_sid:this.props.project_sid,project_owner:[],listUserCanAddTask:InfoGen.listUserCanAddTask};
  }
  componentWillMount(){
    this.loadProjectDetail();
  }
  loadProjectDetail = () => {
    var that = this;
    LoadProjectDetail(this.props.project_sid).then((res)=>{
      console.log(res);
      try{
        that.setState({project_owner:res.data.owner});
      }catch(e){
        console.log(e);
      }
    });
  }
  renderList = () => {
    var {project_owner} = this.state;
    // console.log(project_owner);
    return project_owner.map((item,i)=>{
      return <div className="project-header" key={i}>
          <div style={{}}>#{i+1} {item.owner_name}</div>
          <div style={{marginLeft:10}}>
            <div className="btn" onTouchTap={()=>this.confirmDeleteOwner(item.owner_email,item.owner_name)}>[ {item.owner_name} ออกจาก Owner ]</div>
          </div>
        </div>
    });
  }
  renderForm = () => {
    var {listUserCanAddTask,newOwner} = this.state;
    // console.log(listUserCanAddTask);
    return <div className="project-header">
      <div >เพิ่ม Owner</div>
      <div style={{marginLeft:10}}>
          <div><select style={{width:'100%'}} value={newOwner} onChange={(e)=>this.setState({newOwner:e.target.value})}>
            <option value=''>-เลือก Owner-</option>
            {
              listUserCanAddTask.map((item,i)=>{
                  return <option key={i} value={item.email}>{item.thainame} | {item.email}</option>
              })
            }
          </select></div>
          <div style={{marginTop:10}}><div className="btn four" onTouchTap={()=>this.saveNewOwner()}>บันทึกเพิ่ม Owner</div></div>
      </div>
    </div>
  }
  renderFormDelete = () => {
    var {delName,delEmail} = this.state;
    return <div className="">
      <div>ยืนยันลบ {delName} ออกจาก Owner Project</div>
      <div><div className="btn two" onTouchTap={()=>this.deleteOwner(delEmail)}>ลบเดี๋ยวนี้</div></div>
    </div>
  }
  saveNewOwner = () => {
    var that = this;
    var {newOwner} = this.state;
    console.log(newOwner);
    AddOwnerProject(this.props.project_sid, newOwner).then((res)=>{
      console.log('AddOwnerProject',res);
      that.props.loadNew();
    });
  }
  deleteOwner = (delEmail) => {
    var that = this;
    RemoveOwnerProject(this.props.project_sid, this.state.delEmail).then((res)=>{
      console.log('RemoveOwnerProject',res);
      that.props.loadNew();
    });
  }

  confirmDeleteOwner = (delEmail,delName) => {
    this.setState({delEmail,delName});
  }
  render(){
    var {delEmail} = this.state;
    return(

        <div className="project-header">
          <div className="project-label">Project Owner</div>
          <div className="project-value">
              <div>{this.renderList()}</div>
              <div style={{marginTop:20,width:'100%', borderBottom:'1px solid #ffffff'}} />
              {
                (delEmail)?
                <div style={{marginTop:20}}>{this.renderFormDelete()}</div>
                :<div style={{marginTop:20}}>{this.renderForm()}</div>
              }

          </div>
        </div>

    )
  }
}
