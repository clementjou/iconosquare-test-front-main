import React from "react";
import LiveTable from "./table/LiveTable";
import LiveChart from "./chart/LiveChart";


const Content = () => {
  return (
    <div className="mx-auto max-w-7xl px-8">
      <LiveChart />
      <LiveTable />
    </div>
  );
};

export default Content;
