import  React from 'react';
import {lightBlack} from 'material-ui/styles/colors';

const ColumnServiceReport = [{
  Header:'End user',
  accessor:'end_user'
},{
  Header: 'Case No.',
  accessor: 'no_ticket',
  maxWidth:'100'
},{
  Header: 'Service Report No.',
  accessor: 'no_task',
  maxWidth:'100'
},{
  Header: 'Subject',
  accessor: 'name',
},{
  Header:'Contract',
  accessor:'contract_no',
  maxWidth:80
},{
  Header:'Staff',
  accessor:'engineer_name',
  maxWidth:120
}, {
  Header: 'Create By',
  accessor: 'create_by_name',
  maxWidth:120,
  Cell: props => <span className='number'>{props.value}</span> // Custom cell components!
}, {
  Header: 'Create datetime',
  accessor: 'create_datetime',
  maxWidth:120
}, {
  Header: 'Appointment',
  accessor:'appointment',
  maxWidth:120
},
// {
//   Header: 'Started',
//   accessor:'started_datetime',
//   maxWidth:120
// },
{
  Header: 'Closed',
  accessor:'closed_datetime',
  maxWidth:120
},{
  Header:'PDF',
  accessor:'path_service_report',
  maxWidth:60,
  Cell: props=> <div style={{textAlign:'right'}}>{((props.value)?<a href={"../pdf/"+props.value}>PDF</a>:'-')}</div>
}];

export default ColumnServiceReport;
