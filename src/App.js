import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Devices from "./components/Devices";
import axios from "axios";
import {Button, Typography} from "@mui/material";

const stateInitial = {devices: {}}

function App() {
    const [state, setState] = useState(stateInitial)
    const [errors, setErrors] = useState(0)

    const controllers = []
    for (let idx = 2; idx < 255; idx++){
        controllers[idx] = new AbortController();
    }

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
                let stateSlice = {}
                stateSlice.timing = {}
                stateSlice.timing.start = new Date()



                fetchTimeout(`http://${loopIp}/device-about`, 5000, {signal: controllers[secondIndex].signal})
                    // .catch(err => console.log(1))
                    .then(response => response.json())
                    .then(data => {
                            console.log(data)
                            // if (!state.devices[data.about.IP]) {
                                let newState = {...state}
                                console.log("Added!")
                                stateSlice.timing.add = new Date()
                                data.about.timing = stateSlice.timing
                                newState.devices[data.about.IP] = data.about
                                setState(newState)
                            // }

                        }
                    )
                    .catch(error => {
                        // setErrors(prevState => prevState+1)

                        // console.log(error)
                        if (error.name === "AbortError") {
                            // fetch aborted either due to timeout or due to user clicking the cancel button
                            // setErrors(prevState => prevState+1)
                        } else {
                            // network error or json parsing error
                        }
                    });
                // setTiming({...timing})
            }
        }
    }

    function initialize() {
        // setState(stateInitial)
        // setErrors(0)
        getDataController()

    }

    function handleGetDevicesButton() {
        // initialize()
        getDataController()
    }

    useEffect(() => {
        setState(stateInitial)
        setErrors(0)
    }, [])

    return (
        <div className="App">
            <Devices devices={state.devices} handleGetDevicesButton={handleGetDevicesButton}/>

            {/*<Typography>{errors}</Typography>*/}
        </div>
    );
}

export default App;
