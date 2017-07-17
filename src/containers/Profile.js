import React, { Component } from 'react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NavCompoment from '../nav/NavCompoment';
import TextField from 'material-ui/TextField';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import ReactUploadFile from 'react-upload-file';
// import get from '../config/Get.js';
// import Url from '../config/url';
// import InfoGen from '../config/InfoGen';
// import List from 'material-ui/List/List';
// import ListItem from 'material-ui/List/ListItem';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';

import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import SignatureCanvas from 'react-signature-canvas';
import Divider from 'material-ui/Divider';

import Setting from './setting/Setting';

import {Tabs, Tab} from 'material-ui/Tabs';

class Profile extends Component {

  constructor(props){
    super(props);
    this.state = {info:this.props.info,
      is_update:false,openSnackbar:false,file:'',imagePreviewUrl:'',file_picture_profile:'',trimmedDataURL:'',signing:false,
      value:'a'
    };
  }
  handleChangeFullname = (e) => {
    var tmp = this.state.info;
    tmp.name = e.target.value;
    this.setState({info:tmp,is_update:true});
  }
  handleChangeMobile = (e) => {
    var tmp = this.state.info;
    tmp.mobile = e.target.value;
    this.setState({info:tmp, is_update:true});
  }
  handleChangeCompany = (e) => {
    var tmp = this.state.info;
    tmp.company = e.target.value;
    this.setState({info:tmp, is_update:true});
  }
  updateProfile = () => {
    var formData = new FormData();
    formData.append("email", InfoGen.email);
    formData.append("token", InfoGen.token);
    formData.append("file", this.state.file);
    formData.append('name', this.state.info.name);
    formData.append('mobile', this.state.info.mobile);
    formData.append('company', this.state.info.company);
    formData.append('company_logo', this.state.info.company_logo);
    formData.append('picture_profile', this.state.info.pic_full);
    formData.append('file_picture_profile', this.state.file_picture_profile);
    var that = this;
    if(this.state.is_update){
      Put(Url.updateProfile, formData).then(function(res){
          console.log(res);
          // location.reload();
          that.callInfo();
      });
    }
  }
  callInfo = () => {
    var formData = new FormData();
    formData.append('token',InfoGen.token);
    formData.append('email',InfoGen.email);
    var that = this;
    get(Url.info, formData).then(function(resInfo){
      console.log(resInfo);
      if(resInfo.data.user_sid){
        that.setState({is_update:false,openSnackbar:true, info:resInfo.data,signing:false});
      }else{
        localStorage.removeItem("case_token");
        localStorage.removeItem("case_email");
        window.location="";
      }
    });
  }
  uploadLogoCompany = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
        is_update:true
      });
      this.updateProfile();
    }

    reader.readAsDataURL(file)
  }
  changePicture_profile = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    console.log(file);
    reader.onloadend = () => {
      this.setState({
        file_picture_profile: file,
        imagePreviewUrl: reader.result,
        is_update:true
      });
      this.updateProfile();
    }
    reader.readAsDataURL(file)
  }
  sigPad = {}
  clear = () => {
    this.sigPad.clear()
  }
  trim = () => {
    try{
      var that = this;
      if(this.sigPad.getTrimmedCanvas){
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas().toDataURL('image/png')});

        var formData = new FormData();
        formData.append("email", InfoGen.email);
        formData.append("token", InfoGen.token);
        formData.append("base64", this.sigPad.getTrimmedCanvas().toDataURL('image/png'));
        Put(Url.savesignature_member, formData).then(function(res){
            console.log(res);
            // location.reload();
            that.callInfo();
        });
      }
    }catch(e){
      console.log(e);
    }
  }
  handleChangePage = () => {
    this.props.onChangePage();
  }
  handleChange = (value) => {
    this.setState({
      value: value,
    });
  };
  renderTextField = () => {
    var eleCompanyLogo;
    if(this.state.info.company_logo){
      eleCompanyLogo = <div><br/><img src={this.state.info.company_logo} style={{width:'160px'}} /></div>;
    }
    return <div>
          <div>
            <TextField fullWidth={true}
              floatingLabelText="Email" disabled={true} value={this.state.info.email}
              floatingLabelFixed={true}
             />
         </div>
          <div>
            <TextField fullWidth={true} floatingLabelText="Fullname" onChange={this.handleChangeFullname} value={this.state.info.name}
            floatingLabelFixed={true}
           />
         </div>
         <div>
           <TextField fullWidth={true}
            floatingLabelText="Mobile" onChange={this.handleChangeMobile} value={this.state.info.mobile}
            floatingLabelFixed={true}
           />
        </div>
         <div>
             <TextField fullWidth={true}
              floatingLabelText="Company" onChange={this.handleChangeCompany} value={this.state.info.company}
              floatingLabelFixed={true}
             />
         </div>
         <div>
            <br/>
            <div><small style={{color:grey400}}>Logo Company</small></div>
            {eleCompanyLogo}
            <div style={{position:'relative'}}>
              <RaisedButton label="New Logo" style={{marginRight:'35px'}} />
              <TextField style={{position:'absolute',top:0,opacity:0,zIndex:100,left:0}} onChange={this.uploadLogoCompany} type="file" hintText="" name="logo_company" />
            </div>
            <br/>
         </div>
         <div>
          <br/>
          <RaisedButton label="Update Profile" onTouchTap={this.updateProfile} primary={this.state.is_update} />
         </div>
         <Snackbar
          open={this.state.openSnackbar}
          message="Updated Profile"
          autoHideDuration={4000}
          onRequestClose={()=>{this.setState({openSnackbar:false})}}
        />
        <br/><br/>
      </div>;
  }
  renderProfile = () => {
    var style = {
        container: {
        // position: 'absolute',
        padding:'20px 0px',
        margin:'auto',
        left: 0,
        right: 0,
        top: '70px',
        bottom: 0,
        // backgroundColor:'#EDEFF0'
      },
      wrapper: {
        // position: 'absolute',
        // left: 0,
        // right: 0,
        // top: 0,
        // bottom: 0,
        width:'100%',
        // maxWidth: '70%',
        margin : 'auto',
        // textAlign:'center'
        // overflow:'auto'
      },
      profile:{
        width:'120px',
        height:'initial',
        cursor: 'pointer',
        // marginRight:'20%',
        marginTop :'10%'
      },
      profile_web:{
        width:'220px',
        height:'initial',
        cursor: 'pointer',
        // marginRight:'20%',
        marginTop :'5%'
      }

    }

    var eleSignature;
    if(this.state.info.path_signature && !this.state.signing){
      var imgSignature;
      if(this.state.info.path_signature_original){
        imgSignature = <img src={this.state.info.path_signature} style={{width:'160px'}} />;
      }

      eleSignature =
      <div>
        <br/>{imgSignature}
        <div style={{position:'relative'}}>
          <div><RaisedButton onTouchTap={()=>this.setState({signing:true})} label="New Signature" style={{marginRight:'35px'}} /></div>
        </div>
      </div>;
    }else{
      eleSignature = <div>
        <div style={{overflow:'hidden'}}><SignatureCanvas ref={(ref) => { this.sigPad = ref }} penColor='black' clearButton="true" style={{border:'1px solid #eaeaea'}} canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} /></div>
        <div>
          <RaisedButton onTouchTap={this.trim} label="Update New Signature" style={{margin:4}} primary={true}  />
          <RaisedButton onTouchTap={this.clear} secondary={true} label="Clear" style={{margin:4}}  />
          <RaisedButton onTouchTap={()=>this.setState({signing:false})} style={{margin:4}} label="Cancel"  />
        </div>
      </div>
    }

    return(
      <div>
                <div id="vspace-container" style={style.container}>
                    <div className="vspace-wrapper" style={style.wrapper}>
                      <Card style={{border:'none',boxShadow:'none'}}>
                        <div className="row" style={{margin:0}}>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                              <div style={{textAlign:'center'}}><Avatar src={this.state.info.pic_full} style={style.profile_web}/></div>
                              <div style={{textAlign:'center'}}>
                                <RaisedButton label="New picture" style={{marginRight:'35px'}} />
                                <TextField style={{zIndex:100,opacity:0, width:'200px',position:'absolute',top:0,right:0}} onChange={this.changePicture_profile} type="file" hintText="" name="picture_profile" />
                              </div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                              <div style={{textAlign:'center'}}>{this.renderTextField()}</div>
                            </div>
                            <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                              <div style={{textAlign:'center'}}>
                                 <br/>
                                 <div><small style={{color:grey400}}>Signature</small></div>
                                 {eleSignature}
                                 <br/>
                              </div>
                           </div>
                           <div style={{clear:'both'}}></div>
                        </div>
                      </Card>
                    </div>
                </div>

                <Divider />

      </div>
    )
  }
  renderSetting = () => {
    if(InfoGen.email=="autsakorn.t@firstlogic.co.th"){
      return <Setting value={this.state.value} />
    }else{
      return <div>Maintenance</div>
    }
  }
  render(){
    const styles = {
      headline: {
        fontSize: 24,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 400,
      },
    };
    return(
      <Tabs style={{margin:'-20px'}} tabItemContainerStyle={{background:'#ffffff'}} tabTemplateStyle={{background:'#fafafa'}}
        value={this.state.value}
        onChange={this.handleChange}
      >
        <Tab label="ทั่วไป" value="a" style={{color:'#666666'}}>
          <div>
            {this.renderProfile()}
          </div>
        </Tab>
        <Tab label="ตั้งค่า" value="b" style={{color:'#666666'}}>
          <div>
            {this.renderSetting()}
          </div>
        </Tab>
      </Tabs>
    )
  }
}

export default Profile;
