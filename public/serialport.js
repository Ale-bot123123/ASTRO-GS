const {SerialPort} = require("serialport");
const {DelimiterParser} = require('@serialport/parser-delimiter');
const enviarData = require('./dataProcess');

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

    if(open && puerto === null) {
        puerto = new SerialPort(port)

        const parser = puerto.pipe(new DelimiterParser({delimiter: "\n"}))

        mainWindow.webContents.send("portOpenUpdate", true)

        parser.on("data", (data) => {
            enviarData(mainWindow, data.toString())
        })

    }else if(!open){
        if(puerto !== null && port.path !== "" ){
            puerto.close((err) => {
                if (err) {
                    console.error('Error al cerrar el puerto:', err);
                } else {
                    console.log('Puerto cerrado exitosamente.');
                    mainWindow.webContents.send("portOpenUpdate", false)
                    puerto = null
                }
            });
        }
    }
}

module.exports = {listPorts, openAndClosePort}