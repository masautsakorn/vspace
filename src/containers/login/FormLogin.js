import React, { Component } from 'react';
import get from '../../config/Get.js';
import Url from '../../config/url';
import SignupNew from './SignupNew.js';
import ForgotNew from './ForgotNew.js';
import {
  // grey400, darkBlack,
   lightBlack} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import {Card
  // , CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui/Card';
// import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
// import AppBar from 'material-ui/AppBar';

// import Subheader from 'material-ui/Subheader';
// import IconButton from 'material-ui/IconButton';
// import IconMenu from 'material-ui/IconMenu';
import FlatButton from 'material-ui/FlatButton';
// import Toggle from 'material-ui/Toggle';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
// import NavigationClose from 'material-ui/svg-icons/navigation/close';

// import FontIcon from 'material-ui/FontIcon';
// import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
// import MenuItem from 'material-ui/MenuItem';
// import DropDownMenu from 'material-ui/DropDownMenu';
import {Toolbar, ToolbarGroup,
  // ToolbarSeparator,
  ToolbarTitle} from 'material-ui/Toolbar';
// import LogoPng from '../../images/vspace-sky.png';

// import {GridList,
//   // GridTile
// } from 'material-ui/GridList';
// import IconButton from 'material-ui/IconButton';
// import StarBorder from 'material-ui/svg-icons/toggle/star-border';
// import {
//   Route,Redirect
// } from 'react-router';

class FormLogin extends Component{
   constructor(props){
     super(props)
     this.state = {user: "",password: "",page:1};
      this.handleUserChange = this.handleUserChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserChange(event) {
      this.setState({user: event.target.value});
    }
    handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }
    handleSubmit(event) {
      var formData = new FormData();
      if(this.state.user && this.state.password){
        formData.append("email",this.state.user);
        formData.append("password",this.state.password);
        if(typeof window.registrationId !=='undefined'){
          formData.append("registration_id",window.registrationId);
        }
        get(Url.login, formData).then(function(res){
          if(!res.error){
            localStorage.removeItem("project_sid");
            localStorage.setItem("case_email", res.user.email);
            localStorage.setItem("case_token", res.token);
            // location.reload();
            window.location = "";
            // <Redirect to={{pathname: '/home'}} />

          }else{
            alert(res.message);
          }
        });
      }
      event.preventDefault();
    }
    handlePage = (newPage) => {
      // this.props.onChangePage(newPage);
      this.setState({page:newPage});
    }
    goToForgotPassword = () => {
      this.handlePage(2);
    }
    goToSignUp = () => {
      this.handlePage(3);
    }
    goToSignIn = () => {
      this.handlePage(1);
    }
    handleRefrash = () => {
      window.location.reload();
    }
   render(){
     const style = {
      width: '90%',
      margin: '0px auto 20px auto',
      textAlign: 'center',
      clear:'both'
    };
    const styleRaisedButton = {
      width: 200,
      margin: 12,
      textAlign: 'center',
      button: {
        margin: 12,
      },
    }

    var btnSignUpTop;
    var btnSignUpBottom = <br/>;

    if(window.innerWidth<376){
      btnSignUpBottom = <div><small style={{'color':'rgb(0, 188, 212)','cursor':'pointer'}} onTouchTap={this.goToSignUp}>Sign Up</small><br/><br/></div>
    }else{
      btnSignUpTop = <RaisedButton label="Sign Up" onTouchTap={this.goToSignUp} primary={true} />
    }

    // var signUp = <div><IconButton>Sign Up</IconButton></div>;
    var starterForm;
    if(this.state.page===1){
      var formLogin = <Card style={style}>
        <form onSubmit={this.handleSubmit}>
          <div style={{'paddingTop':'20px'}}><span style={{color:lightBlack}}>Welcome to vSpace (SOS Demo) </span></div>
          <div>
            <TextField hintText="Email..." floatingLabelText="Email"  onChange={this.handleUserChange}  />
          </div>
          <div>
            <TextField hintText="Password..."  floatingLabelText="Password"  type="password" onChange={this.handlePasswordChange} />
            <br />
          </div>
          <div>
            <RaisedButton
             style={styleRaisedButton.button} onTouchTap={this.handleSubmit} label="Sign In" primary={true}>
              <input type="submit" style={{display:'none'}} />
            </RaisedButton>
          </div>
          <div>

            <small onTouchTap={this.goToForgotPassword} style={{'marginRight':'10px','color':'rgb(0, 188, 212)','cursor':'pointer'}}>Forgot Password</small>
            <div style={{'clear':'both','marginBottom':'10px'}}></div>
            {btnSignUpBottom}
          </div>
        </form>
      </Card>;

      starterForm = formLogin;
    }else if(this.state.page===3){
      starterForm = <div style={{minHeight:'300px'}}><SignupNew /></div>;
    } else if(this.state.page===2){
      starterForm = <div style={{minHeight:'300px'}}><ForgotNew /></div>;
    }else{
      starterForm = <div></div>;
    }
    const styles = {
      root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        padding:'20px'
      },
      gridList: {
        width: '100%',
        height: 450,
        overflowY: 'auto',
      },
      p1: {
        margin:'auto',
        padding: '10%',
        color:'#FFFFFF',
        textAlign:'center',
        fontSize:'150%'
      }
    };

    /**
     * A simple example of a scrollable `GridList` containing a [Subheader](/#/components/subheader).
     */
    // const GridListExampleSimple = () => (
    //   <div style={styles.root}>
    //     <GridList cols={3}
    //       cellHeight={180}
    //       style={styles.gridList}
    //     >
    //
    //     </GridList>
    //   </div>
    // );

    var logo = <span><img alt="" src="http://vspace.in.th/img/vspace-sky.png" style={{height:42}} /></span>;
     const TextFieldExampleSimple = () => (
      <div>
        <div>
          <Toolbar style={{'backgroundColor':'none','height':'100px'}}>
            <ToolbarGroup style={{'width':'33%'}}>
              <ToolbarTitle style={{'cursor':'pointer','marginTop':'22px'}} onTouchTap={this.handleRefrash} text={logo}>
              </ToolbarTitle>
            </ToolbarGroup>
            <ToolbarGroup>
              <FlatButton label="Sign In" onTouchTap={this.goToSignIn} primary={true} />
              {btnSignUpTop}
            </ToolbarGroup>
          </Toolbar>
        </div>
        <div>{starterForm}</div>
        <div style={{backgroundColor:'rgb(0, 188, 212)','height':'300px'}}>
            <div>
              <div style={styles.p1}>จัดการโครงการของคุณได้อย่างง่ายดาย ด้วย vSpace
              <br/><br/>
              <FlatButton onTouchTap={this.goToSignUp} backgroundColor="#a4c639" style={{color:'#ffffff'}} label="Sign Up - It's Free"  /></div>
            </div>
        </div>
      </div>);
     return(

         <div className="login" >
           <div className="login-screen">
            {TextFieldExampleSimple()}
           </div>
         </div>

     )
   }
 }
 // <div>
 //   <Toolbar style={{'height':'300px','backgroundColor':'none'}}>
 //       <ToolbarGroup></ToolbarGroup>
 //       <ToolbarGroup>
 //       </ToolbarGroup>
 //   </Toolbar>
 // </div>
 // <div>
 //     <Toolbar style={{'height':'300px','backgroundColor':'none'}}>
 //       <ToolbarGroup></ToolbarGroup>
 //     </Toolbar>
 // </div>
 export default FormLogin;
