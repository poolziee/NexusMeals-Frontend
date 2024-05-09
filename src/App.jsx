import { useRoutes } from "react-router-dom";
import { AdapterDateFns as DateAdapter } from "@mui/x-date-pickers/AdapterDateFnsV3";

import "./style/style.css";
import routes from "./routes";
import req from "./services/nex-axios";
import authService from "./services/auth-service";
import { LocalizationProvider } from "@mui/x-date-pickers";

const App = () => {
  // req.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   async function (error) {
  //     let originalRequest = error.config;
  //     console.log("Og request: ", originalRequest);
  //     if (error.response.status === 403 && !originalRequest._retry) {
  //       originalRequest._retry = true;
  //       authService
  //         .refreshToken()
  //         .then(() => {
  //           console.log("Sending refresh request.");
  //           console.log(originalRequest);
  //           return req(originalRequest);
  //         })
  //         .catch((err) => {
  //           return Promise.reject(err);
  //         });
  //     }
  //     return Promise.reject(error);
  //   }
  // );
  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  req.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (isRefreshing) {
          return new Promise(function (resolve, reject) {
            failedQueue.push({ resolve, reject });
          })
            .then(() => {
              return req(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        isRefreshing = true;

        return new Promise((resolve, reject) => {
          authService
            .refreshToken()
            .then(() => {
              console.log("Sending refresh request.");
              isRefreshing = false;
              processQueue(null);
              resolve(req(originalRequest));
            })
            .catch((err) => {
              console.log("Error refreshing token: ", err);
              processQueue(err);
              reject(err);
            });
        });
      }

      return Promise.reject(error);
    }
  );

  const originalWarn = console.warn;
  const originalError = console.error;

  const shouldIgnoreMessage = (message) => {
    try {
      const ignoreMessages = [
        "because it is not a valid MIME type",
        "because an invalid file extension was provided",
      ];

      return ignoreMessages.some((ignoreMessage) =>
        message.includes(ignoreMessage)
      );
    } catch {
      false;
    }
  };

  console.warn = (message, ...args) => {
    if (!shouldIgnoreMessage(message)) {
      originalWarn(message, ...args);
    }
  };

  console.error = (message, ...args) => {
    if (!shouldIgnoreMessage(message)) {
      originalError(message, ...args);
    }
  };

  const content = useRoutes(routes);
  return (
    <>
      <LocalizationProvider dateAdapter={DateAdapter}>
        {content}
      </LocalizationProvider>
    </>
  );
};

export default App;
