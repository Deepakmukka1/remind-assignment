import React from 'react'

const Instructions = () => {
    return (
        <div>
            <h3><u>Instructions</u></h3>
            <ol  style={{textAlign:'left',fontSize:'18px'}}>
                <li> Copy and paste the assignment page of any subject here ( Ctrl A + Ctrl C  assignment page and Ctrl V in this page )</li>
                <li> Click on add course</li>
                <li> Repeat step 1 and 2 for as many subjects as you wish</li>
                <li> Click on submit to get a .ics file</li>
                <li> Go to your google calendar and import this file</li>
                <li><a href="https://youtu.be/j9OHpvAdoes" style={{color:'#27ae60'}} target="_blank"> Click here to view demo</a></li>
                
            </ol>
        </div>
    )
}

export default Instructions
