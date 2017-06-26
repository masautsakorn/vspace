import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
import Url from '../../config/url';
import jPost from '../../config/jPost';
import InfoGen from '../../config/InfoGen';
import moment from 'moment';
import Timeline from 'react-calendar-timeline';
import CircularProgress from 'material-ui/CircularProgress';
// import io from 'socket.io-client';
// var socket = io.connect("http://vspace03.vspace.in.th:3001");
const groups = [
  {id: 1, title: 'group 1',rightTitle:''},
  {id: 2, title: 'group 2',rightTitle:''},
  {id: 3, title: 'group 3',rightTitle:''},
  {id: 4, title: 'group 4',rightTitle:''},
]

const items = [
  {id: 1, group: 3, title: 'item 1', start_time: moment(), end_time: moment().add(1, 'hour')},
  {id: 2, group: 3, title: 'item 2', start_time: moment().add(-0.5, 'hour'), end_time: moment().add(0.5, 'hour')},
  {id: 3, group: 3, title: 'item 3', start_time: moment().add(2, 'hour'), end_time: moment().add(3, 'hour')}
]
// socket.emit('schedule', {token:InfoGen.token,email:InfoGen.email});
// socket.on('canAssign', function(res){
//   console.log(res);
//   groups = res.groups
// });
// socket.on('scheduleDetail', function(res){
//   console.log(res);
//   // that.setState({items:res.items});
//   items = res.items;
// });


class Schedule extends Component {
  constructor(props){
    super(props);
    this.state = {groups:[], items:[],socket:this.props.socket}
  }
  componentWillMount(){
    this.setState({
      // groups:groups,
      // items:items
    });
  }
  componentDidMount(){
    this.loadSchedule();
    // this.state.socket.emit('schedule', {token:InfoGen.token,email:InfoGen.email});
    // this.state.socket.on('canAssign', function(res){
    //   that.setState({groups:res.groups});
    // });
    // this.state.socket.on('scheduleDetail', function(res){
    //   that.setState({items:res.items,groups:res.groups});
    // });
  }
  loadSchedule = () => {
    var that = this;
    jPost(Url.schedule, {token:InfoGen.token,email:InfoGen.email}).then((res)=>{
      // console.log(res);
      that.setState({groups:res.data.groups,items:res.data.items});
    });
  }
  render(){
    // console.log(this.state.items);

    var content;
    if(this.state.groups.length>0){
      content = <Timeline fixedHeader={'fixed'}
        sidebarWidth={250}
        groups={this.state.groups}
        items={this.state.items}
        defaultTimeStart={moment().add(-12, 'hour')}
        defaultTimeEnd={moment().add(12, 'hour')}
      />;
    }else{
      content = <div style={{textAlign:'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>;
    }
    return(
      <div style={{position: 'absolute', top: '55px', overflow: 'scroll',bottom: '0px',right: 0,left: 0}}>
        {content}
      </div>
    )
  }
}

export default Schedule;
