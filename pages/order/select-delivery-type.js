import {MainLayout} from "../../layouts/MainLayout";
import {Box, Card, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";

import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FmdGoodIcon from '@mui/icons-material/FmdGood';
import {OrderTypeSelectBox} from "../../components/Order/OrderTypeSelectBox";

export default function SelectOrderTypePage() {
    function onItemClick(orderType) {
        console.log(orderType);
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
                                               onClick={() => onItemClick("deliver")}/>
                    </Grid>
                    <Grid item xs={1}>
                        <OrderTypeSelectBox title="Pick it up yourself" iconType={FmdGoodIcon}
                                               onClick={() => onItemClick("pickup")}/>
                    </Grid>
                    <Grid item xs={1}>
                        <OrderTypeSelectBox title="Eat in the restaurant" iconType={RestaurantIcon}
                                               onClick={() => onItemClick("order")}/>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    )
}