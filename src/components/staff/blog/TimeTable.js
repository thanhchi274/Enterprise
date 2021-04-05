import React from "react";
import { Row, Col, Card, CardHeader, CardBody, Button } from "shards-react";
import TimePicker from "./TimePicker";
import { notifyError } from "../../../utils/toast";
import { LACK_START_END_TIME, END_OVER_START } from "../../../const/errors";
const timeArray = [
  {
    date: new Date().toLocaleDateString('en-US'),
    start: null,
    end: null,
    pendingPosts: null,
    comments: null,
  },
  {
    date:'12-11-2022',
    start: "7:20",
    end: "21:00",
    pendingPosts: 30,
    comments: 15,
  },
  {
    date:new Date().toLocaleDateString('en-US'),
    start: "7:30",
    end: "11:00",
    pendingPosts: 20,
    comments: 15,
  },
];

const TimeTable = ({ setSelectedATime,onToggle }) => {
  const [array, setArray] = React.useState(null);
  const [schedule, setSchedule] = React.useState(null);

  React.useEffect(() => {
    setArray(timeArray);
  }, []);

  React.useEffect(() => {
    if (schedule && schedule.start && schedule.end && schedule.date) {
      var newArray = array.filter((item) => item.date !== schedule.date);
      newArray.push({
        date: schedule.date,
        start: schedule.start.split(" ")[0],
        end: schedule.end.split(" ")[0],
        pendingPosts: null,
        comments: null,
        waiting: true,
      });

      newArray.sort((a, b) => {
        if (a.date < b.date) {
          return 1;
        }
        if (a.date > b.date) {
          return -1;
        }
        return 0;
      });

      setArray(newArray);
    }
  }, [schedule]);

  const handleSetSchedule = (e, date) => {
    e.preventDefault();

    if (!schedule?.start || !schedule?.end) {
      notifyError(LACK_START_END_TIME);
      return;
    }

    if (schedule.end < schedule.start) {
      notifyError(END_OVER_START);
      return;
    }

    setSchedule({
      ...schedule,
      date: date,
    });
  };

  const handleChooseItemTable = (date, start) => {
    if (start) {
      const allItemTable = document.getElementsByClassName("hover_item_table");
      for (let index = 0; index < allItemTable.length; index++) {
        const element = allItemTable[index];
        if (element.id === date) {
          element.style.backgroundColor = "rgb(240, 240, 240)";
        } else {
          element.style.backgroundColor = "white";
        }
      }
      setSelectedATime(!onToggle);
    }
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
                    Date
                  </th>
                  <th scope="col" className="border-0">
                    Start
                  </th>
                  <th scope="col" className="border-0">
                    End
                  </th>
                  <th scope="col" className="border-0">
                    Pending Posts
                  </th>
                  <th scope="col" className="border-0">
                    Comments
                  </th>
                  <th scope="col" className="border-0">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {array?.map((item, idx) => (
                  <tr
                    key={idx}
                    id={item.date}
                    className={item.start && "hover_item_table"}
                    onClick={() => handleChooseItemTable(item.date, item.start)}
                  >
                    <td>
               <input type="date" id="start" name="trip-start" defaultValue= {item.date} min="2010-01-01" max="2021-12-31" />
                    </td>
                    <td>
                      {item.start ? (
                        item.start
                      ) : (
                        <TimePicker
                          schedule={schedule}
                          setSchedule={setSchedule}
                          type="start"
                        />
                      )}
                    </td>
                    <td>
                      {item.end ? (
                        item.end
                      ) : (
                        <TimePicker
                          schedule={schedule}
                          setSchedule={setSchedule}
                          type="end"
                        />
                      )}
                    </td>
                    <td>{item.pendingPosts ? item.pendingPosts : "0"}</td>
                    <td>{item.comments ? item.comments : "0"}</td>
                    <td>
                      {!item.start ? (
                        <Button
                          size="sm"
                          theme="primary"
                          className="mb-2 mr-1"
                          onClick={(e) => handleSetSchedule(e, item.date)}
                        >
                        New Event
                        </Button>
                      ) : (
                        <>
                          {item.waiting && (
                            <Button
                              size="sm"
                              theme="warning"
                              className="mb-2 mr-1"
                              disabled
                            >
                              Waiting
                            </Button>
                          )}
                        </>
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

export default TimeTable;
