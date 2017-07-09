import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
// import get from '../../config/Get';
import Put from '../../config/Put';
import jPost from '../../config/jPost';
import InfoGen from '../../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {GridList, GridTile} from 'material-ui/GridList';
// import NavCompoment from '../nav/NavCompoment';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import Toggle from 'material-ui/Toggle';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
// import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
import {lightBlack,darkBlack} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
// import {connect} from "react-redux";
import {PresentDataHead,PresentDataBody,PresentDataForm,PresentDataS,PresentDataSF} from '../management/PresentData';
import {List, ListItem} from 'material-ui/List';
// import {
//   Step,
//   Stepper,
//   StepLabel,
//   StepContent,
// } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';
// import {PROJECT_SELECT_TYPE,HAVE_NOT_CONTRACT,HAVE_CONTRACT,SELECT_PROJECT_FOR_COMPANY} from '../actions/project/ProjectAction';
import {FindContract} from '../../actions/ActionProject';
var styles = {
  radioButton: {
    marginBottom: 16,
  }
}
const inputWidth = "100%";
class ProjectCreate extends Component {
  constructor(props){
    super(props);
    console.log(this.props.info);
    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(720, 0, 0, 0);

    this.state = {
      type:"None Contract",
    	name:"",
    	customer:"",
      site:"",
      start:minDate,
      end:maxDate,
      mandays:0,
      project_for_company:'',
      contract_no:'',
      project_name:'',
      enduser_name:'',
      enduser_address:'',
      sale:{},
      saleSelected:'',
      haveNotContract:false,
      optionProjectForCompany:this.props.info.can_create_dummy_company,
      contract_no_filter:'',
      contract_no_list:[],
      saleList:[]
    }
  }
  selectProjectForCompany = (value) => {
    this.setState({project_for_company:value});
    this.checkSale(value);
  }
  checkSale = (company) => {
    var that = this;
    var dataTmp = {company:company};
    jPost(Url.checkSale, dataTmp).then((res)=>{
      console.log(res);
      that.setState({saleList:res.data});
    });
  }
  HAVE_NOT_CONTRACT = () => {
    this.setState({haveNotContract:true});
  }
  HAVE_CONTRACT = () => {
    this.setState({haveNotContract:false});
  }
  projectSelectType = (value) => {
    this.setState({type:value});
  }
  handleChangeMinDate = (event, date) => {
    this.setState({
      start: date,
    });
  };

  handleChangeMaxDate = (event, date) => {
    if(date<this.state.start){
      alert('Invalid Date');
    }else{
      this.setState({
        end: date,
      });
    }
    console.log(this.state);
  };
  handleFindContract = () => {
    var that = this;
    // var formData = new FormData();
    // formData.append('email', InfoGen.email);
    // formData.append('token', InfoGen.token);
    // formData.append('contract', this.state.contract_no_filter);
    FindContract(this.state.contract_no_filter).then((res)=>{
        if(!res.error){
          that.setState({contract_no_list:res.data});
        }
    });
  }
  handleSelectProject = (contract_no,project_name,enduser_name,enduser_address) => {
    this.setState({contract_no:contract_no,project_name:project_name,enduser_name:enduser_name,enduser_address:enduser_address,contract_no_filter:'',contract_no_list:[]});
  }
  selectSale = (value) => {
    // console.log(value);
    this.setState({saleSelected:value});
  }

  confirmCreateProject = () => {
    if(this.state.project_name==""){
      alert('Required Project name');
      return 0;
    }
    if(this.state.enduser_name==""){
      alert('Required End user name');
      return 0;
    }
    if(this.state.enduser_address==""){
      alert('Required End user address');
      return 0;
    }
    if(this.state.haveNotContract && this.state.saleSelected==''){
      alert('Required sale');
      return 0;
    }
    var that = this;
    var dataTmp = {
      type:this.state.type,
      start:(this.state.start.getFullYear()+"-"+(this.state.start.getMonth()+1)+"-"+this.state.start.getDate()),
      end: (this.state.end.getFullYear()+"-"+(this.state.end.getMonth()+1)+"-"+this.state.end.getDate()),
      project_status: this.state.type,
      contract_no: ((this.state.type=='None Contract')?'None Contract':this.state.contract_no),
      contract_info: {
        project_name: this.state.project_name,
        end_user_name: (this.state.enduser_name)?this.state.enduser_name:'',
        end_user_address: (this.state.enduser_address)?this.state.enduser_address:'',
      },
      engineer:[
        {man_day:0,email:InfoGen.email}
      ],
      man_day: '0',
      man_hour: '0',
      projectForCompany: this.state.project_for_company,
      sale:this.state.saleSelected
    }
    console.log(dataTmp);
    // jPost(Url.projectCreate, dataTmp).then((res)=>{
    //   console.log(res);
    //   that.props.onCloseProjectCreate();
    // })
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token',InfoGen.token);
    formData.append('data',JSON.stringify(dataTmp));
    Put(Url.projectCreate, formData).then(function(res){
        that.props.onCloseProjectCreate();
    });
  }

  renderProjectPharse = () => {
      var {type} = this.state;

      if(this.props.info.project_create_able=="2"){
        return <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
            <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Type"} value={
              <RadioButtonGroup name="shipSpeed" onChange={(e)=>this.projectSelectType(e.target.value)} defaultSelected={type}>
                <RadioButton
                  value="Pre Sale"
                  label="Pre-Sale"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="Post Sale"
                  label="Post-Sale"
                  style={styles.radioButton}
                />
                <RadioButton
                  value="None Contract"
                  label="None Contract"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            } />
          </div>
      }else if(this.props.info.project_create_able=="1"){
        return <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
            <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Type"} value={
              <RadioButtonGroup name="shipSpeed" onChange={(e)=>this.projectSelectType(e.target.value)} defaultSelected={type}>
                <RadioButton
                  value="None Contract"
                  label="None Contract"
                  style={styles.radioButton}
                />
              </RadioButtonGroup>
            } />
          </div>
      }else{
        return null
      }
  }
  render(){
    var {contract_no,contract_no_filter,type,haveNotContract,optionProjectForCompany,
      project_for_company,project_name,enduser_name,enduser_address,saleList,saleSelected} = this.state;



    // var radioCreateDummyCompany = [];
    // this.props.info.can_create_dummy_company.forEach(function(item,i){
    //     console.log(item);
    //     radioCreateDummyCompany.push(<RadioButton key={i}
    //       value={item.COMPANY_ID}
    //       label={item.COMPANY_NAME}
    //       style={styles.radioButton}
    //     />);
    // });
    //
    // // defaultSelected={this.props.info.can_create_dummy_company[0].COMPANY_ID}
    // var createDummyCompany =
    // <div>
    //   <br/>
    //   <div>Project For Company</div>
    //   <div>
    //     <RadioButtonGroup onChange={this.handleProjectForCompany} name="radio_dummy_for_company"
    //     >
    //       {radioCreateDummyCompany}
    //     </RadioButtonGroup>
    //   </div>
    //   <br/>
    // </div>

    var contract_no_list = this.state.contract_no_list.map((item,k) => (
      <div key={k}>
        <div style={{padding:10,borderBottom:'1px solid #999999'}} onTouchTap={()=>this.handleSelectProject(item.CONTRACT_NO,item.PROJECT_NAME,item.ENDUSER_NAME,item.ENDUSER_ADDRESS)}>
          <div>
            <div>{item.CONTRACT_NO}</div>
            <div><small>{item.PROJECT_NAME}</small></div>
            <div style={{color: darkBlack}}><small>{item.ENDUSER_NAME}</small></div>
            <div><small>{item.ENDUSER_ADDRESS}</small></div>
          </div>
        </div>
      </div>
    ));

    var contractForm;
    var saleListForm;
    if((type==="Post Sale" || type==="Pre Sale") && !haveNotContract){
      contractForm = <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Search Contract"} value={
        <div>
          <div>
            {
              //<input placeholder="Contract Number" className="input" style={{width:inputWidth}} />
            }
            <TextField hintText="Search Contract Number" name="contract_no_filter" id="contract_no_filter"
              value={contract_no_filter} onChange={(e)=>this.setState({contract_no_filter:e.target.value})}
              />
          </div>
          <div><div className="btn four" style={{width:'120px',textAlign:'center'}} onTouchTap={()=>this.handleFindContract()}>ค้นหา Contract</div></div>
          {
            (this.state.contract_no_list.length>0)?
            <div>
              <div style={{marginTop:'10px',maxWidth:'260px', maxHeight:'200px',overflow:'auto', backgroundColor:'#FFFFFF','border': '1px solid #999999'}}>
                {contract_no_list}
              </div>
              <div>เลือก Contract ที่ต้องการจากรายการด้านบน</div>
            </div>:
            null
          }
          <div style={{margin:"10px 0px"}}><div className="btn five" style={{width:'120px',textAlign:'center'}} onTouchTap={()=>this.HAVE_NOT_CONTRACT()}>ไม่มี Contract</div></div>
        </div>
      } />
    }else if ((type==="Post Sale" || type==="Pre Sale") && haveNotContract){
      contractForm = <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Project for company"} value={
        <div>
          <select className="input" size={(optionProjectForCompany.length+1)} value={project_for_company} onChange={(e)=>this.selectProjectForCompany(e.target.value)}>
            <option value=''>เลือก Company</option>
            {
              optionProjectForCompany.map((item,i)=>{
                  return <option value={item.COMPANY_ID} key={i}>{item.COMPANY_NAME}</option>
              })
            }
          </select>
          <div style={{margin:"10px 0px"}}><div className="btn five" style={{textAlign:'center', width:'120px'}} onTouchTap={()=>this.HAVE_CONTRACT()}>มี Contract แล้ว</div></div>
        </div>
      } />

      saleListForm = <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Sale"} value={
        <div>
          <select className="input" size={6} value={saleSelected} onChange={(e)=>this.selectSale(e.target.value)}>
            <option value=''>เลือก Sale</option>
            {
              saleList.map((item,i)=>{
                  return <option value={item.SALESMN} key={i}>{item.SALESMN} {item.SALE_NAME}</option>
              })
            }
          </select>
        </div>
      } />

      contractForm = <div>{contractForm} {saleListForm}</div>
    }


    return(
        <div style={{marginBottom:30}}>
          <Paper zDepth={2}>
            <div style={{padding:20, backgroundColor:'rgb(236, 240, 241)'}}>
              {
                (!InfoGen.isMobile)?
                <div className="row">
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15" style={{textAlign:'center'}}>
                        <h2>Create New Project</h2>
                    </div>
                </div>:null
              }
              <div className="row">
                  {this.renderProjectPharse()}
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                        {
                            contractForm
                        }
                        {
                          ((type!='None Contract' && !haveNotContract)?
                          <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Contract No"} value={
                            <TextField style={{width:'100%'}} hintText="Contract Number" value={contract_no} onChange={(e)=>this.setState({contract_no:e.target.value})}  />
                          } />:null)
                        }
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Project Name"} value={
                          <TextField style={{width:'100%'}} hintText="Project name" value={project_name} onChange={(e)=>this.setState({project_name:e.target.value})} />
                        } />
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Customer Name"} value={
                          <TextField style={{width:'100%'}} hintText={"Customer Company Name"} value={enduser_name} onChange={(e)=>this.setState({enduser_name:e.target.value})} />
                        } />
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Customer Site"} value={
                          <TextField style={{width:'100%'}}  multiLine={true} rows={2} value={enduser_address} onChange={(e)=>this.setState({enduser_address:e.target.value})} hintText="Customer Site address"  />
                        } />
                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15" style={{textAlign:'center'}}>

                      <PresentDataForm label={"Start"} styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} value={
                        <DatePicker style={{width:'100%'}}
                          value={this.state.start}
                          onChange={this.handleChangeMinDate}
                          autoOk={this.state.autoOk} id="start"
                          // floatingLabelText="Start Date"
                          defaultDate={this.state.start}
                          disableYearSelection={this.state.disableYearSelection}
                        />
                      } />
                      <PresentDataForm label={"Expect End"} styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} value={
                        <DatePicker style={{width:'100%'}}
                          value={this.state.end}
                          onChange={this.handleChangeMaxDate}
                          autoOk={this.state.autoOk} id="expect_end"
                          // floatingLabelText="Expect End Date"
                          defaultDate={this.state.end}
                          disableYearSelection={this.state.disableYearSelection}
                        />
                      } />

                      <PresentDataForm label={""} value={
                        <div style={{display:'flex'}}>
                          <div style={{flex:1,width:'120px',textAlign:'center'}} className="btn three" onTouchTap={()=>this.confirmCreateProject()}>Create Project</div>
                          <div style={{flex:1,width:'120px',textAlign:'center'}} className="btn two" onTouchTap={()=>this.props.onCloseProjectCreate()}>Cancel</div>
                        </div>
                      } />
                  </div>
              </div>
            </div>
          </Paper>
        </div>
    )
  }
}
// const mapStatetoProps = (state) => {
//     return {
//       project: state.ProjectReducer,
//     }
// }
// const mapDispatchtoProps = (dispatch) => {
//   console.log(dispatch);
//   return {
//     projectSelectType: (type)=> {
//       console.log(type);
//       dispatch(PROJECT_SELECT_TYPE(type));
//     },
//     HAVE_NOT_CONTRACT:()=>{
//       dispatch(HAVE_NOT_CONTRACT(Url.ws_canCreateProjectForCompany,{token:InfoGen.token, email:InfoGen.email})).then((res)=>{
//         console.log('dispatch HAVE_NOT_CONTRACT',res.data);
//       });
//     },
//     HAVE_CONTRACT: ()=>{
//       dispatch(HAVE_CONTRACT());
//     },
//     selectProjectForCompany: (com)=>{
//       console.log(com);
//       dispatch(SELECT_PROJECT_FOR_COMPANY(com))
//     }
//   }
// }

export default ProjectCreate;
