import "date-fns";
import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Button } from "shards-react";
import DataRow from './DataRow'
const DateTable = ({ closureData }) => {
  return (
    <Row style={{ overflowX: "auto" }}>
      <Col>
        <Card small className="mb-4">
          <CardBody className="p-0 pb-3">
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
                    Start dates
                  </th>
                  <th scope="col" className="border-0">
                    Closure dates
                  </th>
                  <th scope="col" className="border-0">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {closureData?.map((item, idx) => (
                  <DataRow key={idx} item={item}/>
                ))}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default DateTable;
