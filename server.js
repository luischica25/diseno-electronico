const mysql = require('mysql')
const dgram = require('dgram')
var bodyParser = require('body-parser')
const express = require('express')
var app = express()
const moment = require('moment')
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: true })
app.use(jsonParser)
app.use(urlencodedParser)

DBConfig = {
    host: 'disenoelectronico.cc3xavelbops.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password:"disenoelectronico",
    database:'diseno-electronico'
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
        query = `INSERT INTO geolocalizacion (id_geolocalizacion,latitud,longitud,fecha,hora)
        VALUES(UUID(),'${lat}','${long}','${fecha}','${hora}') `
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
    query = `SELECT latitud,longitud,fecha,hora
    FROM geolocalizacion
    ORDER BY CONCAT(fecha,hora)
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
    res.status(200).json({
        response
    })
}) 
app.post('/historicos', async(req,res)=>{
    
    let idate = req.body.finicial, fdate = req.body.ffinal
    idate = new Date(idate), fdate = new Date(fdate)
    idate = moment(idate).format('YYYY:MM:DD hh:mm:ss')
    fdate = moment(fdate).format('YYYY:MM:DD hh:mm:ss')
    query = `SELECT latitud,longitud,fecha,hora 
    FROM geolocalizacion
    WHERE CONCAT(fecha,' ',hora) < '${fdate}' AND CONCAT(fecha,' ',hora) > '${idate}'`
    response = await new Promise((resolve,reject)=>{
        connection.query(query,(e,d)=>{
            if(e)throw e
            else{
                resolve(d)
            }
        })
    })
    res.status(200).json({
        response
    })
})
app.get('/',(req,res)=>{
    path = __dirname+'/view'
    res.sendFile(path+'/index.html')
})
