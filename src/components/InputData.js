import '../App.css'
import React, { useState } from "react";
import { parseAssignements , makeEvents ,makeCalendar } from "../utils/parseData";
import Modal from './Modal';

const InputData = () => {
  const [inputRawData,setInputRawData] = useState("");
  const [courseList,setCourseList]=useState([])
  const [success,setSuccess]=useState("")
  const [error,setError]=useState("")

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
   
 
    if(courseList.length!==0)
    {
    const {calendar}=makeCalendar(courseList) // u also get success:true from the object
    downloadCalendar(calendar)
    setError("")
    setSuccess("File Downloaded successfully")
    }
    else
    {
      setSuccess("")
      setError("Add a course to generate calendar")
    }
    
  };

  const handleCourses=()=>{

    if(inputRawData==="")
    alert("Please paste the text")
    else
    {
      try {

        const parsedData = parseAssignements(inputRawData);
        const eventslist= makeEvents(parsedData)
        setCourseList([...courseList,...eventslist])
        setInputRawData("")
        setError("")
        setSuccess("Course added successfully")
        // console.log(courseList)
        
      } catch (error) {

        alert("Something went wrong paste propely")
        setInputRawData("")
        
      }

    }
  }

  return (
    <div>

      <h3>Vtop to Google Calendar</h3>
      <h4 className="success">{success.length > 0 && success }</h4>
      <h4 className="error">{error.length > 0 && error }</h4>
      <textarea
        rows="30"
        cols="100"
        style={{resize:'none',outline:'none'}}
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
          setError("")
          setSuccess("All courses deleted , you can start again")
          setCourseList([]);
        }}
      >
        Reset 
      </button>

    </div>
  );
};

export default InputData;
