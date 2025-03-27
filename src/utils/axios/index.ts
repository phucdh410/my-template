import axios, { AxiosError } from "axios";

import { logoutUser } from "@/funcs";

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

axiosInstance.interceptors.request.use(
  (request) => {
    return request;
  },
  (errors) => {
    return errors;
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (errors: AxiosError<any>) => {
    if (errors?.response?.status === 401) {
      logoutUser();
    }
    return errors;
  }
);

export const setAuthToken = (token?: string) => {
  if (token)
    axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
  else delete axiosInstance.defaults.headers.common["Authorization"];
};

export { axiosInstance };

// import dayjs, { isDayjs } from "dayjs";

// const isValidDateValue = (value) => {
//   const date = new Date(value);
//   const isISOString = !isNaN(date.getTime()) && value === date.toISOString();

//   const validFormats = ["YYYY-MM-DD", "YYYY-MM-DD HH:mm:ss"];
//   const isMatchFormat = validFormats.some(
//     (formatString) => dayjs(value).format(formatString) === value
//   );

//   return (
//     value instanceof Date || isDayjs(value) || isISOString || isMatchFormat
//   );
// };

// const payload = {
//   id: 1,
//   _id: "absd22",
//   name: "Phuc",
//   age: 22,
//   birthday: new Date(),
//   address: "HoChiMinh",
//   gender: true,
//   family: {
//     dad: {
//       name: "A",
//       date: "1963-10-26",
//     },
//     mom: {
//       name: "B",
//       date: "1967-05-17",
//     },
//     brother: {
//       name: "C",
//       date: new Date().getTime(),
//     },
//     other: {
//       name: "D",
//       date: dayjs().startOf("month"),
//     },
//   },
//   achivements: [
//     {
//       name: "Win 2022",
//       date: dayjs(),
//     },
//     {
//       name: "Top 1",
//       date: "2024-01-01 20:20:11",
//     },
//     {
//       name: "Hehe",
//       date: "2024/10/10",
//     },
//   ],
// };

// const formatDateFields = (data) => {
//   for (const [key, value] of Object.entries(data)) {
//     if (isValidDateValue(value)) data[key] = "MODIFIED";
//     else if (typeof value === "object") {
//       if (Array.isArray(value)) {
//         value.forEach((e) => {
//           if (typeof e === "object" && e !== null) {
//             formatDateFields(e);
//           }
//         });
//       } else if (value !== null) {
//         formatDateFields(value);
//       }
//     }
//   }
// };

// const testResult = { ...payload };

// formatDateFields(testResult);

// console.log(testResult);
