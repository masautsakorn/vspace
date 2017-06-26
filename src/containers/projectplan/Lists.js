import React, {
    Component
} from 'react';
import get from '../../config/Get.js';
import Url from '../../config/url';
import InfoGen from '../../config/InfoGen';
import Put from '../../config/Put.js';
import CardItem from './CardItem';
import InputNew from './InputNew';
import {
    List,
    ListItem
} from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';
import {
    grey400,
    darkBlack,
    lightBlack
} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';

class Lists extends Component {
    constructor(props) {
        super(props);
        console.log('listUserCanAddTask props', this.props.listUserCanAddTask);
        this.state = {
            header: this.props.header,
            case: this.props.item,
            statusAdding: this.props.item.status,
            status: this.props.status,
            sid: this.props.sid,
            type: this.props.type,
            listUserCanAddProject: this.props.listUserCanAddProject,
            projectInfo:this.props.projectInfo,
            listUserCanAddTask:this.props.listUserCanAddTask
        }
        this.onAddNew = this.onAddNew.bind(this);
        this.onAdding = this.onAdding.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditChange = this.onEditChange.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    onAddNew(data) {
        // alert(sid);
        // alert('test');
        // this.props.item.push({sid:10000,subject:data});
        // this.setState({case:this.props.item});
        // this.props.onAddNew(this.state.sid, data);
        this.sendDataCreateCaseToServer(this.props.type, data);
    }

    sendDataCreateCaseToServer(type, data) {
        var that = this;
        var dataForCreateCase = {
            contract_no: this.props.projectInfo.contract_no,
            project_owner_sid: this.props.projectInfo.project_owner_sid,
            subject: data,
            detail: data,
            case_type: type,
            enduser_case: this.props.projectInfo.end_user,
            enduser_address: this.props.projectInfo.end_user_address,
            urgency: "Normal",
            requester: {name: "",email: "",mobile: "",phone: "",company: ""
            },
            enduser: {
                name: "",email: "",mobile: "",phone: "",company: ""
            },
            owner: {
                thainame: "",email: InfoGen.email,mobile: "",pic: ""
            }
        };
        var formData = new FormData();
        formData.append('token', InfoGen.token);
        formData.append('email', InfoGen.email);
        formData.append('storage', JSON.stringify(dataForCreateCase));
        var tmp = this.state.case;
        Put(Url.caseCreate, formData).then(function(res) {
            // that.props.item.push({sid:res.data_res.ticket_sid,subject:data,task:[],need_checklist:[],man_days:8});
            tmp.push(res.data_res);
            that.setState({case:tmp});
        });
    }

    onAdding(sid) {
        this.props.onAdding(sid);
        this.render();
    }
    onEdit(sSid) {
        this.props.onEdit(this.state.sid, sSid);
    }
    onEditChange(sid, value) {
        this.props.onEditChange(this.state.sid, sid, value);
    }

    onDelete(sid) {
      // console.log(this.state.sid, sid);
        // this.props.onDelete(this.state.sid, sid);

        var index = -1;
        var tmp = [];
        for(var j=0;j<this.state.case.length;j++){
            if(this.state.case[j].sid!==sid){
                // index = j;
                // break;
                tmp.push(this.state.case[j]);
            }
            if((j+1)==this.state.case.length){
              console.log(tmp);
                this.setState({case: tmp});
            }
        }
        var formData = new FormData();
        formData.append('token',InfoGen.token);
        formData.append('email',InfoGen.email);
        formData.append('ticket_sid', sid);
        Put(Url.caseRemove, formData).then(function(res){
            console.log(res);
            if(res.message){
              alert(res.message);
            }
        });
        // console.log('index', index);
        // this.state.case.splice(index, 1);
    }
    handleChangeStaffCase = (ticketSid, emailNewOwner) => {
        this.props.onChangeStaffCase(ticketSid, emailNewOwner);
    };
    render() {
        var casetype = [];
        this.state.case.forEach((item, k) => {
            casetype.push(<CardItem
                    socket={this.props.socket}
                    info={this.props.info} key={item.sid}
                    onChangeStaffCase={this.handleChangeStaffCase}
                    listUserCanAddProject={this.props.listUserCanAddProject}
                    projectContact={this.props.projectInfo.project_contact}
                    projectInfo={this.props.projectInfo}
                    case={item}
                    onEdit={this.onEdit}
                    onEditChange={this.onEditChange} listUserCanAddTask={this.props.listUserCanAddTask}
                    onDelete={this.onDelete} />);
        });
            const style = {
                header: {
                    margin: '0px 0px',
                    paddingLeft: '5px'
                },
                box: {
                    'width': 300,
                    'padding': '8px',
                    'margin': '0px 10px',
                    'border': '1px solid rgb(217, 217, 217)',
                    'background': '#fafbfc',
                    'borderRadius': '3px'
                }
            }
            return (
              <Paper zDepth={2} style={style.box}>
                <Subheader style={style.header}> {this.props.header} </Subheader> {casetype}
                <InputNew onAddNew={this.onAddNew}
                  toggleTextarea={this.props.status}
                  onAdding={this.onAdding}
                  sid={this.props.sid}
                  statusAdding={this.props.status}
                  initialValue={""}/>
              </Paper>
            );
        }
    }
    export default Lists;
