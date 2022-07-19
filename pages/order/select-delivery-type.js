import {MainLayout} from "../../layouts/MainLayout";
import {Box, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {OrderTypeSelectBox} from "../../components/Order/OrderTypeSelectBox";
import {OrderType} from "../../models/OrderType";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {setOrderType} from "../../components/Order/orderTypeSlice";
import {useRouter} from "next/router";
import {selectAddress} from "../../components/AddressInput/addressSlice";

export default function SelectOrderTypePage() {
    const dispatch = useAppDispatch();
    const router = useRouter();

    const address = useAppSelector(selectAddress);

    function onItemClick(orderType) {
        dispatch(setOrderType(orderType));
        router.push("/delivery-services/" + encodeURI(address));
    }

    return (
        <MainLayout>
            <Container>
                <Typography variant="h3" align="center" pt={6}>
                    How do you would like to collect your food?
                </Typography>
                <Grid container pt={6} columns={3} spacing={2}>
                    <Grid item xs={1}>
                        <OrderTypeSelectBox title="Have it delivered" iconType={DeliveryDiningIcon}
                                               onClick={() => onItemClick(OrderType.Delivery)}/>
                    </Grid>
                    <Grid item xs={1}>
                        <OrderTypeSelectBox title="Pick it up yourself" iconType={FmdGoodIcon}
                                               onClick={() => onItemClick(OrderType.PickUp)}/>
                    </Grid>
                    <Grid item xs={1}>
                        <OrderTypeSelectBox title="Eat in the restaurant" iconType={RestaurantIcon}
                                               onClick={() => onItemClick(OrderType.Restaurant)}/>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}