import Card from "@mui/material/Card";
import {Box, Typography} from "@mui/material";

export default function DeviceItem({device}) {

    const handleDeviceCardOnclick = () => {
        window.open(`http://${device.about.IP}`);
    }

    return (<Card className="device-card" onClick={handleDeviceCardOnclick}>
        <Box className="device-card-front-face device-card-face flex-centered">
                <Typography>{device.about.name}</Typography>
        </Box>

        <Box className="device-card-back-face device-card-face flex-centered">

                <Typography>MAC: {device.about.MAC}</Typography>
                <Typography>IP: {device.about.IP}</Typography>
                <Typography>Version: {device.about.version}</Typography>

        </Box>
    </Card>)

}