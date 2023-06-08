import "../styles/SPortContainer.css"
import React from 'react';
import {useRef, useState} from 'react';
import GraficoLine from "./GraficoLine";


function SPortContainer() {

    const selectBaud = useRef()
    const selectPath = useRef()


    let [useArrPath, setArrPath] = useState([])
    let [ledStatus, setLedStatus] = useState({backgroundColor:"red"})

    const ipcRenderer = window.ipcRenderer;

    ipcRenderer.receive("portsUpdate", (ports) => {
        setArrPath(ports)
    });

    ipcRenderer.receive("portOpenUpdate", (portIsOpen) => {
        if(portIsOpen) {
            setLedStatus({backgroundColor:"green"})
        } else {
            setLedStatus({backgroundColor:"red"})
        }
    });

    const openPort = () => {
        ipcRenderer.send("openAndClosePort", {open: true, port:{path:selectPath.current.value, baudRate:Number(selectBaud.current.value)}})
    }

    const closePort = () => {
        ipcRenderer.send("openAndClosePort", {open: false, port:{}})
    }

    return (
        <div className="SPortContainer">
            <GraficoLine canal="T" name={"DATOS"} width={{width: "auto", height: "100%"}} min={0} max={255} labels ={true} fill={true}/>
            <div className="SPortButtons">
                <div>
                    <button className="ButtonDefault SPortButton" onClick={openPort}>OPEN</button>
                    <button className="ButtonDefault SPortButton" onClick={closePort}>CLOSE</button>
                </div>
                <div className="SPortSelects">
                    <select ref={selectPath} className="ButtonDefault SPortSelect">
                    {useArrPath.map((path) => (
                        <option key={path.key} value={path.value}>
                            {path.value}
                        </option>
                    ))}
                    </select>
                    <select ref={selectBaud} className="ButtonDefault SPortSelect">
                        <option value={300}>300 baud</option>
                        <option value={600}>600 baud</option>
                        <option value={750}>750 baud</option>
                        <option value={1200}>1200 baud</option>
                        <option value={2400}>2400 baud</option>
                        <option value={4800}>4800 baud</option>
                        <option value={9600}>9600 baud</option>
                        <option value={19200}>19200 baud</option>
                        <option value={31250}>31250 baud</option>
                        <option value={38400}>38400 baud</option>
                        <option value={57600}>57600 baud</option>
                        <option value={74880}>74880 baud</option>
                        <option value={115200}>115200 baud</option>
                        <option value={230400}>230400 baud</option>
                        <option value={250000}>250000 baud</option>
                        <option value={460800}>460800 baud</option>
                        <option value={500000}>500000 baud</option>
                        <option value={921600}>921600 baud</option>
                        <option value={1000000}>1000000 baud</option>
                        <option value={2000000}>2000000 baud</option>
                    </select>
                </div>
            </div>
            <figure className="ledPort" style={ledStatus}></figure>
        </div>
    );
}

export default SPortContainer