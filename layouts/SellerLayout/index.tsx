import {Box} from "@mui/material";
import { Navbar } from "../../components/Navbar";

const SELLER_CMS_BASE_URL = "/seller-cms/";

export function SellerLayout(props) {
  const pages = [
    {
      title: "Locations",
      href: SELLER_CMS_BASE_URL + "locations"
    },
    {
      title: "Categories",
      href: SELLER_CMS_BASE_URL + "categories"
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