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

// import {connect} from "react-redux";

class ProjectDetail extends Component {
  constructor(props){
    super(props);
    this.state = {project_sid:this.props.project_sid,data:{}, editingContract:false,newContract:"",openTicket:[]};
    // this.onSocket();
    // this.emitSocket();
  }
  // onSocket = () => {
  //   var that = this;
  //   this.props.socket.on('projectDetail_'+this.props.project_sid, function(res){
  //     that.setState({data:res, editingContract:false, newContract:"",openTicket:[]});
  //   });
  // }
  // emitSocket = () => {
  //   this.props.socket.emit('projectDetail',{authen:{email:InfoGen.email,token:InfoGen.token}, data:{project_sid:this.props.project_sid}});
  // }
  componentWillMount(){
    this.loadProjectDetail(this.props.project_sid);
  }
  loadProjectDetail = (sid) => {
    var that = this;
    var dataTmp = {token:InfoGen.token,email:InfoGen.email,project_sid:sid};
    jPost(url.ws_projects_detail,dataTmp).then((res)=>{
      console.log(res);
      that.setState({data:res.data});
    });
  }
  editingContract = (project_sid) => {
    this.setState({editingContract:!this.state.editingContract});
  }
  cancelAddContract = () => {
    this.editingContract();
  }
  changeNewContract = (value) => {
    this.setState({newContract:value});
  }
  addNewContract = () => {
    if(this.state.newContract.trim()){
      var data = {
        authen:{email:InfoGen.email,token:InfoGen.token},
        project_sid:this.state.project_sid,
        newContract:this.state.newContract.trim(),
        data:this.state.data,
      }
      this.props.socket.emit('addNewContract', data);
    }else{
      alert('Please Input Data');
    }
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
  render(){

    var openTicket = this.state.openTicket;
    // console.log(data);
    var data = this.state.data;
    console.log(data);
    var content;
    if(data.sid){
      content =
      <div>
        <div>
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.label}>Contract No <EditorBorderColor onTouchTap={()=>this.editingContract(data.sid)} style={{width:16,height:14}}/></div>
                <div style={styles.value}>
                  {data.contract}
                  {(this.state.editingContract)?
                    <div style={styles.body}>
                      <div style={styles.bodyOne}><TextField onChange={(e)=>this.changeNewContract(e.target.value)} fullWidth={true} hintStyle={{color:'#dfdfdf', fontSize:14}} inputStyle={{color:'#ffffff'}} hintText="Input New Contract" /></div>
                      <div style={{marginTop:18}}>
                        <a onTouchTap={this.addNewContract} style={styles.btnStyle}>Add</a>
                        <a onTouchTap={this.cancelAddContract} style={styles.btnStyleCancel}>X</a>
                      </div>
                    </div>:
                    ''
                  }
                </div>
              </div>
              <div style={styles.headerRight}>
                <div style={styles.label}>Project Name</div><div style={styles.value}>{data.name}</div>
              </div>
            </div>
            <div style={styles.header}>
              <div style={styles.headerLeft}>
                <div style={styles.label}>Period</div>
                <div style={styles.value}>
                  Start {data.project_start} - End {data.project_end}
                </div>
              </div>
              <div style={styles.headerRight}>
                <div style={styles.label}>Project Owner</div><div style={styles.value}>{data.owner.map((item)=>{return (item.owner_name+" ")})}</div>
              </div>
            </div>
            <div style={styles.header}>
                <div style={styles.headerLeft}>
                    <div style={styles.label}>End user /<br/>Address</div>
                    <div style={styles.value}>{data.end_user} /<br/>{data.end_user_address}</div>
                </div>
                <div style={styles.headerRight}>
                  <div style={styles.label}>Progress</div>
                  <div style={styles.value}>
                      {data.progress}%
                  </div>
                </div>
            </div>
        </div>
        <div>
            <div style={{marginTop:10}}>
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
                    <div style={styles.bodyWidth100}>
                      <div style={styles.taskHeader} title="Status">Status</div>
                    </div>
                    <div style={styles.bodyWidth100Right}>
                      <div style={styles.taskHeader} title="">Taxi (Baht)</div>
                    </div>
                    <div style={styles.bodyOne}>
                      <div style={styles.taskHeader}>Owner</div>
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
                              <div style={styles.bodyWidth100}>
                                  {
                                    (item.status_label==='Process')?
                                    <div style={styles.taskSubjectAlert}>{item.status_label}</div>:
                                    <div style={styles.taskSubjectResolve}>{item.status_label}</div>
                                  }
                              </div>
                              <div style={styles.bodyWidth100Right}>
                                <div style={styles.taskSubject}>{item.taxi_fare_total}</div>
                              </div>
                              <div style={styles.bodyOne}>
                                <div style={styles.taskSubject}>{item.owner_thainame}</div>
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
                  (1==2)
                  ?
                    <ProjectFormTicket />:
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

export default ProjectDetail;

var styles = {
  header: {
    display:'flex',
  },
  headerLeft: {
    flex:1,
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
    padding:10, backgroundColor:'rgb(236, 240, 241)', color:'#000000',width:120,borderBottom:'1px solid #fcfcfc'
  },
  value:{
    padding:10, backgroundColor:'#00bcd4', color:'#ffffff',flex:1, marginRight:10,borderBottom:'1px solid #fcfcfc'
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
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc', marginRight:1,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height:40
  },
  taskFooter: {
    padding:12, backgroundColor:'#00bcd4', color:'#ffffff',borderBottom:'1px solid #fcfcfc',
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
