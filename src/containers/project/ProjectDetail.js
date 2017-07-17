import React, { Component } from 'react';
import InfoGen from '../../config/InfoGen';
import jPost from '../../config/jPost';

import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import NavigationExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import TicketDetail from '../ticket/TicketDetail3';
import ProjectFormTicket from '../project/ProjectFormTicket';
import url from '../../config/url';

import ProjectOwner from '../project/ProjectOwner';
import ProjectClose from '../project/ProjectClose';

import {LoadProjectDetail,FindContract,ChangeContract} from '../../actions/ActionProject';

import {Page,Navigator,BackButton,Toolbar,Tab, Tabbar,Fab} from 'react-onsenui';
import {ToolbarButton,Icon,Splitter,SplitterSide,List,ListItem,SplitterContent,ListHeader} from 'react-onsenui';
// import {connect} from "react-redux";

import {LoadCaseDetail} from '../../actions/ActionManagement';
import {PresentData} from '../management/PresentData';
import TicketOwner from '../ticket/TicketOwner';
import ServiceReportDialog from '../projectplan/ServiceReportDialog2';
import TicketContactUser from '../ticket/TicketContactUser';
import TicketStatus from '../ticket/TicketStatus';

import RenderCase from '../MobileManagement/RenderCase';

class ProjectDetail extends Component {
  constructor(props){
    super(props);
    this.state = {
      project_sid:this.props.project_sid,
      data:{},
      editingContract:false,
      newContract:"",
      openTicket:[],
      editPlan:(InfoGen.email!="detomas_25@hotmail.com")?false:true,
      editOwner:false,
      closeProject:false,
      listContractFound:[],
      searchedContract:false,
      contract_no:'',
      project_name:'',
      enduser_name:'',
      enduser_address:''
    };
  }
  componentWillMount(){
    this.loadProjectDetail();
  }
  loadProjectDetail = () => {
    var that = this;
    LoadProjectDetail(this.props.project_sid).then((res)=>{
      that.setState({
        data:res.data,
        _editPlan:false,editOwner:false,listContractFound:[],searchedContract:false,
        closeProject:false,
        contract_no:'',
        project_name:'',
        enduser_name:'',
        enduser_address:''
      });
    })
  }
  editingContract = (project_sid) => {
    this.setState({
      editingContract:!this.state.editingContract,
      editPlan:false,editOwner:false,listContractFound:[],
      searchedContract:false,closeProject:false,
      contract_no:'',
      project_name:'',
      enduser_name:'',
      enduser_address:''
    });
  }
  cancelAddContract = () => {
    this.editingContract();
  }
  editPlan = () => {
    this.setState({editPlan:!this.state.editPlan,editingContract:false,editOwner:false,closeProject:false})
  }
  changeNewContract = (value) => {
    this.setState({newContract:value});
  }
  findContract = () => {
    var that = this;
    this.setState({searchedContract:false});
    FindContract(this.state.newContract).then((res)=>{
      that.setState({listContractFound:res.data,searchedContract:true});
    });
  }
  addNewContract = () => {
    var that = this;
    if(this.state.newContract.trim()){
      var {contract_no, project_name, enduser_name,enduser_address} = this.state;
      ChangeContract(this.props.project_sid,contract_no, project_name, enduser_name,enduser_address).then((res)=>{
        console.log(res);
        that.editingContract(this.props.project_sid);
        that.loadProjectDetail();
      })
    }else{
      alert('Please Input Data');
    }
  }
  editOwner = () => {
    this.setState({editOwner:!this.state.editOwner,editPlan:false,editingContract:false,closeProject:false})
  }
  closeProject = () => {
    this.setState({closeProject:true,editPlan:false,editingContract:false,editOwner:false});
  }
  closeTicket = (ticket_sid) => {
      console.log(ticket_sid);
      var tmp = this.state.openTicket;
      var t = tmp.reduce((newOpen,item)=>{
        if(item!==ticket_sid)
          newOpen.push(item);
        return newOpen;
      },[]);
      this.setState({openTicket:t});
  }
  openTicket = (ticket_sid) => {
    var tmp = this.state.openTicket;
    tmp = [ticket_sid];
    this.setState({openTicket:tmp});
  }
  selectedContract = (contract_no, project_name,enduser_name, enduser_address) => {
    console.log(contract_no, project_name,enduser_name, enduser_address);
    this.setState({
      listContractFound:[],searchedContract:false,
      contract_no,
      project_name,
      enduser_name,
      enduser_address,
    })
    console.log(this.state);
  }
  renderContractList = () => {
    var {listContractFound} = this.state;

    return listContractFound.map((item,i)=>{
      return <div style={{padding:10,borderBottom:'1px solid #999999',cursor:'pointer'}} key={i}
      onTouchTap={()=>this.selectedContract(item.CONTRACT_NO,item.PROJECT_NAME,item.ENDUSER_NAME,item.ENDUSER_ADDRESS)}>
        <div>{item.CONTRACT_NO}</div>
        <div><small>{item.PROJECT_NAME}</small></div>
        <div><small>{item.ENDUSER_NAME}</small></div>
        <div><small>{item.ENDUSER_ADDRESS}</small></div>
      </div>
    })
  }
  renderTools = () => {
    var {listContractFound,searchedContract} = this.state;
    var openTicket = this.state.openTicket;
    var data = this.state.data;
    return <div>
        <div className="project-header">
            <div style={styles.label}>Tools</div>
            <div style={styles.value}>
                <div style={{display:'flex'}}>
                  <div style={{flex:1,marginLeft:0,marginRight:0}} className="row">
                    {
                    // <span className="btn" style={{marginLeft:'5px'}}>Edit Period</span> |
                    }
                    {(InfoGen.email!="detomas_25@hotmail.com")?<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md btn three" style={{marginLeft:'5px'}} onTouchTap={()=>this.editPlan()}>{((data.case_of_project.length>0)?"Edit Plan":"Create Plan")}</div>:null}
                    {(InfoGen.email!="detomas_25@hotmail.com")?<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md btn " style={{marginLeft:'5px'}} onTouchTap={()=>this.editingContract(data.sid)}>Edit Contract No.</div>:null}
                    {(InfoGen.email!="detomas_25@hotmail.com")?<div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md btn" style={{marginLeft:'5px'}} onTouchTap={()=>this.editOwner()}>Edit Project Owner</div>:null}
                    <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md btn" style={{marginLeft:'5px'}} onTouchTap={()=>this.closeProject()}>Close Project</div>
                  </div>
                </div>
            </div>
        </div>

        {// ZONE CONTRACT EDIT
        }
        {(this.state.editingContract)?
          <div className="project-header">
              <div style={styles.label}>Edit Contract No.</div>
              <div style={styles.value}>
                <div>
                    <div style={{}}>

                      {
                        (this.state.contract_no)?
                        <div>
                            <div style={{marginTop:18}}>
                              <div>
                                <div>ยืนยันเปลี่ยน Contract No. ตามด้านล่าง คลิก ''Change'' เพื่อเปลี่ยน Contract No.</div>
                              </div>
                              <div style={{marginTop:10}}>
                                <div>Contract No. {this.state.contract_no}</div>
                                <div>Project Name {this.state.project_name}</div>
                                <div>Enduser {this.state.enduser_name}</div>
                                <div>Enduser address {this.state.enduser_address}</div>
                              </div>
                              <div style={{marginTop:10}}>
                                <span onTouchTap={this.addNewContract} className="btn three" >Change</span>
                                <span onTouchTap={this.cancelAddContract} className="btn two">Cancel</span>
                              </div>
                            </div>
                        </div>:
                        <div>
                            <div style={{}}>
                              <TextField onChange={(e)=>this.changeNewContract(e.target.value)}
                                hintStyle={{color:'#fcfcfc', fontSize:14}}
                                inputStyle={{color:'#ffffff'}} style={{color:'#ffffff',width:'100%'}} hintText="Input New Contract" />
                              <span className="btn four" onTouchTap={()=>this.findContract()}>ค้นหา Contract</span>
                            </div>
                            <div>
                              {
                                (
                                  (searchedContract)?
                                  (
                                    (listContractFound.length==0)?
                                      <div>ไม่พบข้อมูล</div>:
                                      <div>
                                        <div>คลิกเลือก Contract No.</div>
                                        <div style={{background:'#fcfcfc',color:'#222222', maxHeight:'260px', overflow:'auto'}}>
                                        {this.renderContractList()}
                                        </div>
                                      </div>
                                  )
                                  :<div style={{padding:5}}>กรอก Contract แล้วกดปุ่ม ''ค้นหา Contract'' เพื่อหา Contract No.</div>
                                )
                              }
                            </div>
                        </div>
                      }

                    </div>
                </div>
              </div>
          </div>:''
        }
        {
          //END ZONE EDIT CONTRACT
        }
        {
          ((this.state.editOwner)?
          <ProjectOwner loadNew={this.loadProjectDetail} project_sid={this.props.project_sid} />:
          null)
        }

        {
          ((this.state.closeProject)?
            <ProjectClose loadNew={this.loadProjectDetail} project_sid={this.props.project_sid} />:
            null)
        }
      </div>
  }
  render(){
    var {listContractFound,searchedContract} = this.state;
    var openTicket = this.state.openTicket;
    // console.log(data);
    var data = this.state.data;
    console.log(data);
    var content;
    if(data.sid){
      content =
      <div>
        <div>
            <div className="row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerLeft}>
                <div style={styles.label}>Contract No</div>
                <div style={styles.value}>
                  {data.contract}
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerRight}>
                <div style={styles.label}>Project Name</div><div style={styles.value}>{data.name}</div>
              </div>
            </div>

            <div className=" row">
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerLeft}>
                <div style={styles.label}>Period</div>
                <div style={styles.value}>
                  Start {data.project_start} - End {data.project_end}
                </div>
              </div>
              <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerRight}>
                <div style={styles.label}>Project Owner</div><div style={styles.value}>{data.owner.map((item)=>{return (item.owner_name+" ")})}</div>
              </div>
            </div>
            <div className=" row">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerLeft}>
                    <div style={styles.label}>End user /<br/>Address</div>
                    <div style={styles.value}>{data.end_user} /<br/>{data.end_user_address}</div>
                </div>
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md" style={styles.headerRight}>
                  <div style={styles.label}>Progress</div>
                  <div style={styles.value}>
                      {data.progress}%
                  </div>
                </div>
            </div>
            {
              (data.data_status!="400")?
                this.renderTools():
                null
            }
        </div>
        <div>
            <div style={{marginTop:10}}>
                {
                  InfoGen.isMobile?
                  this.renderListCaseMobile():
                  this.renderListCase()
                }
            </div>
        </div>

      </div>;
    }else{
      content = <div>Loading...</div>;
    }
    return(
      <div>
        {content}
      </div>
    )
  }
  renderListCaseMobile = () => {
    var openTicket = this.state.openTicket;
    var {data} = this.state;
    var {navigator} = this.props;

    return <div style={{}}>
      <div className="btn" style={{marginRight:0,backgroundColor:'rgb(27, 144, 161)',color:'#ffffff',borderBottom: 1,borderRadius: 0}}>Cases</div>
      <RenderCase data={data.case_of_project} navigator={navigator}  />
      {
        // data.case_of_project.map((item,i)=>{
        //   return <div
        //   onTouchTap={()=>{navigator.pushPage({component:PageThree,key:'PageThree',sid:item.sid,title:item.subject}) }}
        //   key={item.sid} className="btn" style={{textAlign:'left',backgroundColor:'#ffffff', marginRight:0}}>
        //     <div>{item.subject}</div>
        //     <div><small>{item.status_label}</small></div>
        //
        //     {
        //       ((openTicket.indexOf(item.sid)>-1)
        //         ?
        //           <div>
        //           <TicketDetail
        //             info={InfoGen.info}
        //             listUserCanAddProject={InfoGen.listUserCanAddTask}
        //             listUserCanAddTask={InfoGen.listUserCanAddTask}
        //             projectContact={[]}
        //             closeWindow={()=>{ this.setState({openTicketDrawer:false}) }}
        //             ticket_sid={item.sid}
        //             data={{data:{}}}
        //             />
        //           </div>
        //         :<div />
        //       )
        //     }
        //   </div>
        // })
      }
      {
        // (data.create_by===InfoGen.email || data.owner.reduce((r, item)=>{return (item.owner_email===InfoGen.email)?true:false;},false))
        (this.state.editPlan)
        ?
          <ProjectFormTicket loadNew={this.loadProjectDetail} contract_no={data.contract} project_sid={this.props.project_sid} />:
          null
      }

    </div>
  }
  renderListCase = () => {
    var openTicket = this.state.openTicket;
    var {data} = this.state;
    return <div>
        <div style={styles.body}>
            <div style={styles.bodyWidth50}>
              <div style={styles.taskHeader}>#</div>
            </div>
            <div style={styles.bodyWidth100}>
              <div style={styles.taskHeader}>No.</div>
            </div>
            <div style={styles.bodyTwo}>
              <div style={styles.taskHeader}>Cases</div>
            </div>
            <div style={styles.bodyWidth100Right}>
              <div style={styles.taskHeader} title="Estimate Hour">Estimate Hour</div>
            </div>

            <div style={styles.bodyWidth100Right}>
              <div style={styles.taskHeader} title="">Taxi (Baht)</div>
            </div>
            <div style={styles.bodyOne}>
              <div style={styles.taskHeader}>Owner</div>
            </div>
            <div style={styles.bodyWidth100}>
              <div style={styles.taskHeader} title="Status">Status</div>
            </div>
        </div>
        {
            data.case_of_project.map((item,i)=>{
              return(
                <div key={item.sid}>
                  <div style={styles.body} >
                      <div style={styles.bodyWidth50}>
                        <div style={styles.taskSubject}>
                          {
                            ((openTicket.indexOf((item.sid))>-1)?
                              <NavigationExpandMore onTouchTap={()=>{this.closeTicket(item.sid)}} style={{cursor:'pointer'}}/>:
                              <NavigationChevronRight onTouchTap={()=>{this.openTicket(item.sid)}} style={{cursor:'pointer'}}/>
                            )
                          }
                        </div>
                      </div>
                      <div style={styles.bodyWidth100}>
                        <div style={styles.taskSubject}>{item.no_ticket}</div>
                      </div>
                      <div style={styles.bodyTwo}>
                        <div style={styles.taskSubject}>{item.subject}</div>
                      </div>
                      <div style={styles.bodyWidth100Right}>
                        <div style={styles.taskSubject}>{item.man_days}</div>
                      </div>

                      <div style={styles.bodyWidth100Right}>
                        <div style={styles.taskSubject}>{item.taxi_fare_total}</div>
                      </div>
                      <div style={styles.bodyOne}>
                        <div style={styles.taskSubject}>{item.owner_thainame}</div>
                      </div>
                      <div style={styles.bodyWidth100}>
                          {
                            (item.status_label==='Process')?
                            <div style={styles.taskSubjectAlert}>{item.status_label}</div>:
                            <div style={styles.taskSubjectResolve}>{item.status_label}</div>
                          }
                      </div>
                  </div>
                  {
                    ((openTicket.indexOf(item.sid)>-1)
                      ?
                        <div>
                        <TicketDetail
                          info={this.props.info}
                          listUserCanAddProject={this.props.listUserCanAddTask}
                          listUserCanAddTask={this.props.listUserCanAddTask}
                          projectContact={[]}
                          closeWindow={()=>{ this.setState({openTicketDrawer:false}) }}
                          ticket_sid={item.sid}
                          data={{data:{}}}
                          />
                        </div>
                      :<div />
                    )
                  }
                </div>
              )
            })
        }
        {
          // (data.create_by===InfoGen.email || data.owner.reduce((r, item)=>{return (item.owner_email===InfoGen.email)?true:false;},false))
          (this.state.editPlan)
          ?
            <ProjectFormTicket loadNew={this.loadProjectDetail} contract_no={data.contract} project_sid={this.props.project_sid} />:
            null
        }
        <div style={styles.body}>
            <div style={styles.bodyWidth50}>
              <div style={styles.taskFooter}></div>
            </div>
            <div style={styles.bodyWidth100}>
              <div style={styles.taskFooter}></div>
            </div>
            <div style={styles.bodyTwo}>
              <div style={styles.taskFooter}>Total Project</div>
            </div>
            <div style={styles.bodyWidth100Right}>
              <div style={styles.taskFooter} title="Estimate Hour">
                {data.case_of_project.reduce((finalData,cases)=>{
                  return finalData+=((cases.man_days)?parseInt(cases.man_days):0);
                },0)}
              </div>
            </div>
            <div style={styles.bodyWidth100}>
              <div style={styles.taskFooter} title="Status"></div>
            </div>
            <div style={styles.bodyWidth100Right}>
              <div style={styles.taskFooter} title="">
                {data.case_of_project.reduce((finalData,cases)=>{
                  return finalData+=((cases.taxi_fare_total)?parseInt(cases.taxi_fare_total):0);
                },0)}
              </div>
            </div>
            <div style={styles.bodyOne}>
              <div style={styles.taskFooter}></div>
            </div>
        </div>
    </div>
  }
}
// import {PROJECT_DETAIL,SET_DATA_PROJECT_DETAIL} from '../actions/projectDetail/ProjectDetailAction';

// const mapStatetoProps = (state) => {
//     console.log(state);
//     return {
//       projectDetail: state.ProjectDetailReducer,
//     }
// }
// const mapDispatchtoProps = (dispatch) => {
//     console.log(dispatch);
//     return {
//       pDetail: (sid)=> {
//         var data = {token:InfoGen.token,email:InfoGen.email,project_sid:sid};
//         dispatch(PROJECT_DETAIL(sid,url.ws_projects_detail,data)).then((res)=>{
//           console.log(res.payload.data);
//           dispatch(SET_DATA_PROJECT_DETAIL(res.payload.data));
//         });
//       }
//     }
// }
class PageThree extends Component{
    constructor(props){
      super(props);
      // console.log(this.props.navigator);
      // console.log(this.props.navigator.Navigator);
      console.log(this.props.navigator.routes[this.props.navigator.routes.length-1].sid);
      var sid = this.props.navigator.routes[this.props.navigator.routes.length-1].sid;
      var title = this.props.navigator.routes[this.props.navigator.routes.length-1].title;
      this.state = {sid:sid,title:title, data:{}, tasks:[],projectContact:[],listUserCanAddTask:InfoGen.listUserCanAddTask}
    }
    componentWillMount(){
      this.loadData();
    }
    loadData = () => {
      var that = this;
      LoadCaseDetail(this.state.sid).then((res)=>{
        // console.log(res);
        that.setState({data:res.data,tasks:res.tasks});
      });
    }
    loadTicket = () => {
      this.loadData();
    }
    handleCreatedService = () => {
      this.loadTicket();
    }
    handleOpenAppointment = () => {
    }
    cEndUser = (value) => {
      console.log(value);
    }
    render(){
      var {navigator} = this.props;
      var {title} = this.state;
      var {data, tasks} = this.state;
      return (<Page key={"PageTwo"} renderToolbar={()=><NavApp backButton={true} title={title} navigator={navigator} />}>
          <div style={{padding:10}}>
            <PresentData label={"Subject"} value={data.subject}  />
            <PresentData label={"No."} value={data.no_ticket+ ((data.refer_remedy_hd)?" ("+data.refer_remedy_hd+")":"")} />
            <PresentData label={"Contract"} value={data.contract_no} />
            <PresentData label={"Serial"}  value={data.serial_no} />
            <PresentData label={"Urgency"} value={data.urgency} />
            <PresentData label={"Type"} value={data.case_type} />
            <PresentData label={"End user"} value={data.end_user} />
            <PresentData label={"Site"} value={data.end_user_site} />
            <PresentData label={"Description"} value={data.description} />

            <TicketOwner data={data} />

            <ServiceReportDialog
              loadNew={this.loadTicket}
              ticket={data}
              onOpenAppointment={this.handleOpenAppointment}
              serviceReport={tasks}
              onCreatedService={this.handleCreatedService}
              ticket_sid={this.props.sid}
              projectContact={this.state.projectContact}
              listUserCanAddTask={this.state.listUserCanAddTask}  />

            <TicketContactUser data={data} cEndUser={this.cEndUser} />

            <TicketStatus data={data} loadTicket={this.loadTicket} />
            {
              //<div style={{padding:20}} onTouchTap={()=>{navigator.pushPage({component:PageThree,key:'PageThree'}) }}>Go To Next Page</div>
            }
          </div>
        </Page>
      )
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
export default ProjectDetail;

var styles = {
  header: {
    display:'flex',
  },
  headerLeft: {
    // flex:1,
    display:'flex'
  },
  headerRight: {
    flex:1,
    display:'flex'
  },
  body: {
    display:'flex',
  },
  bodyTwo:{
    flex:2
  },
  bodyThree: {
    flex:3
  },
  bodyOne: {
    flex:1
  },
  bodyWidth100Right: {
    width:120,
    textAlign:'right'
  },
  bodyWidth100: {
    width:100,
    textAlign:'left'
  },
  bodyWidth50: {
    width:50
  },
  label:{
    padding:10,
    backgroundColor:(InfoGen.isMobile)?'initial':'rgb(236, 240, 241)',
    color:'#000000',
    width:120,borderBottom:'1px solid #fcfcfc'
  },
  value:{
    padding:10, backgroundColor:'rgb(27, 144, 161)', color:'#ffffff',flex:1, marginRight:0,borderBottom:'1px solid #fcfcfc'
  },
  taskSubject: {
    padding:12, backgroundColor:'rgb(236, 240, 241)', color:'#000000',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskSubjectResolve:{
    padding:12, backgroundColor:'rgb(133, 204, 0)', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskSubjectAlert:{
    padding:12, backgroundColor:'#ff4081', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskHeader: {
    padding:12, backgroundColor:'rgb(27, 144, 161)', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskFooter: {
    padding:12, backgroundColor:'rgb(27, 144, 161)', color:'#ffffff',borderBottom:'1px solid #fcfcfc',
    // marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',

    height:40
  },
  btnStyle: {
    backgroundColor:'rgb(52, 152, 219)',
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  },
  btnStyleCancel: {
    backgroundColor:'rgb(243, 156, 18)',
    marginLeft:5,
    padding:10,
    color:'#ffffff',
    cursor:'pointer',
    userSelect: 'none'
  }
}
