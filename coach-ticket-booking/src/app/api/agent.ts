import axios, { AxiosError, AxiosResponse } from "axios";
import { history } from "../..";
import { PaginatedResponse } from "../models/pagination";
import { store } from "../../store/configureStore";
import jwt_decode from "jwt-decode";
import { setUser } from "../../features/account/accountSlice";
import { notification } from "antd";
import { Account } from "./accountApi";
import { Trip } from "./tripApi";
import { Office } from "./officeApi";

const sleep = () => new Promise((resolve) => setTimeout(resolve, 300));

axios.defaults.baseURL = "http://localhost:5000/api/";
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

interface ErrorResponse {
  data: any;
  status: number;
}

const handleAxiosError = (error: AxiosError) => {
  const { data, status } = error.response as ErrorResponse;
  switch (status) {
    case 400:
      if (data.errors) {
        const modelStateErrors: string[] = [];
        for (const key in data.errors) {
          if (data.errors[key]) {
            modelStateErrors.push(data.errors[key]);
          }
        }
        throw modelStateErrors.flat();
      }
      notification.error({
        message: "Error",
        description: data.title,
      });
      break;
    case 401:
      notification.error({
        message: "Error",
        description: "Login required.",
      });
      break;
    case 404:
      notification.error({
        message: "Error",
        description: "Not found.",
      });
      break;
    case 403:
      notification.error({
        message: "Error",
        description: "Not allowed.",
      });
      break;
    case 500:
      notification.error(data.title);
      history.replace("/server-error");
      break;
    default:
      break;
  }
  return Promise.reject(error.response);
};

//Attach token to requests
axios.interceptors.request.use((config) => {
  const token = store.getState().account.user?.token;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

//Handle response result || error
axios.interceptors.response.use(
  async (response) => {
    await sleep();
    //Handle pagination
    const pagination = response.headers["pagination"];
    if (pagination) {
      response.data = new PaginatedResponse(
        response.data,
        JSON.parse(pagination)
      );
    }
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    // Check if the error status is 401 (unauthorized) and the request was not already retried
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        // Send a request to refresh the access token
        const accessToken = jwt_decode(
          store.getState().account.user?.token!
        ) as any;
        const refreshTokenResponse = await axios.post("Account/refresh-token", {
          userName:
            accessToken[
              "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"
            ],
        });

        const { basket, ...user } = refreshTokenResponse.data;
        store.dispatch(setUser(user));

        const newAccessToken = refreshTokenResponse.data.token;

        // Update the access token in your application's state or storage
        // For example, if using Redux: dispatch(updateAccessToken(newAccessToken));

        // Retry the original request with the new access token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (refreshError) {
        // Handle the error when refreshing the token fails
        // For example, redirect the user to the login page or display an error message
        console.log(refreshError);
        throw new Error("Failed to refresh token");
      }
    } else return handleAxiosError(error);
  }
);

//Axios requests
export const requests = {
  get: (url: string, params?: URLSearchParams) =>
    axios.get(url, { params }).then(responseBody),
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.get(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, data: FormData) =>
    axios
      .post(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody),
  putForm: (url: string, data: FormData) =>
    axios
      .put(url, data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(responseBody),
};

export function createFormData(item: any) {
  let formData = new FormData();
  for (const key in item) {
    formData.append(key, item[key]);
  }
  return formData;
}
const agent = {
  Account,
  Trip,
  Office,
};

export default agent;
