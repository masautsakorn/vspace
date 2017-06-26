// view for Approve Taxi and OT Request
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
import jPost from '../../config/jPost';
import Put from '../../config/Put';
import InfoGen from '../../config/InfoGen';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import NavCompoment from '../nav/NavCompoment';
// import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
// import Drawer from 'material-ui/Drawer';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import {GridList} from 'material-ui/GridList';
// import ApproveServiceDetail from '../approval/ApproveServiceDetail';
// import { Columns, Column } from 're-bulma';

import RaisedButton from 'material-ui/RaisedButton';
import ActionSearch from 'material-ui/svg-icons/action/search';
import IconButton from 'material-ui/IconButton';
import moment from 'moment';
import Chip from 'material-ui/Chip';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import {Map,Marker,InfoWindow} from 'google-maps-react'
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';

class Maps extends Component {
  constructor(props){
    super(props);

    this.state = {
      // info:this.props.info,
      loading:false,
      socket: this.props.socket,
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {},
      data:[],
      initLat:13.7030313,
      initLng:100.54357440000001,
      viewEmail:""
     };
  }

  componentDidMount() {
    var that = this;
    this.loadData();
    // var that = this;
    // this.state.socket.on('map',function(res){
    //   that.setState({data:res,loading:false});
    // });
    // this.state.socket.emit('online', function(res){
      // console.log(res);
    // });
    // this.state.socket.on('map', function(res){
    //   that.setState({data:res});
    //   res.forEach((item,i)=>{
    //     that.props.socket.on("online-"+item.email,function(res2){
    //     });
    //   });
    // });
  }
  loadData = () =>{
    var that = this;
    // this.state.socket.emit('map', {token:InfoGen.token, email:InfoGen.email});
    var data = ({token:InfoGen.token, email:InfoGen.email});
    jPost(Url.ws_map, data).then(function(res){
      console.log(res);
      that.setState({data:res.data});
      // res.data.forEach((item,i)=>{
      //   that.props.socket.on("online-"+item.email,function(res2){
      //   });
      // });
    });
  }
  onMarkerClick = (props, marker, e) => {
    console.log(props);
    console.log(marker);
    console.log(e);
     this.setState({
       selectedPlace: props,
       activeMarker: marker,
       showingInfoWindow: true
     });
  }
  touchPeople = (email) => {
    console.log(email);
    this.state.data.forEach((item,i)=>{
      if(item.email===email){
        // console.log(item);
        this.setState({initLat:item.latitude, initLng:item.longitude,viewEmail:email});
      }
    });
  }
  render(){
    // console.log(window.google);
    var {data} = this.state;
    var elementSectionApprove;
    if(!this.state.loading){
      elementSectionApprove =
      <div style={{display:'flex'}}>
        <div style={{width:'190px', overflow:'auto', height:'90vh',color:'#222222'}}>
          {
            data.map((item,i)=>{
              console.log(item);
              return <div onTouchTap={()=>{this.touchPeople(item.email)}} key={i} style={{fontSize:12,cursor:'pointer'}}>
                <div style={{padding:4,display:'flex',background:((item.latitude!=="-" && item.latitude!=="")?'rgba(0,0,0,0)':'rgba(0,0,0,.05)')}}>
                  <div style={{width:40}}><Avatar style={{width:36}} src={item.picture_profile} /></div>
                  <div style={{flex:1}}>{item.name}<br/><small>{item.updated_datetime}</small></div>
                </div>
              </div>
            })
          }
        </div>
        <div style={{flex:1,overflow:'auto'}}>
          <Map className='map' style={{width: '100%', height: '100%', position: 'relative'}}
            google={window.google} zoom={10}
            initialCenter={{lat: this.state.initLat, lng: this.state.initLng}}
            center={{lat: this.state.initLat, lng: this.state.initLng}} >
              {
                data.map((item,i)=>{
                    if(this.state.viewEmail===item.email){
                      return <Marker key={i}
                        title={item.name}
                        name={item.name+' '+item.updated_datetime}
                        onClick={this.onMarkerClick}

                        icon={{
                          url: item.picture_profile,
                          anchor: new window.google.maps.Point(16,16),
                          scaledSize: new window.google.maps.Size(32,32)
                        }}
                        position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
                        />
                    }else{
                      return <Marker key={i}
                        title={item.name}
                        name={item.name+' '+item.updated_datetime}
                        onClick={this.onMarkerClick}

                        position={{lat: parseFloat(item.latitude), lng: parseFloat(item.longitude)}}
                        />
                    }
                })
              }
              <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
                  <div>
                    <h5>{this.state.selectedPlace.name}</h5>
                  </div>
              </InfoWindow>
          </Map>
        </div>
      </div>;
    }else{
      elementSectionApprove = <div style={{textAlign:'center'}}>
        <CircularProgress size={80} thickness={5} />
      </div>
    }
    return(
      <div style={{background:'#ffffff', margin:'-22px -22px 0px -22px'}}>{elementSectionApprove}</div>
    )
  }

}
export default Maps;
