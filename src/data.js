import React from 'react';
import Assessment from 'material-ui/svg-icons/action/assessment';
import GridOn from 'material-ui/svg-icons/image/grid-on';
import PermIdentity from 'material-ui/svg-icons/action/perm-identity';
import Web from 'material-ui/svg-icons/av/web';
import {cyan600, pink600, purple600} from 'material-ui/styles/colors';
import ExpandLess from 'material-ui/svg-icons/navigation/expand-less';
import ExpandMore from 'material-ui/svg-icons/navigation/expand-more';
import ChevronRight from 'material-ui/svg-icons/navigation/chevron-right';

const data = {
  menus: [
    { text: 'DashBoard', icon: <Assessment/>, link: '/dashboard' },
    { text: 'Form Page', icon: <Web/>, link: '/form' },
    { text: 'Table Page', icon: <GridOn/>, link: '/table' },
    { text: 'Login Page', icon: <PermIdentity/>, link: '/login' }
  ],
  tablePage: {
    items: [
      {id: 1, name: 'Product 1', price: '$50.00', category: 'Category 1'},
      {id: 2, name: 'Product 2', price: '$150.00', category: 'Category 2'},
      {id: 3, name: 'Product 3', price: '$250.00', category: 'Category 3'},
      {id: 4, name: 'Product 4', price: '$70.00', category: 'Category 4'},
      {id: 5, name: 'Product 5', price: '$450.00', category: 'Category 5'},
      {id: 6, name: 'Product 6', price: '$950.00', category: 'Category 6'},
      {id: 7, name: 'Product 7', price: '$550.00', category: 'Category 7'},
      {id: 8, name: 'Product 8', price: '$750.00', category: 'Category 8'}
    ]
  },
  dashBoardPage: {
    recentProducts: [
      {id: 1, title: 'Samsung TV', text: 'Samsung 32 1080p 60Hz LED Smart HDTV.'},
      {id: 2, title: 'Playstation 4', text: 'PlayStation 3 500 GB System'},
      {id: 3, title: 'Apple iPhone 6', text: 'Apple iPhone 6 Plus 16GB Factory Unlocked GSM 4G '},
      {id: 4, title: 'Apple MacBook', text: 'Apple MacBook Pro MD101LL/A 13.3-Inch Laptop'}
    ],
    monthlySales: [
      {name: 'Jan', uv: 3700},
      {name: 'Feb', uv: 3000},
      {name: 'Mar', uv: 2000},
      {name: 'Apr', uv: 2780},
      {name: 'May', uv: 2000},
      {name: 'Jun', uv: 1800},
      {name: 'Jul', uv: 2600},
      {name: 'Aug', uv: 2900},
      {name: 'Sep', uv: 3500},
      {name: 'Oct', uv: 3000},
      {name: 'Nov', uv: 2400},
      {name: 'Dec', uv: 2780}
    ],
    severity1: [
      {name: 'Nov-16', gradeA: 11, gradeB: 3},
      {name: 'Dec-16', gradeA: 4, gradeB: 0},
      {name: 'Jan-17', gradeA: 10, gradeB: 0},
      {name: 'Feb-17', gradeA: 10, gradeB: 0},
      {name: 'Mar-17', gradeA: 20, gradeB: 0},
      {name: 'Apr-17', gradeA: 0, gradeB: 0},
      {name: 'May-17', gradeA: 0, gradeB: 0},
      {name: 'Jun-17', gradeA: 0, gradeB: 0},
      {name: 'Jul-17', gradeA: 0, gradeB: 0},
      {name: 'Aug-17', gradeA: 0, gradeB: 0},
      {name: 'Sep-17', gradeA: 0, gradeB: 0},
      {name: 'Oct-17', gradeA: 0, gradeB: 0},
    ],
    severity2: [
      {name: 'Nov', gradeA: 9, gradeB: 9,gradeC: 12, gradeD:18},
      {name: 'Dec', gradeA: 5, gradeB: 3,gradeC: 5, gradeD:9},
      {name: 'Jan', gradeA: 4, gradeB: 2,gradeC: 4, gradeD:0},
      {name: 'Feb', gradeA: 4, gradeB: 2,gradeC: 5, gradeD:4},
      {name: 'Mar', gradeA: 5, gradeB: 1,gradeC: 3, gradeD:2},
      {name: 'Apr', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'May', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'Jun', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'Jul', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'Aug', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'Sep', gradeA: 0, gradeB: 0,gradeC: 0},
      {name: 'Oct', gradeA: 0, gradeB: 0,gradeC: 0},
    ],
    pie: [
      {name:'software', value:31,color:cyan600},
      {name:'hardware', value:50,color:pink600},
      {name:'application', value:19,color:purple600}
    ],
    TopBreakdown:[
      {name:'Printer', value:616},
      {name:'PC, Notebook, Mouse',value:578},
      {name:'Laser', value:322},
      {name:'เครื่องกดบัตรคิว', value:220}
    ],
    newOrders: [
      {pv: 2400},
      {pv: 1398},
      {pv: 9800},
      {pv: 3908},
      {pv: 4800},
      {pv: 3490},
      {pv: 4300}
    ],
    browserUsage: [
      {name: 'Chrome', value: 800, color: cyan600, icon: <ExpandMore/>},
      {name: 'Firefox', value: 300, color: pink600, icon: <ChevronRight/>},
      {name: 'Safari', value: 300, color: purple600, icon: <ExpandLess/>}
    ]
  }
};

export default data;
