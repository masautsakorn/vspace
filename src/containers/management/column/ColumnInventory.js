import  React from 'react';
import {lightBlack} from 'material-ui/styles/colors';

const ColumnInventory = [
  {Header:'Category',accessor:'category_name'},
  {Header:'Type',accessor:'type_name'},
  {Header:'Item',accessor:'item_name'},
  {Header:'Owner',accessor:'owner_name'},
  {Header:'Part Number',accessor:'pn'},
  {Header:'Model',accessor:'model'},
  {Header:'Brand',accessor:'brand'},
  {Header:'Serial Number',accessor:'serial_no' },
  {Header:'Quantity',accessor:'quantity',maxWidth:70},
  {Header:'Branch',accessor:'branch_name'},
  {Header:'Address',accessor:'address'},
  {Header:'Province',accessor:'province'},
  {Header:'Zone',accessor:'zone'},
];
export default ColumnInventory
