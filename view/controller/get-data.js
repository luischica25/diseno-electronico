async function getData(){
    var data = await fetch('/data')
    if(!data.ok) throw data.status
    data = data.json()
    return data
}
var latitud = 0 ,longitud = 0
setInterval(async ()=>{
    data = await getData();
    console.log(data.response)
    response = setDataIntDoc(data.response)
    console.log(response)
    //map.setView([response[0], response[1]], 13)
    L.marker([response[0], response[1]]).addTo(map)
},2000)

function setDataIntDoc(data){
    var fecha = new Date(data.fecha)
    var month = parseInt(fecha.getMonth()) + 1
    var fechaFormateada = (fecha.getDate()+1)+'/'+month+'/'+(fecha.getYear()).toString().substring(1,fecha.getYear().length)+' '+data.hora

    document.getElementById('lat').innerHTML = data.latitud
    document.getElementById('long').innerHTML = data.longitud
    document.getElementById('fecha').innerHTML = fechaFormateada

    return [data.latitud,data.longitud]
}
