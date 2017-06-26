import React from 'react';
import Paper from 'material-ui/Paper';
import {white, pink600, pink500, cyan600,blue500,orange500,yellow500,green500,cyan400,purple600} from 'material-ui/styles/colors';
import {BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Legend, CartesianGrid} from 'recharts';
import GlobalStyles from '../../styles';

const TopBreakdown = (props) => {

  const styles = {
    paper: {
      // backgroundColor: pink600,
      height: 350
    },
    div: {
      marginLeft: 'auto',
      marginRight: 'auto',
      width: '95%',
      height: 285
    },
    header: {
      color: white,
      backgroundColor: green500,
      padding: 10
    }
  };
// <div style={{...GlobalStyles.title, ...styles.header}}>Severity 2 Resolution Time (1 to 31 March 2017)</div>
  return (
    <Paper style={styles.paper}>
      <div style={{ ...styles.header}}>Top Breakdown</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data} >
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="value" label fill={cyan600}/>
            <XAxis dataKey="name" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Paper>
  );
};

// MonthlySales.propTypes = {
//   data: PropTypes.array
// };

export default TopBreakdown;
