import {Navbar} from "../../components/Navbar";
import {Box} from "@mui/material";

export const  MainLayout = (props) => {
    return (
        <div>
            <Navbar />
            <Box pt={8}>
                {props.children}
            </Box>
        </div>
    )
}
