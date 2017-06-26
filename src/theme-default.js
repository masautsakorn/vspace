import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {cyan500, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: cyan500
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: cyan500,
  }
});


export default themeDefault;
