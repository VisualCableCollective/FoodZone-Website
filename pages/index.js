import {Box, Container, Typography} from "@mui/material";
import {Navbar} from "../components/Navbar";

export default function Home() {
  return (
    <div>
        <Navbar />
        <div style={{background: "url('/img/food-1.jpg')", backgroundSize: "cover", backgroundPosition: "center",
            backgroundRepeat: "no-repeat"}}>
                <Box py={26} color="white" style={{backgroundColor: "rgba(0,0,0,0.25)"}}>
                    <Typography variant="h3" align="center">Get some food. But the epic way.</Typography>
                    <Typography align="center">Enjoy ordering your food as never before with FoodZone.</Typography>
                </Box>
        </div>
        <div style={{height: "200vh"}}>

        </div>
    </div>
  )
}
