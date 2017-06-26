import React from 'react';
import {cyan600, pink600, purple600, orange600} from 'material-ui/styles/colors';
import Assessment from 'material-ui/svg-icons/action/assessment';
import Face from 'material-ui/svg-icons/action/face';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ShoppingCart from 'material-ui/svg-icons/action/shopping-cart';
import InfoBox from '../components/dashboardSOS/InfoBox';
import NewOrders from '../components/dashboardSOS/NewOrders';
import Severity1 from '../components/dashboardSOS/Severity1';
import Severity2 from '../components/dashboardSOS/Severity2';
import TopBreakdown from '../components/dashboardSOS/TopBreakdown';

import PieChart from '../components/dashboardSOS/PieChart';
import RecentlyProducts from '../components/dashboardSOS/RecentlyProducts';
import globalStyles from '../styles';
import Data from '../data';

const DashboardPage = () => {

  return (
    <div>
      <h3 style={globalStyles.navigation}>Dashboard / Report</h3>

      {
      //   <div className="row">
      //
      //   <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      //     <InfoBox Icon={ShoppingCart}
      //              color={pink600}
      //              title="Total Profit"
      //              value="1500k"
      //     />
      //   </div>
      //
      //
      //   <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      //     <InfoBox Icon={ThumbUp}
      //              color={cyan600}
      //              title="Likes"
      //              value="4231"
      //     />
      //   </div>
      //
      //   <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      //     <InfoBox Icon={Assessment}
      //              color={purple600}
      //              title="Sales"
      //              value="460"
      //     />
      //   </div>
      //
      //   <div className="col-xs-12 col-sm-6 col-md-3 col-lg-3 m-b-15 ">
      //     <InfoBox Icon={Face}
      //              color={orange600}
      //              title="New Members"
      //              value="248"
      //     />
      //   </div>
      // </div>
      }

      <div className="row">
        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-md m-b-15">
          <Severity1 data={Data.dashBoardPage.severity1}/>
        </div>

        <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6 m-b-15">
          <Severity2 data={Data.dashBoardPage.severity2}/>
        </div>
      </div>


      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <PieChart data={Data.dashBoardPage.pie}/>
        </div>

        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6 m-b-15 ">
          <TopBreakdown data={Data.dashBoardPage.TopBreakdown}/>
        </div>

      </div>

    </div>
  );
};

export default DashboardPage;
