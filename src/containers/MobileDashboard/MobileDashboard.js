import React,{Component} from 'react';
import {Page,Navigator,BackButton,Toolbar,SearchInput,List,ListItem
  // ,Tab, Tabbar
} from 'react-onsenui';
import {ToolbarButton,Icon,Fab
  // ,Splitter,SplitterSide
  // ,List,ListItem
  ,SplitterContent} from 'react-onsenui';
// import 'onsenui/css/onsenui.css';
// import 'onsenui/css/onsen-css-components.css';
import {Link} from 'react-router';

import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import ActionEvent from 'material-ui/svg-icons/action/event';
import ActionAssessment from 'material-ui/svg-icons/action/assessment';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';
import ContentClear from 'material-ui/svg-icons/content/clear';
import HardwareDevicesOther from 'material-ui/svg-icons/hardware/devices-other';
import HardwareDeveloperBoard from 'material-ui/svg-icons/hardware/developer-board';

import MobileRightDrawer from '../../components/MobileRightDrawer';

// import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

// const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
// const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
// const nearbyIcon = <IconLocationOn />;

import Url from '../../config/url';
import get from '../../config/Get';
import InfoGen from '../../config/InfoGen';

import MTabs from 'material-ui/Tabs/Tabs';
import MTab from 'material-ui/Tabs/Tab';

import {LoadMain} from '../../actions/ActionManagement';
import RenderCase from '../MobileManagement/RenderCase';
import RenderSr from '../MobileManagement/RenderSr';
import RenderProject from '../MobileManagement/RenderProject';
import RenderNotification from '../MobileManagement/RenderNotification'

import ProjectCreate from '../project/ProjectCreate2';

import ImageMenu from 'material-ui/svg-icons/image/dehaze';
import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import SocialNotifications from 'material-ui/svg-icons/social/notifications';

class MobileDashboard extends Component{
  constructor(props){
    super(props);
    this.state = {isOpen:false};
  }
  renderPage = (route, navigator) => {
    return (
      <route.component key={route.key} navigator={navigator} />
    )
  }
  render(){
    return(<Navigator renderPage={this.renderPage} initialRoute={{component:MainPage, key:'MAIN_PAGE'}} />
    )
  }
}
class MainPage extends Component {
  constructor(props){
    super(props);
    var indexType = 2;
    // if(localStorage.getItem("indexType")){
    //   indexType = parseInt(localStorage.getItem("indexType"));
    // }
    var nameType = 'Service Report';
    // if(localStorage.getItem("nameType")){
    //   nameType = localStorage.getItem("nameType");
    // }
    var selectedIndex = 0;
    // if(localStorage.getItem("selectedIndex")){
    //   selectedIndex = parseInt(localStorage.getItem("selectedIndex"));
    // }

    var tabValue = '';

    this.state = {
      isOpen:false,
      selectedIndex: selectedIndex,
      menus:[], info:{},menusTab:[], indexType:indexType, tabValue: '1', nameType:nameType,
      data:[],
      type:[],
      loaded:true,
      dataStart:0,
      dataLimit:10,
      search:'',
      openCreateProject:false
    }
  }
  componentDidMount(){
    var {tabValue} = this.state;
    var {indexType,selectedIndex} = this.state;
    this.loadData(indexType,tabValue, [], this.state.search, selectedIndex,this.state.dataStart,this.state.dataLimit);
  }
  hide = () => {
    this.setState({isOpen: false});
  }
  show = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  select = (index, indexType, nameType) => {
    this.setState({selectedIndex: index, indexType:indexType,nameType:nameType});

    // localStorage.setItem("indexType",indexType);
    // localStorage.setItem("nameType", nameType);
    // localStorage.setItem("selectedIndex", index);
    var {tabValue} = this.state;
    this.loadData(indexType,tabValue, [], this.state.search, index,this.state.dataStart,this.state.dataLimit);
  }
  handleChange = (value) => {
    this.setState({
      tabValue: value,
    });
    var {indexType,selectedIndex} = this.state;
    this.loadData(indexType,value, [], this.state.search, selectedIndex,this.state.dataStart,this.state.dataLimit);
  }
  loadData = (indexType,status, type,search,selectedIndex,dataStart,dataLimit) => {
    var that = this;
    LoadMain(indexType,status, type,search,selectedIndex,dataStart,dataLimit,'onlyMe').then((res)=>{
      console.log(res);
      that.setState({loaded:false, data:res.data, type:res.type});
    });
  }
  menusTab = (menusTabList,info) => {
    this.setState({menusTab:menusTabList,info:info});
  }
  searchInput = (value) => {
    console.log(value);
    this.setState({search:value});
    this.loadData(
      this.state.indexType,
      this.state.tabValue, [],
      value,
      this.state.selectedIndex,
      this.state.dataStart,
      this.state.dataLimit
    );
  }
  renderTabTop = () => {
    var {indexType, info,data} = this.state;
    var {navigator} = this.props;

    var content;
    content = <div style={{padding:10}}><SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' /></div>
    return content;
    if(indexType=="0"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:10, background:'#fafafa'}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="1"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
        <MTab label="Missed SLA" value="800" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="2"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
        <MTab label="Unsigned" value="800" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:10}}>
              <SearchInput onKeyUp={(e)=>this.searchInput(e.target.value)} style={{width:'100%'}} placeholder='Search' />
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="3"){

    }else if(indexType=="4"){

    }
    return content;
  }
  renderDetail = () => {
    var {navigator} = this.props;
    var {indexType,data} = this.state;
    console.log(indexType);
    if(indexType==1)
      return <RenderCase data={data} navigator={navigator}  />
    else if(indexType==2)
      return <RenderSr data={data} navigator={navigator}  />
    else if(indexType==0)
      return <div><RenderProject data={data} navigator={navigator} />
        {//<Fab onTouchTap={()=>{navigator.pushPage({component:PageProjectCreate,key:'PageProjectCreate'}) }} style={{bottom:60}} position='bottom right'>+</Fab>
        }
        </div>
    else if(indexType==3){
      return <div><RenderNotification data={data} navigator={navigator} /></div>
    }
  }
  renderContent = () => {
    var {navigator} = this.props;
    var {indexType,data} = this.state;
    // console.log(indexType);

    return (<div style={{position:'absolute',left:0,right:0,bottom:0, top:0}}>
      <div style={{position:'relative', height:'100%',display:'flex',flexDirection:'column' }}>
        <div style={{position:'relative',height:60,  width:'100%'}}>
          {this.renderTabTop()}
        </div>
        <div style={{overflow:'auto',flex:1, zIndex:0}}>
          <div onTouchTap={()=>{}} style={{
            // marginBottom:56,
            color:'#000000'}}>

            {//<div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageTwo,key:'PageTwo'}) }}>Go To Next Page</div>
            }
            {
              this.renderDetail()
            }
          </div>
        </div>
        <div style={{position:'relative',height:56, width:'100%'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex} >
            <BottomNavigationItem key={0}
                  icon={<ActionEvent />}
                  onTouchTap={() => this.select(0, 2, 'Service Report')} />
            <BottomNavigationItem key={1}
                  icon={<SocialNotifications />}
                  onTouchTap={() => this.select(1, 3, 'Notify')} />
          </BottomNavigation>
        </div>
      </div>
    </div>)
  }
  render(){
    var {nameType} = this.state;
    var title = nameType;

    return <Page style={{backgroundColor:'#ffffff'}} key={"PageOne"} renderToolbar={()=>
      <NavApp show={this.show} backButton={false} title={title} navigator={navigator} /> } >
      <MobileRightDrawer menusTab={this.menusTab} hide={this.hide} isOpen={this.state.isOpen} content={this.renderContent()} />

    </Page>
  }
}
class PageTwo extends Component{
    constructor(props){
      super(props);
      console.log(navigator);
    }
    render(){
      return (<Page key={"PageTwo"} renderToolbar={()=><NavApp backButton={true} title={"Page Two"} navigator={navigator} />}>
          <div style={{display:'flex', padding:10}}>
            <div style={{flex:1, padding:10}}>Page Two</div>
            <div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageThree,key:'PageThree'}) }}>Go To Next Page</div>
          </div>
        </Page>
      )
    }
}

class PageProjectCreate extends Component{
  constructor(props){
    super(props);
  }
  render(){
    var {navigator} = this.props;
    return (<Page key={"PageProjectCreate"} renderToolbar={()=><NavApp backButton={true} title={"Create Project"} navigator={navigator} />}>
        <div style={{padding:10}}>
          <ProjectCreate info={InfoGen.info}
            onCloseProjectCreate={
              ()=>{
                navigator.popPage();
              }
            }
          />
        </div>
      </Page>
    )
  }
}
const PageThree = ({navigator}) => (
  <Page key={"PageThree"} renderToolbar={()=><NavApp backButton={true} title={"Page Three"} navigator={navigator} />}>
    <div style={{display:'flex', padding:10}}>
      <div style={{flex:1, padding:10}}>Page Three</div>
    </div>
  </Page>
)

class MenuRight extends Component {
  constructor(props){
    super(props);

  }
  render(){
    return <Page>
      <div style={{padding:5}}>vSpace</div>
      <List
        dataSource={this.state.menus}
        renderRow={(item,i) => (
          <Link key={i} to={item.link}><ListItem onClick={this.hide} tappable>{item.name}</ListItem></Link>
        )}
      >
        <ListItem onClick={this.hide} onTouchTap={()=>this.signOut()} tappable>Logout</ListItem>
      </List>
    </Page>
  }
}

class NavApp extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var {backButton, navigator, title} = this.props;
    var style = {backgroundColor:'#00bcd4'};
    return <Toolbar style={style}>
      <div className='left'>
        {backButton ? <div><ChevronLeft style={{color:'#ffffff'}} onClick={() => navigator.popPage()} /> Back</div>: null}
      </div>
      <div style={{color:'#ffffff'}} className='center'>{title}</div>
      <div className='right' >
        {!backButton?
          <ToolbarButton onClick={()=>this.props.show()} style={{color:'#ffffff',verticalAlign:'sub'}}>
            <ImageMenu color="#ffffff" />
          </ToolbarButton>: null
        }
      </div>
    </Toolbar>
  }
}
export default MobileDashboard;
