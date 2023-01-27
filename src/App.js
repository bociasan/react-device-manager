import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import Devices from "./components/Devices";




function App() {
    const DEVICE_ABOUT_URL = 'http://192.168.0.101/device-about'
    const [devices, setDevices] = useState([])
    const [errors, setErrors] = useState(0)

    function fetchWithTimeout(url, options, delay, onTimeout) {
        const timer = new Promise((resolve) => {
            setTimeout(resolve, delay, {
                timeout: true,
            });
        });
        return Promise.race([
            fetch(url, options),
            timer
        ]).then(response => {
            if (response.timeout) {
                onTimeout();
            }
            return response;
        });
    }

    function getData(){
        for (let secondIndex = 2; secondIndex < 255; secondIndex++) {

            fetchWithTimeout(`http://192.168.0.${secondIndex}/device-about`, {
                method: 'GET',
            }, 5000, () => { setErrors(prevState => prevState+1) })
                .then(res => res.json()).then(data => {
                        let newDevicesArray = [...devices]
                        let flag = false
                        newDevicesArray.forEach(el => {
                            if (el.about.IP === data.about.IP) {
                                flag = true
                            }
                        })
                        if (!flag) {
                            newDevicesArray.push(data)
                        }
                        setDevices(newDevicesArray)
                        console.log(data)
                    })

        }
    }


    const controller = new AbortController();
    const fetchTimeout = (url, ms, { signal, ...options } = {}) => {
        const controller = new AbortController();
        const promise = fetch(url, { signal: controller.signal, ...options });
        if (signal) signal.addEventListener("abort", () => controller.abort());
        const timeout = setTimeout(() => controller.abort(), ms);
        return promise.finally(() => clearTimeout(timeout));
    };

    const getDataController = () => {
        for (let secondIndex = 2; secondIndex < 255; secondIndex++) {
            fetchTimeout(`http://192.168.0.${secondIndex}/device-about`, 5000, { signal: controller.signal })
                .then(response => response.json())
                .then(data => {
                    let newDevicesArray = [...devices]
                    let flag = false
                    newDevicesArray.forEach(el => {
                        if (el.about.IP === data.about.IP) {
                            flag = true
                        }
                    })
                    if (!flag) {
                        newDevicesArray.push(data)
                    }
                    setDevices(newDevicesArray)
                    console.log(data)
                })
                .catch(error => {
                    if (error.name === "AbortError") {
                        // fetch aborted either due to timeout or due to user clicking the cancel button
                    } else {
                        // network error or json parsing error
                    }
                });
        }
    }

    useEffect(() => {

        // getData()
        getDataController()


        // for (let secondIndex = 2; secondIndex < 255; secondIndex++) {
        //     fetch(`http://192.168.0.${secondIndex}/device-about`).then(res => res.json()).then(data => {
        //         let newDevicesArray = [...devices]
        //         let flag = false
        //         newDevicesArray.forEach(el => {
        //             if (el.about.IP === data.about.IP) {
        //                 flag = true
        //             }
        //         })
        //         if (!flag) {
        //             newDevicesArray.push(data)
        //         }
        //         setDevices(newDevicesArray)
        //         console.log(data)
        //     })
        //         .catch(err => setErrors(prevState => prevState+1))
        // }
    }, [])

    return (
        <div className="App">
            <Devices devices={devices}/>
            {

                errors
            }
        </div>
    );
}

export default App;
