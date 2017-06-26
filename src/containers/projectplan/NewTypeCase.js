import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';

class NewTypeCase extends Component {
  constructor(props){
    super(props);
    // var value = (this.props.listType[0].name)?this.props.listType[0].name:"";
    var value;
    this.state = {openAddNewColumn:false, value:value, listType:this.props.listType,manualAddCaseType:false};
    this.handleAddNewColumn = this.handleAddNewColumn.bind(this);
    this.handleTextareaClose = this.handleTextareaClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
    // this.handleAddColumn = this.handleAddColumn.bind(this);
  }
  handleAddNewColumn(){
    this.setState({openAddNewColumn:true,manualAddCaseType:false});
  }
  handleSubmit = (e) =>{
    e.preventDefault();
    this.handleAddColumn();
  }
  handleChange = (event, index, value) => this.setState({value});

  handleChangeManualCaseType = (e) => {
    this.setState({value:e.target.value});
  }
  handleAddColumn = () => {
    this.props.onAddColumn(this.state.value);
    this.setState({manualAddCaseType:false});
    this.setState({openAddNewColumn:false});
  }
  handleTextareaClose(){
    this.setState({openAddNewColumn:false});
  }
  handleNewCaseType = () => {
    this.setState({manualAddCaseType:true});
  }
  render(){
    var styles = {
      style:{
        margin: 12,
        borderRadius:'3px'
      }
    }


  var ele;
   if(!this.state.openAddNewColumn){
      ele = <div className="lists mode-add"><div onTouchTap={this.handleAddNewColumn}>Add New Column...</div></div>
   }else{

       var formCaseType;
       if(this.state.manualAddCaseType){
         formCaseType = <div><TextField onChange={this.handleChangeManualCaseType} hintText="" floatingLabelText="Type"  floatingLabelFixed={true}/><br /></div>
       }else{
         var listType = this.props.listType.map(function(item,k){
             return <MenuItem value={item.name} key={k} primaryText={item.name} />;
         });
         formCaseType =
         <SelectField floatingLabelText="Type" value={this.state.value} onChange={this.handleChange}>
           {listType}
           <MenuItem value="Other" key={"other"} onTouchTap={this.handleNewCaseType} primaryText="Add new item..."></MenuItem>
         </SelectField>
       }

        ele =
          <div className="lists">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group form-group-sm">
                {formCaseType}
              <br/>
              </div>
              <div className="form-footer">
                <RaisedButton label="Add" onTouchTap={this.handleAddColumn} primary={true} style={styles.style} />
                <RaisedButton label="Cancel" onTouchTap={this.handleTextareaClose} style={style} />
              </div>
            </form>
          </div>
   }
   const style = {
     box: {
       'width':300,'padding':'8px','margin':'0px 10px','border': '1px solid rgb(217, 217, 217)'
     }
   }
   return (
     <Paper zDepth={2}  style={style.box}>{ele}</Paper>
   );
  }
}
export default NewTypeCase;
