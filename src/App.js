import moment from "moment/moment";
import React, { useState } from "react";
import ApiCalendar from "react-google-calendar-api";
import Calendar from "./components/Calender";

function App() {
  const gapi = window.gapi;
  const google = window.google;

  const config = {
    clientId:
      "598556046676-04h9o6a0phto595efmmdev6jou0uncko.apps.googleusercontent.com",
    apiKey: "AIzaSyAiaQeYVNnKhN3mCI5hLgo9ijJOVJF0_iA",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };

  const apiCalendar = new ApiCalendar(config);
  console.log("api calender ====", apiCalendar.createEvent);

  const createNewEvent = () => {
    const event = {
      summary: "My Event",
      description: "Description of my event",
      start: {
        dateTime: moment().toISOString(), // Replace with the desired start time
        timeZone: "Your Time Zone",
      },
      end: {
        dateTime: moment().add(1, "hour").toISOString(), // Replace with the desired end time
        timeZone: "Your Time Zone",
      },
    };
    apiCalendar.createEvent(event, "primary", (result) => {
      console.log("Event created:", result);
    });
  };

  const [accessToken, setAccessToken] = useState(null);
  console.log("accesstoken =========", accessToken);
  const handleOAuthLogin = () => {
    // Replace 'YOUR_CLIENT_ID' and 'YOUR_REDIRECT_URI' with your actual values
    const clientId =
      "598556046676-04h9o6a0phto595efmmdev6jou0uncko.apps.googleusercontent.com";
    const redirectUri = [
      "https://dyscorse-d10ed.firebaseapp.com/__/auth/handler",
    ];

    // Redirect the user to the Google OAuth consent page
    const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=https://www.googleapis.com/auth/calendar&response_type=code`;
    window.location.href = authUrl;
  };

  const handleCreateEvent = () => {
    // Use the access token to create an event in the Google Calendar API
    if (!accessToken) {
      console.error("Access token is not available. Please log in first.");
      return;
    }

    const eventDetails = {
      summary: "Your Event Title",
      description: "Event Description",
      location: "Event Location",
      start: {
        dateTime: "2023-11-02T10:00:00",
        timeZone: "Your Time Zone",
      },
      end: {
        dateTime: "2023-11-02T12:00:00",
        timeZone: "Your Time Zone",
      },
    };

    fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(eventDetails),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Event created:", data);
      })
      .catch((error) => {
        console.error("Error creating event:", error);
      });
  };

  return (
    <div className="App">
      {/* {accessToken ? (
        <button onClick={handleCreateEvent}>
          Create Google Calendar Event
        </button>
      ) : (
        <button onClick={createNewEvent}>Log in with Google</button>
      )} */}
      <Calendar />
    </div>
  );
}

export default App;
