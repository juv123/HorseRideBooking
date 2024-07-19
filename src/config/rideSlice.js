import { createSlice } from "@reduxjs/toolkit";

const rideSlice=createSlice({
    name:'ride',
    initialState:{
     rideDate:null,
         },
    reducers:{
       
          addRideDate:(state,action)=>{
            state.rideDate=action.payload;
           
             }
    },
});
export const {addRideDate}=rideSlice.actions;
export default rideSlice.reducer;
