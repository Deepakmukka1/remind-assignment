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
                <li> Go to your google calendar and import this file</li><br/>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/j9OHpvAdoes" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </ol>
        </div>
    )
}

export default Instructions
