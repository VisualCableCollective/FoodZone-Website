import {useEffect} from "react";
import Geocode from "react-geocode";
import {GOOGLE_MAPS_API_KEY} from "../config";
import {ToastContainer} from "react-toastify";
import store from '../app/store';
import { Provider } from 'react-redux';

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {CssBaseline, ThemeProvider} from "@mui/material";

import theme from "../theme";
import {useFoodZone} from "foodzone-api-client";

function MyApp({ Component, pageProps }) {
    const foodZone = useFoodZone();

  useEffect(() => {
      foodZone.Config.setEnvironment("development");

    // Google Geocode setup
    Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage("de");
    Geocode.setRegion("de");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  return (
      <Provider store={store}>
          <ThemeProvider theme={theme} >
              <CssBaseline />
              <Component {...pageProps} />
              <ToastContainer
                  position="bottom-right"
                  autoClose={5000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
              />
          </ThemeProvider>
      </Provider>
  )
}

export default MyApp
