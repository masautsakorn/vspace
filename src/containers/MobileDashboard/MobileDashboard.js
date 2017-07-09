import React,{Component} from 'react';
import {Page,Navigator,BackButton,Toolbar,Tab, Tabbar} from 'react-onsenui';
import {ToolbarButton,Icon,Splitter,SplitterSide,List,ListItem,SplitterContent} from 'react-onsenui';
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

import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import IconLocationOn from 'material-ui/svg-icons/communication/location-on';

const recentsIcon = <FontIcon className="material-icons">restore</FontIcon>;
const favoritesIcon = <FontIcon className="material-icons">favorite</FontIcon>;
const nearbyIcon = <IconLocationOn />;

import Url from '../../config/url';
import get from '../../config/Get';
import InfoGen from '../../config/InfoGen';

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
    this.state = {isOpen:false,selectedIndex: 0,menus:[],info:{},menusTab:[],indexType:indexType}
  }
  hide = () => {
    this.setState({isOpen: false});
  }
  show = () => {
    this.setState({isOpen: !this.state.isOpen});
  }
  select = (index, indexType) => this.setState({selectedIndex: index, indexType:indexType});
  renderContent = () => {
    var {navigator} = this.props;
    return (<div style={{position:'absolute',left:0,right:0,bottom:0, top:0}}>
      <div style={{position:'relative', height:'100%',display:'flex',flexDirection:'column' }}>
        <div style={{overflow:'auto',flex:1}}>
          <div onTouchTap={()=>{}} style={{ marginBottom:56,padding:20, color:'#000'}}>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div>MAIN_PAGE</div>
            <div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageTwo,key:'PageTwo'}) }}>Go To Next Page</div>
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
                  onTouchTap={() => this.select(i, parseInt(item.param1))}
                />
              })
            }
          </BottomNavigation>
        </div>
      </div>
    </div>)
  }
  menusTab = (menusTabList) => {
    this.setState({menusTab:menusTabList});
  }
  render(){
    var title = "Dashboard";

    return <Page key={"PageOne"} renderToolbar={()=><NavApp show={this.show} backButton={false} title={title} navigator={navigator} /> } >
      <MobileRightDrawer menusTab={this.menusTab} hide={this.hide} isOpen={this.state.isOpen} content={this.renderContent()} />
    </Page>
  }
}
const PageTwo = ({navigator}) => (
  <Page key={"PageTwo"} renderToolbar={()=><NavApp backButton={true} title={"Page Two"} navigator={navigator} />}>
    <div style={{display:'flex', padding:10}}>
      <div style={{flex:1, padding:10}}>Page Two</div>
      <div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageThree,key:'PageThree'}) }}>Go To Next Page</div>
    </div>
  </Page>
)
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
