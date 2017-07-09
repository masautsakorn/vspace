import  React from 'react';
import {lightBlack} from 'material-ui/styles/colors';

const ColumnCase = [
  {
    Header:'End user',
    accessor:'end_user'
  },
  {
    Header:'Remedy No.',
    accessor:'refer_remedy_hd',
    maxWidth:150
  },
{
  Header: 'No.',
  accessor: 'no_ticket',
  maxWidth:100
},{
  Header: 'Subject',
  // id:'sid',
  accessor: 'name',
  // Cell:props => <span onTouchTap={()=>that.handleOpenTicketDrawer(props.original)}>{props.value}</span>
},{
  Header:'Contract',
  accessor:'contract_no',
  maxWidth:80
},{
  Header:'Owner',
  accessor:'owner_thainame',
  maxWidth:200
}, {
  Header:'Type',
  accessor:'case_type',
  maxWidth:80
  // Filter: ({filter, onChange}) => (
  //   <select
  //     onChange={event => onChange(event.target.value)}
  //     style={{width: '100%'}}
  //     value={filter ? filter.value : 'all'}
  //   >
  //     <option value='' />
  //     <option value='Implement'>Implement</option>
  //     <option value='Preventive Maintenance'>Preventive Maintenance</option>
  //   </select>
  // )
},
// {
//   Header: 'Create By',
//   accessor: 'create_by_name',
//   maxWidth:120,
//   Cell: props => <span onTouchTap={()=>alert(123)} className='number'>{props.value}</span> // Custom cell components!
// },
{
  Header: 'Create datetime',
  accessor: 'create_datetime',
  maxWidth:120
}, {
  Header: 'Status',
  accessor:'status_label',
  maxWidth:80
},
{
  Header:'Number Sr.',
  accessor:'number_service_report',
  maxWidth:80,
  Cell:props => <div style={{textAlign:'right'}}>{props.value}</div>,
}
// {
  // Header: 'More',
    // expander: true,
    // Header: () => (<strong>More</strong>),
    // width: 65,
    // Expander: ({isExpanded, ...rest}) => (
    //   <div>
    //     {isExpanded ? <span>&#x2299;</span> : <span>&#x2295;</span>}
    //   </div>
    // ),
    // style: {cursor: 'pointer', fontSize: 25, padding: '0', textAlign: 'center', userSelect: 'none'},
// }
]
export default ColumnCase;
