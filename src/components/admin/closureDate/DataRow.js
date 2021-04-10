import React, { useEffect, useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker,
} from "@material-ui/pickers";
import { Button } from "shards-react";
import DateFnsUtils from "@date-io/date-fns";
import { updateClosureDateStart } from "../../../Store/data/data.action";
import { connect } from "react-redux";

const DataRow = ({ item,updateClosureDateStart }) => {
  const [edit, setEdit] = useState(true);
  const [selectedDate, setSelectedDate] = React.useState();
  const [EndDate, setEndDate] = useState();
  const handleDateChange = (date) => {
    setSelectedDate(date.toString());
  };
  const handleEndDateChange = (date) => {
    setEndDate(date.toString());
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    let data = { ...item, Start: selectedDate, End: EndDate };
    await Promise.all([
      (async () => updateClosureDateStart(data))(),
      (async () => setEdit(!edit))(),
    ]);
  };
  useEffect(() => {
    setEndDate(item.End);
    setSelectedDate(item.Start);
  }, [item]);
  return (
    <tr className={!item.Faulty ? "" : "hover_item_table"}>
      <td>{item.ID}</td>
      <td>{item.Faulty}</td>
      <td>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd/MM/yyyy hh:mm a"
            value={selectedDate}
            onChange={handleDateChange}
            disabled={edit}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </td>
      <td>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDateTimePicker
            margin="normal"
            id="date-picker-dialog"
            label="Date picker dialog"
            format="dd/MM/yyyy hh:mm a"
            value={EndDate}
            onChange={handleEndDateChange}
            disabled={edit}
            KeyboardButtonProps={{
              "aria-label": "change date",
            }}
          />
        </MuiPickersUtilsProvider>
      </td>
      <td>
        {edit ? (
          <Button
            size="sm"
            theme="primary"
            className="mb-2 mr-1"
            style={{
              marginLeft: "10px",
              marginBottom: "0",
            }}
            onClick={() => setEdit(!edit)}
          >
            Change Schedule
          </Button>
        ) : (
          <Button
            size="sm"
            theme="primary"
            className="mb-2 mr-1"
            style={{
              marginLeft: "10px",
              marginBottom: "0",
            }}
            onClick={(event) => handleSubmit(event)}
          >
            Submit Change
          </Button>
        )}
      </td>
    </tr>
  );
};
const mapDispatchToProps = (dispatch) => ({
  updateClosureDateStart: (data) => dispatch(updateClosureDateStart(data)),
});

export default connect(null, mapDispatchToProps)(DataRow);
