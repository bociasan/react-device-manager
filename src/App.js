import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Devices from "./components/Devices";
import axios from "axios";
import {Button} from "@mui/material";

function App() {
    const DEVICE_ABOUT_URL = 'http://192.168.0.101/device-about'
    const [devices, setDevices] = useState([])
    const [errors, setErrors] = useState(0)
    const [timing, setTiming] = useState({})

    const controller = new AbortController();
    const fetchTimeout = (url, ms, {signal, ...options} = {}) => {
        const controller = new AbortController();
        const promise = fetch(url, {signal: controller.signal, ...options})
        if (signal) signal.addEventListener("abort", () => controller.abort());
        const timeout = setTimeout(() => controller.abort(), ms);
        return promise.finally(() => clearTimeout(timeout));
    };

    const getDataController = () => {
        for (let firstIndex = 0; firstIndex < 1; firstIndex++) {
            for (let secondIndex = 2; secondIndex < 255; secondIndex++) {
                const loopIp = `192.168.${firstIndex}.${secondIndex}`
                timing[loopIp] = {}
                timing[loopIp].start = new Date()
                fetchTimeout(`http://${loopIp}/device-about`, 5000, {signal: controller.signal})
                    // .catch(err => console.log(1))
                    .then(response => response.json())
                    .then(data => {
                        timing[loopIp].finish = new Date()
                        const rule = (device) => device.about.MAC === data.about.MAC;
                        const exist = devices.some(rule)
                        console.log(exist)
                        timing[loopIp].add = new Date()
                        data.about.loopIp = loopIp
                        if (!exist) {

                            setDevices(prevState => [...prevState, data])


                        } else {
                            console.log(devices)
                        }
                        // setDevices(prevState => [...prevState])


                        console.log(data)
                    })
                    .catch(error => {
                        timing[`192.168.${firstIndex}.${secondIndex}`].error = new Date()
                        setErrors(prevState => prevState + 1)
                        // console.log(error)
                        if (error.name === "AbortError") {
                            // fetch aborted either due to timeout or due to user clicking the cancel button
                        } else {
                            // network error or json parsing error
                        }
                    });
                // setTiming({...timing})
            }
        }
    }

    function initialize() {

        setDevices([])
        setErrors(0)
        setTiming({})
        getDataController()

    }

    function handleGetDevicesButton() {
        initialize()
    }

    useEffect(() => {
        setErrors(0)
        setTiming({})
    }, [])

    return (
        <div className="App">
            <Devices devices={devices} timing={timing} handleGetDevicesButton={handleGetDevicesButton}/>

            {

                errors
            }
        </div>
    );
}

export default App;
