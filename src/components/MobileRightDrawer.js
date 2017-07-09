import React, {Component} from 'react';
import {Page,Navigator,BackButton,Toolbar,Tab, Tabbar} from 'react-onsenui';
import {ToolbarButton,Icon,Splitter,SplitterSide,List,ListItem,SplitterContent} from 'react-onsenui';
import {Link} from 'react-router';
import Url from '../config/url';
import get from '../config/Get';
import InfoGen from '../config/InfoGen';

export default class MobileRightDrawer extends Component {
  constructor(props){
    super(props);
    var info = InfoGen.info;
    console.log(info);
    // if(info){
    //   console.log('use info');
    //   this.state = {isOpen:this.props.isOpen,menus:info.menusV4,menusTab:info.menusTab,info:info}
    // } else {
      this.state = {isOpen:this.props.isOpen,menus:[],menusTab:[],info:{}}
      this.loadHeader();
    // }
  }
  componentDidMount(){
    this.props.menusTab(this.state.menusTab,this.state.info);
  }
  componentWillMount(){
    // console.log(typeof InfoGen.info);
  }
  loadHeader = () => {
      var that = this;
      var formData = new FormData();
      formData.append('token',InfoGen.token);
      formData.append('email',InfoGen.email);
      // var basename = (document.location.href);
      get(Url.info, formData).then(function(resInfo){

          if(resInfo.data.user_sid){
            console.log(resInfo.data.menus);
            // Data.menu = resInfo.data.menus;
            that.props.menusTab(resInfo.data.menusTab, );

            that.setState({menus:resInfo.data.menusV4,info:resInfo.data,menusTab:resInfo.data.menusTab});
          }else{
            localStorage.removeItem("case_token");
            localStorage.removeItem("case_email");
            window.location.reload("/");
          }
      });
  }
  hide = () => {
    // this.setState({isOpen: false});
    this.props.hide();
  }

  show = () => {
    // this.setState({isOpen: true});
    // this.props.show();
  }
  signOut = () => {
    localStorage.removeItem("case_token");
    localStorage.removeItem("case_email");
    window.location = "/";
  }
  render(){
    return(
      <Splitter>
        <SplitterSide
          style={{
              boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'
          }}
          side='right'
          width={200}
          collapse={true}
          isSwipeable={true}
          isOpen={this.props.isOpen}
          onClose={this.hide}
          onOpen={this.show}
        >
          <Page>
            <div style={{padding:10}}>vSpace</div>
            <List
              dataSource={this.state.menus}
              renderRow={(item,i) => (
                <Link key={i} to={item.link}><ListItem onClick={this.hide} tappable>{item.name}</ListItem></Link>
              )}
            >
              <ListItem onClick={this.hide} onTouchTap={()=>this.signOut()} tappable>Logout</ListItem>
            </List>
          </Page>
        </SplitterSide>
        <SplitterContent>
          <Page >
            <section style={{margin: '0px'}}>
              {this.props.content}
            </section>
          </Page>
        </SplitterContent>
      </Splitter>
    )
  }
}
