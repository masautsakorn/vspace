import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
// import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {GridList, GridTile} from 'material-ui/GridList';
// import NavCompoment from '../nav/NavCompoment';
// import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
// import Toggle from 'material-ui/Toggle';
// import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
// import TextField from 'material-ui/TextField';
// import DatePicker from 'material-ui/DatePicker';
// import {List, ListItem} from 'material-ui/List';
// import Divider from 'material-ui/Divider';
// import Subheader from 'material-ui/Subheader';
import {lightBlack} from 'material-ui/styles/colors';
import Paper from 'material-ui/Paper';
// import {connect} from "react-redux";
import {PresentDataHead,PresentDataBody,PresentDataForm,PresentDataS,PresentDataSF} from '../management/PresentData';

// import {
//   Step,
//   Stepper,
//   StepLabel,
//   StepContent,
// } from 'material-ui/Stepper';
// import RaisedButton from 'material-ui/RaisedButton';
// import FlatButton from 'material-ui/FlatButton';

// import {PROJECT_SELECT_TYPE,HAVE_NOT_CONTRACT,HAVE_CONTRACT,SELECT_PROJECT_FOR_COMPANY} from '../actions/project/ProjectAction';

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
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      type:"None Contract",
    	name:"",
    	customer:"",
      site:"",
      start:null,
      end:null,
      mandays:0,
      project_for_company:'',
      contract_no:'',
      sale:{},
      saleSelected:'',
      haveNotContract:false,
      optionProjectForCompany:[]
    }
  }
  selectProjectForCompany = (value) => {
    this.setState({project_for_company:value});
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
  render(){
    console.log(this.props);
    var {type,haveNotContract,optionProjectForCompany,project_for_company} = this.state;
    var contractForm;
    if((type==="Post Sale" || type==="Pre Sale") && !haveNotContract){
      contractForm = <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Contract No."} value={
        <div>
          <div><input placeholder="Contract Number" className="input" style={{width:inputWidth}} /></div>
          <div style={{margin:"10px 0px"}}><span className="btn two" onTouchTap={()=>this.HAVE_NOT_CONTRACT()}>ไม่มี Contract</span></div>
        </div>
      } />
    }else if ((type==="Post Sale" || type==="Pre Sale") && haveNotContract){
      contractForm = <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Project for company"} value={
        <div>
          <select className="input" size={optionProjectForCompany.length} value={project_for_company} onChange={(e)=>this.selectProjectForCompany(e.target.value)}>
            {
              optionProjectForCompany.map((item,i)=>{
                  return <option value={item.COMPANY_ID} key={i}>{item.COMPANY_NAME}</option>
              })
            }
          </select>
          <div style={{margin:"10px 0px"}}><span className="btn two" onTouchTap={()=>this.HAVE_CONTRACT()}>มี Contract</span></div>
        </div>
      } />
    }
    return(
        <div style={{marginBottom:30}}>
          <Paper zDepth={2}>
            <div style={{padding:20, backgroundColor:'rgb(236, 240, 241)'}}>
              <div className="row">
                  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
                      <h2>Create New Project</h2>
                  </div>
              </div>
              <div className="row">
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">

                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Type"} value={
                          <select onChange={(e)=>this.projectSelectType(e.target.value)} value={type} className="input" size="3" style={{width:inputWidth}}>
                            <option>None Contract</option>
                            <option>Pre Sale</option>
                            <option>Post Sale</option>
                          </select>
                        } />
                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                        {
                            contractForm
                        }
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Project Name"} value={
                          <input placeholder="Project Name" className="input" style={{width:inputWidth}} />
                        } />
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Customer Name"} value={
                          <input placeholder="Customer Company Name" className="input" style={{width:inputWidth}} />
                        } />
                        <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Customer Site"} value={
                          <input placeholder="Customer Site address" className="input" style={{width:inputWidth}} />
                        } />
                  </div>
                  <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                    --
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
