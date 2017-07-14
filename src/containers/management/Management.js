import React, { Component } from 'react';
import Url from '../../config/url';
import CallService from '../../config/CallService';
import Put from '../../config/Put';
import jPost from '../../config/jPost';
import InfoGen from '../../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
// import NavCompoment from '../nav/NavCompoment';
// import IconButton from 'material-ui/IconButton';
// import Subheader from 'material-ui/Subheader';
import {Card, CardHeader, CardText} from 'material-ui/Card';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
// import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
// import '../projectplan/App.css';
// import './Project.css';
import Avatar from 'material-ui/Avatar';
import ContentAddCircle from 'material-ui/svg-icons/content/add-circle';
import {
  // grey400, darkBlack,
  lightBlack} from 'material-ui/styles/colors';
// import Chip from 'material-ui/Chip';
// import {
//   BrowserRouter as Router,
//   Route,
//   Link
// } from 'react-router-dom'
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import LinearProgress from 'material-ui/LinearProgress';
// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
// const nearbyIcon = <IconLocationOn />;
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ContentClear from 'material-ui/svg-icons/content/clear';
import HardwareDevicesOther from 'material-ui/svg-icons/hardware/devices-other';
import HardwareDeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';
import CircularProgress from 'material-ui/CircularProgress';

import DatePicker from 'material-ui/DatePicker';

// import Badge from 'material-ui/Badge';
// import TicketDrawer from '../ticket/TicketDrawer';
// import TicketItem from '../ticket/TicketItem';
import TicketDetail from '../ticket/TicketDetail3';
// import TicketCreate from '../ticket/TicketCreate';

import Drawer from 'material-ui/Drawer';
// import PieChart from 'react-simple-pie-chart';
import Snackbar from 'material-ui/Snackbar';
import ReactTable from 'react-table';
import 'react-table/react-table.css'
import RaisedButton from 'material-ui/RaisedButton';
import TicketCreateDrawer from '../ticket/TicketCreateDrawer';
// import NavigationController from 'react-navigation-controller';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ProjectCreate from '../project/ProjectCreate2';
import ProjectDetail from '../project/ProjectDetail';

import ServiceReportDetail from '../management/ServiceReportDetail';
import { Columns,Column } from 're-bulma';

import ColumnProject from './column/ColumnProject';
import ColumnCase from './column/ColumnCase';
import ColumnServiceReport from './column/ColumnServiceReport';
import ColumnInventory from './column/ColumnInventory';

import AddInventory from '../components/inventory/AddInventory';

import moment from 'moment';

// import {connect} from "react-redux";

var names = [
  'Incident',
  'Request',
  'Question',
  'Implement',
  'Preventive Maintenance',
];

class Management extends Component {
  constructor(props){
    super(props);
    // console.log(this.props.info);
    var index = 0;
    if(localStorage.getItem("management_selected_index")){
      index = parseInt(localStorage.getItem("management_selected_index"));
    }
    var indexType = 1;
    if(localStorage.getItem("indexType")){
      indexType = parseInt(localStorage.getItem("indexType"));
    }
    var types = [];
    if(localStorage.getItem("ticket_type")){
      try {
        types = JSON.parse(localStorage.getItem("ticket_type"));
      } catch (e) {
        localStorage.removeItem("ticket_type");
      } finally {

      }
    }

    const minDate = new Date();
    const maxDate = new Date();
    // minDate.setFullYear(minDate.getFullYear() - 1);
    minDate.setMonth(minDate.getMonth()-6);
    minDate.setHours(0, 0, 0, 0);
    // maxDate.setFullYear(maxDate.getFullYear() + 1);
    // maxDate.setMonth(maxDate.getMonth()+1);
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      minDate: minDate,
      maxDate: maxDate,
      selectedIndex:index,
      indexType:indexType,
      type:[],filtered:[], status:1,data:[],
      create:<div />,createOpen:false,
      createProject: <div />,
      addInventory:null,
      createProjectOpen:false,
      ticket_sid:0,
      data_ticket_detail:null,
      openTicketDrawer:false,
      types:types,
      loading:true,
      dataLimit:10000,
      dataStart:0
    }
  }
  componentDidMount(){
    this.callData(
      this.state.indexType,
      this.state.status,
      this.state.types,
      this.state.selectedIndex,
      this.state.dataLimit,
      this.state.filtered
    );
  }

  callData = (index, status, type, selectedIndex, dataLimit, filtered) => {
    // console.log(type);
    this.setState({loading:true});
    var url;
    if(index===0){
       url = Url.ws_projects;
    }else if(index===1){
      url = Url.ws_ticket;
    }else if(index==2){
      url = Url.ws_appointment;
    }else if(index==4){
      url = Url.inventory;
    }
    var data = {
        token:InfoGen.token,
        email:InfoGen.email,
        status:status,
        type:type.join(","),
        search:"",
        dataStart:this.state.dataStart,
        dataLimit:dataLimit,
        filtered:filtered,
        startDate:moment(this.state.minDate).format('YYYY-MM-DD 00:00:00'),
        endDate:moment(this.state.maxDate).format('YYYY-MM-DD 23:59:59')
      };
    localStorage.setItem("ticket_type", JSON.stringify(type));
    localStorage.setItem("management_selected_index",selectedIndex);
    localStorage.setItem("indexType",index);

    if(index==1){
      this.props.case(url, data);
    }
    var that = this;
    if(url){
        this.processLoadData(url,data).then((res)=>{
          names = res.type;
          that.setState({data:res.data, type:res.type, loading:false});
        });
    }
  }
  processLoadData = (url,data) => {
    var that = this;
    return new Promise((resolve,reject)=>{
        // var dataAll = [];
        that.callDataFromService(url,data).then((res)=>{
          resolve(res);
        });
    })
  }


  callDataFromService = (url, data) => {
    return new Promise((resolve,reject)=>{
      jPost(url, data).then(function(res){
        resolve(res);
      });
    });
  }
  select = (index, indexType) => {
    this.setState({selectedIndex:index, data:[], indexType:indexType});
    this.callData(indexType, this.state.status, this.state.types, index, this.state.dataLimit,this.state.filtered);
  }
  new = () => {
    // console.log(this.props.listUserCanAddTask);
    if(this.state.indexType===1 && this.props.info.case_create_able==="1"){
      this.setState({create:<TicketCreateDrawer listUserCanAddProject={this.props.listUserCanAddTask} />,createOpen:!this.state.createOpen});
    }
  }
  newProject = () => {
    // console.log(1234);
    if(this.state.indexType===0){
      this.setState({createProject:<ProjectCreate onCloseProjectCreate={
        ()=>{
          this.setState({createProjectOpen:false,createProject:<div />});
          this.callData(this.state.indexType, this.state.status,this.state.types, this.state.selectedIndex, this.state.dataLimit, this.state.filtered)
        }
      }
      info={this.props.info} />, createProjectOpen:!this.state.createProjectOpen});
    }
  }
  handleOpenTicketDrawer = (item) => {
    // alert(item.sid);
    this.setState({ticket_sid:item.sid, data_ticket_detail:item,openTicketDrawer:true});
    // const view = <div >555</div>
    // this.props.navigationController.pushView(view, {});
  }
  handleChange = (event, index, types) => {
    // console.log(types);
      this.setState({types});
      this.callData(this.state.indexType, this.state.status,types,this.state.selectedIndex, this.state.dataLimit, this.state.filtered);
  }
  changeLimit = (event, index, value) => {
    this.setState({dataLimit:value});
    this.callData(this.state.indexType, this.state.status,this.state.types,this.state.selectedIndex, value, this.state.filtered);
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      minDate: date,
    });
    this.callData(
      this.state.indexType,
      this.state.status,
      this.state.types,
      this.state.selectedIndex,
      this.state.dataLimit,
      this.state.filtered
    );
  };

  handleChangeMaxDate = (event, date) => {
    this.setState({
      maxDate: date,
    });
    this.callData(
      this.state.indexType,
      this.state.status,
      this.state.types,
      this.state.selectedIndex,
      this.state.dataLimit,
      this.state.filtered
    );
  };

  limitItems = () => {
    
    return <div style={{display:'flex'}}>
      <div style={{flex:1,margin:'auto 20px auto auto',textAlign:'right'}}>Created</div>
      <div style={{flex:1}}>
        <DatePicker
          style={{width:'100%'}} textFieldStyle={{width:'100%'}}
          name="minDate"
          onChange={this.handleChangeMinDate}
          autoOk={true}
          defaultDate={this.state.minDate}
          disableYearSelection={false}
        />
      </div>
      <div style={{flex:1,marginLeft:'5px'}}>
        <DatePicker
          style={{width:'100%'}} textFieldStyle={{width:'100%'}}
          name="maxDate"
          onChange={this.handleChangeMaxDate}
          autoOk={true}
          defaultDate={this.state.maxDate}
          disableYearSelection={false}
        />
      </div>
    </div>

    {
      // <SelectField
      //   hintText="Limit"
      //   style={{width:'130px'}} value={this.state.dataLimit}
      //   onChange={this.changeLimit}
      // >
      //   <MenuItem value={1000} primaryText="1000" />
      //   <MenuItem value={2000} primaryText="2000" />
      //   <MenuItem value={10000} primaryText="10000" />
      //   <MenuItem value={20000} primaryText="20000" />
      //   <MenuItem value={50000} primaryText="50000" />
      //   <MenuItem value={100000} primaryText="100000" />
      // </SelectField>
      // <div style={{margin:'auto auto auto 0px'}}>Entries</div>
    }
  }
  menuItems(types) {
    // console.log(names);
    if(typeof names!=='undefined'){
      return names.map((name) => (
        <MenuItem
          key={name}
          insetChildren={true}
          checked={types && types.indexOf(name) > -1}
          value={name}
          primaryText={name}
        />
      ));
    }else{
      return <div />
    }
  }
  addInventory = () => {
    if(!this.state.addInventory){
      this.setState({addInventory:<AddInventory cancelAddInventory={()=>this.addInventory()} info={this.props.info} />});
    }else{
      this.setState({addInventory:null});
      this.callData(this.state.indexType, this.state.status,this.state.types, this.state.selectedIndex, this.state.dataLimit, this.state.filtered);
    }
  }
  render(){
    var selectdValues = [];
    const names = this.state.type;

    // var menuItems;
    // if(names.length>0){
    var that = this;
    var menuItems = (selectdValues) => {
        return names.map((name) => (
          <MenuItem
            key={name}
            insetChildren={true}
            checked={selectdValues && selectdValues.indexOf(name) > -1}
            value={name}
            primaryText={name}
          />
        ));
      }
    // }

    const data = this.state.data;
    var columns = [];
    if(this.state.indexType===0){
      columns = ColumnProject;
    }else if(this.state.indexType===1){
      columns = ColumnCase(this);
    }else if(this.state.indexType===2) {
      columns = ColumnServiceReport
    }else if(this.state.indexType===4){
      columns = ColumnInventory;
    }
    const style = {
      margin: 12,
    };
    var create = <div style={{marginBottom:10}}>
      <Paper style={{padding:10}} zDepth={2} >
        <div style={{textAlign:'right',float:'right',maxWidth:100}}>
          <div style={{maxWidth:100}} className="btn" onTouchTap={()=>this.new()} >Close</div>
        </div>
        {this.state.create}
      </Paper>
    </div>

    var contactPeople = [];//this.state.item.contactPeople
    var ticketDetail;

    const {types} = this.state;
    var selectedTicketType;
    if(this.state.indexType===1 || this.state.indexType==="1" || this.state.indexType===2 || this.state.indexType==="2"){
      selectedTicketType =
        <SelectField style={{width:'90%', fontSize:'12px'}}
          multiple={true}
          hintText="Select a type"
          value={types}
          onChange={this.handleChange}
        >
          {this.menuItems(types)}
        </SelectField>
    }
    return(
      <div style={{margin:'-22px -22px 0px -22px', backgroundColor:'#ffffff'}}>
        <Paper zDepth={2} >
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              {
                (this.props.info.menusTab).map((item,i)=>{
                  // console.log(i);
                  var iconWeb;
                  if(parseInt(item.param1)===0){
                    iconWeb = <ActionAssessment />
                  }else if(parseInt(item.param1)===1){
                    iconWeb = <ActionAssignment />
                  }else if(parseInt(item.param1)===2){
                    iconWeb = <ActionEvent />
                  }else if((item.name)==='Inventory'){
                    iconWeb = <HardwareDevicesOther />
                  }else {
                    iconWeb = <HardwareDeveloperBoard />
                  }
                  return (
                    <BottomNavigationItem key={i} style={{fontSize:10}}
                      label={item.name}
                      icon={iconWeb}
                      onTouchTap={() => this.select((i),parseInt(item.param1))}
                    />
                  );
                })
              }
            </BottomNavigation>
        </Paper>
        <div style={{padding:20, fontSize:'12px'}} >
          {(this.state.loading)?<div style={{textAlign:'center'}}><CircularProgress size={60} thickness={7} /></div>:
          <div>
            {((this.state.createOpen && this.state.indexType===1)?create:'')}
            {((this.state.createProjectOpen && this.state.indexType===0)?this.state.createProject:'')}
            {((this.state.addInventory && this.state.indexType===4)?this.state.addInventory:'')}

            <div className="row">
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">

                <div style={{backgroundColor:'initial',fontSize:16, marginBottom:10, marginTop:10,fontSize:11}}>
                  {
                    (this.props.info.case_create_able==="1" && this.state.indexType===1)?
                    <a onTouchTap={()=>{
                      this.new()
                    }}  style={styles.btnCreate}>{"New"}</a>:
                    null
                  }
                  {
                    ((this.props.info.project_create_able==="1" || this.props.info.project_create_able==="2") && this.state.indexType===0)?
                      <a onTouchTap={()=>{
                        this.newProject()
                      }} style={styles.btnCreate}>{"New"}</a>:
                      null
                  }
                  {
                    (this.state.indexType===0 || this.state.indexType===1 || this.state.indexType===2)?
                    <a onTouchTap={()=>{
                      this.setState({'status':1});
                      this.callData(this.state.indexType,1, this.state.types, this.state.selectedIndex,this.state.dataLimit, this.state.filtered);
                    }}
                    style={(this.state.status===1?styles.btnActive:styles.btn)}>{"In Process "+((this.state.status==1)?"("+this.state.data.length+")":"")}</a>:
                    null
                  }
                  {
                    (this.state.indexType===1)?
                    <a onTouchTap={()=>{
                      this.setState({'status':800});
                      this.callData(this.state.indexType,800,this.state.types,this.state.selectedIndex, this.state.dataLimit, this.state.filtered);
                    }} style={(this.state.status===800?styles.btnActive:styles.btn)}>{"Missed SLA "+((this.state.status==800)?"("+this.state.data.length+")":"")}</a>:
                    null
                  }
                  {
                    (this.state.indexType===2)?
                    <a onTouchTap={()=>{
                      this.setState({'status':800});
                      this.callData(this.state.indexType,800,this.state.types,this.state.selectedIndex, this.state.dataLimit, this.state.filtered);
                    }} style={(this.state.status===800?styles.btnActive:styles.btn)}>{"Unsigned "+((this.state.status==800)?"("+this.state.data.length+")":"")}</a>:
                    null
                  }
                  {
                    (this.state.indexType===0 || this.state.indexType===1 || this.state.indexType===2)?
                    <a onTouchTap={()=>{
                      this.setState({'status':500});
                      this.callData(this.state.indexType,500,this.state.types,this.state.selectedIndex, this.state.dataLimit, this.state.filtered);
                    }}
                    style={(this.state.status===500?styles.btnActive:styles.btn)}>
                      {"Done "+((this.state.status==500)?"("+this.state.data.length+")":"")}
                    </a>:
                    null
                  }
                  {
                    (this.props.info.add_inventory=="1" && this.state.indexType===4)?
                    <a onTouchTap={()=>{
                      this.addInventory()
                    }}  style={styles.btnCreate}>{"Add"}</a>:
                    null
                  }
                </div>
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                  {this.limitItems()}
              </div>
              <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                <div style={{flex:1,flexDirection:'column',backgroundColor:'initial',textAlign:'center'}}>
                    {selectedTicketType}
                </div>
              </div>
              {
                //<div style={{flex:1,flexDirection:'row',backgroundColor:'initial',textAlign:'right'}}></div>
              }
            </div>
            <div className="table-wrap">
                <ReactTable className='-striped -highlight' style={{height:'600px'}}
                  data={data} filterable
                  filtered={this.state.filtered}
                  columns={columns} defaultPageSize={20}
                  onFilteredChange={filtered => {
                    // console.log(filtered);
                    this.setState({filtered});
                    // this.callData(
                    //   this.state.indexType,
                    //   this.state.status,
                    //   this.state.types,
                    //   this.state.selectedIndex,
                    //   this.state.dataLimit,
                    //   filtered)
                  }}
                  // onFetchData={
                    // console.log(this.state.filtered)
                  // }
                  defaultFilterMethod={(filter, row) => {
                      if(row[filter.id]!=null){
                        return (row[filter.id].includes(filter.value))
                      }else{
                        return "";
                      }
                    }
                  }
                  SubComponent={
                    ((this.state.indexType===1 || this.state.indexType===0 || this.state.indexType===2)?
                      (row) => {
                          if(this.state.indexType===1){
                            return (
                              <div style={{padding: '20px'}}>
                                <TicketDetail
                                  info={this.props.info}
                                  onOpenAppointment={this.handleOpenAppointment}
                                  socket={this.props.socket}
                                  listUserCanAddProject={this.props.listUserCanAddTask}
                                  listUserCanAddTask={this.props.listUserCanAddTask}
                                  projectContact={contactPeople}
                                  closeWindow={()=>{ this.setState({openTicketDrawer:false}) }}
                                  ticket_sid={row.original.sid} data={row.original} />
                              </div>
                            )
                          }else if(this.state.indexType===0){
                            return (
                              <div style={{padding:20}}>
                                  <ProjectDetail
                                    info={this.props.info}
                                    listUserCanAddProject={this.props.listUserCanAddTask}
                                    listUserCanAddTask={this.props.listUserCanAddTask}
                                    project_sid={row.original.sid}
                                  />
                              </div>
                            )
                          }else if(this.state.indexType===2){
                            return (
                              <div style={{padding:20}}>
                                {
                                  // row.original.sid
                                }
                                <ServiceReportDetail
                                  tasks_sid={row.original.sid}
                                  listUserCanAddTask={this.props.listUserCanAddTask}
                                  // socket={this.props.socket}
                                 />
                              </div>
                            )
                          } else{
                            return false;
                          }
                      }:
                      false
                    )
                  }
                />
            </div>
          </div>
          }
        </div>
      </div>
    )
  }
}
var styles = {
  btnCreate: {
    padding:4,margin:'6px 4px 6px 5px',
    cursor:'pointer',
    backgroundColor:'#ff4081',
    color:'#fff',
    userSelect:'none',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    borderRadius: '2px',
    minWidth:'100px'
  },
  btnActive: {
    padding:4,margin:'6px 4px 6px 5px', cursor:'pointer', backgroundColor:'#00bcd4',color:'#ffffff',userSelect:'none',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    borderRadius: '2px'
  },
  btn: {
    padding:4,margin:'6px 4px 6px 5px',
    cursor:'pointer',
    backgroundColor:'#757575',
    color:'#fff',
    userSelect:'none',
    boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
    borderRadius: '2px'
  }
}
// import {CASE,SET_DATA} from '../actions/case/CaseAction';
// const mapStatetoProps = (state) => {
//     return {
//       caseState: state.CaseReducer,
//     }
// }
// const mapDispatchtoProps = (dispatch) => {
//   return {
//     case: (url,data)=> {
//       dispatch(CASE(url,data)).then((res)=>{
//         // console.log(res);
//         dispatch(SET_DATA(res.payload));
//       });
//     }
//   }
// }
export default Management;
