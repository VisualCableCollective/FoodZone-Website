import { MainLayout } from "../../../../layouts/MainLayout";
import {Box, Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography} from "@mui/material";
import NearMeIcon from "@mui/icons-material/NearMe";
import {blue} from "@mui/material/colors";

export default function LocationMenuPage() {
  return (
    <MainLayout>
      <Container>
        <Box pt={4}>
          <Grid container columns={3} spacing={1}>
            <MenuCategory name="Burger" image={"/img/food-2.jpg"} />
            <MenuCategory name="Pizza" image={"/img/food-2.jpg"} />
            <MenuCategory name="Pasta" image={"/img/food-2.jpg"} />
          </Grid>
        </Box>
      </Container>
    </MainLayout>
  )
}

function MenuCategory({name, image}) {
  return (
    <Grid item xs={1}>
      <Card variant="outlined" sx={{position: "relative"}}>
        <CardMedia
          component="div"
          sx={{ height: 200 }}
          image={image}
        />
        <Box sx={{background: "rgba(0,0,0,0.0)",
          position: "absolute", top: 0, right: 0, zIndex: 10, width: "100%", height: 200, display: "flex", alignItems: "end",
          transition: "background 0.2s ease-out", "&:hover": {
            background: "rgba(0,0,0,0.2)"
          }}}>
          <Box sx={{background: "linear-gradient(0deg, rgba(0,0,0,0.6222864145658263) 0%, rgba(255,255,255,0) 100%)", paddingBottom: 1,
            display: "flex", justifyContent: "start",
            paddingRight: 1, paddingLeft: 1, paddingTop: 10, width: "100%"}}>
            <Typography color="white" fontSize={24} fontWeight={500}>
              {name}
            </Typography>
          </Box>
        </Box>
      </Card>
    </Grid>
  )
}