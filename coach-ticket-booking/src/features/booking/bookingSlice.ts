import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Seat } from "../../app/models/seat";
import { Trip, TripDetail, TripSearchParams } from "../../app/models/trip";
import { RootState } from "../../store/configureStore";
import agent from "../../app/api/agent";
import { Office } from "../../app/models/office";
import {
  BOOKINGS_STATUS,
  BOOKINGS_STEP,
  IDLE,
  STATE_OFFICE_STATUS,
} from "../../utils/constants";
import { notification } from "antd";
import { history } from "../..";
import { BookingResult } from "../../app/models/booking";

// Define the state type
interface BookingState {
  status: string;
  seats: Seat[];
  selectingSeats: Seat[];
  trips: Trip[];
  tripParams: TripSearchParams;
  tripLoaded: Boolean;
  tripFilterApplied: Boolean;
  offices: Office[];
  officesLoaded: Boolean;
  bookingStep: string;
  tripId: string;
  tripDetail: TripDetail | null;
  tripDetailLoaded: Boolean;
  searchTitle: string;
  bookingResult: BookingResult | null;
}

// Define the initial state
const initialState: BookingState = {
  status: IDLE,
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
  bookingStep: BOOKINGS_STEP.SEARCH_TRIPS,
  seats: [],
  selectingSeats: [],
  tripId: "",
  tripDetail: null,
  tripDetailLoaded: false,
  bookingResult: null,
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

export const fetchTripDetailAsync = createAsyncThunk<TripDetail, any>(
  "trip/fetchTripDetail",
  async (data: string, thunkApi) => {
    try {
      const tripDto: TripDetail = await agent.Trip.getDetailById(data);
      return tripDto;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const createBookingAsync = createAsyncThunk<BookingResult, any>(
  "booking/createBooking",
  async (data: any, thunkApi) => {
    try {
      const bookingResult: BookingResult = await agent.Booking.create(data);
      return bookingResult;
    } catch (error: any) {
      return thunkApi.rejectWithValue({ error: error.data });
    }
  }
);

export const processPaymentReturnAsync = createAsyncThunk<any, any>(
  "booking/processPaymentReturn",
  async (data: any, thunkApi) => {
    try {
      const result: any = await agent.Booking.processPaymentReturn(data);
      return result;
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
    setTripId: (state, action) => {
      state.tripId = action.payload;
    },
    setBookingStep: (state, action) => {
      state.bookingStep = action.payload;
      state.selectingSeats = [];
    },
    setSeatStatus: (state, action) => {
      let seat = action.payload;
      if (seat.status === 0) {
        if (state.selectingSeats.length === 5) {
          notification.warning({
            message: "Chỉ chọn tối đa 5 ghế",
            duration: 1,
          });
          return;
        }
        state.tripDetail!.seats = state.tripDetail!.seats.map((item) => {
          return item.seatName === seat.seatName
            ? { ...item, status: 2 }
            : item;
        });
      } //if active
      if (seat.status === 2) {
        state.tripDetail!.seats = state.tripDetail!.seats.map((item) => {
          return item.seatName === seat.seatName
            ? { ...item, status: 0 }
            : item;
        });
      } //if selecting

      //then toggle seats in selectingSeats
      let isExisted = state.selectingSeats.find(
        (s: any) => s.seatName === seat.seatName
      );

      if (isExisted)
        state.selectingSeats = state.selectingSeats.filter(
          (s: any) => s.seatName !== seat.seatName
        );
      else state.selectingSeats = [...state.selectingSeats, seat];
    },
    setBookingStatus: (state, action) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    //search trips
    builder.addCase(searchTripsAsync.pending, (state, action) => {
      state.status = "pendingSearchTripsAsync";
    });
    builder.addCase(searchTripsAsync.fulfilled, (state, action) => {
      state.trips = action.payload;
      state.status = IDLE;
      state.tripLoaded = true;
      state.tripFilterApplied = true;
    });
    builder.addCase(searchTripsAsync.rejected, (state) => {
      state.status = IDLE;
    });

    //fecth offices
    builder.addCase(fetchOfficesAsync.pending, (state, action) => {
      state.status = STATE_OFFICE_STATUS.PENDING_FETCH_OFFICES;
    });
    builder.addCase(fetchOfficesAsync.fulfilled, (state, action) => {
      state.offices = action.payload;
      state.status = IDLE;
      state.officesLoaded = true;
    });
    builder.addCase(fetchOfficesAsync.rejected, (state) => {
      state.status = IDLE;
    });

    //fetch trip detail
    builder.addCase(fetchTripDetailAsync.pending, (state, action) => {
      state.status = STATE_OFFICE_STATUS.PENDING_FETCH_TRIPDETAIL;
    });
    builder.addCase(fetchTripDetailAsync.fulfilled, (state, action) => {
      state.tripDetail = action.payload;
      state.status = IDLE;
      state.bookingStep = BOOKINGS_STEP.SELECT_SEATS;
    });
    builder.addCase(fetchTripDetailAsync.rejected, (state, action) => {
      console.log(action.payload);
      notification.error({
        message: "Lỗi khi xử lý thanh toán, vui lòng thử lại!",
      });
      state.bookingStep = BOOKINGS_STEP.SEARCH_TRIPS;
    });

    //Create booking
    builder.addCase(createBookingAsync.pending, (state, action) => {
      state.status = BOOKINGS_STATUS.PENDING_CREATE_BOOKING;
    });
    builder.addCase(createBookingAsync.fulfilled, (state, action) => {
      state.bookingResult = action.payload;
      state.status = IDLE;
      state.bookingStep = BOOKINGS_STEP.PAYING;
    });
    builder.addCase(createBookingAsync.rejected, (state) => {
      state.status = IDLE;
      notification.error({
        message: "Lỗi trong quá trình đặt chỗ! Vui lòng thử lại",
      });
    });

    //Process payment return
    builder.addCase(processPaymentReturnAsync.pending, (state, action) => {
      state.status = BOOKINGS_STATUS.PENDING_PAY_BOOKING;
    });
    builder.addCase(processPaymentReturnAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      notification.success({
        message:
          "Thanh toán thành công mã đặt chỗ: " +
          state.bookingResult?.bookingCode,
      });
    });
    builder.addCase(processPaymentReturnAsync.rejected, (state) => {
      state.status = IDLE;
      notification.error({
        message: "Lỗi trong quá trình đặt chỗ! Vui lòng thử lại",
      });
    });
  },
});

export const {
  setTripParams,
  resetTripParams,
  setSearchTitle,
  setTripId,
  setBookingStep,
  setSeatStatus,
  setBookingStatus,
} = bookingSlice.actions;
