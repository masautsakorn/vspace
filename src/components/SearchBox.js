import React from 'react';
// import TextField from 'material-ui/TextField';
// import {white, blue500} from 'material-ui/styles/colors';
// import IconButton from 'material-ui/IconButton';
// import Search from 'material-ui/svg-icons/action/search';

const SearchBox = () => {

  // const styles = {
  //   iconButton: {
  //     float: 'left',
  //     paddingTop: 17
  //   },
  //   textField: {
  //     color: white,
  //     backgroundColor: blue500,
  //     borderRadius: 2,
  //     height: 35
  //   },
  //   inputStyle: {
  //     color: white,
  //     paddingLeft: 5
  //   },
  //   hintStyle: {
  //     height: 16,
  //     paddingLeft: 5,
  //     color: white
  //   }
  // };

  return (
    <div style={{height:'100%',textAlign:'center'}}>
        {
          // <IconButton style={styles.iconButton} >
          //<Search color={white} />
          // </IconButton>
        }
        <a href="/"><img alt="" src="http://vspace.in.th/img/vspace.png" style={{height:'100%'}} /></a>
      {
        // <TextField
        //   hintText="Search..."
        //   underlineShow={false}
        //   fullWidth={true}
        //   style={styles.textField}
        //   inputStyle={styles.inputStyle}
        //   hintStyle={styles.hintStyle}
        // />
      }
    </div>
  );
};

export default SearchBox;
