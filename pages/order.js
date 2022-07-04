import {Box, Container, Typography} from "@mui/material";
import {MainLayout} from "../layouts/MainLayout";
import {useState} from "react";

export default function OrderPage() {
    const [address, setAddress] = useState("");

    function onAdreessChange(val) {
        console.log(val);
    }

    return (
        <MainLayout>
            <Container>
                <Box pt={12}>
                    <Typography variant="h4" align="center">Order some food right here.</Typography>
                </Box>
            </Container>
        </MainLayout>
    )
}
