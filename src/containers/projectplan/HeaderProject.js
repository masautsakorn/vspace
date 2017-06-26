import React, { Component } from 'react';
// import {GridList, GridTile} from 'material-ui/GridList';
// import FlatButton from 'material-ui/FlatButton';
import ContactUser from './ContactUser';
import ProjectOwner from './ProjectOwner';
import {lightBlack} from 'material-ui/styles/colors';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
// import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import HardwareKeyboardArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import HardwareKeyboardArrowUp from 'material-ui/svg-icons/hardware/keyboard-arrow-up';
import Paper from 'material-ui/Paper';
import { Columns, Column } from 're-bulma';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import IconButton from 'material-ui/IconButton';
class HeaderProject extends Component {
  constructor(props){
    super(props);
    this.state = {
      listUserCanAdd:this.props.listUserCanAdd,
      projectInfo:this.props.projectInfo,
      projectOwner:this.props.projectOwner,
      projectContact:this.props.projectInfo.project_contact,
      updated:false,
      showMore:false,
      openCloseProject:false,
      remarkCloseProject:'',
      showMenu:false
    };
  }
  handleOpenShowMore = () => {
    this.setState({showMore:true});
  }
  handleUpdateData = () => {
    var that = this;
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    formData.append('project_sid',localStorage.getItem("project_sid"));
    get(Url.projectDetail, formData).then(function(res){

      that.setState({projectInfo:res.project_detail.project_detail});
      that.setState({projectContact:res.project_detail.project_detail.project_contact});
      window.location.reload();
    });
    if(that.state.updated){
      that.setState({updated:false});
    }else{
      that.setState({updated:true});
    }
  }
  closeProject = () => {
    console.log(this.state.remarkCloseProject);
    console.log(this.state.projectInfo.project_sid);
    var formData = new FormData();
    formData.append("email",InfoGen.email);
    formData.append("token",InfoGen.token);
    formData.append("project_sid", this.state.projectInfo.project_sid);
    formData.append("remark_close_project", this.state.remarkCloseProject);
    var that = this;
    var tmp = this.state.projectInfo;
    Put(Url.closeProject,formData).then(function(res){
      if(!res.error){
        tmp.data_status = '400';
        that.setState({openCloseProject:false,remarkCloseProject:'',projectInfo:tmp});
      }
    });
  }
  remarkCloseProject = (e) => {
    this.setState({remarkCloseProject:e.target.value});
  }
  render(){
    var columns;
    var styles;
    var cellHeight;
    var projectHeader;
    var contractUser = <ContactUser onUpdateData={this.handleUpdateData} projectInfo={this.state.projectInfo} projectContact={this.state.projectInfo.project_contact} />;
    var cellHeight;
    if(this.state.showMore){
      cellHeight = "auto";
    }else{
      cellHeight = 80;
    }
    var showMore;
    if(this.state.showMore){
      showMore = <HardwareKeyboardArrowUp />
    }else{
      showMore = <HardwareKeyboardArrowDown />
    }
      columns = 3;
      styles = {
        header: {
          margin:'0px 10px'
        },
        card: {
          // 'padding': '8px',
          'border': '1px solid rgb(217, 217, 217)',
          'background': '#fafbfc',
          'borderRadius': '3px'
        },
        root: {
          //  display: 'flex',
          //  flexWrap: 'wrap',
          //  justifyContent: 'space-around',
         },
         gridList: {
           width: '99%',
          //  marginTop:'-20px',
           zIndex: '10'
          //  height: 'initial',
          // height:' auto',
          //  overflowY: 'auto',
         },
         box: {
           textAlign: 'center'
         }
      }
      var btnCloseProject;
      if(this.state.projectInfo.data_status!=="400" && !this.state.openCloseProject){
        btnCloseProject = <div style={{margin:10}} >
        <RaisedButton onTouchTap={()=>{this.setState({openCloseProject:!this.state.openCloseProject})}} label="Close Project" ></RaisedButton></div>;
      }else if(this.state.projectInfo.data_status==="400"){
        btnCloseProject = <div>Closed</div>;
      }
      var formCloseProject;
      if(this.state.openCloseProject){
          formCloseProject =
          <div style={{border:'1px solid #ededed', padding:4}}>
            <div></div>
            <div style={{margin:10}}>
              <div>
                <small style={{color:lightBlack}}>CLOSE PROJECT หมายถึงการทำงานใน Project นี้สิ้นสุดลงแล้ว, เมื่อคุณ CLOSE PROJECT แล้วจะไม่สามารถทำการสร้าง Task ใน Project ได้อีก</small></div>
              <div><TextField fullWidth={true} hintText="Remark" value={this.state.remarkCloseProject} onChange={this.remarkCloseProject} /></div>
              <div>
                <RaisedButton onTouchTap={this.closeProject} primary={true} style={{margin:4}} label="Confirm" />
                <RaisedButton style={{margin:4}} onTouchTap={()=>{this.setState({openCloseProject:!this.state.openCloseProject})}} label="Cancel" />
              </div>
            </div>
          </div>
      }
    projectHeader =
      <Paper zDepth={2} style={styles.root}>
        <div>
          <div style={{overflow:'hidden', padding:10}}>
            <small>
              <Columns>
                <Column>
                  <div >
                    <div><span >{this.state.projectInfo.name}</span> <small style={{color:lightBlack}} >{this.state.projectInfo.contract_no}</small></div>
                    <div><span >{this.state.projectInfo.end_user}</span></div>
                    <div><small style={{color:lightBlack}} >{this.state.projectInfo.end_user_address}</small></div>
                    <div>
                    </div>
                  </div>
                </Column>
                <Column>
                  <div style={styles.box}>
                      <div><ProjectOwner onShowMore={this.handleOpenShowMore} projectInfo={this.state.projectInfo} listUserCanAdd={this.props.listUserCanAdd} projectOwner={this.state.projectOwner} /></div>
                   </div>
                </Column>
                <Column style={{clear:'both'}}>
                   <div>
                      <Columns>
                        <Column size="isThreeQuarters">{contractUser}</Column>
                        <Column style={{textAlign:'right'}}><span onTouchTap={()=>{this.setState({showMenu:!this.state.showMenu})}} >Show Detail</span></Column>
                      </Columns>
                   </div>
                 </Column>
              </Columns>
            </small>
          </div>
        </div>
      </Paper>;
    return(
      <div className="board-header" style={styles.header}>
        <div style={styles.card}>
          <div>
            {projectHeader}
            <div style={{display:'none'}}>{this.state.updated}</div>
          </div>
        </div>
        <Drawer width={"75%"} openSecondary={true} open={this.state.showMenu} docked={false} onRequestChange={(showMenu) => this.setState({showMenu})}>
          <AppBar title="Detail" iconElementLeft={<IconButton onTouchTap={()=>{this.setState({showMenu:!this.state.showMenu})}}><NavigationClose /></IconButton>} />
          <div style={{margin:'10px'}}>
            <div><span >{this.state.projectInfo.name}</span></div>
            <div><small>{this.state.projectInfo.contract_no}</small></div>
            <div><span >{this.state.projectInfo.end_user}</span></div>
            <div><small style={{color:lightBlack}} >{this.state.projectInfo.end_user_address}</small></div>
            <div><small style={{color:lightBlack}} >Created {this.state.projectInfo.craeate_project_thainame} {this.state.projectInfo.create_datetime_df}</small></div>
            <div><br/></div>
            {btnCloseProject}
            {formCloseProject}
          </div>
        </Drawer>
      </div>
    )
  }
}

export default HeaderProject;
