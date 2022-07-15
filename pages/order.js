import {Box, Container, Typography} from "@mui/material";
import {MainLayout} from "../layouts/MainLayout";
import {AddressInput} from "../components/AddressInput";
import {useRouter} from "next/router";

export default function OrderPage() {
    const router = useRouter();

    function onAddressSubmit(address) {
        router.push("/delivery-services/" + encodeURIComponent(address));
    }

    return (
        <MainLayout>
            <Container>
                <Box pt={12} textAlign="center">
                    <Typography variant="h4">Order some food right here.</Typography>
                    <AddressInput onAddressSubmit={onAddressSubmit} />
                </Box>
            </Container>
        </MainLayout>
    )
}
