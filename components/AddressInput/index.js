import {Alert, Grid, IconButton, Snackbar, TextField, Tooltip, Zoom} from "@mui/material";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import {useEffect, useState} from "react";
import {useGeolocated} from "react-geolocated";
import Geocode from "react-geocode";
import { toast } from 'react-toastify';
import { LoadingButton } from '@mui/lab';
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectAddress, setAddress} from "./addressSlice";

export const AddressInput = ({onAddressSubmit}) => {
    const dispatch = useAppDispatch();

    const [isLocateBtnDisabled, setIsLocateBtnDisabled] = useState(false);
    const [locateBtnTooltipText, setLocateBtnTooltipText] = useState("Locate");
    const [addressFieldValue, setAddressFieldValue] = useState("");

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            isOptimisticGeolocationEnabled: false
        });

    useEffect(() => {
        if (!isGeolocationAvailable || !isGeolocationEnabled) {
            setIsLocateBtnDisabled(true);
            if (!isGeolocationAvailable) {
                setLocateBtnTooltipText("Automatically locating your position is currently not supported by your browser.");
            } else {
                setLocateBtnTooltipText("Enable the permission to use your location to use the auto locate feature.");
            }
        } else {
            setIsLocateBtnDisabled(false);
            setLocateBtnTooltipText("Locate");
        }
    }, [isGeolocationAvailable, isGeolocationEnabled]);

    function onLocateBtnClicked() {
        // Get user location
        let currentCoords = coords;

        Geocode.fromLatLng(currentCoords.latitude, currentCoords.longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;
                console.log(address);
                console.log(response.results[0]);
            },
            (error) => {
                if (error.message.includes("ZERO_RESULTS")) {
                    toast.error("We couldn't detect your location, because we found no address for your location (probably due to a weak GPS signal).");
                    return;
                }

                toast.error("An unknown error occurred while detecting your location.");
                console.error(error);
            }
        );
    }

    function onManualAddressSubmit(e) {
        e.preventDefault();

        dispatch(setAddress(addressFieldValue));

        onAddressSubmit(addressFieldValue);
    }

    return (
        <Grid container direction="row" justifyContent="center" mt={2}
              alignItems="center">
            <Grid item xs={4}>
                <form onSubmit={onManualAddressSubmit}>
                    <TextField name="address" label="Address" size="small" fullWidth
                               value={addressFieldValue} onChange={(e) => setAddressFieldValue(e.target.value)}/>
                </form>
            </Grid>
            <Grid item xs="auto" justifyContent="center" ml={2}>
                <Tooltip title={locateBtnTooltipText} arrow TransitionComponent={Zoom}>
                    {/* The 'span' element prevents that the Tooltip is disabled, when the child btn is disabled. */}
                    <span>
                        <LoadingButton color="primary" aria-label="Locate" onClick={onLocateBtnClicked} disabled={isLocateBtnDisabled}>
                            <MyLocationIcon />
                        </LoadingButton>
                    </span>
                </Tooltip>
            </Grid>
        </Grid>
    )
}