import React, { Component } from 'react';

import {Card, CardHeader, CardText} from 'material-ui/Card';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import InfoGen from '../config/InfoGen';
// import BigCalendar from 'react-big-calendar';
// import moment from 'moment';
import FullCalendar from 'rc-calendar/lib/FullCalendar';
import 'rc-calendar/assets/index.css';

import 'rc-select/assets/index.css';
import Select from 'rc-select';

import zhCN from 'rc-calendar/lib/locale/zh_CN';
import enUS from 'rc-calendar/lib/locale/en_US';
import jPost from '../config/jPost';
import Url from '../config/url';

import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';

const format = 'YYYY-MM-DD';
const cn = window.location.search.indexOf('cn') !== -1;

const now = moment();
if (cn) {
  now.locale('zh-cn').utcOffset(8);
} else {
  now.locale('en-gb').utcOffset(0);
}

const defaultCalendarValue = now.clone();
defaultCalendarValue.add(-1, 'month');

function onSelect(value) {
  console.log('select', value.format(format));
}
var myEventsList = [
  {
    'title': 'All Day Event',
    'allDay': true,
    'start': new Date(2015, 3, 0),
    'end': new Date(2015, 3, 1)
  },
  {
    'title': 'Long Event',
    'start': new Date(2015, 3, 7),
    'end': new Date(2015, 3, 10)
  },
]
class Calendar extends Component {
  constructor(props){
    super(props);
    this.state = {data:[],now:now}
    var that = this;
    // this.onSocket().then((res)=>{
    //   console.log(res);
    //   that.emitSocket();
    // });

    // setTimeout(function () {
    //
    // }, 100);
  }
  componentDidMount(){
    this.getData(this.state.now);
  }
  getData = (date) => {
    // console.log(this.state.now.format('YYYY-MM'));
    var tmpStart = date;
    var tmpTo = date;
    // console.log(tmpStart);
    var start = tmpStart.add(-30, 'days').format('YYYY-MM-DD');
    // console.log(tmpTo);
    var to = tmpTo.add(60,'days').format('YYYY-MM-DD');

    var data = {email:InfoGen.email, token:InfoGen.token, start:start, to: to};
    date.add(-30,'days');
    var that = this;
    jPost(Url.ws_calendar, data).then(function(res){
      console.log(res);
      that.setState({data:res.data});
    });
    // console.log(data);
    // this.props.socket.emit('calendar', data);

  }
  // onSocket = () => {
  //   var that = this;
  //   return new Promise((resolve,reject)=>{
  //     this.props.socket.on('calendar_'+InfoGen.email,function(res){
  //       // console.log(res);
  //       that.setState({data:res});
  //     });
  //     resolve(true);
  //   });
  // }
  componentWillDidMount(){

  }
  render(){
    const {data} = this.state;
    console.log(data);
      return(
        <div style={{ zIndex: 1000, position: 'relative' }}>
          <FullCalendar
            style={{ margin: 10 }}
            Select={Select}
            fullscreen
            onSelect={onSelect}
            defaultValue={this.state.now}
            onTypeChange={(e,v)=>{
              console.log(e);
              console.log(v);
            }}
            onChange={(e)=>{
              console.log(e.format('YYYY-MM-DD'));
              this.getData(e);
            }}
            dateCellContentRender={(e)=>{
              // console.log(e.format('YYYY-MM-DD'));
              return <div style={{ maxWidth:'150px'}}><div>{e.format('DD')}</div><div style={{position:'relative'}}>{RowDataCaledar(data,e.format('YYYY-MM-DD'))}</div></div>;
            }}
            locale={cn ? zhCN : enUS}
          />
        </div>
      )

  }
}
var RowDataCaledar = (data, date) => {
  // console.log(data,date);
  var top = -40;
  return data.map((item,i)=>{
    // console.log(date);
    if(item.appointment_date===date || item.started_datetime===date || item.closed_datetime===date){
      top+=40;
      return (<div className="row-calendar" style={{top:top}} key={item.sid}>
        <div className="text-box">{item.no_task} {item.subject_service_report}</div>
      </div>);
    }
  });
}
export default Calendar;
