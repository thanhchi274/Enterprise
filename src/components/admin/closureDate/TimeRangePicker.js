import React,{useEffect} from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Row,
  Form,
  FormTextarea,
  ButtonGroup,
  Button,
} from "shards-react";
import { Calendar } from "react-date-range";
import * as locales from "react-date-range/dist/locale";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { notifyError } from "../../../utils/toast";
import { OLD_DATE } from "../../../const/errors";
import { FormGroup } from "@material-ui/core";
import {updateClosureDateStart} from '../../../Store/data/data.action'
import {selectClosureDates} from '../../../Store/data/data.selector'
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
const nameMapper = {
  enUS: "English (United States)",
  vi: "Vietnamese",
};

const TimeRangePicker = ({ event, year,updateClosureDateStart,closureData}) => {
  const localeOptions = Object.keys(locales)
    .map((key) => ({
      value: key,
      label: `${key} - ${nameMapper[key] || ""}`,
    }))
    .filter((item) => nameMapper[item.value]);

  const [locale, setLocale] = React.useState("ja");
  const [date, setDate] = useState(null);
  const [closureDates, setClosureDates] = React.useState([]);
  useEffect(() => {
    console.log(closureDates)
    // setClosureDates(closureData[0].closureDates)
  }, [])
  const handleChooseDate = (date) => {
    const dateObject = new Date(date);
    const dateYear = dateObject.getFullYear();
    if (dateYear >= year && closureDates.includes(dateObject.toLocaleDateString("en-US"))===false) {
      if (dateObject >= new Date()) {
        setClosureDates([
          ...closureDates,
          dateObject.toLocaleDateString("en-US"),
        ]);
        setDate(date);
      }
       else {
        notifyError(OLD_DATE);
      }
    } else {
      notifyError(OLD_DATE);
    }
  };

  const formatChosenDates = () => {
    var result = "Closure dates:";
    var newline = String.fromCharCode(13, 10);
    if (closureDates.length > 0) {
      for (let index = 0; index < 2; index++) {
         const element = closureDates[index];
         if(index=1){
          result += `${'Start Date'}-${element}`;
         }
         if(index=2){
          result += `${'End Date'}-${element}`;
         }
      }
      return result;
    }
    else {
      return "Chosen dates ...";
    }
  };

  const handleReset = async(e) => {
    e.preventDefault()
    await Promise.all([
      (async()=>setClosureDates([]))(),
      (async()=> updateClosureDateStart([]))()
  ])
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log(e)
    updateClosureDateStart(closureDates)
  };
  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{event}</h6>
      </CardHeader>
      <CardBody className="p-0" id="body_reports">
        <div style={{ display: "flex", flexFlow: "column nowrap" }}>
          <select
            style={{ margin: "20px auto" }}
            onChange={(e) => setLocale(e.target.value)}
            value={locale}
          >
            {localeOptions.map((option, i) => (
              <option value={option.value} key={i}>
                {option.label}
              </option>
            ))}
          </select>
          <Calendar
            onChange={(item) => handleChooseDate(item)}
            locale={locales[locale]}
            date={date}
          />
        </div>
        ;
      </CardBody>

      <CardFooter className="border-top">
        <Row>
          <Form className="quick-post-form">
            <FormGroup>
              <FormTextarea
                placeholder="Chosen dates ..."
                disabled
                value={formatChosenDates()}
                style={{ fontSize: "15px" }}
              />
            </FormGroup>
          </Form>
        </Row>
        <Row>
          <ButtonGroup size="sm">
            <Button theme="white" onClick={handleReset}>
              <span className="text-info">
                <i className="material-icons">restart_alt</i>
              </span>{" "}
              Reset
            </Button>
            <Button theme="white" onClick={handleSave}>
              <span className="text-primary">
                <i className="material-icons">save</i>
              </span>{" "}
              Save
            </Button>
          </ButtonGroup>
        </Row>
      </CardFooter>
    </Card>
  );
};

TimeRangePicker.propTypes = {
  title: PropTypes.string,
};

TimeRangePicker.defaultProps = {
  title: "Closure Data Picker",
};

const mapStateToProps = createStructuredSelector ({
  closureData:selectClosureDates
})

const mapDispatchToProps = (dispatch) => ({
  updateClosureDateStart: (data) => dispatch(updateClosureDateStart(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeRangePicker);
