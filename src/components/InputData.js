import "../App.css";
import React, { useState } from "react";
import {
  parseAssignements,
  makeEvents,
  makeCalendar,
} from "../utils/parseData";
import Instructions from "./Instructions";
import SampleText from './sample.txt'

const InputData = () => {
  const [totalCoursesCount, setTotalCoursesCount] = useState(0);
  const [inputRawData, setInputRawData] = useState("");
  const [courseList, setCourseList] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  function downloadCalendar(calendar) {
    const fileName = "calendar.ics";
    const downloadElement = document.createElement("a");
    downloadElement.setAttribute(
      "href",
      `data:text/plain;charset=utf-8,${encodeURIComponent(calendar)}`
    );
    downloadElement.setAttribute("download", fileName);
    downloadElement.click();
    window.open("https://calendar.google.com/calendar");
  }

  const handleSubmit = () => {
    if (courseList.length !== 0) {
      const { calendar } = makeCalendar(courseList); // u also get success:true from the object
      downloadCalendar(calendar);
      setError("");
      setSuccess("File Downloaded successfully");
    } else {
      setSuccess("");
      setError("Add a course and click on submit to generate calendar");
    }
  };

  const handleCourses = () => {
    if (inputRawData === "") alert("Please paste the text");
    else {
      try {
        const parsedData = parseAssignements(inputRawData);
        const eventslist = makeEvents(parsedData);
        const type = eventslist[0].description.split("\n")[3].split(":")[1];
        setCourseList([...courseList, ...eventslist]);
        setInputRawData("");
        setError("");
        setSuccess(
          `${eventslist[0].title} ${type}  assignments added successfully`
        );
        setTotalCoursesCount(totalCoursesCount + 1);
      } catch (error) {
        setError("");
        setSuccess("");
        alert("Something went wrong paste propely");
        setInputRawData("");
      }
    }
  };

  return (
    <div style={{ padding: "10px", marginBottom: "30px" }}>
      <h3>
        <u>Vtop to Google Calendar</u>
      </h3>
      <p>Sync all your assignments in vtop to google calendar in minutes 🔥 </p>
      <Instructions />
      <h5>Total courses added : {totalCoursesCount}</h5>
      <h5 className="success">{success.length > 0 && success}</h5>
      <h5 className="error">{error.length > 0 && error}</h5>
      <textarea
        rows="30"
        cols="100"
        style={{ resize: "none", outline: "none" }}
        placeholder="Please paste the data here"
        onChange={(e) => {
          setInputRawData(e.target.value);
        }}
        value={inputRawData}
      ></textarea>
      <br />
      <button
        className="btn submit"
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
      <button
        className="btn add"
        onClick={() => {
          handleCourses();
        }}
      >
        Add course
      </button>
      <button
        className="btn reset"
        onClick={() => {
          setError("");
          setSuccess("All courses deleted , you can start again");
          setCourseList([]);
          setTotalCoursesCount(0);
        }}
      >
        Reset
      </button>
      <button
        className="btn add"
        onClick={async() => {
          const response = await fetch(SampleText)
          const text = await response.text()
          setInputRawData(text)
        }}
      >
        Try sample course
      </button>
    </div>
  );
};

export default InputData;
