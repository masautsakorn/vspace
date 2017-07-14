import React, { Component } from 'react';
import InfoGen from '../../config/InfoGen';

// import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
var DATA = [
  {id:1,name:'Admin กสิกรไทย',value:'กสิกรไทย',key:1, notify:false},
  {id:2,name:'Admin ไทยพาณิชย์',value:'F17-6112',key:0, notify:true},
  // {id:,name:'Admin กสิกรไทย',value:'กสิกรไทย',type:'End user'},
  // {id:1,name:'Admin กสิกรไทย',value:'กสิกรไทย',type:'End user'},
]
var KEY = [
  'Contract No',
  'End user'
]
export default class Setting extends Component {
  constructor(props){
    super(props);
    this.state = {form:false,data:DATA, key:0, value:'',name:'',notify:false}
  }
  handleKey = (event, index, value)=>{
    // console.log(value);
    this.setState({key:value})
  }
  saveRule = () => {
    this.setState({form:false});
  }
  renderForm = () => {
    const styles = {
      toggleDiv: {
        maxWidth: 300,
        marginTop: 40,
        marginBottom: 5
      },
      toggleLabel: {
        color: grey400,
        fontWeight: 100
      },
      buttons: {
        marginTop: 30,
        float: 'right'
      },
      saveButton: {
        marginLeft: 5
      }
    };
    var {name,key,value,notify} = this.state;
    return <div className="pageBase" title="Form Page" >
      <div>{"สร้างเงื่อนไขการแสดง Case"}</div>
      <div>

        <TextField value={name}
          hintText="Name" onChange={(e)=>this.setState({name:e.target.value})}
          floatingLabelText="Name"
          fullWidth={true}
        />

        <SelectField onChange={this.handleKey}
          floatingLabelText="Key"
          value={key}
          fullWidth={true}>
          <MenuItem value={0} primaryText="Contract No"/>
          <MenuItem value={1} primaryText="End user"/>
        </SelectField>

        <TextField hintText="Value" fullWidth={true} onChange={(e)=>this.setState({value:e.target.value})}
          floatingLabelText="Value" value={value} />

        <div style={styles.toggleDiv}>
          <Toggle onToggle={(event,isInputChecked)=>{console.log(isInputChecked)}}
            defaultToggled={notify}
            label="Notify"
            labelStyle={styles.toggleLabel}
          />
        </div>

        <Divider/>

        <div style={styles.buttons}>
          <a onTouchTap={()=>this.setState({form:false})}>
            <RaisedButton label="Cancel"/>
          </a>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        onTouchTap={()=>this.saveRule()}
                        primary={true}/>
        </div>
      </div>

      <div style={{clear:'both'}}></div>
    </div>;

  }
  renderTable = () => {
    const styles = {
      floatingActionButton: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
      editButton: {
        fill: grey500
      },
      columns: {
        id: {
          width: '10%'
        },
        name: {
          width: '25%'
        },
        price: {
          width: '20%'
        },
        category: {
          width: '20%'
        },
        notify: {
          width: '15%'
        },
        edit: {
          width: '10%'
        }
      }
    };
    var {data} = this.state;
    return <div className="pageBase">
      <div>เงื่อนไงการแสดง Case</div>
      {(!this.state.form && this.props.value=='b')?
        <FloatingActionButton onTouchTap={()=>this.setState({form:true,name:'',key:0,value:'',notify:true})} style={styles.floatingActionButton} backgroundColor={pink500}>
        <ContentAdd />
        </FloatingActionButton>:
        null
      }
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderColumn style={styles.columns.id}>No.</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.price}>Key</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.category}>Value</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.notify}>Notify</TableHeaderColumn>
            <TableHeaderColumn style={styles.columns.edit}>Edit</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item,i) =>
            <TableRow key={i}>
              <TableRowColumn style={styles.columns.id}>#{i+1}</TableRowColumn>
              <TableRowColumn style={styles.columns.name}>{item.name}</TableRowColumn>
              <TableRowColumn style={styles.columns.price}>{KEY[item.key]}</TableRowColumn>
              <TableRowColumn style={styles.columns.category}>{item.value}</TableRowColumn>
              <TableRowColumn style={styles.columns.notify}><span>{(item.notify)?'รับแจ้งเตือน':'ไม่รับแจ้งเตือน'}</span></TableRowColumn>
              <TableRowColumn style={styles.columns.edit}>
                <div onTouchTap={()=>this.setState({
                  form:true,
                  name:item.name,
                  key:item.key,
                  value:item.value,
                  notify:item.notify
                })}>
                  <FloatingActionButton zDepth={0}
                                        mini={true}
                                        backgroundColor={grey200}
                                        iconStyle={styles.editButton}>
                    <ContentCreate  />
                  </FloatingActionButton>
                </div>
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  }
  renderLogic = () => {
    if(this.state.form){
      return this.renderForm();
    } else {
      return this.renderTable()
    }
  }
  render(){
    return(
      <div style={{padding:20}}>
        {this.renderLogic()}
      </div>
    )
  }
}
