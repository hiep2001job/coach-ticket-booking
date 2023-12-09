// Town

import { createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../../app/api/agent";
import { Office } from "../../app/models/office";
import { Town } from "../../app/models/town";
import { RootState } from "../../store/configureStore";
import { getAxiosParams } from "../../utils/getAxiosParams";
import { setMetaData } from "./managmentSlice";
import { Route } from "../../app/models/route";
import { Trip } from "../../app/models/trip";
import { BookingResult } from "../../app/models/booking";
import { UserDetail } from "../../app/models/user";

//Fetch towns
export const fetchTownsAsync = createAsyncThunk<
  Town[],
  void,
  { state: RootState }
>("management/fetchTowns", async (_, thunkApi) => {
  try {
    const response = await agent.Town.fetch();
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

// Offices
//Fetch offices
export const fetchOfficesAsync = createAsyncThunk<
  Office[],
  void,
  { state: RootState }
>("management/fetchOffices", async (_, thunkApi) => {
  try {
    const response = await agent.Office.fetchPaginated(
      getAxiosParams(thunkApi.getState().management.officeParams!)
    );
    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});
//Create offices
export const createOfficesAsync = createAsyncThunk<
  Office[],
  any,
  { state: RootState }
>("management/createOffices", async (data, thunkApi) => {
  try {
    const response = await agent.Office.create(data);
    thunkApi.dispatch(fetchOfficesAsync());
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

//Update offices
export const updateOfficesAsync = createAsyncThunk<
  void,
  any,
  { state: RootState }
>("management/updateOffices", async (data, thunkApi) => {
  try {
    const response = await agent.Office.update(data);
    thunkApi.dispatch(fetchOfficesAsync());
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

// Route
//Fetch offices
export const fetchFullOfficesAsync = createAsyncThunk<
  Office[],
  void,
  { state: RootState }
>("management/fetchFullOffices", async (_, thunkApi) => {
  try {
    const response = await agent.Office.fetch();
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});
//Fetch Route
export const fetchRoutesAsync = createAsyncThunk<
  Route[],
  void,
  { state: RootState }
>("management/fetchRoutes", async (_, thunkApi) => {
  try {
    const response = await agent.Route.fetchPaginated(
      getAxiosParams(thunkApi.getState().management.routesParams!)
    );
    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});
//Create Route
export const createRouteAsync = createAsyncThunk<
  Route,
  any,
  { state: RootState }
>("management/createRoute", async (data, thunkApi) => {
  try {
    const response = await agent.Route.create(data);
    thunkApi.dispatch(fetchRoutesAsync());
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

//Update Route
export const updateRouteAsync = createAsyncThunk<
  void,
  any,
  { state: RootState }
>("management/updateeRoute", async (data, thunkApi) => {
  try {
    const response = await agent.Route.update(data);
    thunkApi.dispatch(fetchRoutesAsync());
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

//Trips
export const getAllTrips = createAsyncThunk<Trip[], void, { state: RootState }>(
  "management/getAllTrips",
  async (_, thunkApi) => {
    try {
      const response = await agent.Trip.getAllTrips(
        thunkApi.getState().management.tripParams!
      );
      thunkApi.dispatch(setMetaData(response.metaData));
      return response.items;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);
//create trip
export const createTrip = createAsyncThunk<string, any, { state: RootState }>(
  "management/creatTrip",
  async (data, thunkApi) => {
    try {
      const response = await agent.Trip.create(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);
//update trip
export const updateTrip = createAsyncThunk<string, any, { state: RootState }>(
  "management/updateTrip",
  async (data, thunkApi) => {
    try {
      const response = await agent.Trip.update(data);
      return response;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);
//get all booking
export const getAllBookings = createAsyncThunk<
  BookingResult[],
  void,
  { state: RootState }
>("management/getAllBookings", async (_, thunkApi) => {
  try {
    const response = await agent.Booking.getAll(
      thunkApi.getState().management.bookingManagementParams!
    );
    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

//get all booking
export const getAllCutstomers = createAsyncThunk<
  UserDetail[],
  void,
  { state: RootState }
>("management/getAllCutstomers", async (_, thunkApi) => {
  try {
    const response = await agent.Booking.getAll(
      thunkApi.getState().management.bookingManagementParams!
    );
    thunkApi.dispatch(setMetaData(response.metaData));
    return response.items;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});
