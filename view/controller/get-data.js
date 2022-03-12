async function getData(){
    data = await fetch('/data')
    return data = await data.json()
}
setInterval(async ()=>{
    await getData().then((data)=>{
        data = data.response
        fecha = new Date(data.fecha)
        month = parseInt(fecha.getMonth()) + 1
        var month
        fechaFormateada = fecha.getDate()+'/'+month+'/'+(fecha.getYear()).toString().substring(1,fecha.getYear().length)+' '+ data.hora
        console.log()
        document.getElementById('lat').innerHTML = data.latitud
        document.getElementById('long').innerHTML = data.longitud
        document.getElementById('fecha').innerHTML = fechaFormateada
     })

},5000)