import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../../../config/url';
import jPost from '../../../config/jPost';
import InfoGen from '../../../config/InfoGen';
import Paper from 'material-ui/Paper';
import {PresentDataHead,PresentDataBody,PresentDataForm,PresentDataS,PresentDataSF} from '../../management/PresentData';
const inputWidth = "100%";

// const categoryOption = [
//   {sid:1,name:'Hardware'},
//   {sid:2,name:'Software'},
// ];
// const typeOption = [
//   {sid:1,name:'Computer',csid:1},
//   {sid:2,name:'Notebook',csid:1},
//   {sid:3,name:'Printer',csid:1},
//   {sid:4,name:'Microsoft Office 365',csid:2},
// ]
//
// const itemOption = [
//   {sid:1,name:'Acer', tsid:1},
//   {sid:2,name:'Dell', tsid:1},
//   {sid:3,name:'Lenovo', tsid:1},
//   {sid:4,name:'Acer', tsid:2},
//   {sid:5,name:'Dell', tsid:2},
//   {sid:6,name:'Epson', tsid:3},
//   {sid:7,name:'Microsoft Words', tsid:4},
// ]
class AddInventory extends Component {
  constructor(props){
    super(props);
    this.state = {
      info:this.props.info,
      category:0,
      type:0,
      item:0,
      storeName:'',
      pn:'',
      branch:'',
      address:'',
      province:'',
      model:'',
      zone:'',
      quantity:1,
      serialNumber:'',
      brand:'',
      categoryOption:[],
      typeOption:[],
      itemOption:[],
      contactUser:[],
      contactFilter:'',
      owner:''
    }
  }
  componentDidMount(){
    this.loadCTI();
    // this.loadContactUser();
  }
  selectContact = (value) => {
    this.setState({owner:value});
  }
  loadCTI = () => {
    var that = this;
    var data = {token:InfoGen.token, email:InfoGen.email};
    jPost(Url.inventoryCTI, data).then((res)=>{
      console.log(res);
      that.setState({
        categoryOption:res.data.category,
        typeOption:res.data.type,
        itemOption:res.data.item,
        contactUser:res.data.contact
      })
    });
  }
  selectCategory = (value) => {
    this.setState({category:value, type:0, item:0});
  }
  selectType = (value) => {
    this.setState({type:value, item:0});
  }
  selectItem = (value) => {
    this.setState({item:value});
  }
  addInventoryAction = () => {
    // console.log(this.state);
    var {category,type,item,storeName,branch,address,province,zone,pn,quantity,serialNumber,model,brand,owner} = this.state;

    var data = {token:InfoGen.token, email:InfoGen.email,
      category,type,item,storeName,branch,address,province,zone,pn,quantity,serialNumber,model,brand,owner
    };
    // console.log(data);
    var that = this;
    jPost(Url.addInventory,data).then((res)=>{
      // console.log(res);
      that.props.cancelAddInventory();
      that.setState({category:0,
      type:0,
      item:0,
      storeName:'',
      pn:'',
      branch:'',
      address:'',
      province:'',
      model:'',
      zone:'',
      quantity:1,
      serialNumber:'',
      brand:''});
    });
  }
  render(){
    var {category,type,item,storeName,branch,address,province,zone,pn,quantity,serialNumber,model,brand} = this.state;
    var {categoryOption,typeOption,itemOption,contactUser,contactFilter} = this.state;
    // console.log(type);
    return(
      <div style={{marginBottom:30}}>
        <Paper zDepth={2}>
          <div style={{padding:20}}>

            <div style={{background:'rgb(236, 240, 241)'}}>
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-md m-b-15">
                  <div style={{padding:10}}><h2>Add New Inventory</h2></div>
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">

                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Category"} value={
                    <select
                      onTouchTap={(e)=>this.selectCategory(e.target.value)}
                      onChange={()=>{}}
                      value={category}
                      className="input" size={3} style={{width:inputWidth}}>
                      {categoryOption.map((item)=>(<option key={item.sid} value={item.sid}>{item.name}</option>))}
                    </select>
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Type"} value={
                    <select
                      onTouchTap={(e)=>this.selectType(e.target.value)}
                      onChange={()=>{}}
                      value={type}
                      className="input" size={3} style={{width:inputWidth}}>
                      {
                        typeOption.map((item)=>{
                          if(item.csid==category)
                            return <option key={item.sid} value={item.sid}>{item.name}</option>;
                          else
                            return null
                        })
                      }
                    </select>
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Item"} value={
                    <select
                      onTouchTap={(e)=>this.selectItem(e.target.value)}
                      onChange={()=>{}}
                      value={item}
                      className="input" size={3} style={{width:inputWidth}}>
                      {
                        itemOption.map((item)=>{
                          if(item.tsid==type)
                            return <option key={item.sid} value={item.sid}>{item.name}</option>;
                          else
                            return null
                        })
                      }
                    </select>
                  } />
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Owner"} value={
                    <div>
                      <input className="input" value={contactFilter} placeholder={"Filter by name"} onChange={(e)=>{this.setState({contactFilter:e.target.value})}} />
                      <select onTouchTap={(e)=>this.selectContact(e.target.value)} onChange={(e)=>{}} className="input" size={3} style={{width:inputWidth}}>
                        {
                          contactUser.map((item,i)=>{
                            if(item.contact_name.indexOf(contactFilter)>-1){
                              return <option key={i} value={item.sid}>{item.contact_name}</option>
                            }
                          })
                        }
                      </select>
                    </div>
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Branch"} value={
                    <input className="input" value={branch} onChange={(e)=>this.setState({branch:e.target.value})} />
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Address"} value={
                    <input className="input" value={address} onChange={(e)=>this.setState({address:e.target.value})} />
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Province"} value={
                    <input className="input" value={province} onChange={(e)=>this.setState({province:e.target.value})} />
                  } />
                  <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Zone"} value={
                    <input className="input" value={zone} onChange={(e)=>this.setState({zone:e.target.value})} />
                  } />
                </div>
                <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4 col-md m-b-15">
                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Part Number"} value={
                      <input className="input" value={pn} onChange={(e)=>this.setState({pn:e.target.value})} />
                    } />
                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Model"} value={
                      <input className="input" value={model} onChange={(e)=>this.setState({model:e.target.value})} />
                    } />
                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Brand"} value={
                      <input className="input" value={brand} onChange={(e)=>this.setState({brand:e.target.value})} />
                    } />

                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Quantity"} value={
                      <input className="input" style={{width:80}} type="number" min={1} value={quantity}
                        onChange={(e)=>{
                          this.setState({quantity:e.target.value});
                          if(e.target.value>1)
                            this.setState({serialNumber:''})
                        }
                      } />
                    } />

                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={"Serial Number"} value={
                      <input className="input" value={serialNumber}
                        onChange={(e)=>{
                          this.setState({serialNumber:e.target.value});
                          this.setState({quantity:1});
                        }
                      } />
                    } />

                    <PresentDataForm styleLeft={{flex:1,textAlign:'right'}} styleRight={{flex:2,textAlign:'left'}} label={""} value={
                      <div>
                        <span onTouchTap={()=>this.addInventoryAction()} className="btn four">SAVE</span>
                        <span onTouchTap={()=>this.props.cancelAddInventory()} className="btn five">CANCEL</span>
                      </div>
                    } />
                </div>
              </div>
            </div>
          </div>
        </Paper>
      </div>
    )
  }
}
export default AddInventory;
