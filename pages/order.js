import {Box, Button, Container, Grid, IconButton, TextField, Tooltip, Typography, Zoom} from "@mui/material";
import {MainLayout} from "../layouts/MainLayout";
import {useEffect, useState} from "react";
import MyLocationIcon from '@mui/icons-material/MyLocation';
import {useGeolocated} from "react-geolocated";

export default function OrderPage() {
    const [isLocateBtnDisabled, setIsLocateBtnDisabled] = useState(false);
    const [locateBtnTooltipText, setLocateBtnTooltipText] = useState("Locate");

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

    function locateUser() {
        console.log(coords);
    }

    return (
        <MainLayout>
            <Container>
                <Box pt={12} textAlign="center">
                    <Typography variant="h4">Order some food right here.</Typography>
                    <Grid container direction="row" justifyContent="center" mt={2}
                          alignItems="center">
                        <Grid item xs={4}>
                            <TextField label="Address" size="small" fullWidth/>
                        </Grid>
                        <Grid item xs="auto" justifyContent="center" ml={2}>
                            <Tooltip title={locateBtnTooltipText} arrow TransitionComponent={Zoom}>
                                <span>
                                    <IconButton color="primary" aria-label="Locate" onClick={locateUser} disabled={isLocateBtnDisabled}>
                                        <MyLocationIcon />
                                    </IconButton>
                                </span>
                            </Tooltip>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </MainLayout>
    )
}
