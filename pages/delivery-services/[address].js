import {MainLayout} from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Box, Card, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";
import {useAppSelector} from "../../app/hooks";
import {selectOrderType} from "../../components/Order/orderTypeSlice";

export default function DeliveryServicesListPage() {
    const router = useRouter();

    const orderType = useAppSelector(selectOrderType);

    const urlAddress = router.query.address;

    return (
        <MainLayout>
            <Container>
                <Box pt={4} textAlign="center">
                    Your address is: {urlAddress}
                </Box>
                <Card sx={{ display: 'flex' }} variant="outlined">
                    <CardMedia
                        component="div"
                        sx={{ width: 200 }}
                        image="/img/food-2.jpg"
                        alt="Live from space album cover"
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 0 auto' }}>
                            <Typography component="div" variant="h5" fontWeight={500}>
                                Alex's Burger Lounge
                            </Typography>
                            <Typography component="div" variant="h7">
                                Categories
                            </Typography>
                            <Typography component="div" variant="h7">
                                More Information
                            </Typography>
                        </CardContent>
                    </Box>
                </Card>
            </Container>
        </MainLayout>
    )
}