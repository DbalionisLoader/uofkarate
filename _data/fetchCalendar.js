/* Node.js Google calendar API fetch - run only during build -
 need to webhook to auto build on calendar change */
 /* Required changes
    - Add crediant file as enviroment variable to netlify - DONE
    - request all needed json details about the events - DONE
    - configure script auto run on build - DONE
    - configure trigger to build on event update - DONE using pipedream
    - ensure past events are hidden */

console.log("Data js connected");
//Libraries
const {google} = require('googleapis'); /* Required for google object import */
const {auth} = require('google-auth-library'); /* Required for auth object */
const fs = require('fs'); /* node.js file system to read json and write to json*/
const axios = require('axios'); /* Promise based HTTP client library to make GET, POST, PUT AND DELETE request and receive a handle responses */
const { Console } = require('console'); //Write logs to file library - not used
require('dotenv').config(); 

//Create creadiant object 
/*  const crediantials = JSON.parse(fs.readFileSync('uol-karate-events-513d09d09e24.json','utf8'));  */
//Convert JSON keys and user (email) id string into js object
 const credentials = JSON.parse(process.env.CREDS); 
 const CAL_TEST_ID = process.env.CAL_TEST_ID;



 async function fetchGoogleCalenderEvents() {
    const client = auth.fromJSON(credentials); //Authenticate user object
    client.scopes = ['https://www.googleapis.com/auth/calendar.readonly']; //Scope to read only calendar

    //Initialize google calendar API client - version and authenticate object
    const calendar = google.calendar({version: 'v3', auth: client});


    //Fetch event list with parameters
    const response = await calendar.events.list({
        calendarId: CAL_TEST_ID, //from which calendar
        maxResults: 5, //no of results
        singleEvents: true, //single occurance of recurring events
        orderBy: 'startTime', //sort by start time
        timeMin: (new Date()).toISOString(), //get events from current time
    });
    //Check event object to retrieve correct json tag names
    console.log("display retrieved item");
    console.log(response.data.items[0]);
    //Map through the events list object - extract required fields and write them into a json file
    const events = response.data.items.map(event => {
        return {
            start: event.start.dateTime || event.start.date,
            summary: event.summary,
            location: event.location,
            desciption: event.description,
         
        }; 
    });
    console.log("Display errors");
    console.log(events);
    fs.writeFileSync('_data/calendarEvents.json', JSON.stringify(events));
}

//call function - DELETE TO PREVENT DOUBLE API CALL
fetchGoogleCalenderEvents();