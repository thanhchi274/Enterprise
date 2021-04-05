import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    width: "50%",
  },
}));

const TimePicker = ({ schedule, setSchedule, type }) => {
  const classes = useStyles();

  const handleChangeTime = (e) => {
    if (type === "start") {
      setSchedule({
        ...schedule,
        start: e.target.value,
      });
    } else {
      setSchedule({
        ...schedule,
        end: e.target.value,
      });
    }
  };

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="time"
        type="time"
        defaultValue="07:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
        onChange={handleChangeTime}
      />
    </form>
  );
};

export default TimePicker;
