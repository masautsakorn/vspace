import React,{Component} from 'react';

import {Page,Navigator,BackButton,Toolbar,Tab, Tabbar} from 'react-onsenui';
import {ToolbarButton,Icon,Splitter,SplitterSide,List,ListItem,SplitterContent,ListHeader} from 'react-onsenui';

import {LoadCaseDetail} from '../../actions/ActionManagement';
import {PresentData} from '../management/PresentData';
import TicketOwner from '../ticket/TicketOwner';
import ServiceReportDialog from '../projectplan/ServiceReportDialog2';
import TicketContactUser from '../ticket/TicketContactUser';
import TicketStatus from '../ticket/TicketStatus';

import ChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';

import InfoGen from '../../config/InfoGen';
class RenderCase extends Component {
  constructor(props){
    super(props);
    console.log(this.props);
    this.state = {data:this.props.data}
  }

  renderRow = (row, index) => {
    var {data,navigator} = this.props;
    // console.log(row);
    // const x = 40 + Math.round(5 * (Math.random() - 0.5)),
    //       y = 40 + Math.round(5 * (Math.random() - 0.5));
    //
    // const names = ['Max', 'Chloe', 'Bella', 'Oliver', 'Tiger', 'Lucy', 'Shadow', 'Angel'];
    // const name = names[Math.floor(names.length * Math.random())];

      // <img src={`http://placekitten.com/g/`} className='list-item__thumbnail' />
    return (
      <ListItem key={index} onTouchTap={()=>{navigator.pushPage({component:PageCaseDetial,key:'PageCaseDetial',sid:row.sid,title:row.no_ticket}) }}>
        <div className='left'>
        </div>
        <div className='center'>
          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:1}}>{row.case_type}</div>
            <div style={{flex:1,textAlign:'right'}}>{row.no_ticket}</div>
          </div>
          <div>{row.subject}</div>

          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:1}}><small>Status </small></div>
            <div style={{flex:1,textAlign:'right'}}><small>{row.status_label}</small></div>
          </div>
          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:1}}><small>Owner </small></div>
            <div style={{flex:1,textAlign:'right'}}><small>{row.owner_thainame}</small></div>
          </div>
          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:3}}><small>Created {row.create_by_name}</small></div>
            <div style={{flex:2,textAlign:'right'}}><small>{row.create_datetime}</small></div>
          </div>
        </div>
      </ListItem>
    );
  }

  render(){
    var {data,navigator} = this.props;
    console.log(data);
    return(
      <div style={{padding:'0px'}}>
        {
          // data.map((item,i)=>{
          //   return <div key={i}>
          //     <div>#{i+1} {item.subject}</div>
          //   </div>
          // })
        }
        <List style={{zIndex:0}}
          dataSource={data}
          renderRow={this.renderRow}
          // renderHeader={() => <ListHeader>Cute cats</ListHeader>}
        />
      </div>
    )
  }
}

class PageCaseDetial extends Component{
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
        that.setState({data:res.data,tasks:res.tasks,projectContact:res.contactPeople});
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
        {backButton ? <div style={{color:'#ffffff'}}><ChevronLeft style={{color:'#ffffff', marginTop:10}} onClick={() => navigator.popPage()} /></div>: null}
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

export default RenderCase;
