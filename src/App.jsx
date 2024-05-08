import { useRoutes } from "react-router-dom";
import { AdapterDateFns as DateAdapter } from "@mui/x-date-pickers/AdapterDateFnsV3";

import "./style/style.css";
import routes from "./routes";
import req from "./services/nex-axios";
import authService from "./services/auth-service";
import { LocalizationProvider } from "@mui/x-date-pickers";

const App = () => {
  // Response interceptor for API calls
  req.interceptors.response.use(
    (response) => {
      return response;
    },
    async function (error) {
      const originalRequest = error.config;
      if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        authService.refreshToken().then(() => {
          return req(originalRequest);
        });
      }
      return Promise.reject(error);
    }
  );

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
