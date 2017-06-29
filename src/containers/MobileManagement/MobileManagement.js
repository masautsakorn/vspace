import React,{Component} from 'react';
import {Page,Navigator,BackButton,Toolbar
  // ,Tab, Tabbar
} from 'react-onsenui';
import {ToolbarButton,Icon
  // ,Splitter,SplitterSide
  // ,List,ListItem
  ,SplitterContent} from 'react-onsenui';
import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
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
import RenderCase from './RenderCase';

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
    var indexType = 1;
    if(localStorage.getItem("indexType")){
      indexType = parseInt(localStorage.getItem("indexType"));
    }
    var nameType = 'Case';
    if(localStorage.getItem("nameType")){
      nameType = localStorage.getItem("nameType");
    }
    var selectedIndex = 0;
    if(localStorage.getItem("selectedIndex")){
      selectedIndex = parseInt(localStorage.getItem("selectedIndex"));
    }

    var tabValue = '';

    this.state = {
      isOpen:false,
      selectedIndex: selectedIndex,
      menus:[], info:{},menusTab:[], indexType:indexType, tabValue: '1', nameType:nameType,
      data:[],
      type:[],
      loaded:true
    }
  }
  componentWillMount(){
    var {tabValue} = this.state;
    var {indexType,selectedIndex} = this.state;
    this.loadData(indexType,tabValue, [], "", selectedIndex,0,1000);
  }
  hide = () => {
    this.setState({isOpen: false});
  }
  show = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  select = (index, indexType, nameType) => {
    this.setState({selectedIndex: index, indexType:indexType,nameType:nameType});

    localStorage.setItem("indexType",indexType);
    localStorage.setItem("nameType", nameType);
    localStorage.setItem("selectedIndex", index);
    var {tabValue} = this.state;
    this.loadData(indexType,tabValue, [], "", index,0,1000);
  }
  handleChange = (value) => {
    this.setState({
      tabValue: value,
    });
    var {indexType,selectedIndex} = this.state;
    this.loadData(indexType,value, [], "", selectedIndex,0,1000);
  }
  loadData = (indexType,status, type,search,selectedIndex,dataStart,dataLimit) => {
    var that = this;
    LoadMain(indexType,status, type,search,selectedIndex,dataStart,dataLimit).then((res)=>{
      console.log(res);
      that.setState({loaded:false, data:res.data, type:res.type});
    });
  }
  menusTab = (menusTabList,info) => {
    this.setState({menusTab:menusTabList,info:info});
  }

  renderTabTop = () => {
    var {indexType, info,data} = this.state;
    var {navigator} = this.props;

    var content;
    if(indexType=="0"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:20, background:'#fafafa'}}>
            In Process Project ({data.length})
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:20}}>
              Done Project ({data.length})
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="1"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:20}}>
              In Process ({data.length})
          </div>
        </MTab>
        <MTab label="Missed SLA" value="800" style={{color:'#666666'}}>
          <div style={{padding:20}}>
            Missed SLA ({data.length})
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:20}}>
            Done ({data.length})
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="2"){
      content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.tabValue}
        onChange={this.handleChange}
      >
        <MTab label="In Process" value="1" style={{color:'#666666'}}>
          <div style={{padding:20}}>
            In Process SR ({data.length})
          </div>
        </MTab>
        <MTab label="Unsigned" value="800" style={{color:'#666666'}}>
          <div style={{padding:20}}>
            Unsigned SR ({data.length})
          </div>
        </MTab>
        <MTab label="Done" value="500" style={{color:'#666666'}}>
          <div style={{padding:20}}>
            Done SR ({data.length})
          </div>
        </MTab>
      </MTabs>);
    }else if(indexType=="3"){

    }else if(indexType=="4"){
      // content = (<MTabs tabItemContainerStyle={{background:'#ffffff'}}
      //   value={this.state.tabValue}
      //   onChange={this.handleChange}
      // >
      //   <MTab label="AAA" value="a" style={{color:'#666666'}}>
      //     <div style={{padding:20}}>
      //
      //     </div>
      //   </MTab>
      //   <MTab label="Tab B" value="b" style={{color:'#666666'}}>
      //     <div style={{padding:20}}>
      //
      //     </div>
      //   </MTab>
      //   <MTab label="Tab B" value="C" style={{color:'#666666'}}>
      //     <div style={{padding:20}}>
      //
      //     </div>
      //   </MTab>
      // </MTabs>);
    }
    return content;
  }
  renderContent = () => {
    var {navigator} = this.props;
    var {indexType,data} = this.state;
    // console.log(indexType);

    return (<div style={{position:'absolute',left:0,right:0,bottom:0, top:0}}>
      <div style={{position:'relative', height:'100%',display:'flex',flexDirection:'column' }}>
        <div style={{position:'absolute',top:0, height:56, width:'100%'}}>
          {this.renderTabTop()}
        </div>
        <div style={{overflow:'auto',flex:1, zIndex:0, marginTop:106}}>
          <div onTouchTap={()=>{}} style={{marginBottom:56, color:'#000'}}>

            {//<div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageTwo,key:'PageTwo'}) }}>Go To Next Page</div>
            }
            <RenderCase data={data} navigator={navigator}  />
          </div>
        </div>
        <div style={{position:'absolute',bottom:0, height:56, width:'100%'}}>
          <BottomNavigation selectedIndex={this.state.selectedIndex} >
            {
              this.state.menusTab.map((item,i)=>{
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
                return <BottomNavigationItem key={i}
                  icon={iconWeb}
                  onTouchTap={() => this.select(i, parseInt(item.param1), item.name)}
                />
              })
            }
          </BottomNavigation>
        </div>
      </div>
    </div>)
  }
  render(){
    var {nameType} = this.state;
    var title = nameType;

    return <Page key={"PageOne"} renderToolbar={()=><NavApp show={this.show} backButton={false} title={title} navigator={navigator} /> } >
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
const PageThree = ({navigator}) => (
  <Page key={"PageThree"} renderToolbar={()=><NavApp backButton={true} title={"Page Three"} navigator={navigator} />}>
    <div style={{display:'flex', padding:10}}>
      <div style={{flex:1, padding:10}}>Page Three</div>
    </div>
  </Page>
)
class NavApp extends Component{
  constructor(props){
    super(props);
  }

  render(){
    var {backButton, navigator, title} = this.props;
    var style = {backgroundColor:'#00bcd4'};
    return <Toolbar style={style}>
      <div className='left'>
        {backButton ? <BackButton style={{color:'#ffffff'}} onClick={() => navigator.popPage()}>Back</BackButton> : null}
      </div>
      <div style={{color:'#ffffff'}} className='center'>{title}</div>
      <div className='right' >
        {!backButton?
          <ToolbarButton onClick={()=>this.props.show()} style={{color:'#ffffff'}}>
            <Icon icon='ion-navicon, material:md-menu' />
          </ToolbarButton>: null
        }
      </div>
    </Toolbar>
  }
}
export default MobileDashboard;
