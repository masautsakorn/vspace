import React,{Component} from 'react';

import {Page,Navigator,BackButton,Toolbar,Tab, Tabbar} from 'react-onsenui';
import {ToolbarButton,Icon,Splitter,SplitterSide,List,ListItem,SplitterContent,ListHeader} from 'react-onsenui';

import {LoadCaseDetail} from '../../actions/ActionManagement';
import {PresentData} from '../management/PresentData';
import ProjectDetail from '../project/ProjectDetail';

import InfoGen from '../../config/InfoGen';
class RenderProject extends Component {
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
      <ListItem key={index} onTouchTap={()=>{navigator.pushPage({component:PageTwo,key:'PageTwo',sid:row.sid,title:row.name}) }}>
        <div className='left'>
        </div>
        <div className='center'>
          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:1}}>{row.name}</div>
            {
              (row.contract_no && row.contract_no!="None Contract")?
              <div style={{flex:1,textAlign:'right'}}>{row.contract_no}</div>:
              null
            }
          </div>
          <div>{row.end_user}</div>
          <div style={{display:'flex',width:'100%'}}>
            <div style={{flex:3}}>Created </div>
            <div style={{flex:2,textAlign:'right'}}>{row.create_by_name}<br/>{row.create_datetime}</div>
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

class PageTwo extends Component{
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
      // this.loadData();
    }
    loadData = () => {
      var that = this;
      LoadCaseDetail(this.state.sid).then((res)=>{
        // console.log(res);
        that.setState({data:res.data,tasks:res.tasks});
      });
    }
    // loadTicket = () => {
    //   this.loadData();
    // }
    // handleCreatedService = () => {
    //   this.loadTicket();
    // }
    // handleOpenAppointment = () => {
    // }
    cEndUser = (value) => {
      console.log(value);
    }
    render(){
      var {navigator} = this.props;
      var {title} = this.state;
      var {data, tasks} = this.state;
      return (<Page key={"PageTwo"} renderToolbar={()=><NavApp backButton={true} title={title} navigator={navigator} />}>
          <div style={{padding:10}}>
            <ProjectDetail navigator={navigator} info={InfoGen.info} project_sid={this.state.sid} />
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

export default RenderProject;
