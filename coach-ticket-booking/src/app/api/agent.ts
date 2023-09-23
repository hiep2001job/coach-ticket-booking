// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
// import { toast } from "react-toastify";
// import { history } from "../..";
// import { PaginatedResponse } from "../models/pagination";
// import { store } from "../../store/configureStore";
// import jwt_decode from "jwt-decode";
// import { setUser } from "../../features/account/accountSlice";
// import { setBasket } from "../../features/basket/basketSlice";

// // const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

// axios.defaults.baseURL = "https://localhost:5000/api/";
// axios.defaults.withCredentials = true;

// const responseBody = (response: AxiosResponse) => response.data;

// interface ErrorResponse {
//   data: any;
//   status: number;
// }

// const handleAxiosError = (error: AxiosError) => {
//   const { data, status } = error.response as ErrorResponse;
//   switch (status) {
//     case 400:
//       if (data.errors) {
//         const modelStateErrors: string[] = [];
//         for (const key in data.errors) {
//           if (data.errors[key]) {
//             modelStateErrors.push(data.errors[key]);
//           }
//         }
//         throw modelStateErrors.flat();
//       }
//       toast.error(data.title);
//       break;
//     case 401:
//       toast.error(data.title);
//       break;
//     case 404:
//       toast.error(data.title);
//       break;
//     case 403:
//       toast.error("You are not allowed to do that!");
//       break;
//     case 500:
//       toast.error(data.title);
//       history.replace("/server-error");
//       break;
//     default:
//       break;
//   }
//   return Promise.reject(error.response);
// };

// //Attach token to requests
// axios.interceptors.request.use((config) => {
//   const token = store.getState().account.user?.token;
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// //Handle response result || error
// axios.interceptors.response.use(
//   async (response) => {
//     // await sleep();
//     //Handle pagination
//     const pagination = response.headers["pagination"];
//     if (pagination) {
//       response.data = new PaginatedResponse(
//         response.data,
//         JSON.parse(pagination)
//       );
//     }
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;
//     // Check if the error status is 401 (unauthorized) and the request was not already retried
//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;
//       try {
//         // Send a request to refresh the access token
//         const accessToken = jwt_decode(store.getState().account.user?.token!) as any;
//         const refreshTokenResponse = await axios.post("Account/refresh-token", {
//           userName: accessToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'],
//         });

//         const { basket, ...user } = refreshTokenResponse.data;
//         store.dispatch(setUser(user));
//         store.dispatch(setBasket(basket));
//         const newAccessToken = refreshTokenResponse.data.token;

//         // Update the access token in your application's state or storage
//         // For example, if using Redux: dispatch(updateAccessToken(newAccessToken));

//         // Retry the original request with the new access token
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (refreshError) {
//         // Handle the error when refreshing the token fails
//         // For example, redirect the user to the login page or display an error message
//         console.log(refreshError);
//         throw new Error("Failed to refresh token");
//       }
//     } else 
//     return handleAxiosError(error);
//   }
// );

// //Axios requests
// const requests = {
//   get: (url: string, params?: URLSearchParams) =>
//     axios.get(url, { params }).then(responseBody),
//   post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
//   put: (url: string, body: {}) => axios.get(url, body).then(responseBody),
//   delete: (url: string) => axios.delete(url).then(responseBody),
//   postForm: (url: string, data: FormData) =>
//     axios
//       .post(url, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then(responseBody),
//   putForm: (url: string, data: FormData) =>
//     axios
//       .put(url, data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       })
//       .then(responseBody),
// };

// function createFormData(item: any) {
//   let formData = new FormData();
//   for (const key in item) {
//     formData.append(key, item[key]);
//   }
//   return formData;
// }

// // Admin methods
// const Admin = {
//   createProduct: (product: any) =>
//     requests.postForm("products", createFormData(product)),
//   updateProduct: (product: any) =>
//     requests.putForm("products", createFormData(product)),
//   deleteProduct: (id: number) => requests.delete(`products/${id}`),
// };

// //Catalog methods
// const Catalog = {
//   list: (params: URLSearchParams) => requests.get("products", params),
//   details: (id: number) => requests.get(`products/${id}`),
//   fetchFilters: () => requests.get("products/filters"),
// };
// //Errors methods
// const TestErrors = {
//   get400Error: () => requests.get("buggy/bad-request"),
//   get401Error: () => requests.get("buggy/unauthorized"),
//   get404Error: () => requests.get("buggy/not-found"),
//   get500Error: () => requests.get("buggy/server-error"),
//   getValidationError: () => requests.get("buggy/validation-error"),
// };

// //Basket methods
// const Basket = {
//   get: () => requests.get("basket"),
//   addItem: (productId: number, quantity = 1) =>
//     requests.post(`basket?productId=${productId}&quantity=${quantity}`, {}),
//   removeItem: (productId: number, quantity = 1) =>
//     requests.delete(`basket?productId=${productId}&quantity=${quantity}`),
// };

// //Account methods
// const Account = {
//   login: (values: any) => requests.post("account/login", values),
//   register: (values: any) => requests.post("account/register", values),
//   currentUser: () => requests.get("account/currentUser"),
//   fetchUserAddress: () => requests.get("account/savedAddress"),
// };

// //Order methods
// const Order = {
//   list: () => requests.get("orders"),
//   fetch: (id: number) => requests.get(`orders/${id}`),
//   create: (values: any) => requests.post("orders", values),
// };

// //Payment methods
// const Payment = {
//   createPaymentIntent: () => requests.post("payment", {}),
// };

// const agent = {
//   Catalog,
//   TestErrors,
//   Basket,
//   Account,
//   Order,
//   Payment,
//   Admin,
// };

// export default agent;
