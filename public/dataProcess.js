
const redondearData = (data) => Math.round(Number(data.toString())*10)/10

module.exports = function enviarData (mainWindow, data) {
    if(data.includes("T")){
        const dataArr = data.split(" ")
        mainWindow.webContents.send(dataArr[0], redondearData(dataArr[1]))
    }else if(data.includes("P")){
        const dataArr = data.split(" ")
        mainWindow.webContents.send(dataArr[0], redondearData(dataArr[1]))
    }else if(data.includes("A")){
        const dataArr = data.split(" ")
        mainWindow.webContents.send(dataArr[0], redondearData(dataArr[1]))
    }
}