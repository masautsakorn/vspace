import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Url from '../config/url';
import get from '../config/Get';
import Put from '../config/Put';
import InfoGen from '../config/InfoGen';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavCompoment from '../nav/NavCompoment';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Drawer from 'material-ui/Drawer';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  }
};

class Ticket extends Component {
  constructor(props){
    super(props);

    this.state = {
      // state for tabel
       fixedHeader: true,
       fixedFooter: true,
       stripedRows: false,
       showRowHover: false,
       selectable: false,
       multiSelectable: false,
       enableSelectAll: false,
       deselectOnClickaway: true,
       showCheckboxes: false,

      //  state for drawer
        open: false,
        openSecondary:true,
        ticket:[],
        caseType:[],
      //state for select dropdown
        values: [],
        valueOwner:1,
        valueStatus:1

     };

  }

  componentDidMount() {
    var formData = new FormData();
    formData.append('email', InfoGen.email);
    formData.append('token', InfoGen.token);
    formData.append('type_view','active');
    formData.append('status_view','active');
    formData.append('owner','myself');
    var that = this;
    get(Url.ticket, formData).then(function(res){
      console.log(res);
      that.setState({ticket:res.data, caseType:res.caseType});
    });
  }

  // handle for Drawer
  handleToggle = () => this.setState({open: !this.state.open});

// handle for selected
  handleChange = (event, index, values) => this.setState({values});
  handleOwnerChange = (event, index, valueOwner) => this.setState({valueOwner});
  handleStatusChange = (event, index, valueStatus) => this.setState({valueStatus});
  menuItems = (values) => {
    return this.state.caseType.map((item,i) => (
      <MenuItem
        key={i}
        insetChildren={true}
        checked={values && values.includes(item.name)}
        value={item.name}
        primaryText={item.name}
      />
    ));
  }

  render(){
    const {values, valuesOwner} = this.state;
    var tableBody = [];
    this.state.ticket.forEach((item, i) => {
      tableBody.push(
        <TableRow key={i} selected={item.selected}  onTouchTap={this.handleToggle} >
          <TableRowColumn style={{'width':'10%'}} >{item.no_ticket}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}} >{item.contract_no}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}}>{item.end_user}</TableRowColumn>
          <TableRowColumn style={{'width':'20%'}}>{item.subject}</TableRowColumn>
          <TableRowColumn style={{'width':'20%'}}>{item.owner}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}}>{item.case_type}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}}>{item.urgency}</TableRowColumn>
          <TableRowColumn style={{'width':'10%'}}>{item.status_name}</TableRowColumn>
        </TableRow>
      );
    });

    return(
      <MuiThemeProvider>
        <div>
              <NavCompoment info={this.props.info} />
              <div>
                <SelectField
                  multiple={true}
                  hintText="Select type"
                  value={values}
                  onChange={this.handleChange}
                  style={{'marginLeft':'2%'}}
                  autoWidth={true}
                >
                  {this.menuItems(values)}
                </SelectField>
                <SelectField
                  value={this.state.valueOwner}
                  onChange={this.handleOwnerChange}
                  style={{'marginLeft':'2%'}}
                  autoWidth={true}
                >
                  <MenuItem value={1} primaryText="My" />
                  <MenuItem value={2} primaryText="Team" />
                </SelectField>

                <SelectField
                  value={this.state.valueStatus}
                  onChange={this.handleStatusChange}
                  style={{'marginLeft':'2%'}}
                  autoWidth={true}
                >
                  <MenuItem value={1} primaryText="In Process" />
                  <MenuItem value={2} primaryText="Resolved" />
                  <MenuItem value={3} primaryText="Miss SLA" />
                </SelectField>

                <Drawer
                   docked={false} width={'50%'}
                   open={this.state.open}
                   openSecondary={this.state.openSecondary}
                   onRequestChange={(open) => this.setState({open})}
                 >
                 </Drawer>
                 <Card style={styles.root}>
                   <CardText>
                      <Table
                        fixedHeader={this.state.fixedHeader}
                        fixedFooter={this.state.fixedFooter}
                        selectable={this.state.selectable}
                        multiSelectable={this.state.multiSelectable}
                      >
                            <TableHeader
                               displaySelectAll={this.state.showCheckboxes}
                               adjustForCheckbox={this.state.showCheckboxes}
                               enableSelectAll={this.state.enableSelectAll}
                             >
                                 <TableRow>
                                  <TableHeaderColumn style={{'width':'10%'}}>No</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}}>Contact</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}}>End User</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'20%'}} >Subject</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'20%'}} >Ower</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}} >Type</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}} >Urgency</TableHeaderColumn>
                                  <TableHeaderColumn style={{'width':'10%'}} >Status</TableHeaderColumn>
                                </TableRow>
                            </TableHeader>
                            <TableBody
                                displayRowCheckbox={this.state.showCheckboxes}
                                deselectOnClickaway={this.state.deselectOnClickaway}
                                showRowHover={this.state.showRowHover}
                                stripedRows={this.state.stripedRows}
                              >
                            {tableBody}
                            </TableBody>
                      </Table>
                    </CardText>
                  </Card>
                </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Ticket;
