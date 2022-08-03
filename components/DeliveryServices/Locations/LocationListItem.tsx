import {Box, Card, CardContent, CardMedia, Grid, Stack, Typography} from "@mui/material";
import {LocationListItemData} from "../../../models/LocationListItemData";
import NearMeIcon from '@mui/icons-material/NearMe';
import { blue } from '@mui/material/colors';
import Link from "next/link";

export function LocationListItem({locationData}: LocationListItemProps) {
  return (
    <Link href={"/location/" + locationData.location.id + "/menu"}>
      <Card sx={{ display: 'flex' }} variant="outlined">
        <CardMedia
          component="div"
          sx={{ width: 200 }}
          image="/img/food-2.jpg"
        />
        <CardContent sx={{width: "100%", '&:last-child': { pb: "16px" }}}>
          <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Box>
              <Typography component="div" variant="h5" fontWeight={500}>
                {locationData.locationName}
              </Typography>
              <Typography>
                Categories
              </Typography>
              <Typography>
                More Information
              </Typography>
            </Box>
            <Box sx={{display: "flex"}}>
              <Box mr="4px">
                <NearMeIcon sx={{color: blue["A400"]}} />
              </Box>
              <Typography>{Math.round(locationData.distance/1000)} km</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Link>
  )
}

interface LocationListItemProps {
  locationData: LocationListItemData,
}