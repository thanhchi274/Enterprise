import React from "react";
import { Row, Col, Card, CardHeader, CardBody } from "shards-react";
import { createStructuredSelector } from "reselect";
import {
  selectClosureDates,
  selectEachEvent,
} from "../../../Store/data/data.selector";
import { connect } from "react-redux";
import { fetchEachEventStart } from "../../../Store/data/data.action";
const TimeTable = ({
  isATimeSelected,
  setSelectedATime,
  setFaulty,
  ClosureData,
  fetchEachEventStart,
}) => {
  const handleChooseItemTable = async (faulty) => {
    await Promise.all([
      (async () => fetchEachEventStart(faulty))(),
      (async () => setFaulty(faulty))(),
      (async () => setSelectedATime(!isATimeSelected))(),
    ]);
  };
  return (
    <Row style={{ overflowX: "auto" }}>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Time Table</h6>
          </CardHeader>
          <CardBody className="p-0">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    ID
                  </th>
                  <th scope="col" className="border-0">
                    Faulty
                  </th>
                  <th scope="col" className="border-0">
                    Start Date
                  </th>
                  <th scope="col" className="border-0">
                    Closure Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {ClosureData.map((item, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover_item_table"
                      onClick={() => handleChooseItemTable(item.Faulty)}
                    >
                      <td>{item.ID}</td>
                      <td>{item.Faulty}</td>
                      <td>{new Date(item.Start).toLocaleDateString()}</td>
                      <td>{new Date(item.End).toLocaleDateString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
const mapStateToProps = createStructuredSelector({
  eachEvent: selectEachEvent,
  ClosureData: selectClosureDates,
});

const mapDispatchToProps = (dispatch) => ({
  fetchEachEventStart: (data) => dispatch(fetchEachEventStart(data)),
});
export default connect(mapStateToProps, mapDispatchToProps)(TimeTable);
