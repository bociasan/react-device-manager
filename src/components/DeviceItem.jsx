import Card from "@mui/material/Card";
import {Box, Typography} from "@mui/material";

export default function DeviceItem({device}) {
    // console.log(device)
    const handleDeviceCardOnclick = () => {
        window.open(`http://${device.IP}`);
    }
    return (<Card className="device-card" onClick={handleDeviceCardOnclick}>
        <Box className="device-card-front-face device-card-face flex-centered">
            <Typography>{device.name}</Typography>
            {
                device.timing?<Typography>{device.timing?.add - device.timing?.start}ms</Typography>:"---"
            }
        </Box>

        <Box className="device-card-back-face device-card-face flex-centered">

            <Typography>MAC: {device.MAC}</Typography>
            <Typography>IP: {device.IP}</Typography>
            <Typography>Version: {device.version}</Typography>
        </Box>
    </Card> )

}