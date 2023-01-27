import Card from '@mui/material/Card';
import {Box, Button, Typography} from "@mui/material";
import DeviceItem from "./DeviceItem";
const { v4: uuidv4 } = require('uuid');
export default function Devices({devices, timing, handleGetDevicesButton}){
    return (
        <Box m={20}>
            <Button onClick={handleGetDevicesButton}>Get Devices</Button>
            <Typography variant={'h4'}>Devices</Typography>
            {devices.length>0? devices.map(device => (<DeviceItem key={uuidv4()} device={device} timing={timing[device.about.loopIp]}/>))
            :'No devices ...'}
        </Box>
    )
}