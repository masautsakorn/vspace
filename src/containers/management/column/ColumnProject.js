import  React from 'react';
import {lightBlack} from 'material-ui/styles/colors';
const ColumnProject = [
 {
   Header:'End user',
   accessor:'end_user'
 },{
 Header: 'Name',
 accessor: 'name',
},{
 Header:'Contract',
 accessor:'contract_no',
 maxWidth:80,
 Cell:props => <div style={{textAlign:'center'}}>{props.value}</div>,
 filterMethod: (filter, row) => (row[filter.id].includes(filter.value))
}, {
 Header: 'Create By',
 accessor: 'create_by_name',
 maxWidth:120,
 // Cell: props => <span onTouchTap={()=>alert(123)} className='number'>{props.value}</span> // Custom cell components!
}, {
 Header: 'Create datetime',
 accessor: 'create_datetime',
 maxWidth:120
}, {
 Header: 'Status',
 accessor:'status_label',
 maxWidth:80
}, {
 Header: 'Progress',
 accessor:'progress',
 Cell: row => (
   <div
     style={{
       width: '100%',
       height: '100%',
       backgroundColor: '#dadada',
       borderRadius: '2px',
       textAlign:'center',
       color:lightBlack,
       position:'relative'
     }}
   >
     <div
       style={{
         width: '100%',
         position:'absolute',
         height: '100%',
         transition: 'all .2s ease-out',
       }}
     >{row.value}%</div>
     <div
       style={{
         width: `${row.value}%`,
         height: '100%',
         backgroundColor: row.value > 66 ? '#85cc00'
           : row.value > 33 ? '#ffbf00'
           : '#ff2e00',
         borderRadius: '2px',
         transition: 'all .2s ease-out',
       }}
     />
   </div>
 ),
 maxWidth:120
}];
export default ColumnProject;
