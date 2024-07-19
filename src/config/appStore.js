import { configureStore } from "@reduxjs/toolkit";
import rideReducer from "./rideSlice";
const appStore=configureStore({
    reducer:{
        ride:rideReducer, 
    },
});
export default appStore;