import {MainLayout} from "../../layouts/MainLayout";
import {useRouter} from "next/router";
import {Box, Card, CardContent, CardMedia, Container, IconButton, Typography} from "@mui/material";

export default function DeliveryServicesListPage() {
    const router = useRouter();
    const urlAddress = router.query.address;

    return (
        <MainLayout>
            <Container>
                <Box pt={12} textAlign="center">
                    Your address is: {urlAddress}
                    <Card sx={{ display: 'flex' }} variant="outlined">
                        <CardMedia
                            component="img"
                            sx={{ width: 151 }}
                            image="/img/food-2.jpg"
                            alt="Live from space album cover"
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" variant="h5">
                                    Alex's Burger Lounge
                                </Typography>
                            </CardContent>
                        </Box>
                    </Card>
                </Box>
            </Container>
        </MainLayout>
    )
}