import React from 'react';
import Paper from 'material-ui/Paper';
import {white, pink600, pink500, blue500,cyan600,green500,cyan400} from 'material-ui/styles/colors';
import {BarChart, Bar, ResponsiveContainer, XAxis, Tooltip, Legend, CartesianGrid} from 'recharts';
import GlobalStyles from '../../styles';

const Severity1 = (props) => {

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

  return (
    <Paper style={styles.paper}>
      <div style={{...styles.header}}>Severity 1 Resolution Time (1 to 31 March 2017)</div>
      <div style={styles.div}>
        <ResponsiveContainer>
          <BarChart data={props.data} >
            <CartesianGrid strokeDasharray="3 3"/>
            <Tooltip/>
            <Legend />
            <Bar dataKey="gradeB" name="40-60 Min" stackId="a" label fill={green500}/>
            <Bar dataKey="gradeA" name="0-40 Min" stackId="a" label fill={cyan400}/>

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

export default Severity1;
