import React, { Component } from 'react';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import TimePicker from 'material-ui/TimePicker';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import {
  Step,
  Stepper,
  StepLabel,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import Chip from 'material-ui/Chip';
import {GridList, GridTile} from 'material-ui/GridList';
import {grey400, darkBlack, lightBlack} from 'material-ui/styles/colors';
import Moment from 'react-moment';
import MenuItem from 'material-ui/MenuItem';
import SelectField from 'material-ui/SelectField';
import moment from 'moment';
import ContentAdd from 'material-ui/svg-icons/content/add';
import OwnerDialog from '../projectplan/OwnerDialog';
import SocialPersonAdd from 'material-ui/svg-icons/social/person-add';
import CommunicationChatBubble from 'material-ui/svg-icons/communication/chat-bubble';
import MapsLocalTaxi from 'material-ui/svg-icons/maps/local-taxi';
import ActionSchedule from 'material-ui/svg-icons/action/schedule';
import Checkbox from 'material-ui/Checkbox';
import Snackbar from 'material-ui/Snackbar';

export default ServiceReportListView extends Component {
  constructor(props){
    super(props);
    this.state = {appointment:this.props.appointment};
  }
  render(){
    return(

    )
  }
}
