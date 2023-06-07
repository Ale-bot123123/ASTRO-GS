const {SerialPort} = require("serialport");
const {DelimiterParser} = require('@serialport/parser-delimiter');

//Verificar si hay algun puerto nuevo y mandarlo al header
async function listSerialPorts(mainWindow) {
    await SerialPort.list().then((ports, err) => {
        if(err) {
            console.log('error', err)
            return
        } else {
            ports = ports.map((port) => {return { key: port.path, value: port.path }})
            mainWindow.webContents.send('portsUpdate', ports);
        }
    })
}
  
function listPorts(mainWindow) {
    listSerialPorts(mainWindow);
    setTimeout(() => {listPorts(mainWindow)}, 1000);
}
let puerto = null;

const openAndClosePort = (mainWindow,{open, port}) => {

    if(open) {
        puerto = new SerialPort(port)

        const parser = puerto.pipe(new DelimiterParser({delimiter: "\n"}))

        parser.on("open", ()=>{
            console.log("Conectado")
        })
        parser.on("data", (data) => {
            mainWindow.webContents.send('message-from-main', Math.round(Number(data.toString())*10)/10);
        })
    }
}

module.exports = {listPorts, openAndClosePort}