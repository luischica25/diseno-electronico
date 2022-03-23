
async function getData(){
    var data = await fetch('/data')
    if(!data.ok) throw data.status
    data = data.json()
    return data
}
var latitud = 0 ,longitud = 0
setInterval(async ()=>{
    data = await getData();
    response = setDataIntDoc(data.response)
    let markerArray = new Array()
    actualMarket = L.marker([response[0],response[1]]).addTo(map)
    
},1000)

function setDataIntDoc(data){
    let timestamp = moment(data.timestamp).utcOffset('+01:00').format('YYYY:MM:DD hh:mm:ss')
    document.getElementById('lat').innerHTML = data.latitud
    document.getElementById('long').innerHTML = data.longitud
    document.getElementById('fecha').innerHTML = timestamp

    return [data.latitud,data.longitud]
}
