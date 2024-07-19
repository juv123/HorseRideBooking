import React, { useRef, useState } from 'react';
import { validateData } from "../config/ValidateData";
import { horse1, horse2, horse3, horse4, horse_ride_icon } from '../config/constants';
import RideDTP from './RideDTP';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { format, parseISO } from 'date-fns';
import { fromZonedTime, formatInTimeZone } from 'date-fns-tz';
const BookingForm = () => {
  const email = useRef(null);
  const phno = useRef(null);
  const name = useRef(null);
  const [errMsg, setErrMsg] = useState(null);
  const [horse, setSelectedHorse] = useState("");
  const rideDate = useSelector((store) => store.ride.rideDate);
  const navigate=useNavigate();
 const goBackToPreviousPage=()=>{
   navigate(-1)
}

  const handleValidations = () => {
    const msg = validateData(email.current.value, phno.current.value, name.current.value);
    setErrMsg(msg);
    if (msg) return;

    if (horse && rideDate) {
      const { date, time } = parseRideDate(rideDate);
      
      const calendarLink = generateCalendarLink(horse, date, time);

      toast.success(
        <>
          Your Booking is Confirmed! You have booked the horse '{horse}. Thank you! Please Visit again.
          <br />
          <a href={calendarLink} target="_blank" rel="noopener noreferrer" download="horse_ride_invite.ics">Add to Calendar</a>
        </>,
        {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );

      email.current.value = "";
      phno.current.value = "";
      name.current.value = "";
    } else {
      toast.error('Something went wrong. Please fill all the details and book the ride again!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const parseRideDate = (rideDate) => {
    const dateObject = new Date(rideDate);
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0');
    const day = String(dateObject.getDate()).padStart(2, '0');
    const hours = String(dateObject.getHours()).padStart(2, '0');
    const minutes = String(dateObject.getMinutes()).padStart(2, '0');
    const seconds = String(dateObject.getSeconds()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
    const formattedTime = `${hours}:${minutes}:${seconds}`;
    return { date: formattedDate, time: formattedTime };
  };

 const generateCalendarLink = (horseName, date, time) => {
  const timeZone = 'Asia/Kolkata';

  // Parse the local date and time string into a Date object
  const localDateTime = parseISO(`${date}T${time}`);

  // Convert the local Date object to a Date object in the specified time zone
  const zonedStartDate = fromZonedTime(localDateTime, timeZone);

  // Create the end date, which is one hour after the start date
  const endDate = new Date(zonedStartDate.getTime() + 60 * 60 * 1000);

  // Format the start and end dates as required by the ICS format
  const formattedStartDate = formatInTimeZone(zonedStartDate, 'UTC', "yyyyMMdd'T'HHmmss'Z'");
  const formattedEndDate = formatInTimeZone(endDate, 'UTC', "yyyyMMdd'T'HHmmss'Z'");

  // Create the ICS content
  const icsContent = `
BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Your Organization//Your Product//EN
BEGIN:VEVENT
UID:uid1@example.com
DTSTAMP:${formattedStartDate}
ORGANIZER;CN=Admin:MAILTO:deegaaug@gmail.com
DTSTART:${formattedStartDate}
DTEND:${formattedEndDate}
SUMMARY:Invitation for Horse Ride on ${horseName} 
DESCRIPTION:Enjoy an amazing ride with our powerful ${horseName}.
END:VEVENT
END:VCALENDAR
  `.trim();

  // Encode the ICS content
  const encodedIcsContent = encodeURIComponent(icsContent);

  // Return the data URL for the ICS file
  return `data:text/calendar;charset=utf8,${encodedIcsContent}`;
};
  const getSelectedValue = (e) => setSelectedHorse(e.target.value);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()} className="bookingFrm">
        <img className='icon_ride' src={horse_ride_icon} alt="" />
        <h2>Book your Ride</h2>
        <div className='select'>
          <label>Choose your Horse:</label>
          <select value={horse} onChange={getSelectedValue}>
            <option value="">--Choose an option--</option>
            <option value={horse1}>{horse1}</option>
            <option value={horse2}>{horse2}</option>
            <option value={horse3}>{horse3}</option>
            <option value={horse4}>{horse4}</option>
          </select>
          <RideDTP />
        </div>
        <input type="text" ref={name} placeholder="Full Name" className="inputs" required />
        <input type="text" ref={email} placeholder="Email ID" className="inputs" />
        <input type="text" ref={phno} placeholder="Phone Number" className="inputs" />
        <p className="errMsg">{errMsg}</p>
        <div className='submitbackBtns'>
        <button className="btnBack" onClick={goBackToPreviousPage}>{"<< Back"}</button>
        <button className="submit" onClick={handleValidations}>Submit</button>
       
        </div>
        <ToastContainer />
       

      </form>
    </div>
  );
}

export default BookingForm;
