import React from 'react'

const Instructions = () => {
    return (
        <div>
            <h3>Instructions</h3>
            <ol  style={{textAlign:'left',fontSize:'18px'}}>
                <li>Copy and paste the assignment page of any subject here</li>
                <li>Click on add course</li>
                <li>Repeat step 1 and 2 for as many subjects as you wish</li>
                <li>Click on submit to get a .ics file</li>
                <li>Go to your google calendar and import this file</li>
                <li><a href="https://youtu.be/OBUT6bu2y9Q" style={{color:'#27ae60'}}>Click here to view demo</a></li>
                
            </ol>
        </div>
    )
}

export default Instructions
