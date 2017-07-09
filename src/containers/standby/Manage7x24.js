import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Columns, Column } from 're-bulma';
import Avatar from 'material-ui/Avatar';
import ActionStar from 'material-ui/svg-icons/action/grade';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import * as firebase from 'firebase';

export default class Manage7x24 extends Component{
    constructor(props){
      var config = {
          apiKey: "AIzaSyDd86kbn_C4jm5Fhc1lrmsJJrVHbMPt954",
          authDomain: "vspace-66a6f.firebaseapp.com",
          databaseURL: "https://vspace-66a6f.firebaseio.com",
          projectId: "vspace-66a6f",
          storageBucket: "vspace-66a6f.appspot.com",
          messagingSenderId: "1069991339940"
      };
      const database = firebase
        .initializeApp(config)
        .database();

      super(props);
      this.state = {txtHoliday:'',
        days:[],
        daysRef:null,
        standby_buddy:[],
        holiday:[],RunStart:0,RunTo:30,
        database:database
      };
    }
    componentWillMount(){
      this.loadDataBuddy7x24();
      this.loadDataDays();
      // this.loadDataDays();
      // this.loadDataHolidayAndGenDayOneYear(); // โหลดข้อมูล วันหยุดและสร้าง วัน ทั้งปี
    }
    loadDataBuddy7x24 = () => {
      var buddy = this.state.database.ref('/standby_buddy');
      buddy.on('value', snapshot => {
          const store = snapshot.val();
          console.log(store);
          this.setState({standby_buddy:store});
      });
    }
    loadDataDays = () => {
      var days = this.state.database.ref('/days');
      days.on('value', snapshot => {
        const store = snapshot.val();
        // console.log(store);
        this.setState({days:store, daysRef:days});
        // this.runDays(); // สำหรับอัพเดทข้อมูลวัน เวลา ชั่วโมง ถือสแตนบาย
      });
    }
    componentDidMount(){
      var that = this;
      console.log('componentDidMount');
      // setInterval(function () {

        // that.setState({RunStart:that.state.RunStart+10,RunStart:that.state.RunTo+10});
        // console.log(that.state);
      // }, 1000);
    }
    txtHoliday = (e) => {
      this.setState({txtHoliday:e.target.value});
    }
    loadDataHolidayAndGenDayOneYear = () => {
      var days = this.state.database.ref('/holiday');
      days.on('value', snapshot => {
        const store = snapshot.val();
        console.log(store);
        this.setState({holiday:store, daysRef:days});
        this.genTableDaysToFirebase();
      });
    }
    genTableDaysToFirebase = () => {
      var elementHoliday;
      var today = moment('2017-01-01').format('YYYY-MM-DD');
      var dataDays = [];
      for (var i = 0; i < 365; i++) {
        var is_holiday = false;
        var is_offical_holiday = false;
        var objectDay = moment('2017-01-01').add(i,'days');
        var day = objectDay.format('YYYY-MM-DD');
        var holiday_name = '';
        var dddd = objectDay.format('dddd');
        this.state.holiday.forEach((item,i)=>{
          if(day==item.holiday){
            is_holiday = true;
            if(item.description_en!=="Saturday" || item.description_en!=="Sunday"){
              is_offical_holiday = true;
            }
            dddd = item.description_en;
          }
        });
        dataDays.push({'day':day,is_holiday:is_holiday,is_offical_holiday:is_offical_holiday,holiday_name:dddd});
        this.state.database.ref().child('days').push({'day':day,is_holiday:is_holiday,is_offical_holiday:is_offical_holiday,holiday_name:dddd}, response => {console.log(response)});
        // console.log(dataDetail);
      }
    }
    runDays = () => {
      console.log('runDays');
      var dataDays = this.state.days;
      Object.keys(dataDays).forEach((key,i)=>{
          console.log(dataDays[key].day);
        // if(i>=this.state.RunStart&&this.state.RunTo>i){
          // this.updateBoxTimeOfDay(key,dataDays[key].day,dataDays[key].is_holiday);
          // console.log(res);
        // }
      });
    }
    updateBoxTimeOfDay = (uid,day,is_holiday) => {
      console.log('uid', uid);
      var updates = [];
      var data;
      if(is_holiday){
        // updates['/days/' + uid+'/time_start'] = '08:00';
        data = {'time_start':'08:00','how_long_hrs':'24',updated_datetime:moment().format('YYYY-MM-DD HH:mm:ss')};
      }else{
        // updates['/days/' + uid+'/time_start'] = '17:00';
        data = {'time_start':'17:00','how_long_hrs':'15',updated_datetime:moment().format('YYYY-MM-DD HH:mm:ss')};

      }
      // database.ref().update(updates);
      var res = this.state.database.ref().child(`days/${uid}`).update(data, response => response);
      console.log(res);
    }
    genStandby7x24 = () => {

    }
    render(){
      console.log(this.state);
      var days = [];
      var dataDays = this.state.days;
      Object.keys(dataDays).forEach((key,i)=>{
        days.push(<div key={i}>{dataDays[key].day} {dataDays[key].holiday_name} {dataDays[key].time_start} {dataDays[key].how_long_hrs}</div>);
      });
      var standby_buddy = [];
      var standbyDubby = this.state.standby_buddy;
      console.log(standbyDubby);
      standbyDubby.forEach((item,i)=>{
        standby_buddy.push(<div key={i}>{item.buddy_one} {item.buddy_two}</div>);
      });
      return(
        <div>
          <Columns>
            <Column>
              {days}
            </Column>
            <Column>
              {standby_buddy}
            </Column>
          </Columns>
        </div>
      )
    }
}
