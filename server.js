const mysql = require('mysql')
const dgram = require('dgram')
const express = require('express')
const app = express()
DBConfig = {
    host: 'localhost',
    port: '3306',
    user: 'root',
    database:'basededatos'
}

const connection = mysql.createConnection(DBConfig)
connection.connect((error)=>{
    if(error){
        console.log(error)
        connection.end()}
    
})



let server = new dgram.createSocket('udp4')
server.on('error',(error)=>{
    console.log('Ha habido un error en el servidor',error)
})
var lat,long,fecha,hora
server.on('message',(msg,msgInfo)=>{
    msg = msg.toString()

    msgSplited = msg.split(' ')
   
    if(msgSplited[0] && msgSplited[1] && msgSplited[2] && msgSplited[3]){
        lat = msgSplited[0], long = msgSplited[1], fecha = msgSplited[2], hora = msgSplited[3]
        query = `INSERT INTO basededatos (Latitud,Longitud,Fecha,Hora)
        VALUES('${lat}','${long}','${fecha}','${hora}') `
        connection.query(query,(e,d)=>{
            if(e)throw e
        })
    }else{
        console.log('Mensaje ilegible')
    }

})
server.bind(40001)
/**Servidor HTTP de solicitudes por parte de el frontend */
app.listen(30001,()=>{console.log('escucha web: 30001, escucha udp: 40001')})
app.use(express.static(__dirname+''))
app.get('/data',async (req,res)=>{
    query = `SELECT * 
    FROM basededatos
    ORDER BY id
    DESC 
    LIMIT 1`
    var response = new Array()
    response = await new Promise((resolve,reject)=>{
        connection.query(query,(e,d)=>{
            if(e)throw e
            else{
                resolve(d[0])
            }
        })
    })
    console.log(response);
    res.status(200).json({
        response
    })
}) 

app.get('/',(req,res)=>{
    path = __dirname+'/view'
    res.sendFile(path+'/index.html')
})
