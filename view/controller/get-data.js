async function getData(){
   var req = new XMLHttpRequest()
    req.open('GET','/data',false)
       req.onreadystatechange  = ()=>{
        if(req.readyState==4 && req.status==200){
            var data = req.responseText
            data = JSON.parse(data)
            data = data.response
            fecha = new Date(data.Fecha)
            month = parseInt(fecha.getMonth()) + 1
            var dia,month

            fechaFormateada = fecha.getDate()+'/'+month+'/'+(fecha.getYear()).toString().substring(1,fecha.getYear().length)
            console.log()
            document.getElementById('lat').innerHTML = data.Latitud
            document.getElementById('long').innerHTML = data.Longitud
            document.getElementById('fecha').innerHTML = fechaFormateada
            document.getElementById('hora').innerHTML = data.Hora
        }else{
            console.log('No correcto')
        }
    }
   req.send(null)
    
}
setInterval(async ()=>{
    getData()
},5000)