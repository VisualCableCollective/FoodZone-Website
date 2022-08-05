import {Navbar} from "../../components/Navbar";
import {Box} from "@mui/material";

export const  MainLayout = (props) => {
    const pages = [
        {
            title: "Order",
            href: "/order"
        }
    ];

    return (
        <div>
            <Navbar pages={pages} />
            <Box pt={8}>
                {props.children}
            </Box>
        </div>
    )
}
