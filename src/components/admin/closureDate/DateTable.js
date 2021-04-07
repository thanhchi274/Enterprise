import React, {useEffect} from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
const DateTable = ({ setSelectedATime,closureData, setYear }) => {
  const handleChooseItemTable = (id, year) => {
    const allItemTable = document.getElementsByClassName("hover_item_table");
    var hasValidElement = false;
    for (let index = 0; index < allItemTable.length; index++) {
      const element = allItemTable[index];
      if (element.id === String(id)) {
        element.style.backgroundColor = "rgb(240, 240, 240)";
        hasValidElement = true;
      } else {
        element.style.backgroundColor = "white";
      }
    }
    if (hasValidElement) {
      setYear(year);
    } else {
      setYear();
    }
  };
  const handleSetSchedule = (event)=>{
    console.log(event)
  }
  return (
    <Row style={{ overflowX: "auto" }}>
      <Col>
        <Card small className="mb-4">
          <CardHeader className="border-bottom">
            <h6 className="m-0">Year Table</h6>
          </CardHeader>
          <CardBody className="p-0 pb-3">
            <table className="table mb-0">
              <thead className="bg-light">
                <tr>
                  <th scope="col" className="border-0">
                    ID
                  </th>
                  <th scope="col" className="border-0">
                    Year
                  </th>
                  <th scope="col" className="border-0">
                    Closure dates
                  </th>
                </tr>
              </thead>
              <tbody>
                {closureData?.map((item, idx) => (
                  <tr
                    key={idx}
                    id={item.id}
                    className={
                      item.year < new Date().getFullYear()
                        ? ""
                        : "hover_item_table"
                    }
                    onClick={() => handleChooseItemTable(item.id, item.year)}
                  >
                    <td>{item.id}</td>
                    <td>{item.year}</td>
                    <td>
                      {item.closureDates.length > 0 ? (
                        item.closureDates.map((date, id) => (
                          <p
                            key={id}
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            - {date}{" "}
                            {item.year <= new Date().getFullYear() && (
                              <Button
                                size="sm"
                                theme="primary"
                                className="mb-2 mr-1"
                                style={{
                                  marginLeft: "10px",
                                  marginBottom: "0",
                                }}
                                onClick={(e) => handleSetSchedule(e, item.date)}
                              >
                                Export report
                              </Button>
                            )}
                          </p>
                        ))
                      ) : (
                        <p>Wait for setting</p>
                      )}
                    </td>
                  </tr>
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
