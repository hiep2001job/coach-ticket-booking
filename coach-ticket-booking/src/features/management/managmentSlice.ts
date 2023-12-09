import { createSlice } from "@reduxjs/toolkit";
import {
  Trip,
  TripManagenmentParams,
  TripSearchParams,
} from "../../app/models/trip";
import { Office, OfficeSearchParams } from "../../app/models/office";
import { IDLE, MANAGEMENT_STATUS } from "../../utils/constants";
import { Town } from "../../app/models/town";
import { MetaData } from "../../app/models/pagination";
import { Route, RoutesParams } from "../../app/models/route";
import { notification } from "antd";
import {
  createOfficesAsync,
  createRouteAsync,
  createTrip,
  fetchFullOfficesAsync,
  fetchOfficesAsync,
  fetchRoutesAsync,
  fetchTownsAsync,
  getAllBookings,
  getAllTrips,
  updateOfficesAsync,
  updateRouteAsync,
  updateTrip,
} from "./managementAsyncThunkMethods";
import { BookingManagenmentParams, BookingResult } from "../../app/models/booking";

// Define the state type
interface ManagementState {
  status: string;
  dataLoaded: boolean;
  //Town
  towns: Town[] | null;
  //Offices
  offices: Office[] | null;
  officeParams: OfficeSearchParams;
  //Routes
  fullOfficeLoaded: boolean;
  fullOffice: Office[] | null;
  routes: Route[] | null;
  routesParams: RoutesParams | null;
  // Trip
  trips: Trip[];
  tripParams: TripManagenmentParams | null;

  //Booking
  bookings:BookingResult[];
  bookingManagementParams: BookingManagenmentParams | null;

  //pagination
  metaData: MetaData | null;
}

// Define the initial state
const initialState: ManagementState = {
  status: IDLE,
  dataLoaded: false,
  //town
  towns: [],
  //office
  offices: null,
  officeParams: initOfficeParams(),
  //Routes
  fullOfficeLoaded: false,
  fullOffice: [],
  routes: [],
  routesParams: initRouteParams(),
  // Trip
  trips: [],
  // tripParams: initTripSearchParams(),
  tripParams: initTripManagementParams(),

  //Booking
  bookings:[],
  bookingManagementParams: initBookingManagementParams(),
  //pagination
  metaData: null,
};

//init params
function initOfficeParams() {
  return {
    name: "",
    address: "",
    townName: "",
    pageNumber: 1,
    pageSize: 20,
  };
}
function initRouteParams() {
  return {
    pageNumber: 1,
    pageSize: 20,
  };
}
function initTripManagementParams() {
  return {
    pageNumber: 1,
    pageSize: 20,
  };
}
function initBookingManagementParams() {
  return {
    pageNumber: 1,
    pageSize: 20,
    fromDate: "",
    toDate: "",
    phone: "",
  };
}

//Slice
export const managementSlice = createSlice({
  name: "management",
  initialState,
  reducers: {
    setOfficeParams: (state, action) => {
      state.officeParams = {
        ...state.officeParams,
        ...action.payload,
      };
    },
    setRouteParams: (state, action) => {
      state.routesParams = {
        ...state.routesParams,
        ...action.payload,
      };
    },
    setTripManagementParams: (state, action) => {
      state.tripParams = {
        ...state.tripParams,
        ...action.payload,
      };
    },
    setBookingManagementParams: (state, action) => {
      state.bookingManagementParams = {
        ...state.bookingManagementParams,
        ...action.payload,
      };
    },
    setMetaData: (state, action) => {
      state.metaData = { ...state.metaData, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    //office
    // fetch office
    builder.addCase(fetchOfficesAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_FETCH_OFFICES;
    });
    builder.addCase(fetchOfficesAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      state.offices = action.payload;
    });
    builder.addCase(fetchOfficesAsync.rejected, (state, action) => {
      state.status = IDLE;
    });
    // create office
    builder.addCase(createOfficesAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_CREATE_OFFICES;
    });
    builder.addCase(createOfficesAsync.fulfilled, (state, action) => {
      state.status = IDLE;
    });
    builder.addCase(createOfficesAsync.rejected, (state, action) => {
      state.status = IDLE;
    });
    // update office
    builder.addCase(updateOfficesAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_EDIT_OFFICES;
    });
    builder.addCase(updateOfficesAsync.fulfilled, (state, action) => {
      state.status = IDLE;
    });
    builder.addCase(updateOfficesAsync.rejected, (state, action) => {
      state.status = IDLE;
    });

    //Route
    // fetch full office
    builder.addCase(fetchFullOfficesAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_FETCH_OFFICES;
    });
    builder.addCase(fetchFullOfficesAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      state.fullOffice = action.payload;
      state.fullOfficeLoaded = true;
    });
    builder.addCase(fetchFullOfficesAsync.rejected, (state, action) => {
      state.status = IDLE;
      notification.error({ message: "Lỗi khi lấy danh sách văn phòng!" });
    });
    // fetch route
    builder.addCase(fetchRoutesAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_FETCH_ROUTES;
    });
    builder.addCase(fetchRoutesAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      state.routes = action.payload;
    });
    builder.addCase(fetchRoutesAsync.rejected, (state, action) => {
      state.status = IDLE;
    });
    // create route
    builder.addCase(createRouteAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_CREATE_ROUTES;
    });
    builder.addCase(createRouteAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      notification.success({ message: "Tạo tuyến thành công!" });
    });
    builder.addCase(createRouteAsync.rejected, (state, action) => {
      state.status = IDLE;
    });
    // update route
    builder.addCase(updateRouteAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_EDIT_ROUTES;
    });
    builder.addCase(updateRouteAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      notification.success({ message: "Cập nhật tuyến thành công!" });
    });
    builder.addCase(updateRouteAsync.rejected, (state, action) => {
      state.status = IDLE;
    });

    // town
    // fetch town
    builder.addCase(fetchTownsAsync.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_CREATE_OFFICES;
    });
    builder.addCase(fetchTownsAsync.fulfilled, (state, action) => {
      state.status = IDLE;
      state.towns = action.payload;
    });
    builder.addCase(fetchTownsAsync.rejected, (state, action) => {
      state.status = IDLE;
    });

    //trips
    //getall
    builder.addCase(getAllTrips.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_FETCH_TRIPS;
    });
    builder.addCase(getAllTrips.fulfilled, (state, action) => {
      state.status = IDLE;
      state.trips = action.payload;
    });
    builder.addCase(getAllTrips.rejected, (state, action) => {
      state.status = IDLE;
    });
    //create
    builder.addCase(createTrip.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_CREATE_TRIP;
    });
    builder.addCase(createTrip.fulfilled, (state, action) => {
      state.status = IDLE;
      notification.success({ message: "Tạo chuyến thành công" });
    });
    builder.addCase(createTrip.rejected, (state, action) => {
      notification.error({ message: "Lỗi" });

      state.status = IDLE;
    });
    //update
    builder.addCase(updateTrip.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_EDIT_TRIP;
    });
    builder.addCase(updateTrip.fulfilled, (state, action) => {
      state.status = IDLE;
      notification.success({ message: "Cập nhật chuyến thành công" });
    });
    builder.addCase(updateTrip.rejected, (state, action) => {
      notification.error({ message: "Lỗi" });

      state.status = IDLE;
    });

    //Bookings
    //getall
    builder.addCase(getAllBookings.pending, (state, action) => {
      state.status = MANAGEMENT_STATUS.PENDING_FETCH_BOOKINGS;
    });
    builder.addCase(getAllBookings.fulfilled, (state, action) => {
      state.status = IDLE;
      state.bookings = action.payload;
    });
    builder.addCase(getAllBookings.rejected, (state, action) => {
      state.status = IDLE;
    });
  },
});

export const {
  setMetaData,
  setOfficeParams,
  setRouteParams,
  setTripManagementParams,
  setBookingManagementParams
} = managementSlice.actions;
