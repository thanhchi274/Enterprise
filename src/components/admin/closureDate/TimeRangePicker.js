import React from "react";
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

const nameMapper = {
  ar: "Arabic",
  bg: "Bulgarian",
  ca: "Catalan",
  cs: "Czech",
  cy: "Welsh",
  da: "Danish",
  de: "German",
  el: "Greek",
  enGB: "English (United Kingdom)",
  enUS: "English (United States)",
  eo: "Esperanto",
  es: "Spanish",
  et: "Estonian",
  faIR: "Persian",
  fi: "Finnish",
  fil: "Filipino",
  fr: "French",
  hi: "Hindi",
  hr: "Croatian",
  hu: "Hungarian",
  hy: "Armenian",
  id: "Indonesian",
  is: "Icelandic",
  it: "Italian",
  ja: "Japanese",
  ka: "Georgian",
  ko: "Korean",
  lt: "Lithuanian",
  lv: "Latvian",
  mk: "Macedonian",
  nb: "Norwegian Bokmål",
  nl: "Dutch",
  pl: "Polish",
  pt: "Portuguese",
  ro: "Romanian",
  ru: "Russian",
  sk: "Slovak",
  sl: "Slovenian",
  sr: "Serbian",
  sv: "Swedish",
  th: "Thai",
  tr: "Turkish",
  uk: "Ukrainian",
  vi: "Vietnamese",
  zhCN: "Chinese Simplified",
  zhTW: "Chinese Traditional",
};

const TimeRangePicker = ({ title, year }) => {
  const localeOptions = Object.keys(locales)
    .map((key) => ({
      value: key,
      label: `${key} - ${nameMapper[key] || ""}`,
    }))
    .filter((item) => nameMapper[item.value]);

  const [locale, setLocale] = React.useState("ja");
  const [date, setDate] = useState(null);
  const [closureDates, setClosureDates] = React.useState([]);

  const handleChooseDate = (date) => {
    const dateObject = new Date(date);

    if (dateObject.getFullYear() >= year) {
      if (dateObject >= new Date()) {
        setClosureDates([
          ...closureDates,
          dateObject.toLocaleDateString("en-US"),
        ]);
        setDate(date);
      } else {
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
      for (let index = 0; index < closureDates.length; index++) {
        const element = closureDates[index];

        result += `${newline}-${element}`;
      }
      return result;
    } else {
      return "Chosen dates ...";
    }
  };

  const handleReset = (e) => {
    e.preventDefault();

    setClosureDates([]);
  };

  const handleSave = (e) => {
    e.preventDefault();
  };

  return (
    <Card small className="blog-comments">
      <CardHeader className="border-bottom">
        <h6 className="m-0">{title}</h6>
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
  title: "Date Picker",
};

export default TimeRangePicker;
