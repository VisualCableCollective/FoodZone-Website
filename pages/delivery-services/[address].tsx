import {MainLayout} from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Box, Card, CardContent, CardMedia, Container, IconButton, Stack, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectOrderType} from "../../components/Order/orderTypeSlice";
import {useEffect, useState} from "react";
import {useFoodZone, GetLocationsByAddressResponse, Location} from "foodzone-api-client";
import { getDistance } from 'geolib';
import sortArray from 'sort-array'
import {LocationListItemData} from "../../models/LocationListItemData";
import {LocationListItem} from "../../components/DeliveryServices/Locations/LocationListItem";

export default function DeliveryServicesListPage() {
    const router = useRouter();
    const foodZone = useFoodZone();

    const orderType = useAppSelector(selectOrderType);

    const urlAddress = router.query.address;

    const [data, setData] = useState<LocationListItemData[]>();

    useEffect(() => {
        if (!urlAddress) return;
        foodZone.getLocationsByAddress(urlAddress as string).then(response => {
            if (response == null) {
                return;
            }

            let locations: LocationListItemData[] = [];

            response.sellers.forEach(seller => {
                seller.locations.forEach(location => {
                    let distance = getDistance(
                      { latitude: response.userCoordinates.latitude, longitude: response.userCoordinates.longitude },
                      { latitude: location.latitude, longitude: location.longitude }
                    );

                    locations.push({distance, location, locationName: seller.name});
                });
            });

            sortArray(locations, {
                by: "distance",
                order: "asc"
            })
            console.log(locations)
            setData(locations);
        });
    }, [urlAddress]);

    return (
        <MainLayout>
            <Container>
                <Box pt={4} textAlign="center">
                    Your address is: {urlAddress}
                </Box>
                <Stack spacing={2}>
                    {data?.map(locationData => {
                        return <LocationListItem key={locationData.location.id} locationData={locationData} />
                    })}
                </Stack>
            </Container>
        </MainLayout>
    )
}