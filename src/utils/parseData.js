/* eslint-disable no-throw-literal */
const ics= require('ics')
export const getCourseDetails=(splitdata)=>{

    return [
        splitdata[4].split("\n")[1],
        splitdata[5],
        splitdata[6],
        splitdata[7],
      ];
    
}

const isDate = (date)=> {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));

}
  
  const setNewDate=(dates)=>{
  
    // console.log(typeof dates,dates)
    // console.log(isDate(dates))
    if(isDate(dates))
    {
    const dateparam=new Date(dates)
    const setRemainderBefore= 120 * 60 * 60 * 1000;
    const newDate= new Date(dateparam - setRemainderBefore)
    return newDate.toISOString();
    }
    return dates
  }
  

export const parseAssignements=(data)=>{
    try {

        
        let splitdata = data?.split("\t");
        // console.log(splitdata)
        splitdata = splitdata.filter((eachdata) => {
          return eachdata.length !== 0;
        });
      
        splitdata = splitdata.filter((eachdata) => {
        //   const regex = /(am|pm|AM|PM)/gm;
        const regex = /([1-9]|0[1-9]|1[0-2]):[0-5][0-9] ([AaPp][Mm])$/gm
        // console.log(eachdata.match(regex))
          return eachdata.match(regex) == null;
        });
        // console.log(splitdata)
        // console.log(splitdata)
        // splitdata.unshift("Semester");
        // console.log(splitdata)
        if ((splitdata.length - 1) % 5 !== 0) {
      
            throw "Parsing error";
        }
        const [semester, courseCode, courseName, courseType] = getCourseDetails(splitdata)
        let assignments = [];
        for (let i = 0; i < splitdata.length - 1; i += 5) {
          const obj = {};
          obj.title = splitdata[i + 1];
          obj.marks = splitdata[i + 3];
          obj.duedate = splitdata[i+4];
          // setNewDate(splitdata[i+4]);
          assignments.push(obj);
        }
        assignments = assignments.slice(3);
        return {courseData:{semester, courseCode, courseName, courseType,assignments},success:true};
        
    } catch (error) {
        
        throw "Parsing error"
    }
}

export const makeEvents=({courseData,success})=>{

    if(success)
    {
    const events=[];
    const {assignments,courseCode,courseName,semester}=courseData
    for(const assignment in assignments)
    {

        const description=`Course Code : ${courseCode} \nYou have an assignment in 5 days \nAssignment : ${assignments[assignment].title}`
        const title=`${courseName}`
        const {duedate}=assignments[assignment]
        const [year,month,date]=setNewDate(duedate).split('T')[0].split("-")
        // console.log(+date,+month,+year)
        const event = {
            start: [+year, +month, +date, 5, 30], // string to number
            duration: { minutes: 5 },
            title: title,
            description: description,
            location: semester,
          }
        events.push(event)
        
    }
    return events
  }
    else
    {
        throw "Error in creating event"
    }


}

export const makeCalendar=(events)=>{

  const calendarObject={}
  ics.createEvents(events, (error, value) => {
      if (error) {
        console.log(error)
        return
      }
      calendarObject.calendar=value
      calendarObject.success=true
      
    })
  return calendarObject

  }