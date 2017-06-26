import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../config/url';
import jPost from '../../config/jPost';
import InfoGen from '../../config/InfoGen';
import Paper from 'material-ui/Paper';
import {PresentDataHead,PresentDataBody,PresentDataForm,PresentDataS,PresentDataSF,PresentData} from '../management/PresentData';
import RaisedButton from 'material-ui/RaisedButton';
import ActionFindReplace from 'material-ui/svg-icons/action/find-replace';
import ActionSwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
const inputWidth = "100%";

export default class SosCiInformation extends Component {
  constructor(props){
    super(props);
    this.state = {ticket_sid:this.props.ticket_sid, data:[], dataWarehouse:[]}
  }

  componentWillMount(){
    this.loadSosCiInformation();
  }
  loadSosCiInformation = () => {
    var that = this;
    var dataTmp = {token:InfoGen.token, email:InfoGen.email, ticket_sid:this.state.ticket_sid};
    jPost(Url.sosCiInformation, dataTmp).then((res)=>{
      that.setState({data:res.data});
    });
  }
  findItemLikePN = (inventory_sid, pn, item, type) => {
    var that = this;
    console.log(pn, item, type);
    var dataTmp = {token:InfoGen.token,email:InfoGen.email, pn: pn, item:item, type:type,inventory_sid:inventory_sid};

    jPost(Url.findItemLikeThis, dataTmp).then((res)=>{
        // console.log(res);
        that.setState({dataWarehouse:res.data});
    });
  }
  renderData = () => {
    var {data} = this.state;
    return data.map((item,i)=>{
      var styleTmp = {display:'flex'};
      if((i+1)==data.length){
        styleTmp = {display:'flex',borderBottom:'1px solid #ffffff'}
      }
      return <div key={i} style={{}}>
        <div style={styleTmp}>
          <div style={{width:35,padding: '5px',border: '1px solid #ffffff', borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>#{(i+1)}</div>

          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.type_name}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.item_name}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.pn}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.serial_no}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.address}</div>
          <div style={{width:35,padding: '5px',border: '1px solid #ffffff',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>
            <ActionFindReplace color={"#ffffff"} onTouchTap={()=>this.findItemLikePN(item.sid, item.pn, item.item, item.type)} />
          </div>
        </div>
      </div>
    })
  }
  renderDataWareHouse = () => {
    var {dataWarehouse} = this.state;
    var returnData = dataWarehouse.map((item,i)=>{
      var styleTmp = {display:'flex'};
      if((i+1)==dataWarehouse.length){
        styleTmp = {display:'flex',borderBottom:'1px solid #ffffff'}
      }
      return <div key={i} style={{}}>
        <div style={styleTmp}>
          <div style={{width:35,padding: '5px',border: '1px solid #ffffff', borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>#{(i+1)}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.type_name}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.item_name}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.pn}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{item.serial_no}</div>
          <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>{"Warehouse"}</div>
          <div style={{width:35,padding: '5px',border: '1px solid #ffffff',borderBottom:'none',background:'#00bcd4',color: '#fff'}}>
            <ActionSwapHoriz color={"#ffffff"} onTouchTap={()=>this.findItemLikePN(item.sid, item.pn, item.item, item.type)} />
          </div>
        </div>
      </div>
    });
    if(dataWarehouse.length>0)
      return <div style={{marginTop:10}}><div>Warehouse</div>{returnData}</div>;
    else {
      return <div />
    }
  }
  render(){
    return(
      <div style={{margin:'-10px'}}>
        <div style={{}}>
          <div style={{display:'flex'}}>
            <div style={{width:35,padding: '5px',border: '1px solid #ffffff', borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>#</div>
            <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>Type</div>
            <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>Item</div>
            <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>PN</div>
            <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>Serial No.</div>
            <div style={{flex:1,padding: '5px',border: '1px solid #ffffff',borderRight:'none',borderBottom:'none',background:'#006064',color: '#fff'}}>Location</div>
            <div style={{width:35,padding: '5px',border: '1px solid #ffffff',borderBottom:'none',background:'#006064',color: '#fff'}}>
              #
            </div>
          </div>
        </div>
        {this.renderData()}
        {this.renderDataWareHouse()}
      </div>
    )
  }
}
