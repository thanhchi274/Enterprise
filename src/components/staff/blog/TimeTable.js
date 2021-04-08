import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import { notifyError } from "../../../utils/toast";
import { LACK_START_END_TIME, END_OVER_START } from "../../../const/errors";
import { createStructuredSelector } from "reselect";
import { selectClosureDates,selectEachEvent } from "../../../Store/data/data.selector";
import { connect } from 'react-redux'
import {fetchEachEventStart} from '../../../Store/data/data.action'
const TimeTable = ({isATimeSelected,setSelectedATime,ClosureData,fetchEachEventStart }) => {
  console.log(ClosureData)
  const handleChooseItemTable = async(id) => {
    await Promise.all([
      (async()=>  fetchEachEventStart(id))(),
      (async()=>  setSelectedATime(!isATimeSelected))()
  ])
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
                      onClick={() => handleChooseItemTable(item)}
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
eachEvent:selectEachEvent,
 ClosureData:selectClosureDates
})

const mapDispatchToProps = (dispatch) => ({
  fetchEachEventStart:(data)=>dispatch(fetchEachEventStart(data))
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
