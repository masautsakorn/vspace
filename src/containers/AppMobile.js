import React,{Component} from 'react';
// import {Toolbar,ToolbarButton,Icon,Splitter,SplitterSide,List,Page,ListItem,SplitterContent} from 'react-onsenui';


import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import ThemeDefault from '../theme-default';


import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
// class MobileManagement extends Component{
//   constructor(props){
//     super(props);
//
//   }
//   render(){
//     return(
//       <div>Management</div>
//     )
//   }
// }

class AppMobile extends Component{
  constructor(props){
    super(props);

    console.log(this.props);
  }
  // renderToolbar = () => {
  //   return (
  //     <Toolbar style={{background:'#00bcd4'}}>
  //       <div className='left' >
  //         <ToolbarButton onClick={this.show} style={{color:'#ffffff'}}>
  //
  //         </ToolbarButton>
  //       </div>
  //       <div className='center' style={{color:'#ffffff'}}>Management</div>
  //       <div className='right' >
  //         <ToolbarButton onClick={this.show} style={{color:'#ffffff'}}>
  //           <Icon icon='ion-navicon, material:md-menu' />
  //         </ToolbarButton>
  //       </div>
  //     </Toolbar>
  //   );
  // }

  // hide = () => {
  //   this.setState({isOpen: false});
  // }
  //
  // show = () => {
  //   this.setState({isOpen: true});
  // }

  render(){
    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default AppMobile;
