import React, { useState } from "react";
import { parseAssignements , makeCalendar } from "../utils/parseData";

const InputData = () => {
  const [inputRawData, setInputRawData] = useState("");


  function downloadCalendar(calendar) {
    const fileName = "calendar.ics";
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(calendar)}`
    );
    downloadElement.setAttribute("download", fileName);
    downloadElement.click();
    // window.open("https://calendar.google.com/calendar");
  }

  const handleSubmit = () => {
    const parsedData = parseAssignements(inputRawData);
    const calenderData= makeCalendar(parsedData)
    // console.log(calenderData)
    downloadCalendar(calenderData.calendar)
    
  };

  return (
    <div>
      <textarea
        rows="30"
        cols="100"
        style={{resize:'none'}}
        onChange={(e) => {
          setInputRawData(e.target.value);
        }}
        value={inputRawData}
      ></textarea>
      <br />
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default InputData;
