import React, { Component } from 'react';
import {CloseProject} from '../../actions/ActionProject';
import InfoGen from '../../config/InfoGen';
import TextField from 'material-ui/TextField';

export default class ProjectClose extends Component {
  constructor(props){
    super(props);
    this.state = {comment_close_project:''};
  }
  closeProjectNow = () => {
    var that = this;
    CloseProject(this.props.project_sid, this.state.comment_close_project).then((res)=>{
      console.log(res);
      that.setState({comment_close_project:''});
      that.props.loadNew();
    })
  }
  renderForm = () => {
    return <div className="project-header">
      <div className="project-label">Close Project</div>
      <div className="project-value">
        <div>
            <TextField className="textFillColorWhite" onChange={(e)=>this.setState({comment_close_project:e.target.value})}
              color={'#ffffff'}
              textareaStyle={{color:'#ffffff',WebkitTextFillColor:'#ffffff'}}
              style={{color:'#ffffff',WebkitTextFillColor:'#ffffff',width:'100%'}}
              inputStyle={{color:'#ffffff'}}
              hintStyle={{color:'#ffffff'}}
              floatingLabelStyle={{color:'#ffffff'}}
              hintText="หมายเหตุ"
              floatingLabelText="หมายเหตุ"
              multiLine={true}
              rows={2}
            />
        </div>
        <div className="row" style={{marginLeft:0,marginRight:0}}>
          <div className="col-xs-12 col-sm-2 col-md-2 col-lg-2 col-md btn four" onTouchTap={()=>this.closeProjectNow()}>ปิด Project เดี๋ยวนี้</div>
        </div>
      </div>
    </div>
  }
  render(){
    return this.renderForm()
  }
}
