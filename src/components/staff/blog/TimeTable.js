import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { notifyError } from "../../../utils/toast";
import { LACK_START_END_TIME, END_OVER_START } from "../../../const/errors";
import { createStructuredSelector } from "reselect";
import { selectClosureDates } from "../../../Store/data/data.selector";
import { connect } from 'react-redux'

const timeArray = [
  {
    id: 1,
    start: "7:20",
    end: "21:00",
    pendingPosts: 30,
    approvedPosts: 8,
    comments: 15,
  },
  {
    id: 2,
    start: "7:30",
    end: "11:00",
    pendingPosts: 20,
    approvedPosts: 8,
    comments: 15,
  },
];

const TimeTable = ({ setSelectedATime,ClosureData }) => {
  console.log(ClosureData)
  const handleChooseItemTable = (id) => {
    const allItemTable = document.getElementsByClassName("hover_item_table");
    for (let index = 0; index < allItemTable.length; index++) {
      const element = allItemTable[index];
      if (element.id === String(id)) {
        element.style.backgroundColor = "rgb(240, 240, 240)";
      } else {
        element.style.backgroundColor = "white";
      }
    }
    setSelectedATime(true);
  };
  return (
    <Row style={{ overflowX: "auto" }}>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Time Table</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    Closure date
                  </th>
                  <th scope="col" className="border-0">
                    Pending Posts
                  </th>
                  <th scope="col" className="border-0">
                    Approved Posts
                  </th>
                  <th scope="col" className="border-0">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
              {ClosureData.map((item, index) => {
                  let sortTime = item.closureDates.sort((a,b)=>a>b?-1:0)
                  return parseInt(item.year) === new Date().getFullYear()?
                  sortTime.map((item, index) => {
                    return (
                      <tr
                      key={index}
                      className="hover_item_table"
                      onClick={() => handleChooseItemTable(item.id)}
                      >
                      <td>{item}</td>
                      <td>{item.pendingPosts ? item.pendingPosts : "0"}</td>
                      <td>{item.approvedPosts ? item.approvedPosts : "0"}</td>
                      <td>{item.comments ? item.comments : "0"}</td>
                      </tr>
                    )})
               :null;
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
const mapStateToProps =createStructuredSelector ({
 ClosureData:selectClosureDates
})

const mapDispatchToProps = {
  
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
