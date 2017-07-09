import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
import get from '../../config/Get';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NavCompoment from '../nav/NavCompoment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import Drawer from 'material-ui/Drawer';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import { Columns, Column } from 're-bulma';
import Avatar from 'material-ui/Avatar';
import ActionStar from 'material-ui/svg-icons/action/grade';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';
import moment from 'moment';

class Standby7x24 extends Component {
  constructor(props){
    super(props);

    const minDate = new Date();
    const maxDate = new Date();
    minDate.setFullYear(minDate.getFullYear());
    minDate.setDate(1);
    minDate.setHours(0, 0, 0, 0);
    maxDate.setFullYear(maxDate.getFullYear());
    maxDate.setHours(0, 0, 0, 0);

    this.state = {
      // state for tabel
       fixedHeader: true,
       fixedFooter: true,
       stripedRows: false,
       showRowHover: false,
       selectable: false,
       multiSelectable: false,
       enableSelectAll: false,
       deselectOnClickaway: true,
       showCheckboxes: false,

       standby7x24:[],
       dataStandby7x24:[],
       queStandby:[]
     };

  }

  componentDidMount() {
    this.loadData();
  }
  loadData = () =>{
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    var that = this;
    get(Url.standby7x24, formData).then(function(res){
      console.log(res);
      that.setState({standby7x24:res.standby, queStandby:res.data});
    });
  }

  render(){
    var dataStandby7x24 = [];
    this.state.standby7x24.forEach((item, i) => {
      item.is_next_call
      if(item.next_call==="1" && i===0){
        dataStandby7x24.push(
            <div key={i} style={{flex:1}}>
              <div> <Avatar src={item.pic_full} /> {item.thainame} <ActionStar color={yellow500}/> </div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </div>
        );
      }else if(item.next_call==="2" && i===1){
        dataStandby7x24.push(
            <div key={i} style={{flex:1}}>
              <div> <Avatar src={item.pic_full} /> {item.thainame} <ActionStar color={yellow500}/> </div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </div>
        );
      }else{
        dataStandby7x24.push(
            <div key={i} style={{flex:1}}>
              <div> <Avatar src={item.pic_full} /> {item.thainame}</div>
              <div> Tel : {item.mobile}</div>
              <div> Email : {item.emailaddr}</div>
              <div><small> {item.standby_date}  ({item.time_start} - {item.time_end}) </small></div>
            </div>
        );
      }
    });
    var backupTeam;
    var nowHour =(moment().format('HH'));
    if(this.state.queStandby[0]){
      var tmp = this.state.queStandby[0].otherProducts[0];
      if(parseInt(tmp.time_start)<=nowHour){
        backupTeam =
        <Column>
          <div> <Avatar src={tmp.pic_full} /> {tmp.thainame}</div>
          <div> Tel : {tmp.mobile}</div>
          <div> Email : {tmp.emailaddr}</div>
          <div><small> {tmp.standby_date}  ({tmp.time_start} - {tmp.time_end}) </small></div>
        </Column>
      }

      var tmp = this.state.queStandby[0].otherProducts[1];
      if(parseInt(tmp.time_start)<=nowHour){
        backupTeam =
        <Column>
          <div> <Avatar src={tmp.pic_full} /> {tmp.thainame}</div>
          <div> Tel : {tmp.mobile}</div>
          <div> Email : {tmp.emailaddr}</div>
          <div><small> {tmp.standby_date}  ({tmp.time_start} - {tmp.time_end}) </small></div>
        </Column>
      }

    }
    var eleStandby =
      <div style={{display:'flex'}}>
        <div style={{flex:1}}>
          <div style={{clear:'both'}}>Oracle 7x24<br/></div>
          <div style={{clear:'both',margin:0,display:'flex'}}>{dataStandby7x24}</div>
        </div>
        <div style={{flex:1}}>
          <div style={{clear:'both'}}>Backup<br/></div>
          <div style={{clear:'both',margin:0}}>{backupTeam}</div>
        </div>
      </div>
    return(

        <div>
              <div>
                <Card style={{backgroundColor:'initial'}}>
                  <CardHeader style={{padding:"20px 20px 0px 20px"}}
                    title={"Standby7x24"}
                  />
                  <CardText>
                      {eleStandby}
                  </CardText>
                </Card>
              </div>
        </div>
    );
  }
}

export default Standby7x24;
