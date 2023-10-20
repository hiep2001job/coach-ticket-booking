import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Seat } from "../../app/models/seat";
import { Trip, TripSearchParams } from "../../app/models/trip";
import { RootState } from "../../store/configureStore";
import agent from "../../app/api/agent";
import { Office } from "../../app/models/office";

// Define the state type
interface BookingState {
  status: string;
  seats: Seat[];
  trips: Trip[];
  tripParams: TripSearchParams;
  tripLoaded: Boolean;
  tripFilterApplied: Boolean;
  offices: Office[];
  officesLoaded: Boolean;
  bookingStep: string;
  tripId: string;
  searchTitle: string;
}

// Define the initial state
const initialState: BookingState = {
  status: "idle",
  //trip
  trips: [],
  tripParams: initTripParams(),
  tripLoaded: false,
  tripFilterApplied: false,
  searchTitle: "",
  //office
  offices: [],
  officesLoaded: false,
  //booking
  bookingStep: "searchTrips",
  seats: [],
  tripId: "",
};

//init trip params
function initTripParams() {
  return {
    destOfficeId: "",
    originOfficeId: "",
    departureDate: "",
    ticketCount: 1,
    floor: [],
    seatType: [],
    seatLine: [],
    departureType: [],
  };
}

//Prepare trip search params
function getAxiosParams(tripParams: TripSearchParams) {
  const params = new URLSearchParams();
  params.append("departureDate", tripParams.departureDate);
  params.append("originOfficeId", tripParams.originOfficeId);
  params.append("destOfficeId", tripParams.destOfficeId);
  params.append("ticketCount", tripParams.ticketCount.toString());
  if (tripParams.floor?.length)
    tripParams.floor!.forEach((value, index) => {
      params.append(`floor`, value.toString());
    });
  if (tripParams.seatLine?.length)
    tripParams.seatLine!.forEach((value, index) => {
      params.append(`seatLine`, value.toString());
    });
  if (tripParams.seatType?.length)
    tripParams.seatType!.forEach((value, index) => {
      params.append(`seatType`, value.toString());
    });
  if (tripParams.departureType?.length)
    tripParams.departureType!.forEach((value, index) => {
      params.append(`departureType`, value.toString());
    });

  return params;
}
//Async methods
export const searchTripsAsync = createAsyncThunk<
  Trip[],
  void,
  { state: RootState }
>("trip/searchTrips", async (_, thunkApi) => {
  const params = getAxiosParams(thunkApi.getState().booking.tripParams);
  try {
    const response = await agent.Trip.search(params);
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchOfficesAsync = createAsyncThunk<
  Office[],
  void,
  { state: RootState }
>("trip/fetchOffices", async (_, thunkApi) => {
  try {
    const response = await agent.Office.fetch();
    return response;
  } catch (error: any) {
    return thunkApi.rejectWithValue({ error: error.data });
  }
});

export const fetchTripDetailAsync = createAsyncThunk<Trip, any>(
  "trip/fetchTripDetail",
  async (data: string, thunkApi) => {
    try {
      const tripDto = await agent.Trip.getById(data);
      return tripDto;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    resetTripParams: (state) => {
      state.tripParams = initTripParams();
    },
    setTripParams: (state, action) => {
      state.tripParams = {
        ...state.tripParams,
        ...action.payload,
      };
      state.tripFilterApplied = false;
    },
    setSearchTitle: (state, action) => {
      state.searchTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    //search trips
    builder.addCase(searchTripsAsync.pending, (state, action) => {
      state.status = "pendingSearchTripsAsync";
    });
    builder.addCase(searchTripsAsync.fulfilled, (state, action) => {
      state.trips = action.payload;
      state.status = "idle";
      state.tripLoaded = true;
      state.tripFilterApplied = true;
    });
    builder.addCase(searchTripsAsync.rejected, (state) => {
      state.status = "idle";
    });

    //fecth offices
    builder.addCase(fetchOfficesAsync.pending, (state, action) => {
      state.status = "pendingFetchOfficesAsync";
    });
    builder.addCase(fetchOfficesAsync.fulfilled, (state, action) => {
      state.offices = action.payload;
      state.status = "idle";
      state.officesLoaded = true;
    });
    builder.addCase(fetchOfficesAsync.rejected, (state) => {
      state.status = "idle";
    });
  },
});

export const { setTripParams, resetTripParams, setSearchTitle } =
  bookingSlice.actions;
