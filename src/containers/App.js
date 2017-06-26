import React  from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from '../components/Header';
import LeftDrawer from '../components/LeftDrawer';
import withWidth, {LARGE, SMALL} from 'material-ui/utils/withWidth';
import ThemeDefault from '../theme-default';
import Data from '../data';

import Url from '../config/url';
import get from '../config/Get';
import InfoGen from '../config/InfoGen';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      menus:[],
      info:{}
    };
  }
  componentWillMount(){
    var that = this;
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    // var basename = (document.location.href);
    get(Url.info, formData).then(function(resInfo){
        console.log(Data.menus);
        if(resInfo.data.user_sid){
          console.log(resInfo.data.menus);
          // Data.menu = resInfo.data.menus;
          that.setState({menus:resInfo.data.menusV4,info:resInfo.data});
        }else{
          localStorage.removeItem("case_token");
          localStorage.removeItem("case_email");
          window.location.reload("/");
        }
    });
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.width !== nextProps.width) {
      this.setState({navDrawerOpen: nextProps.width === LARGE});
    }
  }

  handleChangeRequestNavDrawer() {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen
    });
  }

  render() {
    let { navDrawerOpen } = this.state;
    const paddingLeftDrawerOpen = 236;

    const styles = {
      header: {
        paddingLeft: navDrawerOpen ? paddingLeftDrawerOpen : 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft: navDrawerOpen && this.props.width !== SMALL ? paddingLeftDrawerOpen : 0
      }
    };

    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header styles={styles.header}
                  handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer.bind(this)}/>

            <LeftDrawer navDrawerOpen={navDrawerOpen} navDrawerClose={()=>this.setState({navDrawerOpen:false})}
                        menus={this.state.menus} info={this.state.info}
                        username={this.state.info.name}/>

            <div style={styles.container}>
              {this.props.children}
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}
//
// App.propTypes = {
//   children: PropTypes.element,
//   width: PropTypes.number
// };

export default withWidth()(App);
