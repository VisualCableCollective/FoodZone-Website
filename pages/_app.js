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
import {FoodZone} from "foodzone-api-client";
import {useAppDispatch} from "../app/hooks";
import {setIsAuthenticated} from "../features/FoodZoneApi/foodZoneSlice";

FoodZone.Config.setEnvironment("development");

function MyApp({ Component, pageProps }) {
  useEffect(() => {
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
              <SubWrapper>
                  <Component {...pageProps} />
              </SubWrapper>
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

function SubWrapper(props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        FoodZone.init().then(res => {
            if (!res) return;
            FoodZone.actAsUser(1).then(res => {
                dispatch(setIsAuthenticated(true));
            })
        });
    }, []);

    return props.children;
}

export default MyApp
