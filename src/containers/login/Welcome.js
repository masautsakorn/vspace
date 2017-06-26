import React, {
    Component
} from 'react';
import FormLogin from './FormLogin.js';
import Forgot from './Forgot';
// import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// injectTapEventPlugin();
class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 1
        }
    }
    handlePage = (newPage) => {
        this.setState({
            page: newPage
        });
    }
    render() {
        var page;
        if (this.state.page === 1) {
            page = <FormLogin onChangePage={
                this.handlePage
            }
            />
        } else if (this.state.page === 2) {
            page = <Forgot onChangePage={
                this.handlePage
            }
            />
        } else if (this.state.page === 3) {
            page = <div>Sign Up </div>
        }
        return (
            <MuiThemeProvider><div>{page}</div></MuiThemeProvider>
        )
    }
}

export default Welcome;
