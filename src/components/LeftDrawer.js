import React from 'react';
import Drawer from 'material-ui/Drawer';
import {spacing, typography} from 'material-ui/styles';
import {white, cyan500} from 'material-ui/styles/colors';
import MenuItem from 'material-ui/MenuItem';
import {Link} from 'react-router';
import Avatar from 'material-ui/Avatar';

const LeftDrawer = (props) => {
  let { navDrawerOpen } = props;
  // let state = {info:this.props.info};
  const styles = {
    logo: {
      cursor: 'pointer',
      fontSize: 22,
      color: typography.textFullWhite,
      lineHeight: `${spacing.desktopKeylineIncrement}px`,
      fontWeight: typography.fontWeightLight,
      backgroundColor: cyan500,
      paddingLeft: 40,
      height: 56,
    },
    menuItem: {
      color: white,
      fontSize: 14
    },
    avatar: {
      div: {
        padding: '15px 0 20px 15px',
        // backgroundImage:  'url(' + require('../images/material_bg.png') + ')',
        height: 45
      },
      icon: {
        float: 'left',
        display: 'block',
        marginRight: 15,
        boxShadow: '0px 0px 0px 8px rgba(0,0,0,0.2)'
      },
      span: {
        paddingTop: 12,
        display: 'block',
        color: 'white',
        fontWeight: 300,
        textShadow: '1px 1px #444'
      }
    }
  };

  return (
    <Drawer
      docked={true}
      open={navDrawerOpen}
      onRequestChange={(open) =>  props.navDrawerClose()} >
        <div style={styles.logo}>

            <Link to={"/"}><img alt="" src={"http://vspace.in.th/img/vspace.png"} style={{height:'100%'}} /></Link>
        </div>
        <div style={styles.avatar.div}>
          <Avatar src={props.info.pic_full}
                  size={50}
                  style={styles.avatar.icon}/>
          <span style={styles.avatar.span}>{props.username}</span>
        </div>
        <div>
          {props.menus.map((menu, index) => {
              if(menu.name=='Leave & Busy' || menu.name=='Standby Night'){
                return <MenuItem
                  key={index}
                  style={styles.menuItem}
                  primaryText={menu.name} onTouchTap={()=>{window.location = (menu.link)} }

                />
              }else{
                return <MenuItem onTouchTap={()=>props.navDrawerClose()}
                  key={index}
                  style={styles.menuItem}
                  primaryText={menu.name}
                  // leftIcon={menu.icon}
                  containerElement={<Link to={menu.link}/>}
                />
              }
            }
          )}
        </div>
    </Drawer>
  );
};

// LeftDrawer.propTypes = {
//   navDrawerOpen: PropTypes.bool,
//   menus: PropTypes.array,
//   username: PropTypes.string,
// };

export default LeftDrawer;
