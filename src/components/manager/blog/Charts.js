import React, { useState, useEffect } from "react";
import SmallStats from "../../common/SmallStats";
import { Col } from "shards-react";
const Charts = ({analysisData}) => {
  const [Items, setItems] = useState(null);
  useEffect(() => {
    setItems([
      {
        label: "Users",
        value: analysisData[3].totalUser,
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(0, 184, 216, 0.1)",
            borderColor: "rgb(0, 184, 216)",
            data: [1, 2, 1, 3, 5, 4, 9],
          },
        ],
      },
      {
        label: "Posts",
        value: analysisData[0].totalPost,
        attrs: { md: "6", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(23,198,113,0.1)",
            borderColor: "rgb(23,198,113)",
            data: [1, 2, 3, 3, 3, 4, 4],
          },
        ],
      },
      {
        label: "Approved Report",
        value: analysisData[1].totalApproved,
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,180,0,0.1)",
            borderColor: "rgb(255,180,0)",
            data: [2, 3, 3, 3, 4, 3, 3],
          },
        ],
      },
      {
        label: "Rejected posts",
        value: analysisData[2].totalRejected,
        attrs: { md: "4", sm: "6" },
        datasets: [
          {
            label: "Today",
            fill: "start",
            borderWidth: 1.5,
            backgroundColor: "rgba(255,65,105,0.1)",
            borderColor: "rgb(255,65,105)",
            data: [1, 7, 1, 3, 1, 4, 8],
          },
        ],
      },
    ]);
  }, [analysisData]);
  return Items!==null? Items.map((stats, idx) => (
    <Col className="col-lg mb-4" key={idx} {...stats.attrs}>
      <SmallStats
        id={`small-stats-${idx}`}
        variation="1"
        chartData={stats.datasets}
        chartLabels={stats.chartLabels}
        label={stats.label}
        value={stats.value}
        percentage={stats.percentage}
        increase={stats.increase}
        decrease={stats.decrease}
      />
    </Col>
  )):<p>loading</p>;
};

export default Charts;
