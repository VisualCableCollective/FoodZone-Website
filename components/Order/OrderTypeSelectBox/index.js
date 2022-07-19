import {Box, Card, CardContent, Typography} from "@mui/material";
import {grey} from '@mui/material/colors';

export function OrderTypeSelectBox({title, iconType, onClick}) {
    let Icon = iconType;

    return (
        <Card variant="outlined" sx={CardStyle} onClick={onClick}>
            <CardContent>
                <Box textAlign="center">
                    <Icon fontSize="inherit" style={{fontSize: 60}} />
                    <Typography variant="h5">{title}</Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

const CardStyle = {
    cursor: "pointer",
    userSelect: "none",
    ":hover": {
        backgroundColor: grey["900"],
        color: grey.A100
    }
}