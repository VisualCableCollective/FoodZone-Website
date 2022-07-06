import '../styles/globals.css'
import {useEffect} from "react";
import Geocode from "react-geocode";
import {GOOGLE_MAPS_API_KEY} from "../config";
import {ToastContainer} from "react-toastify";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // Google Geocode setup
    Geocode.setApiKey(GOOGLE_MAPS_API_KEY);
    Geocode.setLanguage("de");
    Geocode.setRegion("de");
    Geocode.setLocationType("ROOFTOP");
  }, []);

  return (
      <>
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
      </>
  )
}

export default MyApp
