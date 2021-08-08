import React, { useState } from "react";
import { parseAssignements , makeEvents ,makeCalendar } from "../utils/parseData";

const InputData = () => {
  const [inputRawData, setInputRawData] = useState("");
  const [courseList,setCourseList]=useState([])


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
   
    // console.log(calenderData)
    // downloadCalendar(calenderData.calendar)
    const {calendar}=makeCalendar(courseList)
    downloadCalendar(calendar)
    
  };

  const handleCourses=()=>{

    const parsedData = parseAssignements(inputRawData);
    const eventslist= makeEvents(parsedData)
    // console.log(courseList)
    setCourseList([...courseList,...eventslist])
    setInputRawData("")
  }

  return (
    <div>
      <p>Hello</p>
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
      <button
        onClick={() => {
          handleCourses();
        }}
      >
        Add next course
      </button>
    </div>
  );
};

export default InputData;
