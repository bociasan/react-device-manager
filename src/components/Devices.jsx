import Card from '@mui/material/Card';
import {Box, Button, Typography} from "@mui/material";
import DeviceItem from "./DeviceItem";
const { v4: uuidv4 } = require('uuid');
export default function Devices({devices, handleGetDevicesButton}){
    console.log(devices)
    return (
        <Box m={20}>
            <Button onClick={()=>handleGetDevicesButton()}>Get Devices</Button>
            <Typography variant={'h4'}>Devices</Typography>
            {Object.keys(devices).length>0? Object.keys(devices).map(device => (<DeviceItem key={uuidv4()} device={devices[device]}/>))
            :'No devices ...'}
        </Box>
    )
}