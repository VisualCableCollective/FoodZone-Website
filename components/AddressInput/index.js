import {
    Alert, Box,
    FormControl,
    Grid,
    IconButton, Input,
    InputAdornment,
    InputLabel, OutlinedInput,
    Snackbar,
    TextField,
    Tooltip,
    Zoom
} from "@mui/material";
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

        Geocode.setLocationType("APPROXIMATE");

        Geocode.fromLatLng(currentCoords.latitude, currentCoords.longitude).then(
            (response) => {
                const address = response.results[0].formatted_address;

                // We won't auto submit the address because the address might not be accurate
                setAddressFieldValue(address);
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
            <Grid item xs={6}>
                <form onSubmit={onManualAddressSubmit}>
                    <FormControl variant="outlined" fullWidth size="small">
                        <InputLabel htmlFor="address-input">Address</InputLabel>
                        <OutlinedInput
                            id="address-input"
                            value={addressFieldValue} onChange={(e) => setAddressFieldValue(e.target.value)}
                            label="Address"
                            endAdornment={
                                <InputAdornment position={"end"}>
                                    <Tooltip title={locateBtnTooltipText} arrow TransitionComponent={Zoom}>
                                        {/* The 'span' element prevents that the Tooltip is disabled, when the child btn is disabled. */}
                                        <span>
                                            <IconButton edge="end" color="primary" aria-label="Locate" onClick={onLocateBtnClicked} disabled={isLocateBtnDisabled}>
                                                <MyLocationIcon />
                                            </IconButton>
                                        </span>
                                    </Tooltip>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                </form>
            </Grid>
        </Grid>
    )
}