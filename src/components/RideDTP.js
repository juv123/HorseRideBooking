import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { getDay } from 'date-fns';
import { useDispatch } from 'react-redux';
import { addRideDate } from '../config/rideSlice';

const RideDTP = () => {
  const [rideDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  const filterTime = (time) => {
    const date = new Date(time);
    const hour = date.getHours();
    const day = getDay(date);

    if (day >= 1 && day <= 5) {
      return true;
    }

    if (day === 6) {
      return hour >= 15 && hour <= 23;
    }

    return false;
  };

  const filterDate = (date) => {
    const day = getDay(date);
    return day >= 1 && day <= 6;
  };

  const updateRideDate = (date) => {
    setSelectedDate(date);
    dispatch(addRideDate(date.toISOString())); // Store ISO string in state
  };

  return (
    <div className='dtp'>
      <label>Select Date & Time of ride:</label>
      <DatePicker
        selected={rideDate}
        onChange={(date) => updateRideDate(date)}
        showTimeSelect
        timeIntervals={60}
        filterTime={filterTime}
        filterDate={filterDate}
        dateFormat="MMMM d, yyyy h:mm aa"
        placeholderText="When do you want to Ride?"
      />
    </div>
  );
};

export default RideDTP;