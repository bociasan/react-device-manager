import Card from '@mui/material/Card';
import {Box, Typography} from "@mui/material";
import DeviceItem from "./DeviceItem";
export default function Devices({devices}){
    return (
        <Box m={20}>
            <Typography variant={'h4'}>Devices</Typography>
            {devices.map(device => (<DeviceItem device={device}/>))}
        </Box>
    )
}