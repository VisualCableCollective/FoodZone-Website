import {Box, Container, Typography} from "@mui/material";
import {MainLayout} from "../layouts/MainLayout";
import {AddressInput} from "../components/AddressInput";

export default function OrderPage() {
    return (
        <MainLayout>
            <Container>
                <Box pt={12} textAlign="center">
                    <Typography variant="h4">Order some food right here.</Typography>
                    <AddressInput />
                </Box>
            </Container>
        </MainLayout>
    )
}
