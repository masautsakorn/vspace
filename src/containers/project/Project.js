import React, { Component } from 'react';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import jPost from '../config/jPost';

import CallService from '../config/CallService';
import InfoGen from '../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {GridList} from 'material-ui/GridList';
import NavCompoment from '../nav/NavCompoment';
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
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
// import Chip from 'material-ui/Chip';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
// import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
import LinearProgress from 'material-ui/LinearProgress';
const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import CircularProgress from 'material-ui/CircularProgress';
import Badge from 'material-ui/Badge';
import TicketDrawer from '../ticket/TicketDrawer';
import TicketItem from '../ticket/TicketItem';
import TicketCreate from '../ticket/TicketCreate';
import Drawer from 'material-ui/Drawer';
import PieChart from 'react-simple-pie-chart';
import { Columns,Column } from 're-bulma';
import Snackbar from 'material-ui/Snackbar';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const names = [
  'Incident',
  'Request',
  'Question',
  'Implement',
  'Preventive Maintenance',
];

class Project extends Component {
  constructor(props){
    var showProject,showAppointment,showTask;
    console.log('initial project');
    if(localStorage.getItem("selectedIndex")){
      if(localStorage.getItem("selectedIndex")==="0"){
        showProject = 1;
        showAppointment = 0;
        showTask = 0;
      }else if(localStorage.getItem("selectedIndex")==="1"){
        showProject = 0;
        showAppointment = 0;
        showTask = 1;
      }else if(localStorage.getItem("selectedIndex")==="2"){
        showProject = 0;
        showAppointment = 1;
        showTask = 0;
      }else{
        showProject = 1;
        showAppointment = 0;
        showTask = 0;
      }
    }else{
      showProject = 1;
      showAppointment = 0;
      showTask = 0;
    }

    var data_board = {data:[],a:[],t:[]};

    // if(localStorage.getItem("data_p")){
    //   try{
    //     data_board.data = JSON.parse(localStorage.getItem("data_p"));
    //   }catch(e){
    //     console.log(e);
    //     data_board.data = [];
    //   }
    // }
    // if(localStorage.getItem("data_t")){
    //   try{
    //     data_board.t = JSON.parse(localStorage.getItem("data_t"));
    //   }catch(e){
    //     console.log(e);
    //     data_board.t = [];
    //   }
    // }
    // if(localStorage.getItem("data_a")){
    //   try{
    //     data_board.a = JSON.parse(localStorage.getItem("data_a"));
    //   }catch(e){
    //     console.log(e);
    //     data_board.a = [];
    //   }
    // }
    var listUserCanAddProject;
    if(localStorage.getItem("listUserCanAddProject")){
      try{
          listUserCanAddProject = JSON.parse(localStorage.getItem("listUserCanAddProject"));
      }catch(e){
        console.log(e);
        localStorage.removeItem("listUserCanAddProject")
        listUserCanAddProject = [];
      }
    }else{
      listUserCanAddProject = [];
    }
    super(props);
    this.state = {
      search:'',
      formData:this.props.formData,
      info:this.props.info,
      projectList:data_board.data,
      listProject:<div />,
      listAppoinement:<div />,
      listTask:<div />,
      selectedIndex:((localStorage.getItem("selectedIndex"))?parseInt(localStorage.getItem("selectedIndex")):0),
      appointment:data_board.a,
      task:data_board.t,
      showProject:showProject,
      showAppointment:showAppointment,
      showTask:showTask,
      started:1,
      loader:0,
      listUserCanAddProject:listUserCanAddProject,
      openTicketDrawer:false,
      ticket_sid:((this.props.ticket_sid)?this.props.ticket_sid:null),
      data_ticket_detail:null,
      openSnackbar:false,
      messageSnackbar:'',
      socket:this.props.socket,
      typeCaseAll:names,
      selectedType:[]
    };
  }
  componentDidMount(){

    this.generateBoxProject();
    // this.state.socket.on('online', function(res){
      // console.log(res);
    // });
  }
  componentWillMount(){
    this.callProjectList("",this.state.selectedIndex,this.state.selectedType);
  }
  componentWillUnmount(){
    this.setState({projectList:[],appointment:[],task:[]});
  }
  changeType = (selectedType) => {
      this.callProjectList(this.state.search, this.state.selectedIndex,selectedType);
  }
  callProjectList(search, index, selectedType){
    // console.log(typeof window.lat);
    var latitude;
    if(typeof window.lat !=='undefined'){
      latitude = (window.lat);
    }
    var longitude;
    if(typeof window.lng !=='undefined'){
      longitude = (window.lng);
    }

    var dataEmit = {email:InfoGen.email,token:InfoGen.token,
      lat:latitude,lng:longitude
    };
    // this.state.socket.emit('online', dataEmit);

    var that = this;
    // this.props.formData.append("search",search);
    // var formData = new FormData();
    // formData.append("email",InfoGen.email);
    // formData.append("token",InfoGen.token);
    // formData.append("search",search);
    // formData.append("selectedIndex",index);

    var formData =
      {
        token:InfoGen.token,
        email:InfoGen.email,
        status:1,
        type:selectedType,
        search: search
      };
    var url = Url.ws_projects;
    if(index===0){
      url = Url.ws_projects;
      jPost(url,formData).then(function(pl){
          // console.log(pl);
          that.processAfterCallService(index, pl, selectedType);
      });
    }else if(index===1){
      url = Url.ws_ticket;
      jPost(url,formData).then(function(pl){
          // console.log(pl);
          that.processAfterCallService(index, pl, selectedType);
      });
    }else if(index===2){
      var formData = new FormData();
      formData.append("email",InfoGen.email);
      formData.append("token",InfoGen.token);
      formData.append("search",search);
      formData.append("selectedIndex",index);
      url = Url.project;
      get(url,formData).then(function(pl){
          that.processAfterCallService(index, pl, selectedType);
      });
    }

  }
  processAfterCallService = (index, pl, selectedType) => {

    var that = this;
    if(index===0){
      localStorage.setItem('data_p',JSON.stringify(pl.data));
      that.setState({
        projectList:pl.data,
        started:1,
        loader:1,
        listUserCanAddProject:pl.canAssignTo,
        selectedType:selectedType,
        openSnackbar:false
      });
    }else if(index===1){
      localStorage.setItem('data_t',JSON.stringify(pl.data));
      that.setState({
        task:pl.data,
        started:1,
        loader:1,
        selectedType:selectedType,
        typeCaseAll:pl.type,
        listUserCanAddProject:pl.canAssignTo,
        openSnackbar:false
      });
    }else if(index===2){
      localStorage.setItem('data_a',JSON.stringify(pl.data));
      that.setState({
        appointment:pl.a,
        started:1,
        loader:1,
        selectedType:selectedType,
        listUserCanAddProject:pl.canAssignTo,
        openSnackbar:false
      });
    }else{
      that.setState({
        projectList:pl.data,
        appointment:pl.a,
        task:pl.t,
        started:1,
        loader:1,
        listUserCanAddProject:pl.canAssignTo,
        openSnackbar:false
      });
      // localStorage.setItem('data_board',JSON.stringify(pl));
    }
    localStorage.setItem('listUserCanAddProject',JSON.stringify(pl.canAssignTo));
    that.generateBoxProject();
  }
  handleFilter = (value) => {
    this.setState({'search':value,openSnackbar:true,messageSnackbar:'Loading...'});
    this.callProjectList(value,this.state.selectedIndex, this.state.selectedType);
  }
  generateBoxProject(){
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
      },
      gridList: {
        width: '100%',
        margin:'auto',
        // height: 450,
        // overflowY: 'auto',
      },
      styleBorder: {
        border: '1px solid #fafbf9',
        height:180,
        borderRadius: '3px',
        // margin:'10px 10px 0px 10px'
        backgroundColor: '#fafbfc'
      },
      styleBorderNew: {
        border: '1px dashed #838383',
        height:180,
        borderRadius: '3px',
        backgroundColor:'#fff'
      }
    };
    var that = this;
    var numberColumn = 5;
    if(window.innerWidth<376){
      numberColumn = 1;
    }else if(window.innerWidth<768){
      numberColumn = 2;
    }

    var elementCreateProject =
    <div  key={0}>
      <Link to={"/projectcreate"} >
        <Paper zDepth={2}
          key={""}
          style={styles.styleBorderNew}
        >
          <div style={{padding:'10px',display:'flex'}}>
          <ContentAddCircle style={{marginTop:'6px', color:lightBlack}} /> <span style={{marginTop:'10px'}}>Create New Project</span></div>
        </Paper>
      </Link>
    </div>;

    var boxProject = [];
    boxProject.push(elementCreateProject);
    that.state.projectList.forEach((tile,i) => {
      var avatarOwner = [];
      // tile.owner.forEach((item,k) => {
      //     if(item.owner_picture_project){
      //       avatarOwner.push(<Avatar key={tile.sid+'-'+k} src={item.owner_picture_project} />);
      //     }else{
      //
      //     }
      // });
      boxProject.push(
          <div
            key={i+"-"+tile.sid}
            style={styles.styleBorder} data-id={tile.sid}
          >
            <Link to={"/project/"+tile.sid}>
              <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
                <div>{tile.name}</div>
                <div style={{color: lightBlack}}>{tile.contract}</div>

                <div style={{textAlign:'right', position:'absolute',left:8,right:8,bottom:8}}>
                  {avatarOwner}
                  <div style={{textAlign:'right',height:'20px'}}>
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: '#dadada',
                          borderRadius: '2px',
                          textAlign:'center',
                          color:lightBlack,
                          position:'relative'
                        }}
                      >
                        <div
                          style={{
                            width: '100%',
                            position:'absolute',
                            height: '100%',
                            transition: 'all .2s ease-out',
                          }}
                        >{tile.progress}%</div>
                        <div
                          style={{
                            width: (tile.progress)+'%',
                            height: '100%',
                            backgroundColor: tile.progress > 66 ? '#85cc00'
                              : tile.progress > 33 ? '#ffbf00'
                              : '#ff2e00',
                            borderRadius: '2px',
                            transition: 'all .2s ease-out',
                          }}
                        />
                      </div>
                  </div>

                </div>
              </Paper>
            </Link>
          </div>);
    });

    var elementSectionProject = <SectionElement search={this.state.search} changeFilter={this.handleFilter} title="Project" data={this.state.projectList} box={boxProject} numberColumn={numberColumn} styles={styles} />;

    var box = [];
    var genMaoreAssociate = false;
    that.state.appointment.forEach((item,i)=>{
      var associateEngineer;
      box.push(
        <div key={item.sid} onTouchTap={()=>{
          // this.handleSelectAppointment(item.tasks_sid)
        }} style={styles.styleBorder} >
          <Link to={"/appointment/"+item.sid}>
            <Paper zDepth={2} style={{padding:'10px',height:'100%',position:'relative'}}>
              <div style={{overflow:'hidden',height:'80px'}}><small>{item.no_task} {item.subject}</small></div>
              <div style={{color: lightBlack, height:'16px',overflow:'hidden'}}><small>{item.end_user}</small></div>
              <div style={{overflow:'hidden',height:'36px',textAlign:'right'}}><Avatar src={item.picture_profile} size={30} style={{margin:4}}/>{associateEngineer}</div>
              <div style={{color: lightBlack,textAlign:'right',position:'absolute',right:8,bottom:8}}><small style={{fontSize:'9px'}}>Appointment<br/>{item.appointment}</small></div>
            </Paper>
          </Link>
        </div>
      );
    });
    var elementSectionAppointment = <SectionElement search={this.state.search} changeFilter={this.handleFilter} title="Appointment" data={this.state.appointment} box={box} numberColumn={numberColumn} styles={styles}/>;

    var task = [];
    if(this.state.info.case_create_able==="1"){
      // console.log(this.props);
      task.push(<TicketCreate listUserCanAddProject={this.props.listUserCanAddTask} key={"ticket-created"} />);
    }
    this.state.task.forEach((item,i)=>{
        task.push(
          <TicketItem info={this.props.info} socket={this.props.socket} key={item.sid} item={item} listUserCanAddTask={this.props.listUserCanAddTask} listUserCanAddProject={this.state.listUserCanAddProject}  />
        )
    });

    var elementSectionTask =
    <div><SectionElement changeType={this.changeType} selectedType={this.state.selectedType} selectedIndex={this.state.selectedIndex} typeCaseAll={this.state.typeCaseAll} search={this.state.search} changeFilter={this.handleFilter} filter={<Filter />} title="Task" data={this.state.task} box={task} numberColumn={numberColumn} styles={styles} />
    </div>;

    that.setState({listProject:elementSectionProject,listAppoinement:elementSectionAppointment,listTask:elementSectionTask});

  }
  handleSelectProject = (e) => {
    localStorage.setItem("project_sid", e.currentTarget.dataset.id);
    localStorage.removeItem("tasks_sid");
    // window.location.reload(true);
    this.props.onChangePage();
  }
  handleSelectAppointment = (tasks_sid) => {
    // alert(tasks_sid);
    localStorage.setItem("tasks_sid",tasks_sid);
    localStorage.removeItem("project_sid");
    // window.location.reload(true);
    this.props.onChangePage();
  }

  handleCreateNewProject = () => {
    // localStorage.setItem("currectPage","ProjectCreate");
    // window.location.reload(true);
    this.props.onChangePage("ProjectCreate");
  }
  select = (index) => {
    // console.log(index);
    this.setState({selectedIndex: index});
    localStorage.setItem("selectedIndex",index);
    this.setShow(index);
  }

  setShow = (index) => {
    if(index===0){
      this.setState({showProject:1,showTask:0,showAppointment:0});
    }else if(index===1){
      this.setState({showProject:0,showTask:1,showAppointment:0});
    }else if(index===2){
      this.setState({showProject:0,showTask:0,showAppointment:1});
    }else {
      this.setState({showProject:1,showTask:0,showAppointment:0});
    }
    this.callProjectList(this.state.search,index, this.state.selectedType);
  }
  render(){
    const boxData = {'overflow':'auto','width':'100%','top':115,'bottom':'0',position:'absolute'};
    var showAppointment;
    if(this.state.showAppointment){
      showAppointment =
        <div style={boxData}>
          {this.state.listAppoinement}
        </div>
    }
    var showProject;
    if(this.state.showProject){
      showProject =
      <div style={boxData}>
        {this.state.listProject}
      </div>
    }
    var showTask;
    if(this.state.showTask){
      showTask =
      <div style={boxData}>
        {this.state.listTask}
      </div>
    }
    var content;
    var loader;
    if(!this.state.loader){
      loader = <div style={{textAlign:'center'}}>
        <CircularProgress thickness={5} />
      </div>
    };

    if(this.state.started===1){
      content =
        <div>
          {loader}
          {showAppointment}
          {showTask}
          {showProject}
        </div>;
    }else{
      content = <div style={{textAlign:'center'}}>
        <CircularProgress size={20} thickness={1} />
      </div>;
    }
    var ticketDetail;
    if(this.state.openTicketDrawer){

    }else{
      ticketDetail = <div />;
    }
    var number_project = "(0)";
    if(this.state.projectList.length>0){
      number_project = "("+this.state.projectList.length+")";
    }
    return(
          <div>
            <Paper zDepth={2} >
                <BottomNavigation selectedIndex={this.state.selectedIndex}>
                  <BottomNavigationItem
                    label={"Project "}
                    icon={<ActionAssessment />}
                    onTouchTap={() => this.select(0)}
                  />
                  <BottomNavigationItem
                    label={"Case"}
                    icon={<ActionAssignment />}
                    onTouchTap={() => this.select(1)}
                  />
                  <BottomNavigationItem
                    label={"Service Report"}
                    icon={<ActionEvent />}
                    onTouchTap={() => this.select(2)}
                  />
                </BottomNavigation>
            </Paper>
            {content}
            {ticketDetail}
            <Snackbar
              open={this.state.openSnackbar}
              message={this.state.messageSnackbar}
              onRequestClose={()=>{this.setState({openSnackbar: false}) }}
            />
          </div>
    )
  }
}

class SectionElement extends Component {
  constructor(props){
    super(props);
    if(this.props.selectedIndex===1){
      this.state = {search:this.props.search, typeCaseAll:this.props.typeCaseAll,selectedType:this.props.selectedType}
    }else{
      this.state = {search:this.props.search}
    }
  }
  changeFilter = (e) => {
    console.log(e.target.value);
    this.setState({search:e.target.value});
  }
  handleSubmit = (e) => {
    console.log(this.state.search);
    this.props.changeFilter(this.state.search);
    e.preventDefault();
  }
  handleChange = (event, index, selectedType) => {
    // console.log(selectedType);
      this.setState({selectedType});
      this.props.changeType(selectedType);
      // this.callData(this.state.selectedIndex, this.state.status,types);
  }
  menuItems(types) {
    // console.log(names);
    if(typeof this.props.typeCaseAll!=='undefined'){
      return this.props.typeCaseAll.map((name) => (
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
  // <div className="">{this.props.title+" ("+this.props.data.length+")"}</div>
  render(){
    // console.log(this.state.typeCaseAll);
    // console.log(this.state.selectedType);
    // const {typeCaseAll} = this.state;
    var selectedTicketType;
    // if(this.props.selectedIndex===1 || this.props.selectedIndex==="1"){
    //   selectedTicketType =
    //     <SelectField style={{width:'100%'}}
    //       multiple={true}
    //       hintText="Select a type"
    //       value={this.state.selectedType}
    //       onChange={this.handleChange}
    //     >
    //       {this.menuItems(this.state.selectedType)}
    //     </SelectField>
    // }

    return(
      <Card style={{backgroundColor:'initial'}}>
        <CardHeader style={{padding:"0px 20px 0px 20px"}} subtitle="">
          <Columns>
            <Column>
              <div className="flex">
                <div className="flex-in">
                  <form onSubmit={this.handleSubmit}>
                    <TextField value={this.state.search} style={{marginLeft:10, width:'initial'}} onChange={this.changeFilter} hintText="Search"/>
                  </form>
                </div>
                <div className="flex-in" style={{textAlign:'right'}}>
                  {selectedTicketType}
                </div>
              </div>
            </Column>
          </Columns>
        </CardHeader>
        <CardText>
          <div style={this.props.styles.root}>
            <GridList cellHeight={200}
              cols={this.props.numberColumn}
              padding={10}
              style={this.props.styles.gridList}
            >
                {this.props.box}
            </GridList>
          </div>
        </CardText>
      </Card>
    )
  }
}

class Filter extends Component {
  render(){
    return(<div></div>);
  }
}
export default Project;
