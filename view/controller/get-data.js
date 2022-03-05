async function getData(){
    const data = await fetch('/data')
    console.log(data)
    fecha = new Date(data.Fecha)
    month = parseInt(fecha.getMonth()) + 1
    var month

    fechaFormateada = fecha.getDate()+'/'+month+'/'+(fecha.getYear()).toString().substring(1,fecha.getYear().length)+ data.hora
    console.log()
    document.getElementById('lat').innerHTML = data.Latitud
    document.getElementById('long').innerHTML = data.Longitud
    document.getElementById('fecha').innerHTML = fechaFormateada
}
setInterval(async ()=>{
    getData()
},5000)